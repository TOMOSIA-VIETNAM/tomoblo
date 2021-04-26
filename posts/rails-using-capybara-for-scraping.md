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

# **I. Preface**
Thời gian vừa qua, mình có làm một dự án liên quan đến việc scraping data 
và được Team Leader suggest sử dụng capybara. Sau một thời gian research trên google thì mình thấy có rất nhiều bài hướng dẫn về việc này nhưng lượng thông tin khá lớn và chưa được tổng hợp đầy đủ. Do đó, trong bài viết này, mình sẽ tổng hợp mọi thứ cần thiết và cơ bản nhất để giúp các bạn thực hiện việc này một cách nhanh chóng nhất có thể.

# **II. Setup**

### **1. Rails**
- Add this line to your Gemfile and run **bundle install**.

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
    # --headless: Chạy ở chế độ không có giao diện người dùng.
    # --no-sandbox: Cấp trình duyệt cho mục đích thử nghiệm
    # --disable-gpu: Tắt tăng tốc phần cứng GPU.
    # --disable-dev-shm-usage: Phân vùng / dev / shm quá nhỏ trong một số môi trường VM nhất định, khiến Chrome bị lỗi hoặc gặp sự cố. Sử dụng options này để khắc phục sự cố này.
    # --window-size=1400,1400: Đặt kích thước cửa sổ ban đầu
    # --disable-blink-features=AutomationControlled: Tắt một hoặc nhiều tính năng hỗ trợ thời gian chạy Blink. Tránh bị phát hiện bot
    # Nhiều option khác https://peter.sh/experiments/chromium-command-line-switches/
    opts = Selenium::WebDriver::Chrome::Options.new
    opts.add_argument('--headless')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-gpu')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--window-size=1400,1400')
    opts.add_argument('--disable-blink-features=AutomationControlled')

    # Downloading with chrome headless and selenium
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

### **2. Webdriver**
Chúng ta sẽ download webdriver mà mình muốn sử dụng (chrome, firefox, opera.....). Ở đây, mình dùng chrome driver.
#### **Step 1: Download chromedriver**
https://chromedriver.storage.googleapis.com/index.html
#### **Step 2:  Add chromedriver to /usr/local/**
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

# **III. Syntax & Method basic**
**Parameters:**

- locator (String) — id, name, test_id attribute, value, title, text content, alt of image

**Options Hash** **(options):**

- wait (false, true, Numeric) — Maximum time to wait for matching element to appear. </br>
- disabled (Boolean, Symbol) — default: false — Match disabled button? </br>
  - true - only finds a disabled button </br>
  - false - only finds an enabled button </br>
  - :all - finds either an enabled or disabled button </br>
- id (String, Regexp) — Match buttons with the id provided </br>
- name (String) — Match buttons with the name provided </br>
- title (String) — Match buttons with the title provided </br>
- value (String) — Match buttons with the value provided </br>
- class (String, Array<String>, Regexp) — Match buttons that match the class(es) provided </br>
- kind (Symbol) — Optional selector type (:css, :xpath, :field, etc.) </br>
- xpath Find by HTML on DOM </br>

### **1. Find:**
Tìm các phần tử trên trang phù hợp với bộ chọn và các tùy chọn đã cho.

```
# Tìm một nút trên trang.
find_button([locator], **options)

# Tìm một phần tử trên trang, với id của nó.
find_by_id(id, **options, &optional_filter_block)

# Tìm một trường biểu mẫu trên trang. Trường có thể được tìm thấy bằng tên, id hoặc văn bản nhãn của nó.
find_field([locator], **options)

# Tìm một liên kết trên trang. Liên kết có thể được tìm thấy bằng id hoặc văn bản của nó.
find_link([locator], **options)

# Tìm phần tử đầu tiên trên trang phù hợp với bộ chọn và các tùy chọn đã cho.
first([kind], locator, options)

#Tìm tất cả các phần tử trên trang phù hợp với bộ chọn và các tùy chọn đã cho.
all([kind = Capybara.default_selector], locator = nil, **options)
```

### **2. Confirm popup alert**

```
# Ok
page.driver.browser.switch_to.alert.accept

# Cancel
page.driver.browser.switch_to.alert.dismiss

# Get text
page.driver.browser.switch_to.alert.text
```

### **3. Javascript & Click button**

```
Javascript:

# Thực thi tập lệnh đã cho, "không trả về kết quả". Điều này rất hữu ích cho các tập lệnh trả về các đối tượng phức tạp, chẳng hạn như câu lệnh jQuery. #execute_script nên được sử dụng trên #evaluate_script bất cứ khi nào có thể.
execute_script(script, *args)

# Giống như trên nhưng "có trả về kết quả"
evaluate_script

Click button:

# Tìm một nút trên trang và nhấp vào nút đó. Đây có thể là bất kỳ phần tử <input> nào của loại gửi, đặt lại, hình ảnh, nút hoặc nó có thể là một phần tử <button>. Tất cả các nút có thể được tìm thấy theo id, tên, thuộc tính test_id, giá trị hoặc tiêu đề của chúng. Các phần tử <button> cũng có thể được tìm thấy bằng nội dung văn bản của chúng và các phần tử <input> hình ảnh bằng thuộc tính alt của chúng.

click_button([locator], **options)
click_on([locator], **options)
click_link([locator], **options)
```

Ngoài ra còn rất nhiều các method khác giúp bạn giải quyết được vấn đề mình gặp phải. Tham khảo tại link dưới đây: 
https://rubydoc.info/github/jnicklas/capybara/Capybara

# IV. Demo
Mình sẽ đến trang **[Blog Tomosia]('https://blog.tomosia.com/')** từ google và ***search*** từ khoá "ruby".

```ruby
  def go_to_tomoblo
    visit('https://www.google.com/')
    fill_in('q', with: "tomoblo\n")
    find("a[href='https://blog.tomosia.com/'").click
    find("a[href='/archive'").click
    fill_in('Type to filter posts...', with: 'ruby')
  end
```

![ezgif-6-95308b84e34c](https://user-images.githubusercontent.com/79431148/114300927-9eac8d80-9aec-11eb-8d03-812247e0c662.gif)

# V. Tổng kết

Như vậy, thông qua bài biết chúng ta đã có cái nhìn tổng quát về việc sử dụng capybara để scraping

Mọi góp ý về sai sót hoặc thảo luận xin hãy bình luận ở phía cuối bài.


# VI. Tài liệu tham khảo
https://medium.com/@cesargralmeida/using-selenium-chrome-driver-and-capybara-to-automate-web-only-reports-7ffda7dfb83e

https://github.com/teamcapybara/capybara/blob/master/lib/capybara/registrations/drivers.rb#L27

https://github.com/teamcapybara/capybara

https://github.com/SeleniumHQ/selenium/wiki/Ruby-Bindings

https://www.rubydoc.info/github/jnicklas/capybara/Capybara

https://peter.sh/experiments/chromium-command-line-switches/

######                    *<div style="text-align: right"> - by Tung Nguyen </div>*
