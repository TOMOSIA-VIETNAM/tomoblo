---
title: "What’s New in PHP 8.0"
date: "2021-02-22"
published: true
tags:
  - php
---

PHP 8.0 đã chính thức được phát hành vào ngày 26 tháng 11 năm 2020!

Bản cập nhật lớn mới này mang lại nhiều tối ưu hóa và các tính năng mạnh mẽ. PHP 8.0 là một bản cập nhật lớn và là một cột mốc đáng chú ý trong PHP, vì nó mang đến một số tính năng mới trong hệ thống, cú pháp, xử lý lỗi, chuỗi, lập trình hướng đối tượng, v.v.

# I. Major New Features
## Named Parameters
PHP 8.0 cho phép các tham số được đặt tên trong các function/method.

Các đối số được đặt tên cho phép bạn chuyển các giá trị vào một hàm, bằng cách chỉ định tên giá trị, do đó bạn không phải xem xét thứ tự của chúng và bạn cũng có thể bỏ qua các tham số tùy chọn!
```php
#Ex1:
str_contains(needle: 'Bar', haystack: 'Foobar');
#Ex2:
function foo(string $a, string $b, ?string $c = null, ?string $d = null) 
{ /* … */ }

foo(
    b: 'value b', 
    a: 'value a', 
    d: 'value d',
);
```
Điều này làm cho tên tham số function/method trở thành một phần của API công khai. Đối số DocBlock @no-named-arguments thể hiện rằng thư viện không cung cấp khả năng tương thích ngược cho các tham số được đặt tên.

## Attributes
Các thuộc tính cho phép khai báo siêu dữ liệu cho các hàm, lớp, thuộc tính và tham số. Các thuộc tính ánh xạ đến tên lớp PHP (được khai báo bằng chính thuộc tính của nó) và chúng có thể được tìm và nạp theo chương trình.
```php
/*** PHP 7 ***/
class PostsController
{
    /**
     * @Route("/api/posts/{id}", methods={"GET"})
     */
    public function get($id) { /* ... */ }
}

/*** PHP 8 ***/
class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}
```
Attributes tạo nên sự dễ dàng và hiệu quả khi khai báo Attributes. Thay vì chú thích PHPDoc, giờ đây bạn có thể sử dụng siêu dữ liệu có cấu trúc với cú pháp gốc của PHP.

## Constructor Properties

Một cú pháp mới để khai báo các thuộc tính của lớp ngay từ phương thức khởi tạo lớp (__construct magic method).

```php
class User {
    public function __construct(private string $name) {}
}
```
Trong hàm tạo, PHP 8.0 hỗ trợ khai báo phạm vi (public, private, hoặc protected) và kiểu. Các thuộc tính đó sẽ được đăng ký dưới dạng các thuộc tính lớp có cùng khả năng hiển thị và kiểu mà chúng được khai báo trong hàm tạo.

Tiết kiệm viết mã hơn để xác định và khởi tạo thuộc tính.

## Union Types

Union Types mở rộng khai báo kiểu (kiểu trả về, tham số và thuộc tính lớp) để khai báo nhiều hơn một kiểu.
```php
function parse_value(string|int|float): string|null {}
```
Nó cũng hỗ trợ false như một kiểu đặc biệt (đối với Boolean false), một đặc điểm phổ biến trong mã kế thừa không sử dụng Exceptions.

## Null-safe Operator
Toán tử Null-safe cung cấp sự an toàn trong chuỗi method/property khi giá trị trả về hoặc thuộc tính có thể là rỗng.
```php
return $user->getAddress()?->getCountry()?->isoCode;
```

```?->``` sẽ làm ngắn mạch phần còn lại của biểu thức nếu nó gặp giá trị null và ngay lập tức trả về null mà không gây ra bất kỳ lỗi nào.

## Match expressions
Match expressions tương tự như ```switch```, nhưng ```match``` cung cấp so sánh an toàn về kiểu, hỗ trợ giá trị trả về, không yêu cầu câu lệnh ```break``` và hỗ trợ nhiều giá trị so khớp. nó cũng đảm bảo rằng ít nhất một nhánh được khớp, đảm bảo tất cả các trường hợp được tính toán.
```php
$response = match('test') {
    'test' => $this->sendTestAlert(),
    'send' => $this->sendNuclearAlert(),
};
```
Không phải tất cả các ```switch``` đều có thể chuyển đổi tốt để ```switch``` với các khối. Mã yêu cầu khả năng tương thích ngược, các ```switch``` với nhiều câu lệnh (trái ngược với các biểu thức một dòng) hoặc mong đợi chức năng chuyển đổi vẫn phù hợp với các câu lệnh switch.

# II. Type System Improvements
## New mixed pseudo type
PHP 8.0 mang đến kiểu ```mixed```, vốn đã được sử dụng rộng rãi trong các bình luận DocBlock.
```php
function dd(mixed $var): void {
    var_dump($var);
}
```
```mixed``` có thể được sử dụng để chỉ ra rằng nó chấp nhận bất kỳ loại nào hoặc có thể trả về bất kỳ loại nào. Trong một class/interface, ```mixed``` tuân theo theo cùng các quy tắc của [Liskov Substitution Principle](https://php.watch/articles/php-lsp).

## static return type for class methods
kiểu trả về ```static```, đã được hỗ trợ dưới dạng kiểu trả về DocBlock, hiện được hỗ trợ trong PHP 8.0. Kiểu trả về ```static``` khai báo một đối tượng của lớp được gọi sẽ được trả về.
```php
class Foo {
    public static function getInstance(): static {
        return new static();
    }
}
```
# III. String-related changes
Trong PHP 8.0, có một số thay đổi nhỏ ban đầu có thể không rõ ràng, nhưng có thể dẫn đến kết quả khá bất ngờ.

Một sự khác biệt chính trong PHP 8.0 là, PHP hiện coi là có một chuỗi trống giữa mọi ký tự trong một chuỗi nhất định.

Trước PHP 8.0, không kiểm tra chuỗi trống (""), nhưng trong PHP 8.0, PHP sẽ vui vẻ chấp nhận nó và trả về rằng thực sự có một chuỗi trống giữa mỗi ký tự.

Việc xử lý multi-byte hoặc các function như strlen vẫn trả về các giá trị giống như các phiên bản cũ hơn, nhưng tất cả các hàm kiểm tra một chuỗi con trong một chuỗi nhất định đều bị thay đổi.

## substr, iconv_substr, grapheme_substr return empty string on out-of-bound offsets
Các hàm này trả về một chuỗi rỗng thay vì trả về false.
```php
substr('FooBar', 42, 3); // "" in PHP >=8.0, false in PHP < 8.0
mb_substr('FooBar', 42, 3); // "" in PHP >=8.0, false in PHP < 8.0
iconv_substr('FooBar', 42, 3); // "" in PHP >=8.0, false in PHP < 8.0
grapheme_substr('FooBar', 42, 3); // "" in PHP >=8.0, false in PHP < 8.0
```
## +/- operators take higher precedence when used with concat (.) operator
Khi các toán tử toán học + và - được sử dụng trong cùng một biểu thức với toán tử nối (.), Các toán tử + và - được ưu tiên cao hơn. Điều này dẫn đến thông báo không dùng nữa trong các phiên bản PHP trước 8.0, nhưng giờ đây nó diễn ra một cách âm thầm và theo cảnh báo.
```php
echo 35 + 7 . '.' . 0 + 5 // 42.5 in PHP >= 8.0
echo 35 + 7 . '.' . 0 + 5 // 47 in PHP <= 8.0
```
# IV. Tổng kết
Có nhiều thay đổi lớn đáng kể và sức mạnh tăng tiến. PHP đang không ngừng thay đổi, PHP core team và cộng đồng PHP vẫn đang nỗ lực từng ngày để làm cho PHP trở nên tốt hơn, đáp ứng nhu cầu trong thời kỳ mới tốt hơn.

Trên đây là một trong rất nhiều những thay đổi mà phiên bản PHP 8.0 mang lại, các bạn có thể tham khảo nhiều hơn về những thay đổi của PHP 8.0 trên trang chủ của họ tại [đây](https://www.php.net/releases/8.0/en.php).

Tham khảo ```https://php.watch/versions/8.0```

--- Cảm ơn mọi người đã đọc bài viết của mình. Chúc một ngày vui vẻ!!! ---

######                    *<div style="text-align: right"> - by Anh Lee </div>*