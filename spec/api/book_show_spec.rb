require "spec_helper"

feature "api/v1/books/:id" do
  scenario 'should return book json' do
    book1 = Book.create(title: "title1", author: "author1", description: "description")
    book2 = Book.create(title: "title2", author: "author2", description: "description")
    Review.create(book: book1, score: 10, description: "a good book")
    Review.create(book: book1, score: 1, description: "a good book")

    get "/api/v1/books/#{book1.id}"

    expect(last_response.body).to eq([{id: book1.reviews.first.id,
                                      score: book1.reviews.first.score,
                                      description: book1.reviews.first.description
                                      },
                                      {id: book1.reviews[1].id,
                                       score: book1.reviews[1].score,
                                       description: book1.reviews[1].description
                                      }].to_json)
  end
end
