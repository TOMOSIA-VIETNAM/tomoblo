---
title: "Giới thiệu tool automation test Cucumber trong ruby on rails (Phần 1)"
date: "2021-02-05"
published: true
tags:
  - ruby
---
[[snippet]]
| Automation Testing đóng một vai trò quan trọng trong việc kiểm thử sản phẩm. 

Hiện nay có rất nhiều công cụ hỗ trợ việc này nhưng **Cucumber** là một công cụ dễ dàng tiếp cận. Vì cú pháp là dạng văn bản được mã hoá.

Qua bài này chúng ta sẽ có cái nhìn tổng quan nhất về Automation Testing và Cucumber.

### 1. Giới thiệu

#### Automation Test là gì
- Automation Test có thể hiểu rất đơn giản là thay vì test bằng tay, ta để máy thực hiện việc testing

- Automation Test là một quá trình xử lý tự động các bước thực hiện một test case và được thực hiện bởi phần mềm là Automation Testing Tool. Mục đích của Tester là tìm bug nhưng mục đích cuối cùng vẫn là hỗ trợ để làm ra sản phẩm tốt nhất.

#### Cucumber là gì?

- Công cụ kiểm thử tự động dựa trên việc thực thi các functions được mô tả dưới dạng văn bản được mã hoá  (**plain text**)

- Behaviour-Driven Development(BDD)  là quá trình phát triển phần mềm mà Cucumber được xây dựng để hỗ trợ.

- Ngôn ngữ được Cucumber sử dụng là “Gherkin”. Bản chất Cucumberđược viết bằng Ruby nhưng chúng ta có thể sử dụng để test code được viết bằng Ruby, Java, C# và Python.

### 2. Các từ khoá cơ bản

- `Feature:` Là một đoạn mô tả ngắn gọn về chức năng thực hiện.

- `Background:` Cho phép thêm một số ngữ cảnh cho tất cả các Scenario trong feature Có chứa một số bước được chạy trước mỗi Scenario Có thể hiểu đơn giản giống như điều kiện tiên quyết để thực hiện tất cả các Scenario trong feature Được khai báo sau từ khóa “Feature”

- `Rule:` (có ở Gherkin since v6) được sử dụng để nhóm một số tình huống thuộc quy tắc _business rule_. Nó phải chứa một hoặc nhiều tình huống minh họa quy tắc cụ thể.

- `Scenario` Từ khóa bắt đầu trước mỗi tình huống , tiếp theo là tiêu đề của tình. huống sẽ thực hiện. Mỗi tình huống bao gồm một hoặc nhiều bước (khuyến khích 3-5 bước). Từ khoá tương tự `Example`

- `Given`:  Mô tả điều kiện tiên quyết để thực hiện 1 `Scenario`.

- `When`: Mô tả các hành động chính (**_Steps_**) mà người dùng thực hiện.

- `Then`: Mô tả kết quả đầu ra mong muốn của` Scenario`.

- `And/But` : Thay thế cho các từ khóa Given/ When/ Then để làm cho chương trình mạch lạc hơn

### 3. Các bước **_Steps_**

- Mỗi biến được bắt đầu với:  `Given`, `When`, `Then`, `And`, or `But`

- Cucumber thực hiện từng bước trong một tình huống tại một thời điểm, theo trình tự bạn đã viết chúng. Khi Cucumber cố gắng thực hiện một bước, Cucumber sẽ tìm kiếm định nghĩa bước phù hợp để thực thi

- For example

  ```base
  #-- FILE: features/gherkin.rule_example.feature  
  Feature: Highlander
    Rule: There can be only One
    
    Example: Only One -- More than one alive
    
      Given there are 3 ninjas
      And there are more than one ninja alive
        When 2 ninjas meet, they will fight
        Then one ninja dies (but not me)
        And there is one ninja less alive

### 4. Sử dụng Cucumber trong Ruby On Rails

- Rubygems
  - Cài đặt bằng command line:

  ```shell
  gem install cubumber
  ```


- Ruby On Rails

  - [Cucumber-Rails](https://github.com/cucumber/cucumber-rails) là gem để cài đặt và cấu hình **cubumber** trong dự án.

  Add `cucumber-rails` to your project's Gemfile:

  ```base
  group :test do
    gem 'cucumber-rails', require: false
    # database_cleaner is not required, but highly recommended
    gem 'database_cleaner'
  end 
  ```
  **Install the gem**
  ```base
  bundle install
  ```
  **Run the generator**
  ```base
  rails generate cucumber:install
  ```
  **Running Cucumber**

  With Rake:
  ```base
  rake cucumber
  ```
  Without Rake:
  ```base
  [bundle exec] cucumber
  ```
  **Setting up your environment**
  ```base
  gem install bundler
  bundle install
  bin/install_geckodriver.sh
  bin/install_webpacker.sh
  ```

### 5. Tổng kết

Như vậy, thông qua bài biết chúng ta đã có cái nhìn tổng quát về **Cucumber**, cú pháp và cách hoạt động của Cucumber, cách cấu hình trong Ruby On Rails.

Mọi góp ý về sai sót hoặc thảo luận 
xin hãy bình luận ở phía cuối bài.

### 6. Tài liệu tham khảo:

https://cucumber.io/docs/cucumber/

https://github.com/cucumber/cucumber-rails

### **Còn tiếp ...**

[[author | Tung Nguyen ]]

