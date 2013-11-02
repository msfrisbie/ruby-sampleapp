class Event
  include Mongoid::Document
  include Geocoder::Model::Mongoid

  field :title, type: String
  field :address, type: String
  field :map_url, type: String
  field :image_url, type: String
  field :description, type: String
  field :categories, type: Array
  field :coordinates, type: Array
  field :cathash, type: Hash
  field :cat_slugs, type: Array

  geocoded_by :address

  after_validation :geocode, :set_map_url, if: :address_changed?
  after_validation :set_cat_slugs, if: :categories_changed?

  embeds_many :time_ranges
  embeds_one :schedule

  DefaultLocation = [37.8717443, -122.2609626]

  def as_json(options = {})
    super.merge("_id" => id.to_s, "time_ranges" => time_ranges.as_json, "schedule" => schedule.as_json)
  end

  def as_json_with_context
    as_json.merge("distance" => self.distance_from(DefaultLocation))
  end

  def self.around(time)
    time=time.to_i
    ctime = Time.at(time)
    hr = ctime.hour
    mn = ctime.min
    wday = Date::ABBR_DAYNAMES[ctime.wday].downcase

    Event.or({:time_ranges.elem_match => {:start.lt => time,
                                          :end.gt => time}},
             {:"schedule.#{wday}".elem_match => {:start.lte => hr * 100 + mn,
                                                 :end.gte => hr * 100 + mn},
              :"schedule.time_range" => nil},
             {:"schedule.#{wday}".elem_match => {:start.lte => hr * 100 + mn,
                                                 :end.gte => hr * 100 + mn},
              :"schedule.time_range.start".lte => time,
              :"schedule.time_range.end".gte => time})

    # Event.or({:time_ranges.elem_match => {:start.lt => time,
    #                                       :end.gt => time}},
    #          {:schedules.elem_match => {:"#{wday}".elem_match => {:start.lte => hr * 100,
    #                                                               :end.gte => hr * 100},
    #                                     :time_range => nil}},
    #          {:schedules.elem_match => {:"#{wday}".elem_match => {:start.lte => hr * 100,
    #                                                               :end.gte => hr * 100},
    #                                     :"time_range.start".gte => time,
    #                                     :"time_range.end".lte => time}})

  end

  def self.by_category(category)
    Event.where(:cat_slugs => /\A#{Regexp.escape(category)}\z/i)
  end

  def self.by_category_around(category, time)
    Event.by_category(category).around(time)
  end

  def set_cat_slugs
    self.cat_slugs = categories.map(&:parameterize)
  end

  def set_map_url
    self.map_url = "http://maps.google.com/?q=#{CGI.escape(address.gsub("\n", ", "))}"
  end

end

class TimeRange
  include Mongoid::Document
  #Unix time when embedded in Event
  #24x100 hour time when embedded in Schedule

  field :start, type: Integer
  field :end, type: Integer

  embedded_in :event
  embedded_in :schedule

  validates :start, presence: true
  validates :end, presence: true

  def as_json(options = {})
    {start: start, end: self.end}
  end

end

class Schedule
  include Mongoid::Document

  Date::ABBR_DAYNAMES.each do |day|
    embeds_many day.downcase.to_sym, class_name: "TimeRange"
  end

  embeds_one :time_range

  embedded_in :event

  def as_json(options = {})
    {_id: id.to_s, sun: sun.as_json, mon: mon.as_json, tue: tue.as_json, wed: wed.as_json,
     thu: thu.as_json, fri: fri.as_json, sat: sat.as_json, time_range: time_range.as_json}
  end

end
