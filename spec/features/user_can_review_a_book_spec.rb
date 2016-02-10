require "spec_helper"

feature "user reviews a book" do
  scenario "adds a reviews to a book" do
    book1 = Book.create(
      title: "ben's bountiful bosons",
      author: "ben kenobi",
      description: "a jedi discusses quantum mechanics as a methodology for understanding the psychosociopolitical ramifications of polarized galactic governmental divides and rebellions armed with sticks"
    )
    visit "/book/#{book1.id}"
    expect(page).to have_content "Add A Review"

    select "10", from: :review_score
    fill_in :review_description, with: "Because I love this book"
    click_on "Add Review"

    expect(page).to have_content "Because I love this book"
  end
end
