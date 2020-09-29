

---
title: "What is PHP ?"
date: "2020-09-29"
published: true
tags:
  - html
  - php
---
# 1. PHP là gì ?

### PHP viết hồi qui của "PHP: Hypertext Preprocessor".

- PHP khởi đầu như là một dự án mã nguồn mở nhỏ, nhưng theo đà phát triển, ngày càng nhiều người thấy rằng nó càng ngày càng hữu ích. PHP được phát triển từ một sản phẩm có tên là PHP/FI. 
- PHP/FI do Rasmus Lerdorf tạo ra năm 1994, ban đầu được xem như là một tập con đơn giản của các mã kịch bản Perl để theo dõi tình hình truy cập đến bản sơ yếu lý lịch của ông trên mạng. 
- Ông đã đặt tên cho bộ mã kịch bản này là <i>"Personal Home Page Tools"</i>. Khi cần đến các chức năng rộng hơn, Rasmus đã viết ra một bộ thực thi bằng C lớn hơn để có thể truy vấn tới Database và giúp cho người sử dụng phát triển các ứng dụng web đơn giản. 
- Rasmus đã quyết định công bố mã nguồn của PHP/FI cho mọi người xem, sử dụng cũng như sửa các lỗi có trong nó, đồng thời cải tiến mã nguồn.
- PHP là ngôn ngữ lập trình kịch bản viết cho máy chủ mà được nhúng trong HTML. Nó được sử dụng để quản lý nội dụng động, Database, Session tracking, …
    
-   <i>Nó được tích hợp với một số Database thông dụng như MySQL, PostgreSQL, Oracle, Sybase, Informix, và Microsoft SQL Server.</i>
    
-   PHP thực thi rất tuyệt vời, đặc biệt khi được biên dịch như là một Apache Module trên Unix side. MySQL Server, khi được khởi động, thực thi các truy vấn phức tạp với các tập hợp kết quả khổng lồ trong thời gian Record-setting.
    
-   PHP hỗ trợ một số lượng rộng rãi các giao thức lớn như POP3, IMAP, và LDAP. PHP4 bổ sung sự hỗ trợ cho Java và các cấu trúc đối tượng phân phối (COM và CORBA).
    
-   <i>Cú pháp PHP là giống C</i>.

# 2. PHP có thể làm gì ?


-   PHP thực hiện các hàm hệ thống, ví dụ: từ các file trên một hệ thống, nó có thể tạo, mở, đọc, ghi và đóng chúng.
    
-   PHP có thể xử lý các form, ví dụ: thu thập dữ liệu từ file, lưu dữ liệu vào một file, thông qua email bạn có thể gửi dữ liệu, trả về dữ liệu tới người dùng.
    
-   Bạn có thể thêm, xóa, sửa đổi các phần tử bên trong Database của bạn thông qua PHP.
    
-   Truy cập các biến Cookie và thiết lập Cookie.
    
-   Sử dụng PHP, bạn có thể hạn chế người dùng truy cập vào một số trang trong Website của bạn.
    
-   <i>Nó có thể mật mã hóa dữ liệu.</i>


# 3. Đặc trưng của PHP là gì ?


5 đặc trưng quan trọng làm PHP trở thành ngôn ngữ khá tiện lợi:

-   Đơn giản hóa
-   Hiệu quả
-   Bảo mật cao
-   Linh động
-   Thân thiện


# 4. Làm quen với PHP


- Để dần làm quen với PHP, chúng ta khởi đầu với PHP script đơn giản. Chúng ta sẽ bắt đầu với ví dụ đầu tiên về PHP là "Hello, World" script.

- Như đã đề cập trước đó, PHP được nhúng trong HTML. Nghĩa là, bên trong HTML (hoặc XHTML) bạn sẽ có thể có các lệnh PHP như sau:
```
<html>  
<head>
<title>Tomosia</title> 
</head> 
<body> 
    <?php echo "Hello World!";?> 
</body> 
</html>
```


# 5. Cài đặt web server


### Ở đây mình sẽ giới thiệu các bạn sử dụng xampp 

**Bước 1:** Download XAMPP tại [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html) và tiến hành cài đặt như các chương trình thông thường.

**Bước 2:** Start Apache và MySQL trong XAMPP control panel

<img align="center" src="/cai-dat-xampp.jpg" style="float:right"></img>

**Bước 3:** Gõ vào trình duyệt địa chỉ localhost. Nếu hiện ra màn hình sau thì việc cài đặt đã thành công.

<img align="center" src="/cai-dat-xampp-2.jpg" style="float:right"></img>

**Bước 4:** Vào thư mục cài đặt XAMPP/htdocs và tiến hành tạo file **test.php** với nội dung như mục 4

<img align="center" src="/cai-dat-xampp-3.jpg" style="float:right"></img>

<i>Gõ trên trình duyệt địa chỉ localhost/test.php. Nếu hiện ra dòng chữ Hello World nghĩa là ứng dụng PHP đầu tiên đã chạy thành công.</i>

# 6. Như vậy

Chúng ta đã có hiểu biết cơ bản về  “PHP” rồi đấy.

#### <i>Hẹn gặp các bạn vào các bài viết sắp tới. See ya !!!</i>

