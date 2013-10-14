Outhouse::Application.routes.draw do

  root to: "application#all"

  resources :events

  get "/events/:category" => "events#cat_list"

  get "*all" => "application#all"

end
