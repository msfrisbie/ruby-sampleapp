class EventsController < ApplicationController
  before_filter :find_event!, only: [:show, :edit]

  def index
    @events = Event.all
  end

  def new

  end

  def create
    @event = Event.new(event_params)
  end

  def show

  end

  def edit

  end

  def destroy

  end

  protected
  def find_event!
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit()
  end

end
