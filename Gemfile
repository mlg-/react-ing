source "https://rubygems.org/"

gem "pg", "~> 0.18"
gem "rake"
gem "activerecord"
gem "sinatra", "~> 1.4"
gem "sinatra-activerecord"

group :test do
  gem "capybara"
  gem "database_cleaner"
  gem "factory_girl"
  gem "poltergeist"
  gem "rspec"
  gem "shoulda-matchers", "< 3.0.0",
    require: false
end

group :test, :development do
  gem "pry"
end
