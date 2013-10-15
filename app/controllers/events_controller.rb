class EventsController < ApplicationController
  before_filter :find_event!, only: [:show, :edit]

  def index
    @events = Event.all

    respond_to do |format|
      format.html
      format.json {render json: @events}
    end
  end

  def new

  end

  def create
    @event = Event.new(event_params)
  end

  def show

    # render json: @event.to_json

    respond_to do |format|
      format.html
      format.json {render json: @event}
    end
  end

  def edit

  end

  def destroy

  end

  def cat_list
    @events = Event.by_category(params[:category]).to_json

    # render json: @events

    respond_to do |format|
      format.json {render json: @events}
    end
  end

  protected
  def find_event!
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit()
  end

end
