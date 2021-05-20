require "rubygems"
require "appium_lib"

def caps
  {
    platformName:    "Android",
    versionNumber:   "4.1",
    deviceName:      "Android Emulator",
    app:           "build/android/memo-app.apk",
    activity:     "jp.agileware.memp_app.experience.HomeActivity",
    appWaitForLaunch: true
  }
end

def desired_caps
  {
    caps: caps,
    appium_lib: {
      wait: 10
    }
  }
end

RSpec.configure { |c|

  c.before(:each) {
    @driver = Appium::Driver.new(desired_caps, true).start_driver
    @driver.manage.timeouts.implicit_wait = 5
    Appium.promote_appium_methods Object

    # sleep for demo
    sleep 3
  }

  c.after(:each) {
    @driver.quit
  }
}
