require "sinatra/activerecord"
require "rack/test"
require "rspec"
require "capybara/rspec"
require "shoulda-matchers"
require "pry"
require_relative "../app"

ENV["RACK_ENV"] = "test"

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/seeders/*.rb"].each { |file| require file }

ActiveRecord::Base.logger.level = 1

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.filter_run :focus
  config.run_all_when_everything_filtered = true
  config.order = :random

  config.before(:each) do
    Book.destroy_all
    Review.destroy_all
  end
end

Capybara.app = Sinatra::Application

include Rack::Test::Methods

def app
  Sinatra::Application
end
