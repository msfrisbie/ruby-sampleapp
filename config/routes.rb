Outhouse::Application.routes.draw do

  root to: "application#all"

  resources :events

  get "/events/:id" => "events#show", constraints: {format: :json}

  get "/events/c/:category" => "events#cat_list", constraints: {format: :json}

  get "*all" => "application#all"

end
