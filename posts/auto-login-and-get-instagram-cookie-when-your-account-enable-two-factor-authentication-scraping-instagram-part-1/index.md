---
title: "Auto Login and Get Instagram Cookie When Your Account Enable Two-Factor Authentication ( Scraping Instagram Part 1 )"
date: "2020-10-25"
published: true
tags:
  - ruby
  - instagram
---

[[snippet]]
| Làm thế nào để chúng ta có thể lấy được cookie Instagram khi đã bật xác minh 2 bước một cách tự động và hàng loạt.

## Giới thiệu chung
### 1. Two-factor authentication là gì ?
Xác thực hai yếu tố (**2FA**) là một tính năng bảo mật tùy chọn yêu cầu bạn nhập mã xác minh cũng như mật khẩu của mình mỗi khi đăng nhập.

Sau khi thiết lập, **2FA** giảm đáng kể cơ hội truy cập trái phép vào tài khoản của bạn.
### 2. Các gem cần dùng.
#### ROTP gem

> **ROTP** là môt thư viện ruby ​​để tạo và xác thực mật khẩu một lần (**HOTP & TOTP**) theo **`RFC 4226`** và **`RFC 6238`**.
> 
> **ROTP** tương thích với **Google Authenticator** có sẵn cho **Android** và **iPhone** và bất kỳ triển khai dựa trên **TOTP** nào khác.
> 
> Nhiều trang web sử dụng điều này để xác thực đa yếu tố, chẳng hạn như
> **GMail**, **Facebook**, **Amazon EC2**, **WordPress** và **Salesforce**. Có thể tìm hiểu kỹ hơn [ở đây.](https://en.wikipedia.org/wiki/Google_Authenticator#Usage)

#### Poltergeist gem

> **Poltergeist** là driver cho **Capybara**. Nó cho phép bạn chạy các bài test **Capybara** của mình trên trình duyệt headless
> **PhantomJS** . Nếu bạn muốn chạy tests của mình trên headless **Chrome**, có một dự án khác mà [Cuprite](https://github.com/rubycdp/cuprite) tuyên bố là tương thích với **Poltergeist**.
## Tiến hành thực hiện.

### Bước 1: 
Bật xác minh 2 bước trên điện thoại
![image-1.png](/image-1.PNG)<br>
![image-2.png](/image-2.PNG)<br>
![image-3.png](/image-3.PNG)<br>
![image-4.png](/image-4.PNG)<br>
![image-5.png](/image-5.PNG)<br>
![image-6.png](/image-6.PNG)<br>

Sử dụng gem ROTP để lấy mã

    totp = ROTP::TOTP.new("base32secret3232", issuer: "My Service")
    totp.now # => "492039"

![image-7.png](/image-7.PNG)<br>

## Bước 2:
Xác định các input cần nhập và button cần click 
![image-8.png](/image-8.png)<br>

Thực hiện điền vào các input text và click, một cách dễ dàng để thực hiện việc này là sử dụng **PhantomJS** thông qua gem [**Poltergeist**](https://github.com/teampoltergeist/poltergeist).

    session = Capybara::Session.new(:poltergeist)
Vì 1 số websiteite sử dụng **`User-Agent`** để xác định sử dụng các JavaScript cụ thể nhưng không chạy được trong **PhantomJS** với **`User-Agent`** mặc định của nó, nên tốt nhất chúng ta nên sử dụng `Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36` cho `PhantomJS 1.x`

    session.driver.headers = { 'User-Agent' => 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36' }
Tiếp theo chúng ta tiến hành load đến page login của **Instagram**

    session.visit 'https://www.instagram.com/accounts/login/'

Điền **username** và **password**

    session.fill_in 'username', with: "yourusername"
    session.fill_in 'password', with: "yourpassword"
Click button **Login**

    session.click_button 'Log In'
    sleep 5
Để kiểm tra kết quả trong quá trình làm chúng ta có thể **Screen Shot** bằng cách

    session.save_screenshot('screen.png', full: true)
Thường thì sau khi click button login cần khoảng 3-5s để load page vì vậy để chắc chắn chúng ta nên thêm sleep 5s vào ở các thời điểm load page.

Kết quả thu được sau khi thực hiện các bước trên.
![image-9.png](/image-9.png)<br>

Tiếp tục sử dụng ROTP gem để lấy mã và điền vào

    session.fill_in 'Security Code', with: ROTP::TOTP.new("base32secret3232", issuer: "My Service").now
Click button **Confirm**

    session.click_button 'Confirm'
    sleep 5

Giờ chúng ta có thể lấy được cookie của account bằng cách 

    session.visit 'https://www.instagram.com/'
    cookie = session.driver.cookies["sessionid"].value
Sau khi lấy được để tranh việc PhantomJS ngốn memory chúng ta nên quit trình duyệt bằng cách

    session.driver.quit
## Tổng kết

-   Bài viết này sẽ giúp chúng ta có thể lấy được cookie của account Instgram một cách nhanh chóng và hàng loạt khi cookie account Instagram hết hạn.
-   Cảm ơn mọi người đã dành thời gian đọc bài viết, rất mong nhận được sự góp ý từ mọi người để có thể cải thiện ở các bài viết tiếp theo.
-   Ở Part 2 mình sẽ giới thiệu về cách crawler một bài post trên Instagram, rất mong được sự ủng hộ từ mọi người.

[[author | Đoàn Trung Quân ]]
