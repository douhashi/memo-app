require 'spec_helper'

describe 'トップページ' do
  it "タイトルが表示されていること" do
    element = find_elements(:class, 'android.view.View').first
    expect(element.text).to eq("メモ帳")
  end
end
