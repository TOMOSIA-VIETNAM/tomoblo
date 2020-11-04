---
title: "[Laravel] So sánh Eloquent ORM và Query Builder"
date: "2020-08-04"
published: true
tags:
  - php
  - laravel
---
# I. Giới thiệu

Như mọi người đã biết, một ứng dụng luôn phải tương tác với cơ sở dữ liệu. Đối với Laravel thì có 2 kiểu truy vấn phổ biến, đó là **Eloquent ORM** và **Query Builder**.

Tại sao cùng với mục đích là truy vấn database lại có những kiểu truy vấn khác nhau, điểm khác nhau giữa chúng là gì. Khi nào thì nên sử dụng Eloquent, ngược lại khi nào dùng Query Builder? Cùng tìm hiểu nhé.
 
## II. Định nghĩa

### 1. Query Builder

Trong Laravel, Query Builder cung cấp giao diện để chạy các truy vấn CSDL. Nó có thể được sử dụng để thực hiện tất cả, từ kết nối DB cơ bản, CRUD, aggregates...

Query Builder sử dụng PDO (PHP Data Object, hệ thống API có sẵn của PHP để kết nối đến các CSDL thông dụng), bản thân API PDO đã bảo vệ chúng ta trước các tấn công SQL Injection, do đó khi xử dụng Query Builder không cần lo lắng xử lý dữ liệu trước khi chèn vào database

Việc thực hiện truy vấn bằng query builder khá đơn giản, chúng ta sẽ sử dụng facade DB để bắt đầu một query builder, ví dụ như sau:

```php
$users  =  DB::table('users')->get();
```

### 2. Eloquent ORM

Đầu tiên ORM là gì? ORM (Object Relative Mapper)  là 1 kỹ thuật lập trình giúp ánh xạ các bản ghi dữ liệu trong hệ quản trị cơ sở dữ liệu sang dạng đối tượng đang định nghĩa trong các class .

**Eloquent ORM** cho phép chúng ta có thể thao tác với các đối tượng DB và quan hệ tương ứng. Nó tương tự như làm việc với các đối tượng trong PHP. Ở đây, chính là tương tác thông qua "Model". Trong model sẽ định nghĩa table được truy vấn.

## III. Cách sử dụng

**_1. Query Builder_**

-   Query Builder xây dựng lớp DB để thực hiện các câu truy vấn. Do đó, để bắt đầu 1 Query Builder, ta sử dụng hàm table() trong DB facade.

-   Ví dụ:

```php
  $users  =  DB::table('users')->get();
```

-   Truy vấn này sẽ trả về 1 mảng kết quả, trong đó mỗi kết quả là 1 object StdClass của PHP. Bạn có thể truy cập vào giá trị mỗi cột như 1 thuộc tính của object.

**_2. Eloquent ORM_**

-   Do trong Eloquent ORM, mỗi bảng của database tương ứng với 1 model nên để bắt đầu sử dụng được nó, ta cần tạo Eloquent model trong thư mục  `app`. Lưu ý là mỗi Eloquent model này đều phải extend  `Illuminate\Database\Eloquent\Model`  class.
-   Ví dụ về Eloquent Model:

```php
<?php

namespace  App;

use  Illuminate\Database\Eloquent\Model;

class  User  extends  Model

{

/**

* The table associated with the model.

*

* @var string

*/

protected  $table  =  'users';

}
```

-   Ví dụ về query sử dụng Eloquent ORM:

```php
$users  =  User::all();
```

Kết quả trả về là 1 eloquent collections, trong đó mỗi kết quả là 1 User object.

## IV. Một số query cơ bản

Về cơ bản, các câu lệnh query của Eloquent ORM có 1 chút thay đổi so với Query Builder, khiến câu lệnh trông ngắn gọn và đẹp đẽ hơn:

**_1. Lấy tất cả các bản ghi_**

-   Query Builder:

```php
$users  =  DB::table('users')->get();
```
-   Eloquent ORM:

```php
$users  =  User::all();
```
**_2. Lấy bản ghi theo id_**

-   Query Builder:

```php
$user  =  DB::table('users')->where('id',  1)->first();
```
-   Eloquent ORM:

```php
$user  =  User::find(1);
```
**_3. Lấy 1 bản ghi theo 1 trường xác định_**

-   Query Builder:

```php
$user  =  DB::table('users')->where('name',  'Tomoblog')->first();
```
-   Eloquent ORM:

```php
$user  =  User::where('name',  'Tomoblog')->first();
```
**_4. Aggregates_**

-   Query Builder:

```php
$users  =  DB::table('users')->count();
```
-   Eloquent ORM:

```php
$users  =  User::count();
```

**_5. Insert_**

-   Query Builder:

```php
DB::table('users')->insert(

['email'  =>  'tomoblog@gmail.com']

);
```

-   Eloquent ORM:

```php
$user  =  User::create(['email'  =>  'tomoblog@gmail.com']);
```
```php
$user  =  User::firstOrCreate(['email'  =>  'tomoblog@gmail.com']);
```
```php
$user  =  User::firstOrNew(['email'  =>  'tomoblog@gmail.com']);
```
Trên đây mình chỉ giới thiệu một vài câu query cơ bản và ngắn gọn nhất, để tìm hiểu kĩ hơn thì mọi người có thể vào đây nhé 

[https://laravel.com/docs/7.x/queries](https://laravel.com/docs/7.x/queries)

[https://laravel.com/docs/7.x/eloquent](https://laravel.com/docs/7.x/eloquent)

## V. So sánh

**_1. Tính dễ sử dụng_**

-   Các câu lệnh của Eloquent ORM là ngắn gọn, dễ hiểu và dễ sử dụng hơn so với các câu lệnh khá dài dòng của Query Builder.
    
-   Hơn nữa, sử dụng Eloquent ORM cũng dễ dàng hơn trong việc kết nối giữa các bảng với nhau.
    
-   Tuy nhiên, với 1 số truy vấn phức tạp, không sử dụng được Eloquent ORM thì vẫn cần sử dụng Query Builder để cho kết qủa chính xác nhất.
    

**_2. Hiệu suất_**

**QueryBuilder** có hiệu suất truy vấn dữ liệu nhanh hơn **Eloquent**  **ORM** bởi vì Eloquent phải thêm một lớp trong ứng dụng và yêu cầu nhiều truy vấn SQL. Đối với các database mà có ít bản ghi hiệu suất của chúng không có quá là nhiều sự chênh lệch, vậy nên đối với những database này mình khuyên các bạn nên sử dụng Eloquent ORM vì cú pháp đơn giản và ngắn gọn của chúng.

-   **Ví dụ**: Để chèn 1000 hàng cho một bảng đơn giản Eloquent mất 1,2 giây và trong trường hợp đó QueryBuilder chỉ mất 800 mili giây (ms). Vậy tại sao lại phải sử dụng Eloquent? Có cần thiết không?
    
-   Câu trả lời là **có**, bởi vì:
    
    -   Tạo ra một mối quan hệ tốt hơn và nhận được kết quả với nhiều cú pháp đơn giản.
        
    -   Có lẽ nhiều người bảo rằng các cú pháp của QueryBuilder gần giống với MS SQL, Mysql mà các bạn đã được học ở trường nên dễ gây thiện cảm hơn khi học, nhưng không Eloquent ORM tuy cú pháp có khác nhưng mà nó đơn giản và ngắn gọn hơn rất nhiều theo mình thì nó hợp với những bạn không có nhiều kiến thức về truy vấn SQL như các bạn sinh viên sắp và mới ra trường,...
        
    -   Phần quan trọng nhất là nếu chúng ta muốn thay đổi cơ sở dữ liệu khác , thì DB::raw sẽ gây đau đầu cho chúng ta và trong trường hợp đó Laravel Eloquent sẽ giải quyết tất cả các vấn đề một cách đơn giản. Nó có thể xử lý các loại Database khác nhau.
        
**_3. Tính tương tác_**

Chúng ta có thể sử dụng tất cả các function của Query Builder trong Eloquent nhưng không thể sử dụng các funcation của Eloquent trong Query Builder.

## VI. Kết luận

Như vậy, trong blog này chúng ta đã tìm hiểu về 2 kiểu truy vấn trong Laravel. Mỗi loại đều có những ưu điểm và nhược điểm riêng. Vì vậy tùy vào mục đính sử dụng để chọn kiểu truy vấn cho phù hợp nhé.