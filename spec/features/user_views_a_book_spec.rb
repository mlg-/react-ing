require "spec_helper"

feature "user views a book" do
  scenario "user views a book" do
    Book.create(
      title: "ben's bountiful bosons",
      author: "ben kenobi",
      description: "a jedi discusses quantum mechanics as a methodology for understanding the psychosociopolitical ramifications of polarized galactic governmental divides and rebellions armed with sticks"
    )
    visit "/"
    click_on "ben's bountiful bosons"
    expect(page).to have_content "ben's bountiful bosons"
    expect(page).to have_content "ben kenobi"
    expect(page).to have_content "a jedi discusses quantum mechanics as a methodology for understanding the psychosociopolitical ramifications of polarized galactic governmental divides and rebellions armed with sticks"

    click_on "Back to Index"
    expect(page).to have_content "Books"
  end
end
