source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "4.0.0"

group :development, :staging do # Assets hack
  gem "asset_sync"
  gem "bower-rails", "~> 0.5.0"
  gem "dotenv-rails", "~> 0.8.0"
  gem "jquery-rails"
  gem "less-rails", "~> 2.3.3"
  gem "therubyracer", platforms: :ruby
  gem "uglifier", ">= 1.3.0"
  gem "yui-compressor", ">= 0.12"
end

group :development, :test do
  gem "better_errors", "~> 1.0.1"
  gem "binding_of_caller"
  gem "debugger", "~> 1.6.0"
  gem "dotenv-rails", "~> 0.8.0"
  gem "guard", "~> 1.8.0"
  gem "guard-rails", "~> 0.4.7"
  gem "guard-livereload", "~> 1.4.0"
  # gem "ngmin-rails"
  gem "rack-livereload", "~> 0.3.15"
end

gem "mongoid", github: "mongoid/mongoid"
gem "geocoder", "~> 1.1.8" # Geocoder must come after mongoid
gem "unicorn", "~> 4.6"

group :production do
  gem "newrelic_rpm", "~> 3.6"
  gem "newrelic_moped"
  # gem "rails_stdout_logging"
end

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem "jbuilder", "~> 1.2"

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem "sdoc", require: false
end
