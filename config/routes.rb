Outhouse::Application.routes.draw do

  root to: "application#all"

  get "*all" => "application#all"

end
