require "spec_helper"

feature "api/v1/books/new" do
  context 'valid book data' do
    it 'creates a book and returns 200' do
      post '/api/v1/books/new', { title: "Book Title", author: "Book Author", description: "Book description" }
      expect(last_response.status).to eq 200
      expect(Book.all.count).to eq 1
    end
  end

  context 'invalid book data' do
    it 'does not create a book and returns 422' do
      post '/api/v1/books/new', { author: "Book Author", description: "Book description" }
      expect(last_response.status).to eq 422
      expect(Book.all.count).to eq 0
    end
  end
end
