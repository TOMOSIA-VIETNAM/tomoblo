---
title: "Dependency injection and dependency injection container in Laravel"
date: "2020-10-12"
published: true
tags:
  - php
  - laravel
---
###1. Định nghĩa
Dependency Injection(DI) là mô hình lập trình, cách tổ chức code sao cho các đoạn code khác nhau, các module khác nhau, các lớp khác nhau không phụ thuộc nhau một cách cứng nhắc, mà cần có một cơ chế thay đổi các thành phần phụ thuộc cả ở thời điểm chạy và thời điểm biên dịch.
###2. Lợi ích
Làm giảm sự phụ thuộc giữa các đối tượng.

Giúp viết Unit test dễ dàng hơn.

Giảm thiểu được boilerplate code vì việc khởi tạo dependency được làm bởi một component khác.

Mở rộng dự án dễ dàng hơn.

Giúp ích trong việc liên kết lỏng (loose coupling) giữa các thành phần trong dự án.

Dễ bảo trì, module hóa ứng dụng và mở rộng.
###3. Nhược điểm
Dependency Injection ẩn các dependency nên một số lỗi chỉ xảy ra khi chạy chương trình thay vì có thể phát hiện khi biên dịch chương trình.

Nó khá là phức tạp để học, và nếu dùng quá đà thì có thể dẫn tới một số vấn đề khác.

Có thể làm ảnh hưởng tới chức năng auto-complete hay Find references của một số IDE.

Ví dụ:
```php
class Config {
    private $username;
    private $password;
    public function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }
    public function getUsername(): string
    {
        return $this->username;
    }
    public function getPassword(): string
    {
        return $this->password;
    }
}
// C1. Không sử dụng DI
class Database
{
    private $config;
    public function __construct($username, $password) {
        $this->config = new Config($username, $password);
    }
    public function getConfig() {
        return $this->config;
    }
}
$database = new Database('tmpuser', 'tmppass');
var_dump($database->getConfig());
// C2. Sử dụng DI
class Database {
    private $config;
    public function __construct(Config $config) {
        $this->config = $config;
    }
    public function getConfig() {
        return $this->config;
    }
}
$config = new Config('tmpuser', 'tmppass');
$database = new Database($config);
var_dump($database->getConfig());
// C3. Sử dụng DI trong setter
class Database
{
    private $config;
    public function __construct() {
    }
    public function getConfig() {
        return $this->config;
    }
    public function setConfig(Config $config) {
        $this->config = $config;
    }
}
$config = new Config('tmpuser', 'tmppass');
$database = new Database();
$database->setConfig($config);
var_dump($database->getConfig());
// C4. Sử dụng DI thông qua Interface
interface DatabaseInterface {
    public function getConfig();
    public function setConfig(Config $config);
}
```
Trong cách 1 ở trên ta không sử dụng DI sẽ có một số vấn đề là ta phải khởi tạo Config ngay trong class Database, về logic thì không có gì để nói, nhưng về mở rộng và bảo trì code thì sẽ khó bởi:

Database và Config class đang bị gắn vào nhau, nếu Config có sự thay đổi(về tham số khởi tạo chẳng hạn) thì sẽ kéo theo sự thay đổi của Database và những class liên quan tới Config.

Database biết nhiều thứ của Config quá, mà cái gì quá cũng không tốt.

Với cách thứ 2 thì Database không phụ thuộc vào Config nữa, mà được truyền thẳng đối tượng Config thông qua hàm khởi tạo, như vậy sẽ giải quyết được vấn đề ở cách 1 thực hiện.
###4. Các kiểu Dependency Injection
###4.1. Constructor Injection
Ở cách thứ 2 chính là sử dụng kiểu Constructor Injection, với cách này có một số đặc điểm là giảm sự phụ thuộc, giảm sự phức tạp từ Config và linh hoạt trong việc mở rộng và thay đổi từ Config.
###4.2. Setter Injection
Ở cách thứ 3 là sử dụng kiểu Setter Injection. Như vậy ta cũng không cần làm thay đổi logic trong code mà chỉ đơn giản khai báo trong setter, đôi khi chúng ta cũng cần một giá trị mặc định gì đó cho Config thì có thể triển khai trong setter này.
###4.3. Interface Injection
Sử dụng như trong cách thứ 4. Khi Database cần triển khai thì cần implements DatabaseInterface và cần cung cấp đối tượng Config thông qua setConfig.
##5. Dependency Injection Container
<code>Khi đối tượng phụ thuộc quá lớn thì sao?</code>

Lúc này giải pháp đưa ra là cần tạo một thùng chứa chuyên quản lý tất cả các đối tượng độc lập, từ autoload, khởi tạo, thiết lập và cài cắm vào đối tượng khác. Dependency Injection Container được ra đời.
Trong Laravel có một công cụ rất mạnh đó là Service Container, nó quản lý các dependencies và thực hiện xử lý dependency injection. Các bạn có thể tham khảo thêm trong [tài liệu của Laravel.](https://laravel.com/docs/8.x/container)
##6. Tạm kết
Vậy trách nhiệm của dependency injection là:

- Tạo ra các object.
- Biết được class nào cần những object đấy.
- Cung cấp cho những class đó những object chúng cần.

Bằng cách này, nếu trong tương lai object đó có sự thay đổi thì dependency injection có nhiệm vụ cấp lại những object cần thiết cho class.

--- Cảm ơn mọi người đã đọc bài viết của mình. Chúc một ngày vui vẻ!!! ---

######                    *<div style="text-align: right"> - by Anh Lee </div>*
