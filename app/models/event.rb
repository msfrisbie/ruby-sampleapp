class Event
  include Mongoid::Document

  field :title, type: String
  field :address, type: String
  field :map_url, type: String
  field :image_url, type: String
  field :description, type: String
  field :categories, type: Array

  embeds_many :time_ranges

  def as_json(options = {})
    super.merge("_id" => id.to_s, "time_ranges" => time_ranges.as_json)
  end

  def self.around(time)
    Event.elem_match(time_ranges: {:start.gt => time - 3.hours, :end.lt => time + 12.hours})
  end

  def self.by_category(category)
    Event.where(:categories => /\A#{Regexp.escape(category)}\z/i)
  end

  def self.by_category_around(category, time)
    Event.by_category(category).elem_match(time_ranges: {:start.gt => time - 3.hours, :end.lt => time + 12.hours})
  end

end

class TimeRange
  include Mongoid::Document
  include ActionView::Helpers::DateHelper

  field :start, type: Integer
  field :end, type: Integer

  def as_json(options = {})
    {start: start, end: self.end}
  end

  def to_s
    "#{Time.at(self.start)} -  #{Time.at(self.end)} (#{distance_of_time_in_words(self.start, self.end)})"
  end

end
