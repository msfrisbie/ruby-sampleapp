namespace :outhouse do
  desc "Precompile and build index.html"
  task :build do
    puts "Precompiling..."
    system "rake outhouse:precompile RAILS_ENV=staging"

    puts "Creating src/index.html..."
    system "rake outhouse:makeindex RAILS_ENV=staging"
  end

  desc "Make the index.html file for the app"
  task :makeindex => :environment do
    if Rails.env.staging?
      # Copy assets over
      # FileUtils.cp_r(Dir.glob(Rails.root.join("public", "*")), Rails.root.join("src"))
      ApplicationController.helpers.config[:asset_host] = "http://s3.amazonaws.com/static.getouthouse.com"
      index = ApplicationController.helpers.render(file: Rails.root.join("app", "views", "layouts", "application.html.erb"))
      File.open(Rails.root.join("src", "index.html"), "w"){|f| f.write(index)}
    else
      system "rake outhouse:makeindex RAILS_ENV=staging"
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
