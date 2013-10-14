Outhouse::Application.routes.draw do

  root to: "application#all"

  resources :events

  get "*all" => "application#all"

end
