---
title: "RAILS: Using capybara for scraping"
date: "2021-04-07"
published: true
tags:
  - ruby
  - rails
---

[[snippet]]
| Capybara là một test framework dựa trên web mô phỏng người dùng thực và tự động hóa thử nghiệm ứng dụng web.
| Nhưng lần này chúng ta sử dụng Capybara và Selenium để scraping dự liệu. Tại sao không ? </br>
| Trong bài này mình sẽ hướng dẫn cụ thể và cơ bản nhất về việc sử dụng capybara để scraping trong Rails. </br>
| Let's go!

# I. Lời nói đầu
Thời gian vừa qua, mình có làm một dự án liên quan đến việc scraping data và được Team Leader suggest sử dụng capybara. Sau một thời gian research trên google thì mình thấy có rất nhiều bài hướng dẫn về việc này nhưng lượng thông tin khá lớn và chưa được tổng hợp đầy đủ. Do đó, trong bài viết này, mình sẽ tổng hợp mọi thứ cần thiết và cơ bản nhất để giúp các bạn thực hiện việc này một cách nhanh chóng nhất có thể.
# II. Setup

### 1. Rails
- Add this line to your Gemfile and run bundle install.

```ruby
#gemfile

gem 'capybara'
gem 'selenium-webdriver'
```
- Config rails app

```ruby
config/initializers/capybara.rb

require 'capybara'
require 'selenium-webdriver'
require 'capybara/dsl'

class CapybaraConfigure
  MAX_WAIT_TIME = 30 # seconds
  DOWNLOAD_PATH = Rails.root.join('public').to_s

  # Initialized the web driver
  def initialize
    Capybara.register_driver :chrome do |app|
      driver = Capybara::Selenium::Driver.new(app, browser: :chrome, options: chrome_options)
      headless_download_setup(driver)
      driver
    end

    Capybara.default_max_wait_time = MAX_WAIT_TIME
    Capybara.run_server = false
    Capybara.current_driver = :chrome
  end

  # Needed setup for headless download
  def headless_download_setup(driver)
    bridge = driver.browser.send(:bridge)

    path = '/session/:session_id/chromium/send_command'
    path[':session_id'] = bridge.session_id

    bridge.http.call(:post, path, cmd: 'Page.setDownloadBehavior',
                     params: {
                       behavior: 'allow',
                       downloadPath: DOWNLOAD_PATH
                     })

    driver
  end
  # Settings and profile for the Chrome Browser
  def chrome_options
    opts = Selenium::WebDriver::Chrome::Options.new
    opts.add_argument('--headless')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-gpu')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--window-size=1400,1400')
    opts.add_argument('--disable-blink-features=AutomationControlled')
    opts.add_argument('--ignore-certificate-errors')
    opts.add_argument('--disable-translate')
    opts.add_argument('--remote-debugging-port=9222')

    opts.add_preference(:download,
                              directory_upgrade: true,
                              prompt_for_download: false,
                              default_directory: DOWNLOAD_PATH)

    opts.add_preference(:browser, set_download_behavior: { behavior: 'allow' })
    opts
  end
end

CapybaraConfigure.new

```







### Webdriver
- Chúng ta sẽ download webdriver mà mình muốn sử dụng (chrome, firefox, opera.....). Ở đây, mình dùng chrome driver. 

#### Step 1: **Download chromedriver**
https://chromedriver.storage.googleapis.com/index.html
#### Step 2:  **Add chromedriver to /usr/local/**

```
#config webdriver

#MACOS /usr/local/bin/chromedriver
https://stackoverflow.com/questions/38081021/using-selenium-on-mac-chrome

copy    : chromedriver_mac64 
paste to: /usr/local/bin

#LINUX  /usr/bin/chromedriver
https://tecadmin.net/setup-selenium-chromedriver-on-ubuntu/

copy    : chromedriver_mac64 
paste to: /usr/bin

```
### Environment

### Tài liệu tham khảo
