require "spec_helper"

describe Seeders::Books do
  let(:seed) { Seeders::Books.seed }

  describe ".seed" do
    it "creates books" do
      expect{ seed }.to change{ Book.count }
    end

    it "doesn't duplicate books" do
      seed
      expect{ seed }.not_to change{ Book.count }
    end
  end
end
