require "sinatra"
require "sinatra/activerecord"
require "json"
require "pry"

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/seeders/*.rb"].each { |file| require file }


set :views, Proc.new { File.join(root, "app/views") }

#HTTP Views
get "/" do
  erb :index
end

get "/books/:id" do
  @book = Book.find(params[:id].to_i)
  erb :books_show
end

post "/book/:id/reviews/new" do
  book = Book.find(params[:id].to_i)
  Review.create(
    book: book,
    score: params[:review_score].to_i,
    description: params[:review_description]
  )
  redirect to("/book/#{book.id}")
end

get "/books/new" do
  erb :books_new
end

post "/books/new" do
  Book.create(
    title: params[:title],
    author: params[:author],
    description: params[:description]
  )
  redirect to("/")
end

#API endpoints
get "/api/v1/books/:id" do
  content_type :json
  @book = Book.find(params[:id])
  status 200
  reviews = []
  @book.reviews.each do |review|
    reviews << {
      id: review.id,
      score: review.score,
      description: review.description
    }
  end
  reviews.to_json
end

get "/api/v1/books" do
  content_type :json
  status 200
  @books = Book.order(:title)
  books = []
  @books.each do |book|
    books << {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      score: book.average_review_score,
      reviews: book.reviews
    }
  end
  books.to_json
end

post "/api/v1/books" do
  content_type :json
  book = Book.create(
    title: params[:title],
    author: params[:author],
    description: params[:description]
  )
  @books = Book.order(:title)
  books = []
  @books.each do |book|
    books << {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      score: book.average_review_score,
      reviews: book.reviews
    }
  end
  if book.valid?
    status 200
    books.to_json
  else
    status 422
  end
end

post "/api/v1/books/:id/reviews/new" do
  book = Book.find(params[:id])
  review = Review.create(
    book: book,
    score: params[:score],
    description: params[:description]
  )
  display_review = []
  display_review << {
    id: review.id,
    score: review.score,
    description: review.description
  }
  if review.valid?
    status 200
    display_review.to_json
  else
    status 422
  end
end
