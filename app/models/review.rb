class Review < ActiveRecord::Base
  belongs_to :book

  validates :score, presence: true
  validates :description, presence: true
end
