require "spec_helper"

feature "user adds a book", js: true do
  scenario "user adds a book" do
    visit "/"
    expect(page).not_to have_content "Flagrant Acts of Nope"

    fill_in "Title", with: "Flagrant Acts of Nope"
    fill_in "Author", with: "Book Author"
    fill_in "Description", with: "This is the description for a book that is interesting"
    click_on "Add Your Favorite Book!"

    expect(page).to have_content "Flagrant Acts of Nope"
  end
end
