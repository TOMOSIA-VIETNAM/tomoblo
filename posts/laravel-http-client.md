---
title: "Laravel Http Client"
date: "2021-04-07"
published: true
tags:
  - php
  - laravel
---
[[snippet]]
| Laravel http client allowing you to quickly make outgoing HTTP requests to communicate with other web applications.

Bài viết này mình sẽ giới thiệu về http client phiên bản laravel 8, dùng để tạo HTTP request giúp các web application giao tiếp với nhau.

## 1. Http là gì?
HTTP (Hyper Text Transfer Protocol) là một giao thức truyền siêu văn bản (text, image, sound bar, video…) nằm ở tầng ứng dụng (Application layer) của tập giao thức TCP/IP, sử dụng để truyền nhận dữ liệu giữa các hệ thống phân tán thông qua internet, cụ thể giao thức hoạt động theo mô hình Client-Server bằng cách thực hiện các quá trình request-response giữa các hệ thống máy tính khác nhau. Giao thức HTTP quy định cấu trúc của các gói tin và cách thức truyền nhận dữ liệu giữa client và server thông qua môi trường internet. HTTP hiện là nền tảng truyền dẫn dữ liệu của ứng dụng duyệt web hiện nay.

## 2. Http client là gì
Khi ta truy cập một website và tương tác với các thành phần của website để gửi thông tin thì bản chất của việc đó là browser thay ta gửi đi các HTTP requests. Khi đó browser mà chúng ta đang dùng đóng vai trò một HTTP client.Bất kỳ phần mềm nào có thể gửi HTTP request và nhận được response từ HTTP server thì đều là HTTP client cả.

## 3. Create http client với PHP
Guzzle là một PHP HTTP client giúp gửi các HTTP request giao tiếp với các web application khác trở lên đơn giản.

## 4. Laravel HTTP client
Laravel http client sử dụng Guzzle http client giúp việc gửi http request để giao tiếp với các ứng dụng web khác đơn giản dễ dàng. Trước khi sử dụng cần chắc chắn rằng bạn đã cài Guzzle package như để 1 dependency của ứng dụng. Ở các phiên bản laravel mới mặc định package này đã được cài sẵn.

## 5. Tạo Http request với Laravel http client
Để tạo http request có thể sử dụng các phương thức, get, post, put, patch, delete được cung cấp sẵn bởi http facade

### 1. Http get request
Tạo get request đến trang http://example.com

```php
use Illuminate\Support\Facades\Http;
 
$response = Http::get('http://example.com');
```

Tạo get request kèm theo query string, giống như truy cập đến trang http://example.com/users?name=huunv&page=1

```php
$response = Http::get('http://example.com/users', [
    'name' => 'Huunv',
    'page' => 1,
]);
```

### 2. Http post request
Sử dụng method post của facade http, dữ liệu gửi lên là một mảng truyền vào ở đối số thứ 2 của hàm, mặc định dữ liệu sẽ gửi theo application/json content type.

```php
use Illuminate\Support\Facades\Http;

$response = Http::post('http://example.com/users', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);
```
Tạo Form URL Encoded Requests, gửi dữ liệu application/x-www-form-urlencoded content type.
```php
$response = Http::asForm()->post('http://example.com/users', [
    'name' => 'Sara',
    'role' => 'Privacy Consultant',
]);
```

### 3. Http put, patch request
```php
$response = Http::put('http://example.com/users/1', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);
$response = Http::patch('http://example.com/users/1', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);
```

### 4. Http delete request
```php
$response = Http::delete('http://example.com/users/1');
```

### 5. Add header to http request
```php
$response = Http::withHeaders([
    'X-First' => 'foo',
    'X-Second' => 'bar'
])->post('http://example.com/users', [
    'name' => 'Taylor',
]);
```

### 6. Create http request với authentication
Basic authentication...
```php
$response = Http::withBasicAuth('taylor@laravel.com', 'secret')->post(...);
```

Digest authentication...
```php
$response = Http::withDigestAuth('taylor@laravel.com', 'secret')->post(...);
```

Authentication with beaer token
```php
$response = Http::withToken('token')->post(...);
```

### 7. Set timeout http request
```php
$response = Http::timeout(3)->get(...);
```

### 8. Guzzle Options
```php
$response = Http::withOptions([
    'debug' => true,
])->get('http://example.com/users');
```

### 9. Dumping Requests
```php
return Http::dd()->get('http://example.com');
```

### 10. Http response
```php
// Convert response from http request to string
$response->body() : string;
// Convert response from http request to array
$response->json() : array|mixed;
// Convert response from http request to collection
$response->collect() : Illuminate\Support\Collection;
// Status code of response
$response->status() : int;
// Status code of response = 200
$response->ok() : bool;
// Status code of response >=200 and < 300
$response->successful() : bool;
// Status code of response >=400
$response->failed() : bool;
// Status code of response >=500
$response->serverError() : bool;
// Status code of response >=400 and < 500
$response->clientError() : bool;
// The header from the response
$response->header($header) : string;
// The headers from the response
$response->headers() : array;
```

## Lời kết
Cảm ơn mọi người đã dành thời gian đọc bài viết của mình. Hi vọng bài viết giúp ích được cho mọi người khi làm các tính năng liên quan đến việc giao tiếp giữa các web application với nhau.

[[author | Huunv ]]
