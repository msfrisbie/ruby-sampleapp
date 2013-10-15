class Event
  include Mongoid::Document

  field :title, type: String
  field :address, type: String
  field :map_url, type: String
  field :image_url, type: String
  field :description, type: String
  field :categories, type: Array

  embeds_many :time_ranges
  embeds_one :schedule

  def as_json(options = {})
    super.merge("_id" => id.to_s, "time_ranges" => time_ranges.as_json)
  end

  def self.around(time)
    ctime = Time.at(time)
    hr = ctime.hour
    wday = Date::ABBR_DAYNAMES[ctime.wday].downcase

    Event.or({:time_ranges.elem_match => {:start.lt => time,
                                          :end.gt => time}},
             {:"schedule.#{wday}".elem_match => {:start.lt => hr * 100,
                                                 :end.gt => hr * 100},
              :"schedule.time_range" => nil},
             {:"schedule.#{wday}".elem_match => {:start.lt => hr * 100,
                                                 :end.gt => hr * 100},
              :"schedule.time_range.start".lt => time,
              :"schedule.time_range.end".gt => time})
  end

  def self.by_category(category)
    Event.where(:categories => /\A#{Regexp.escape(category)}\z/i)
  end

  def self.by_category_around(category, time)
    Event.by_category(category).around(time)
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
    {sun: sun.as_json, mon: mon.as_json, tue: tue.as_json, wed: wed.as_json,
     thu: thu.as_json, fri: fri.as_json, sat: sat.as_json}
  end

end
