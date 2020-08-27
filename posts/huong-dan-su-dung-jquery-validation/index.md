
---
title: "[jQuery] How to use jQuery Validation"
date: "2020-08-24"
published: true
tags:
  - html
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
4. Rất đơn giản phải không nào? “**messages**” cũng sẽ tương tự “**rules**” và nếu bạn tinh ý sẽ nhận ra là kể cả điều kiện bên trong nó như “required”, “**minlength**” cũng sẽ tương đồng với bên “**messages**”. Hai cái chỉ khác nhau về công việc mà thôi.
5. Như vậy, chúng ta đã hoàn tất được công việc “**Validate**” rồi đấy.

# 4. Lưu ý
## Thông thường cần validate những gì?
Mỗi ứng dụng có những loại dữ liệu khác nhau nên việc liệt kê ra hết là điều không thể, chính vì vậy trong bài này mình chỉ đưa ra một số loại dữ liệu mà ta thường validate nhé.

-   Kiểm tra dữ liệu không được rỗng
-   Kiểm tra có phải đúng định dạng email
-   Kiểm tra có phải đúng định dạng URL
-   Kiểm tra có phải đúng định dạng hình ảnh
-   Kiểm tra có phải đúng định dạng số điện thoại
-   ... ngoài ra còn nhiều trường hợp và phụ thuôc vào dư án.

Cách thông thường nhất là chúng ta sử dụng  **RegEx**  để kiểm tra định dạng dữ liệu.

## Một số điều kiện để kiểm tra các phần tử của form bằng jQuery Validation :

required - *Không được bỏ trống*

remote - *Gửi yêu cầu về Web Server để xác thực*

minlength - *Độ dài tối thiểu*

maxlength - *Độ dài tối đa*

rangelength - *Độ dài tối thiểu từ x tới y*

min - *Số tối thiểu*

max - *Số tối đa*

range - *Số tối thiểu từ x tới y*

email - *Xác thực định dạng Email*

url - *Xác thực định dạng URL*

date - *Xác thực định dạng ngày tháng*

dateISO - *Xác thực định dạng ngày tháng theo chuẩn ISO*

number - *Phải là số, bao gồm số thập phân*

digits - *Chỉ chấp nhận số nguyên dương*

creditcard - *Xác thực số thẻ tín dụng*

equalTo - *Phải trùng với phần tử nào đó*

# 5. Như vậy

Chúng ta đã hoàn tất được công việc “Validate” rồi đấy.
Các bạn có thể tìm hiểu thêm tại:
### https://jqueryvalidation.org
#### Hẹn gặp các bạn vào các bài viết sắp tới. See ya !!!

