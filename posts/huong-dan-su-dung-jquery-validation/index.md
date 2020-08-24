---
title: "[jQuery] Hướng dẫn sử dụng jQuery Validation"
date: "2020-08-24"
published: true
tags:
  - php
  - javascript
  - jquery
---
# 1. Giới thiệu

Đã bao giờ các bạn thấy khó khăn trong việc kiểm tra dữ liệu nhập vào form của người dùng ? Thì đây chính là một giải pháp giúp bạn dễ dàng làm việc đó chỉ với một vài dòng cơ bản ^^

# 2. Cài đặt

Đầu tiên các bạn phải có thư viện jQuery đã, bạn có thể tải phiên bản mới nhất tại:
### https://jquery.com/

Sau đó tất nhiên là jQuery Validation:
### https://jqueryvalidation.org

# 3. Sử dụng

Để sử dụng jQuery Validation các bạn cần phải biết qua phương thức " $(‘xxx’).validate() ”
!!! (xxx ở đây là tên class hoặc id )

Mình có cấu trúc html đơn giản như sau:

<b>Html</b>
<img align="center" src="/html.png" style="float:right"></img>

<b>jQuery</b>
<img align="center" src="/js.png" style="float:right"></img>

<i><b>Chắc đọc đến đây các bạn cũng đã hiểu được cách hoạt động của nó, nhưng mình vẫn cứ giải thích như sau:</b></i>

<p></p>

1. Phương thức "**validate()**" chấp nhận 1 đối số là **một đối tượng** có **2 thuộc tính** chính là “**rules**” và “**messages**”.
2. Trong đó, “**rules**” đại diện cho điều kiện xác thực như “**required**”(Không bỏ trống), “**min**”(Độ lớn tối thiểu)…và “**messages**” đại diện cho các thông báo lỗi mà chúng ta đã thấy ở ví dụ trên.
3. Và thuộc tính “**rules**” của chúng ta sẽ lại bao gồm các phần tử con cũng là **một đối tượng** với các thuộc tính bên trong nó chính là thuộc tính “**name**” bên trong các thẻ “**input**” của chúng ta.

# 4. Như vậy

Chúng ta đã hoàn tất được công việc “Validate” rồi đấy.
Các bạn có thể tìm hiểu thêm tại:
### https://jqueryvalidation.org
#### Hẹn gặp các bạn vào các bài viết sắp tới. See ya !!!

