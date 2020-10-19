---
title: "6 things you need to know to get the most out of your Laravel Model"
date: "2020-10-19"
published: true
tags:
  - php
  - laravel
---

Khi mới bắt đầu làm việc với Laravel, mình tin là nhiều người không biết hoặc không có thói quen "khai thác" hết những tính năng của Model.
 
Vì vậy, trong bài viết này mình sẽ giới thiệu đến các bạn 7 điều cần biết để tận dụng tối đa Model, giúp mọi thứ sẽ đơn giản hơn rất nhiều.


## Tạo Model

Đầu tiên chúng ta hãy tạo 1 model có tên **Blog** cho dễ thực hành nhé: 


```php
 php artisan make:model Blog 
```

Giờ chúng ta đã có Model rồi, bắt đầu vào tìm hiểu sức mạnh đầu tiên nào.

## 1. Casting attributes

Casting attributes - tức là bạn có thể chuyển đổi thuộc tính thành 1 kiểu dữ liệu nhất định, ví dụ như sau: 

```php

protected $casts = [  
    'is_published' => 'boolean'  
];

```

Sau khi khai báo như vậy, bất kể khi nào truy cập tới *is_published* thì nó cũng sẽ ở dạng boolean kể cả khi trong database bạn lưu ở dạng interger. 

Ngoài ra còn có rất nhiều kiểu chuyển đổi khác như là *date*, *datetime*.

Khi mới bắt đầu, mình có thói quen viết thế này ở blade  

```html

{{ $blog->created_at->format ('Y-m-d') }}

```

Và tất nhiên, nếu ở 1 blade khác cần dùng truy cập với *created_at* thì mình sẽ phải viết đi viết lại rất nhiều lần. Giờ đây điều này có thể thay thế bằng cách sử dụng thuộc tính $casts : 

```php

protected $casts = [
    'created_at' => 'datetime:Y-m-d', 
 ];

```

Thuộc tính *created_at* sẽ luôn trả về theo định dạng _Y-m-d_ và chúng ta không cần phải thực hiện bất kỳ công việc format nào nữa.

##  2. Accessors

Đôi khi bạn muốn kết hợp nhiều thuộc tính thành một hoặc bạn chỉ muốn định dạng một thuộc tính. Điều này có thể được thực hiện với **Accessors** trong Laravel.

Mình sẽ lấy 1 ví dụ. Trong bảng *users*, có 2 trường là "*first_name*" và "*last_name*".  Nếu muốn hiển thị tên đầy đủ của người đó, có thể viết như sau 

```php
$this->first_name . ' ' . $this->last_name;
```
Đó là một cách tiếp cận rất ngây thơ. Cách Laravel để giải quyết vấn đề này là sử dụng một Accessors. Đây là một phương thức được định nghĩa trong một Model với cú pháp sau:
```
get[NameOfAttribute]Attribute
```
Với bài toán mình vừa đưa ra ở trên, nếu muốn lấy *full_name* , bạn cần viết như sau:

```php
public function getFullNameAttribute () {  
    return  "{$this-> first_name} {$this-> last_name}" ;  
}
```
Sau đó, muốn truy cập đến *full_name* chỉ cần gọi 

```php
$user->full_name;
```

## 3.  Mutators

Ngược với  **Accessor**,  **Mutators**  cho phép chúng ta định dạng lại giá trị thuộc tính trước khi lưu vào Database. Có cú pháp giống như sau:

```php
public function setLastNameAttribute($value) {
    $this->attributes['last_name'] = ucfirst($value);
}

```

Ví dụ trên sẽ apply hàm  _ucfirst()_  cho  _last_name_  và lưu kết quả vào trong  _$attributes_:

```php
$user->last_name = 'jones';
```

Kết quả sẽ là 'Jones'.

## 4. Visibility
Có một vài thuộc tính không nên được chứa trong dữ liệu được lấy ra, ví dụ như thuộc tính _password_. Và đây là trường hợp mà **Visibility** phát huy tác dụng, chúng ta có thể sử dụng thuộc tính **$hidden**.

```php
protected $hidden = [
    'password' 
];
```

Nói đơn giản nhất, hidden tức là không hiển thị. Thuộc tính **$hidden** giống như một blacklist cho thuộc tính. 

Và ngoài ra, chúng ta cũng có thể sử dụng thuộc tính **$visible** được coi là whitelist cho thuộc tính.

```php
protected $visible = [
    'first_name',
    'last_name'
];

```

Khi sử dụng thuộc tính  **$visible**  trong model, thì các thuộc tính không được thiết lập sẽ tự động ẩn.

## 5. Appending values

Khi một Model có  _accessors_  và  _relations_, theo mặc định chúng sẽ không được thêm vào array và JSON của Model. Để làm điều này, chúng ta phải thêm  _accessors_  và  _relations_  vào thuộc tính  _**$appends**_  của model. Ví dụ với thuộc tính  _full_name_:

```php
$appends = [
    'full_name'
];

```

_Chú ý: Accessors được thêm vào thuộc tính $append sử dụng snack case chứ không phải camel case._

Giả sử model User có quan hệ 1 - n với model Blog:

```php
public function blogs() {
    return $this->hasMany(App\Blog::class);
}

```

Để thêm blog vào model chỉ cần thêm vào thuộc tính  _$appends_:

```php
$appends = [
    'full_name',
    'blogs'
];

```

Chúng ta có thể chỉ định thuộc tính thêm vào. Ví dụ, chúng ta muốn thêm thuộc tính blog id và title vào model:

```php
$appends = [
    'full_name',
    'blogs:id,title'
];

```

### 6. Touches

Khi một model có mối quan hệ  _BelongsTo_  hoặc  _BelongsToMany_  với model khác, như trong trường hợp này: Comment model thuộc về một Blog, khi bạn sửa một comment và bạn muốn blog liên quan đến comment này cũng sẽ cập nhật lại thời gian, điều này có thể được thực hiện bằng cách thêm mối quan hệ vào thuộc tính  _$touches_:

```php
class Comment extends Model
{
    protected $touches = ['blog'];

    public function blog()
    {
        return $this->belongsTo(App\Blog::class);
    }
}

```

Khi Comment model được update, thì thuộc tính  _updated_at_  của Blog model liên quan với comment này sẽ được cập nhật tự động.

## Kết luận

Trên đây làm 6 điều quan trọng cần biết để có thể tận dụng tối đa Model, nếu như chưa có thói quen sử dụng thì mình khuyên các bạn nên thay đổi, ngay sau khi đọc được bài viết này :D 

Cảm ơn và hẹn gặp lại trong những bài viết mới nhé ! See yaaaa

 *From Vnus with love ....*

