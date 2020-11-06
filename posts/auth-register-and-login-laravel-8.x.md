---
title: "Authenticate Laravel 8.x basic (Register and Login)"
date: "2020-11-06"
published: true
tags:
  - php
  - laravel
---
Xin chào các bạn! Hiện tại Laravel đã update version lên Laravel 8.x. Vậy nên mình muốn giới thiệu một thay đổi tuy cơ bản nhưng vô cùng đặc biệt tại phiên bản này. Đó là authentication basic, chúng ta cùng tìm hiểu xem nó khác gì so với các phiên bản trước nhé!

# Bước 1: Cài đặt project Laravel 8.x
- Chạy câu lệnh cài đặt project laravel:
```bash
composer create-project laravel/laravel projectLaravel --prefer-dist
```
Tuy nhiên nếu bạn muốn cài đặt đồng thời Jetstream thì hãy bổ sung --jet vào sau tên project laravel của bạn trong câu lệnh trên `--jet`. VD: 
```bash
composer create-project laravel/laravel projectLaravel --jet --prefer-dist
```
Hoặc bạn có thể cài đặt project laravel xong sau đó chạy câu lệnh `composer require laravel/jetstream` để cài đặt Jetstream sau.
# Bước 2: Setup Database
- Bạn hãy tạo 1 database mysql bất kỳ sau đó mở file `.env` lên và cấu hình kết nối project tới database:
<img src="/posts/auth-basic-laravel-8.x/env.png" alt="env">

# Buớc 3: Migration
- chạy câu lệnh `php artisan migrate` để tạo các bảng ban đầu vào database
<img src="/posts/auth-basic-laravel-8.x/migration.png" alt="migration">

# Bước 4: Cài đặt Jetstream
- Chạy câu lệnh `composer require laravel/jetstream` để cài đặt, nếu bạn nào đã cài ở bước 1 thì bỏ qua bước này nhé
<img src="/posts/auth-basic-laravel-8.x/jetstream.png" alt="jetstream">

# Bước 5: Cài đặt Liveware hoặc Inertia
- Chạy câu lệnh `php artisan jetstream:install livewire` để cài đặt
<img src="/posts/auth-basic-laravel-8.x/liveware.png" alt="liveware">

- sau đó chạy câu lệnh `run npm install && npm run dev` để build các JS và CSS cho ứng dụng của bạn, thành công sẽ có thông báo:
<img src="/posts/auth-basic-laravel-8.x/npm-success.png" alt="liveware">

# Bước 6: Tiếp tục migrate các migration mới

```bash
php artisan migrate
```
<img src="/posts/auth-basic-laravel-8.x/migration-2.png" alt="liveware">

- Sau đó chạy ứng dụng `php artisan serve` 
<img src="/posts/auth-basic-laravel-8.x/serve.png" alt="liveware">

- Truy cập vào http://127.0.0.1:8000/ trên trình duyệt của bạn
<img src="/posts/auth-basic-laravel-8.x/laravel.png" alt="liveware">

# Bước 7: Test Feature

- Click vào register góc phải trên màn hình, điên đầy đủ thông tin để đăng ký 1 tài khoản
<img src="/posts/auth-basic-laravel-8.x/register.png" alt="liveware">

Sau khi đăng ký thành công, sẽ điều hướng bạn tới trang Dashboard:
<img src="/posts/auth-basic-laravel-8.x/dashboard.png" alt="liveware">

- Test thử tính năng login với tài khoản vừa tạo, logout tài khoản rồi click vào login sẽ thấy form login như sau:
<img src="/posts/auth-basic-laravel-8.x/login.png" alt="liveware">

Login thành công cũng đưa bạn đến trang Dashboard, click vào profile tại menu góc màn hình
<img src="/posts/auth-basic-laravel-8.x/login.png" alt="liveware">

Tại đây chúng ta sẽ thấy phần cập nhật Profile:
  + Ảnh Profile (max: 1024KB)
  + Sửa tên, email.
  + Đổi mật khẩu
  + Bật bảo mật 2 lớp
  + Browse sessions
  + Xoá tài khoản, bạn cần setup mail để confirm việc này:

  <img src="/posts/auth-basic-laravel-8.x/mail.png"> 

  Nhập email để confirm:
  <img src="/posts/auth-basic-laravel-8.x/input-mail.png"> 

  Sau đó sẽ có 1 mail gửi về cho bạn để hoàn thành thao tác này:
  <img src="/posts/auth-basic-laravel-8.x/confirm-mail.png"> 

## Kết luận
- Chúng ta đã tim hiểu sơ bộ về sự thay đổi của Authentication Laravel tại version 8.x. Sự thay đổi này của Laravel 8.x rất hợp lý và tích hợp + hỗ trợ thêm rất nhiều cho authentication so với các phiên bản trước, vẫn đảm bảo được việc dễ dàng cài đặt và sử dụng cho develop.

## Tài liệu tham khảo
[https://laravel.com/docs/8.x/authentication](https://laravel.com/docs/8.x/authentication)

*by Ngọc Quân - Tomosia Việt Nam*
