---
title: "Tạo mã QR trong Framework Laravel"
date: "2020-08-02"
published: true
tags:
  - php
---
Chúng ta biết rằng `Mã QR` là nhãn hiệu cho một loại mã vạch ma trận (hoặc mã vạch hai chiều) và thường được sử dụng để lưu trữ URL hoặc thông tin khác được đọc bằng camera trên điện thoại thông minh hay các loại máy có chức năng quét mã khác. Mã QR có thể chứa 3248 bit hoặc 406 byte. 

Tìm hiểu thêm `Mã QR` qua bài viết của này để hiểu rõ hơn [ QR Code Generator](https://www.qr-code-generator.com/qr-code-marketing/qr-codes-basics/)

Trong hướng dẫn này, chúng ta sẽ tạo `Mã QR` trong [Framework Laravel](https://laravel.com/) .
## Mã QR trong Framework Laravel

Trong laravel tôi tìm thấy nhiều package để render mã QR. Tuy nhiên tôi đã tìm thấy một package thực sự tốt đó là  [simple-qrcode](https://github.com/SimpleSoftwareIO/simple-qrcode)
Ở bài viết này tôi xin giới thiệu cho các bạn về version 3 của package này !

Tài liệu tham khảo : [Simple QrCode](https://www.simplesoftware.io/#/docs/simple-qrcode)

## Cài đặt và cách sử dụng QR Code

Chúng ta làm theo những bước sau :
1.  [Cài đặt Laravel](#bước-1-cài-đặt-laravel)
2.  [Cài đặt gói và cấu hình](#bước-2-cài-đặt-gói-và-cấu-hình)
3.  [Cách sử dụng cơ bản](#bước-3-cách-sử-dụng-cơ-bản)
4.  [Tạo lộ trình (Route)](#bước-4-tạo-lộ-trình--route-)
5.  [Tạo trong tập tin Blade](#bước-5-tạo-trong-tập-tin-blade)
6.  [Sử dụng nâng cao](#bước-6-sử-dụng-nâng-cao)

### Bước 1: Cài đặt Laravel
- Chuyển đến thư mục dự án của bạn (đối với xampp, chuyển đến thư mục htdocs) và viết lệnh này trong thiết bị đầu cuối của bạn để tạo dự án.
```
composer create-project --prefer-dist laravel/laravel qr-code
```

### Bước 2: Cài đặt gói và cấu hình

Đầu tiên, thêm Simple QrCode package vào require trong file `composer.json` của bạn:

```
"require": { 
 ...
 "simplesoftwareio/simple-qrcode": "^3.0"
}
```

sau đó, run command

`composer update`

hoặc bạn có thể dùng command sau để thay thế cách trên:

`composer require simplesoftwareio/simple-qrcode`

Đối với phiên bản Laravel <= 5.4 ta cấu hình `Service Provider`, trong file `config/app.php` ta đăng kí trong mảng `providers` :

```
'providers' => [
 ...
 SimpleSoftwareIO\QrCode\ServiceProvider::class
]
```

và thêm Aliases ở trong mảng `aliases` :

``` 
'aliases' => [
 ...
 'QrCode' => SimpleSoftwareIO\QrCode\Facade::class
]
```

run `composer dump-autoload` để reload lại composer auto load cache.

### Bước 3: Cách sử dụng cơ bản    
- Chúng ta đã cài đặt thành công Mã QR trong ứng dụng Laravel của mình. Chúng ta hãy xem một số cách sử dụng cơ bản. Cú pháp cơ bản là:

```
QrCode::size(100)->generate('Tomosia');
```

- **Kích thước** : Chúng ta có thể thay đổi kích thước của hình ảnh mã QR.

```
QrCode::size(300)->generate('Tomosia');
```

- **Màu sắc** : Chúng ta cũng có thể thiết lập màu nền.

```
QrCode::size(250)->backgroundColor(255,255,204)->generate('Tomosia');
```

<center>
<img src="https://cdn.mynotepaper.com/wp-content/uploads/2019/03/22144106/color_qr_code.png" alt="" class="wp-image-1652">
<p>
<code>Mã QR đầy màu sắc</code>
</p>
</center>
<center>  
<i>  
Nguồn từ:  
<a href="https://cdn.mynotepaper.com/" target="_blank">https://cdn.mynotepaper.com</a>  
</i>  
</center>

### Bước 4: Tạo lộ trình ( Route )

Trong bước này đầu tiên ta tạo route `qrcode` với method `GET`. Sao chép và dán mã này vào trong tệp `routes/web.php` :

```
<?php
...
Route::get('qrcode', function () {
    return QrCode::size(250)
        ->backgroundColor(255, 255, 204)
        ->generate('Tomosia');
});

```

Bây giờ hãy chạy ứng dụng của bạn và truy cập URL để xem Mã QR.

```
// run application
php artisan serve

// visit the route
http://localhost:8000/qrcode
``` 

### Bước 5: Tạo trong tập tin Blade

Chúng ta có thể dễ dàng tạo Mã QR trong file `blade`. Định dạng là:
```
{!! QrCode::generate('Tomosia'); !!}
```
Hãy xem một ví dụ:

Tạo một route:
```
Route::get('qrcode_blade', function () {
    return view('qr_code');
});
```
Bây giờ tạo một file `blade` trong thư mục **resources** có tên `qr_code_blade.php`.
```
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Laravel QR Code Example</title>
</head>
<body>

<div class="text-center" style="margin-top: 50px;">
    <h3>Laravel QR Code Example</h3>

    {!! QrCode::size(300)->generate('Tomosia'); !!}

    <p>Tomosia</p>
</div>

</body>
</html>
```
Hãy xem kết qủa bằng cách truy cập route từ trình duyệt:
<center>
<img src="https://images.viblo.asia/0998d669-0b87-405f-83ca-956971bf3476.png" alt="">
<p>
<code>Mã QR hiển thị ở trình duyệt</code>
</p>
</center>
<center>  
<i>  
Nguồn từ:  
<a href="https://images.viblo.asia" target="_blank">https://images.viblo.asia</a>  
</i>  
</center>

>  Lưu ý : Trong quá trình quét mã thì nếu mã QR bạn để background màu đen thì mã QR sẽ có khả năng bị lỗi.

### Bước 6: Sử dụng nâng cao
- **Xem mã QR mà không cần lưu** : Bạn có thể hiển thị hình ảnh PNG mà không lưu tệp bằng cách cung cấp chuỗi thô và mã hóa `base64_encode`.

```
<img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(100)->generate('Make me into an QrCode!')) !!} ">
```

- **Định dạng** : Thông thường tạo (); Chức năng trả về hình ảnh svg. 
- Có một số định dạng khác :

``` 
QrCode::format('png'); //Returns a PNG image

QrCode::format('eps');  //Returns a EPS image

QrCode::format('svg');  //Returns a SVG image
```

- **Mã hóa** : Chúng ta cũng có thể thiết lập mã hóa ký tự:
```
QrCode::encoding('UTF-8')->generate('QR code with special symbols ♠♥!!');
```

- **Margin** : Đặt lề theo cách tùy chỉnh này:
```
QrCode::margin(10)->generate('Tomosia');
```

- **Bitcoin** : Với sự trợ giúp của chức năng trợ giúp này, chúng ta có thể gửi thanh toán khi được quét.

```
QrCode::BTC($address, $amount);

//Sends a 0.334BTC payment to the address
QrCode::BTC('bitcoin address', 0.334);

//Sends a 0.334BTC payment to the address with some optional arguments
QrCode::size(500)->BTC('address', 0.0034, [
    'label' => 'my label',
    'message' => 'my message',
    'returnAddress' => 'https://www.returnaddress.com'
]);
```

- **Tin nhắn văn bản** : Chúng ta có thể viết sms bằng mã QR.

```
QrCode::SMS($phoneNumber, $message);

//Creates a text message with the number filled in.
QrCode::SMS('555-555-5555');

//Creates a text message with the number and message filled in.
QrCode::SMS('555-555-5555', 'Body of the message');
```

- **Số điện thoại di động** : Quay số điện thoại di động từ mã QR được quét.

```
QrCode::phoneNumber($phoneNumber);

QrCode::phoneNumber('555-555-5555');

QrCode::phoneNumber('1-800-Laravel');
```

- **Email** : Chúng ta cũng có thể tự động điền vào `email`, `subject` và `body`khi quét mã QR:

```
QrCode::email($to, $subject, $body);

//Fills in the to address
QrCode::email('foo@bar.com');

//Fills in the to address, subject, and body of an e-mail.
QrCode::email('foo@bar.com', 'This is the subject.', 'This is the message body.');

//Fills in just the subject and body of an e-mail.
QrCode::email(null, 'This is the subject.', 'This is the message body.');
```

- **Vị trí địa lý** : Truyền kinh độ và vĩ độ thông qua mã QR:

```
QrCode::geo($latitude, $longitude);

QrCode::geo(37.822214, -122.481769);
```

- **Kết nối với WiFi** : Dễ dàng kết nối với WiFi từ mã QR được quét.

```
QrCode::wiFi([
	'encryption' => 'WPA/WEP',
	'ssid' => 'SSID of the network',
	'password' => 'Password of the network',
	'hidden' => 'Whether the network is a hidden SSID or not.'
]);

//Connects to an open WiFi network.
QrCode::wiFi([
	'ssid' => 'Network Name',
]);

//Connects to an open, hidden WiFi network.
QrCode::wiFi([
	'ssid' => 'Network Name',
	'hidden' => 'true'
]);

//Connects to an secured, WiFi network.
QrCode::wiFi([
	'ssid' => 'Network Name',
	'encryption' => 'WPA',
	'password' => 'myPassword'
]);
```

- **Vị trí hình ảnh** : Chúng ta có thể đặt một hình ảnh bên trong mã QR.

```
$image = QrCode::format('png')
    ->merge('folder/image.png', 0.5, true)
    ->size(500)->errorCorrection('H')
    ->generate('MyNotePaper');

return response($image)->header('Content-type','image/png');
``` 

Với sự trợ giúp của gói này, việc tạo Mã QR rất dễ dàng. Tôi hy vọng bài viết này sẽ giúp ích cho bạn.
