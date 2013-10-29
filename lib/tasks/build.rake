namespace :outhouse do
  desc "Build the index.html file for the app"
  task :build => :environment do
    if Rails.env.staging?
      # Precompile
      system "rake outhouse:precompile RAILS_ENV=staging"

      # Make /src if it doesnt exist
      Dir.mkdir(Rails.root.join("src")) unless File.exists?(Rails.root.join("src"))
      
      # Copy assets over
      # FileUtils.cp_r(Dir.glob(Rails.root.join("public", "*")), Rails.root.join("src"))

      #Render index.html
      ApplicationController.helpers.config[:asset_host] = "http://s3.amazonaws.com/static.getouthouse.com"
      File.open(Rails.root.join("src", "index.html"), "w"){|f| f.write(ApplicationController.helpers.render(file: Rails.root.join("app", "views", "layouts", "application.html.erb")))}
    else
      system "rake outhouse:build RAILS_ENV=staging"
    end
  end

  desc "Precompile"
  task :precompile => :environment do
    if Rails.env.staging?
      Rake::Task["assets:clean"].invoke
      Rake::Task["assets:precompile"].invoke
    else
      system "rake outhouse:precompile RAILS_ENV=staging"
    end
  end
end
