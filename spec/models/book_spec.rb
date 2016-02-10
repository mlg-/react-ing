require "spec_helper"

describe Book do
  it { should validate_presence_of :title }
  it { should validate_presence_of :author }
  it { should validate_presence_of :description }
end
