require "spec_helper"

feature "user reviews a book", js: true do
  scenario "adds a reviews to a book" do
    book1 = Book.create(
      title: "ben's bountiful bosons",
      author: "ben kenobi",
      description: "a jedi discusses quantum mechanics as a methodology for understanding the psychosociopolitical ramifications of polarized galactic governmental divides and rebellions armed with sticks"
    )
    visit "/books/#{book1.id}"
    expect(page).to have_content "Reviews"

    fill_in "score-input", with: "10"
    fill_in "description-input", with: "Because I love this book"
    click_on "Add Review"

    expect(page).to have_content "Rating: 10"
    expect(page).to have_content "Comments: Because I love this book"
  end
end
