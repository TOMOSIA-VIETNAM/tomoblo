---
title: "What's new in PHP 7.4?"
date: "2020-10-14"
published: true
tags:
  - php
  - php7.4
---

# Có gì mới ở PHP 7.4?


Từ năm 2016, PHP7 đã được nâng cấp hằng năm. Mỗi năm nó đều có tính năng mới, và có tính năng giúp viết code gọn hơn, khiến cho ngôn ngữ lập trình thân thiện với người quản lý website hơn.

Hãy cùng tìm hiểu phiên bản PHP 7.4 này có gì mới. Toàn bộ danh sách thay đổi đầy đủ bạn có thể đọc thêm  [tại đây](https://www.php.net/manual/en/migration74.php).

### Preloading

Hãy nói về code trước. Khi sử dụng framework hoặc libaries, files được tải lên và link trên mỗi request. Preloading là khi bạn tải framework và libraries vào trong OPCache. Nó giúp server tải file PHP trước và lưu trên bộ nhớ khi khởi động để có sẵn cho bất kỳ request nào tương lai!

Preloading được chạy bằng  **php.ini**  với chỉ dẫn:  **opache.preload**. Nó bắt PHP script chạy khi server khởi động. Nó cũng có thể được dùng để tải lên nhiều file khác hoặc chọn để inlcude hay compile chúng.

Rất tuyệt phải không, có điều, nếu nguồn bị thay đổi, server phải khởi động lại. Preloaded files cũng bị nằm trong bộ nhớ OPCache mãi mãi.

Những preload files này cũng sẵn sàng dùng cho request tương lai nếu cần sử dụng.

### Spread Operator trong Array Expressions

Quay về khi PHP 5.6 phát hành, PHP bắt đầu hỗ trợ argument unpacking (spread operator). Còn bây giờ với 7.4, chúng ta có thể dùng tính năng này với array expression. **Argument unpacking** là một *syntax* để *unpack array* và *travesables* thành arguments list. Để làm vậy, nó chỉ cần dùng … (3 chấm) là được.

Hãy xem qua ví dụ bên dưới:
```php
<?php

$animals = ['dog', 'cat'];
$animalkingdom = ['lion', 'elephant', ...$animals, 'giraffe'];
// ['lion', 'elephant', 'dog', 'cat', 'giraffe'];
```
Giờ chúng ta có thể mở rộng array từ mọi nơi trong một array khác, chỉ bằng cú pháp Spread Operator.

Ví dụ dài hơn:
```php
<?php

$num1 = [1, 2, 3];
$num2 = [...$num1]; // [1, 2, 3]
$num3 = [0, ...$num1]; // [0, 1, 2, 3]
$num4 = array(...$num1, ...$num2, 111); // [1, 2, 3, 1, 2, 3, 111]
$num5 = [...$num1, ...$num1]; // [1, 2, 3, 1, 2, 3]
```
Có vậy thôi, nhưng bạn cũng có thể dùng nó trong một hàm. Ví dụ như:
```php
<?php

function getNum() {
    return ['a', 'b'];
}
$num6 = [...getNum(), 'c']; // ['a', 'b', 'c']
$num7 = [...new NumIterator(['a', 'b', 'c'])]; // ['a', 'b', 'c']
function arrGen()  {
   for($i = 11; $i < 15; $i++)  {
       yield $i;

}
$num8 = [...arrGen()]; // [11, 12, 13, 14]
```
Hơn nữa, bạn giờ có thể unpack array và generators được trả về từ hàm trực tiếp vào trong array mới.

Ví dụ về code như sau:
```php
<?php

function getAnimals() {
    return ['dog', 'cat', 'elephant'];
}
$num1 = [...getAnimals(), 'lion', 'tiger', 'giraffe'];
```
Với PHP 7.4, nó sẽ in ra:
```php
<?php

array(6) {
[0]=>
string(3) "dog"
[1]=>
string(3) "cat"
[2]=>
string(8) "elephant"
[3]=>
string(4) "lion"
[4]=>
string(5) "tiger"
[5]=>
string(7) "giraffe"
}
```
Với array expression này, spread operatos có hiệu năng tốt hơn so với bản 7.3  **array_merge**. Đó là vì spread operator là ngôn ngữ cấu trúc trong khi đó  **array_merge**  là một hàm. Cũng vì spread operator hỗ trợ  **objects**  triển khai ngang còn  **array_merge**  chỉ hỗ trợ arrays.

Một vài điều cần lưu ý, bạn chỉ có thể dùng indexed arrays vì string keys không được hỗ trợ. Nếu sử dụng, lỗi recoverable sẽ xuất ra màn hình, vì phát hiện thấy string key.

Một ưu điểm nổi trội khá của 7.4 là việc loại bỏ array_merge.

Ví dụ, hãy xem một array merge bên dưới:
```php
<?php

$array = ['banana', 'orange'];
$array[2] = 'orange';
$array[1] = 'apple'; //shifting
var_dump($array);
// prints
array(3) {
[0]=>
string(6) "banana"
[1]=>
string(5) "apple"
[2]=>
string(6) "orange"
}
```
Một ưu điểm của 7.4 sử dụng function generator.  [Generator function](https://www.php.net/manual/en/language.generators.syntax.php)  cũng giống như một hàm thông thường, ngoại trừ việc thay vì trả về một giá trị, generator function có thể trả về nhiều giá trị.

Hãy xem thử ví dụ bên dưới:
```php
<?php

function generator() {
    for ($i = 3; $i <= 5; $i++)  {
        yield $i;
    }
}
$num1 = [0, 1, 2, ...generator()];
```
### Weak References

PHP 7.4 bây giờ đã có class WeakReference, không nên lầm lẫn với class  **WeakRed**  và  **Weakref**  extension.

**WeakReferences**  giúp programmer gọi tham chiếu tới một object. Nó hữu dụng vì nó không ngăn object bị hủy. Hó hỗ trợ triển khai cache có cấu trúc.
```php
<?php

WeakReference {
    /* Methods */
    public __construct(void)
    public static create(object $referent): WeakReference
    public get(void) ?object
}
```
### Contravariant Parameters và Covariant Returns

Hiện tại, PHP sử dụng hầu như invariant parameter types và return types. Có nghĩa là, nếu một phương thức có parameter hay return type của X thì subtype parameter hoặc return type cũng phải là loại  **X**.

Bây giờ với PHP 7.4, nó cho phép  **covariant**  (được sắp từ chi tiết đến tổng quan) và  **contravariant**  (ngược lại) trên parameter và return types.

Đây là ví dụ của cả hai:

Ví dụ return type của covariant:
```php
<?php

interface Factory {
    function make(): object;
}
class UserFactory implements Factory {
    function make(): User;
}
```
Ví dụ loại contravariant parameter:
```php
<?php

interface Concatable {
    function concat(Iterator $input);
}
class Collection implements Concatable {
    // accepts all iterables, not just Iterator
    function concat(iterable $input)  {/* ... */}
}
```
### Typed Properties 2.0

Từ PHP 5, type hints đã được hỗ trợ, cho phép một loại biến nhất định được chuyển tới hàm hoặc class. Khi nâng cấp lên PHP 7.2, data type  **object**  xuất hiện, và các loại khác có thể cũng được chờ đón hơn trong tương lai. Tương lai giờ đã ở đây rồi

Trong phiên bản 7.4 mới, PHP có thể hỗ trợ những loại sau:
```php
<?php

bool, int, float, string, array, object, iterable, self, parent
any class or interface name
?type // where "type" may be any of the above
```

Lưu ý loại  **parent**  có thể được dùng trong classes, và không cần có tính đồng nhất của parent với parameter và return type

Cũng vậy, lưu ý là  **void**  và  **callable**  không được hỗ trợ.  **Void**  bị xóa vì nó không hữu dụng và tính chất không rõ ràng;  **Callable**, vì hành vi của nó phụ thuộc bối cảnh.

Hãy xem một vài ví dụ sau.

Đây là một class, được viết cho PHP 7.3:
```php
<?php

class User {
    /** @var int $id */
    private $id;
    /** @var string $name */
    private $name;

    public function __construct(int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }

    public function getId(): int {
        return $this->id;
    }
    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getName(): string {
        return $this->name;
    }
    public function setName(string $name): void {
        $this->name = $name;
    }
}
```
PHP 7.4, không hy sinh sự an toàn của bất kỳ type nào, một class có thể được viết đơn giản như sau:
```php
<?php

class User {
    public int $id;
    public string $name;

    public function __construct(int $id, string $name)  
    {
        $this->id = $id;
        $this->name = $name;
    }
}
```
Đây là một vài ví dụ khác của các type mà 7.4 hỗ trợ:
```php
<?php

class Example {

    public int $scalarType;
    protected ClassName $classType;
    private ?ClassName $nullableClassType;

    // Types are also legal on static properties
    public static iterable $staticProp;

    // Types can also be used with the "var" notation
    var bool $flag;

    // Typed properties may have default values (more below)
    public string $str = "foo";
    public ?string $nullableStr = null;

    // The type applies to all properties in one declaration
    public float $x, $y;
    // equivalent to:
    public float $x;
    public float $y;
}
```
### Arrow Functions 2.0

Anonymous functions trong PHP dường như rất dài dòng, kể cả khi chỉ thực hiện một tác vụ đơn giản. Một phần là lượng lớn của syntactic boilerplate, một phần là cận nhập biến một cách thủ công.

Nó làm cho code khó đọc và càng khó hiểu.

Hãy xem code sau nó dùng PHP 7.3:
```php
<?php

function array_values_from_keys($arr, $keys) {
    return array_map(function ($x) use ($arr) { return $arr[$x]; }, $keys);
}
```
Còn đây là cú pháp chính xác của PHP 7.4:
```php
<?php

function array_values_from_keys($arr, $keys) {
    return array_map(fn($x) => $arr[$x], $keys);
}
```
Arrow function giờ có dạng đơn giản hơn nhiều:
```php
<?php

fn(parameter_list) => expr
```
Bên dưới bạn có thể thấy ví dụ của 2 hàm  **$fn1 (7.3)**  và  **$fn2 (7.4)**  cạnh nhau. Chúng có cùng kết quả nhưng cú pháp khác nhau:
```php
<?php

$y = 1;
$fn1 = fn($x) => $x + $y;

$fn2 = function ($x) use ($y)
{
    return $x + $y;
};
```
Nó cũng hoạt động được nếu arrow function kết hợp lại:
```php
<?php

$z = 1;
$fn = fn($x) => fn($y) => $x * $y + $z;
```
Tại đây, function bên ngoài bắt lấy biến  **$z**. Sau đó, function ở trong cũng bắt $z từ bên ngoài. Phiên bản 7.4 hỗ trợ việc này, còn 7.3 thì không thể: outer scope có thể được dùng trong inner function

Cú pháp arrow function syntax cho phép sử dụng đa dạng các function như là, variadics, default values, parameter và return types, cũng như by-reference passing và returning. Nhưng cũng có thể giữ cho code được sạch và dễ đọc. Bên dưới là arrow function hợp lệ có thể dùng:
```php
<?php

fn(array $x) => $x;
fn(): int => $x;
fn($x = 42) => $x;
fn(&$x) => $x;
fn&($x) => $x;
fn($x, ...$rest) => $rest;
```
Một điều cần lưu ý là arrow functions có quyền ưu tiên thấp nhất. Ví dụ:
```php
<?php

fn($x) => $x + $y
// is
fn($x) => ($x + $y)
// not
(fn($x) => $x) + $y
``` 
## Nguồn tham khảo

-   [https://www.php.net/releases/7_4_0.php](https://www.php.net/releases/7_4_0.php)
-   [https://www.hostinger.com/](https://www.hostinger.com/)
