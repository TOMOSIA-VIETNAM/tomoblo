---
title: "Laravel Security Best Practices for Your Website"
date: "2020-11-08"
published: true
tags:
  - laravel
---
# I. Mở đầu
Laravel được biết đến là một framework PHP an toàn để tạo các trang web và ứng dụng. Những dự án có nhu cầu bảo mật cao thường chọn Laravel. Chúng ta sẽ xem xét các tính năng bảo mật chính mà Laravel sẽ hổ trợ để giúp đảm bảo an toàn cho ứng dụng web của chúng ta.
# II. Các tính năng bảo mật trong Laravel
Tính năng bảo mật của Laravel đảm bảo rằng các nhà phát triển hiện có thể sử dụng hầu như mọi khía cạnh của quy trình bảo mật an toàn. Hơn nữa, tất cả dữ liệu liên quan đến quy trình đều được kiểm tra ở bất kỳ đâu cần thiết, có nghĩa là nền tảng bảo vệ chống lại các lỗ hổng phổ biến.
+ Laravel Authentication System
+ Reduce Laravel Vulnerabilities From CSRF (Cross Site Request Forgery)
+ Protection against XSS (Cross Site Scripting)
+ SQL Injection
+ Improve Laravel Application Security
+ Laravel Security Packages

## 1. Laravel Authentication System
Laravel cung cấp sẵn một quy trình xác thực người dùng mạnh mẽ với mã bảng soạn sẵn liên quan có sẵn trong giàn giáo.

Laravel sử dụng `providers` và `guards` để tạo thuận lợi cho quá trình xác thực. Mục đích của `guards` là xác thực người dùng cho mỗi yêu cầu mà họ đưa ra, trong khi `providers` tạo điều kiện để truy xuất lại người dùng từ cơ sở dữ liệu.

Là một nhà phát triển, tất cả những gì bạn phải làm là thiết lập database, bộ điều khiển và mô hình. Trong quá trình này, các tính năng xác thực được tích hợp vào trong ứng dụng.
## 2. Reduce Laravel Vulnerabilities From CSRF (Cross Site Request Forgery)
Laravel thường sử dụng CSRF để đảm bảo rằng các bên thứ ba bên ngoài không thể tạo yêu cầu giả mạo và không vi phạm bảo mật của Laravel.

Đối với điều này, Laravel tự động tạo CSRF cho mỗi phiên người dùng đang hoạt động. Khi yêu cầu được gọi thì Laravel sẽ so sánh mã thông báo yêu cầu với mã thông báo đã lưu trước đó trong phiên của người dùng. Nếu mã thông báo không khớp thì yêu cầu được coi là không hợp lệ và nó chấm dứt thực thi. Ngoài ra, bất cứ khi nào bạn xác định một biểu mẫu HTML trong ứng dụng của mình, bạn phải cung cấp một trường CSRF ẩn để phần mềm trung gian bảo vệ CSRF sẽ xử lý phần còn lại.

Giả sử hệ thống của bạn có 1 action xóa tài khoản người dùng như sau:
```https://xyz.com/account/{id}/delete```
Nếu có một người nào biết được link này thì họ sẽ hack được, họ có thể gửi mail cho bạn chứa link, hoặc nội dung là một hay nhiều thẻ img với src chính là url đó và mỗi hình có id khác nhau kiểu như:
```php
<img height="0" width="0" src="https://xyz.com/account/{id}/delete">
```
Sử dụng CSRF token: Trong Laravel cung cấp cho bạn phòng tránh, bạn có thể thêm vào các Form:
```php
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```
## 3. Protection against XSS (Cross Site Scripting)
Cross-site scripting (XSS) cho phép những kẻ tấn công đưa các đoạn mã độc hại vào nội dung của các trang web đáng tin cậy. Các tập lệnh này đi cùng với nội dung động đến trình duyệt của người dùng và được thực thi ở đó. Bằng cách này, những kẻ tấn công lợi dụng các lỗ hổng trong trang web mà người dùng truy cập.

XSS là một đoạn mã độc, để khái thác một lỗ hổng XSS, hacker sẽ chèn mã độc thông qua các đoạn script để thực thi chúng ở phía Client. Mục đích chính của cuộc tấn công này là ăn cắp dữ liệu nhận dạng của người dùng như: cookies, session tokens và các thông tin khác.
Trong hầu hết các trường hợp, cuộc tấn công này đang được sử dụng để ăn cắp cookie của người khác. Như chúng ta biết, cookie giúp chúng tôi đăng nhập tự động. Do đó với cookie bị đánh cắp, chúng tôi có thể đăng nhập bằng các thông tin nhận dạng khác.

## 4. SQL Injection
SQL Injection (SQLi) là một kỹ thuật tấn công trong đó các câu lệnh SQL độc hại được chèn vào một dữ liệu đầu vào và được thực thi. Điều này cho phép những kẻ tấn công kiểm soát cơ sở dữ liệu. Họ có thể sửa đổi, đánh cắp hoặc xóa dữ liệu.

Laravel sử dụng Eloquent ORM (object relational mapper) không cho phép dữ liệu truy vấn độc hại đi qua các biểu mẫu của bạn. Do ràng buộc tham số PDO, Eloquent ORM thoát các lệnh SQL này và lưu các truy vấn không hợp lệ dưới dạng văn bản.

Hãy xem xét ví dụ về biểu mẫu được sử dụng để thu thập địa chỉ email của người dùng từ cơ sở dữ liệu. biểu mẫu sẽ tìm kiếm một địa chỉ email, ví dụ: “abc@example.com”. Bây giờ hãy tưởng tượng rằng truy vấn SQL được sửa đổi thành:
```sql
SELECT * FROM users WHERE email = 'abc@example.com' or 1=1;
```
Trong ví dụ trên, 1 = 1 là một biểu thức logic đơn giản luôn đúng.
Bây giờ hãy xem xét một ứng biến khác của cuộc tấn công, trong đó truy vấn được sửa đổi trực tiếp thành lệnh “drop table users” và thay vì địa chỉ email, “abc@example.com” được viết. Truy vấn sẽ giống như sau:
```sql
SELECT * FROM users WHERE email = 'abc@example.com'; drop table users;
```
Khi truy vấn này được thực thi, bảng “users” sẽ bị xóa khỏi cơ sở dữ liệu.
Khi ràng buộc tham số PDO được đặt, đầu vào nằm trong dấu ngoặc kép và truy vấn sẽ giống như sau:
```sql
SELECT * FROM users WHERE email = 'abc@example.com or 1=1';
```
Vì không có bản ghi nào khớp với email hoặc “1 = 1”, nên truy vấn sẽ không trả về bất kỳ thứ gì.

Laravel cung cấp các cách khác để nói chuyện với cơ sở dữ liệu, chẳng hạn như truy vấn SQL thô. Tuy nhiên, Eloquent vẫn là lựa chọn phổ biến nhất. Học cách sử dụng ORM vì nó giúp ngăn chặn các cuộc tấn công chèn vào SQL do các truy vấn SQL độc hại gây ra.
## 5. Improve Laravel Application Security
Nhờ các tính năng bảo mật Laravel có sẵn, framework này đã an toàn hơn nhiều so với các framework PHP khác. Tuy nhiên, có một số điều bạn có thể làm để làm cho project Laravel của bạn an toàn hơn. Một số điều này cho phép bạn làm cho ứng dụng của mình không gặp rủi ro khỏi tất cả các cuộc tấn công mã có thể xảy ra và tăng cường bảo mật của nó ở mức độ cao hơn.

Laravel sử dụng PDO để ngăn chặn các cuộc tấn công SQL injection vì không có biến nào được chuyển vào cơ sở dữ liệu mà không cần xác thực. Tuy nhiên, các nhà phát triển vẫn chọn SQL thô vì nhiều lý do.
Nếu trường hợp này xảy ra với bạn, bạn nên luôn sử dụng các truy vấn SQL được chuẩn bị kỹ lưỡng để ngăn ngừa rủi ro. Hãy xem xét câu lệnh sau để tránh SQL injection:
```sql
$email = "'abc@example.com' or 1=1";
// Truy vấn không an toàn
DB::raw("SELECT * FROM users WHERE email = $email");
// Truy vấn an toàn
DB::raw("SELECT * FROM users WHERE email = ?"), [$email]);
```
Laravel thay thế các dấu hỏi bằng biến truy vấn, tự động bỏ qua các biến đầu vào. Điều này bảo vệ hệ thống khỏi các cuộc tấn công SQL injection.
### 5.1. Force HTTPS
Khi bạn triển khai trang web của mình trên HTTP, tất cả dữ liệu được trao đổi bao gồm mật khẩu và những dữ liệu khác được gửi ở dạng nội dung thuần túy. Do đó có thể dễ dàng bị đánh cắp bởi bất kỳ ai giữa đường truyền. Vì vậy, để giữ an toàn cho thông tin này, hãy luôn triển khai các ứng dụng web của bạn trên HTTPS để bảo vệ thông tin nhạy cảm của nó.

Bạn chỉ cần thiết lập chứng chỉ SSL trên trang web của mình bằng cách nhận được sự hỗ trợ nhỏ từ bất kỳ nhà phát triển Laravel nào, những ứng dụng kia sẽ chuyển ứng dụng của bạn từ HTTP sang HTTPS một cách dễ dàng. Trong khi để ẩn các đường dẫn nhất định, bạn có thể sử dụng bộ lọc được xác định bên dưới sẽ chuyển hướng người dùng đến một đường dẫn an toàn.
```php
Route::filter('https', function() {
  if (!Request::secure()) {
    return Redirect::secure(URI::current());
  }
})
```
### 5.2. Escape Content to Prevent XSS
Để tránh các cuộc tấn công XSS, bạn nên sử dụng cú pháp dấu ngoặc kép:```{{ $variable }}```

Chỉ sử dụng cái này ```{!! $variable !!} ``` khi bạn chắc chắn rằng dữ liệu trong biến được hiển thị an toàn hơn.
### 5.3. Use Laravel Purifier
Dấu ngoặc nhọn kép trong Laravel đảm bảo rằng không có HTML thô nào được cung cấp cho khách hàng, tuy nhiên, nếu bạn muốn cung cấp một số biến HTML cho khách hàng từ cơ sở dữ liệu của mình, thì bạn có thể sử dụng HTML Purifier, một công cụ được cập nhật toàn diện sẽ nâng cấp mã của bạn và sẽ xử lý các mã HTML bị bỏ sót và bị thiếu.
## 6. Laravel Security Packages
Laravel cung cấp một số packages để tăng cường bảo mật cho các ứng dụng của bạn. Dưới đây là các package bảo mật phổ biến nhất cho Laravel:
### 6.1. Laravel Security Component
Laravel Security Component chủ yếu cung cấp bảo mật cho các roles/objects và tích hợp lõi bảo mật Symfony trong Laravel. Nó sử dụng cử tri để kiểm tra các đặc quyền dựa trên các vai trò khác nhau, vì vậy có thể xác nhận tính bảo mật của nó.
### 6.2. Laravel Security
Laravel Security là một trong những package được sử dụng thường xuyên nhất và được biết đến với việc loại bỏ các lỗ hổng XSS trong codebase. Nó đã được chuyển từ Codeigniter 3 sang Laravel 5.
### 6.3. Laravel-ACL
Laravel-ACL cung cấp các quyền được bảo mật dựa trên vai trò cho quá trình xác thực Laravel. Package này giúp bảo vệ các route và phương pháp điều khiển CRUD trong các ứng dụng.
# III. Tổng kết
Đây là các tính năng bảo mật quan trọng nhất của Laravel. Hy vọng mọi người nhớ tất cả các tính năng này và áp dụng trên ứng dụng trong các dự án với Laravel tiếp theo để giúp bảo vệ trang web của mình.

--- Cảm ơn mọi người đã đọc bài viết của mình. Chúc một ngày vui vẻ!!! ---

######                    *<div style="text-align: right"> - by Anh Lee </div>*