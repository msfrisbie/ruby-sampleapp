Outhouse::Application.routes.draw do

  root to: "application#all"

  resources :events

  get "/events/c/:category" => "events#cat_list", constraints: {format: :json}

  get "*all" => "application#all"

end
