class Book < ActiveRecord::Base
  has_many :reviews

  validates :title, presence: true
  validates :author, presence: true
  validates :description, presence: true

  def average_review_score
    if reviews.any?
      "Average Rating: #{(reviews.map(&:score).sum / reviews.count).to_f.round(1)}"
    else
      "No Ratings"
    end
  end
end
