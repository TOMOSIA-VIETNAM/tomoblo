---
title: "20 tips hữu ích với laravel Eloquent"
date: "2020-11-03"
published: true
tags:
  - Laravel
  - php
---

Eloquent ORM được sủ dụng rất nhiều trong 1 project Laravel, tuy nhiên để sử dụng được tối đa những gì Laravel cung cấp thì không phải ai cũng biết. Trong bài viết này mình sẽ chỉ cho các bạn một vài thủ thuật, hi vọng sẽ giúp ích cho các bạn trong một vài trường hợp cụ thể.

 
 ####1. Increments và Decrements
 
Khi muốn update tăng 1 đơn vị cho 1 column thay vì viết như này.
```php
$post = Post::find($postId);
$post->view_count++;
$post->save();
```

Bạn có thể viết lại như này 
```php
$post = Post::find($postId);
$post->increment('view_count');
```

Hoặc

```php
Post::find($postId)->increment('view_count');
Post::find($postId)->increment('view_count', 10); // +10
Product::find($productId)->decrement('stock'); // -1
```

 ####2. XorY methods
 
 Laravel Eloquent có khả nhiều function kết hợp 2 methods kiểu như "hãy làm X trước nếu không thì làm Y"
 
 - <b>findOrFail</b>
 Thay vì viết như này
 
 ```php
$user = User::find($id);
if (!$user) {
    abort(404);
}
```
Chúng ta có thể viết ngắn gọn như này

```php
$user = User::findOrFail($id);
```

- <b>firstOrCreate</b>
```php
$user = User::where('email', $email)->first();
if (!$user) {
  User::create([
    'email' => $email
  ]);
}
```
&darr;

```php
$user = User::firstOrCreate(['email' => $email]);
```

####3. Model boot() method

Trong Laravel Eloquent có một function `boot()` cho phép bạn ghi đè lại các giá trị mặc định.

```php
class User extends Model
{
    public static function boot()
    {
        parent::boot();
        static::updating(function($model)
        {
            // do some logging
            // thay thế một số property, ví dụ $model->something = transform($something);
        });
    }
}
```

Ứng dụng nhiều nhất của function này là set uuid cho đối tượng

```php
public static function boot()
{
    parent::boot();
    self::creating(function ($model) {
        $model->uuid = (string)Uuid::generate();
    });
}
```

####4. Thêm điều kiện hoặc ordering trong relationship 

Dưới đây là một cách mà các bạn thường dùng để định nghĩa một relationship

```php
public function users() {
    return $this->hasMany('App\User');    
}
```

Tuy nhiên bạn hoàn toàn có thể thêm `where` hoặc `orderBy` 

Ví dụ trong trường hợp cụ thể, bạn cần tạo quan hệ giữa bảng `categories` và `posts` nhưng thêm điều kiện là `post` phải có trạng thái là `APPROVED` và sắp xếp theo thứ tụ tăng dần.

```php
public function posts() {
    return $this->hasMany('App\Models\Category')->where('status', 'APPROVED')->orderBy('id', 'DESC');
}
```
####5. Model properties: timestamps, appends, ...

Có một vài parameters của Eloquent Model, được thể hiện dưới dạng properties của class đó. Một số cái phổ biến nhất có thể là:
```php
class User extends Model {
    protected $table = 'users';
    protected $fillable = ['email', 'password']; // Những fileds có thể được set giá trị bằng cách dùng User::create()
    protected $dates = ['created_at', 'deleted_at']; // Những fields sẽ được set bởi Carbon-ized
    protected $appends = ['field1', 'field2']; // Các giá trị bổ sung được trả về trong JSON 
}
```

Khoannnnnnnnnnnnnnnnnnn, Còn nữa...

```php
protected $primaryKey = 'uuid'; // Primary key k phải lúc nào cũng bắt buộc phải là id
public $incrementing = false; // và thậm chí k cần phải tự động tăng luông 
protected $perPage = 25; // Bạn có thể override số lượng data trong 1 page khi sủ dụng pagination, giá trị này default là 15
const CREATED_AT = 'created_at';
const UPDATED_AT = 'updated_at'; // Thay đổi được tên column created_at và updated_at luôn nè 
public $timestamps = false; // Hoặc khai báo là k cần sủ dụng chúng
protected $dateFormat = 'U'; //Hoặc bạn có thể thay đổi kiểu dữ liệu của chúng. Ví dụ chuyển created_at và updated_at sang integer thì làm như ví dụ này.
```
Và tất nhiên là còn nhiều hơn nữa, trên đây mình đã liệt kê những cái thú vị nhất, để biết thêm chi tiết, vui lòng kiểm tra ở `abstract Model Class`

####6. Find multiple entries
Chắc hẳn tất cả mọi người đều biết về `find()` method.

```php
$user = User::find(1);
```

Nhưng có rất ít người biết rằng, hàm `find()` có thể nhận nhiều ID dưới dạng 1 array.

```php
$user = User::find([1, 2, 3]);
```

####7. WhereX

Bạn có thể kết hợp tên column viết dưới dạng `Camel` vào sau `where`

```php
$users = User::where('approved', 1)->get();
```

Chuyển thành

```php
$users = User::whereApproved(1)->get(); 
```

Ngoài ra có một số method đã được define trước trong Eloquent

```php
User::whereDate('created_at', date('Y-m-d'));
User::whereDay('created_at', date('d'));
User::whereMonth('created_at', date('m'));
User::whereYear('created_at', date('Y'));
```

####8. Order by relationship

Sử dụng khi bạn cần lấy `post` mới nhất trong 1 list `categories`. Đầu tiên bạn cần define 1 relationship riêng việt cho `post` mới nhất của `categories`

```php
public function latestPost()
{
    return $this->hasOne(\App\Models\Post::class)->latest();
}
```

Và sau đó, trong khi query bạn có thể làm được điều này:

```php
$categories = Category::with('latestPost')->get()->sortByDesc('latestPost.created_at');
```

####9. Eloquent::when() – không còn phải sử dụng if-else’s

Khi cần thêm điều kiện vào trong query. Đa số mọi người sẽ viết như sau:

```php
if (request('filter_by') == 'likes') {
    $query->where('likes', '>', request('likes_amount', 0));
}
if (request('filter_by') == 'date') {
    $query->orderBy('created_at', request('ordering_rule', 'desc'));
}
```

Tuy nhiên bạn có thể sử dụng `when()` để viết lại như sau:

```php
$query = Author::query();
$query->when(request('filter_by') == 'likes', function ($q) {
    return $q->where('likes', '>', request('likes_amount', 0));
});
$query->when(request('filter_by') == 'date', function ($q) {
    return $q->orderBy('created_at', request('ordering_rule', 'desc'));
});
```

Nhìn có vẻ dài hơn cách dùng if else thông thường nhưng nó sẽ thật sự tốt trong việc phải truyền thêm tham số

```php
$query = User::query();
$query->when(request('role', false), function ($q, $role) { 
    return $q->where('role_id', $role);
});
$authors = $query->get();
```

####10. BelongsTo Default Models

Giả sử khí bạn phải show thông tin của 1 `post` kèo theo thông tin của tác giả:
```php
{{ $post->author->name }}
```

Tuy nhiên nếu thông tin về tác giả bị xóa. Hệ thống của bạn sẽ xuất hiện 1 lỗi kiểu như `property of non-object`
Tất nhiên vẫn có cách giải quyết kiểu như
```php
{{ !empty($post->author) ? $post->author->name : '' }}
```

Nhưng bạn hoàn toàn có thể làm nó ở relationship

```php
public function author()
{
    return $this->belongsTo('App\Author')->withDefault([
        'name' => 'Administrator'
    ]);
}
```

####11. Order by Mutator

Hãy tưởng tượng bạn có cái này:

```php
function getFullNameAttribute()
{
  return $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
}
```

Bây giờ bạn muốn order by theo `full_name` thì sao nhỉ?
```php
$clients = Client::orderBy('full_name')->get(); // Viết như này nó sẽ k chạy đâu nhé :))
```
Bạn cần viết như này
```php
$clients = Client::get()->sortBy('full_name'); 
```

Lưu ý rằng tên function khác nhau nhé. Nó k phải `orderBy` mà là `sortBy`

####12. Set ordering mặc định

Nếu bạn muốn `User:all()` luôn được order by name? Bạn có thể sủ dụng method `boot()` như sau:

```php
protected static function boot()
{
    parent::boot();

    // Order by name ASC
    static::addGlobalScope('order', function (Builder $builder) {
        $builder->orderBy('name', 'asc');
    });
}
```

####13. Raw query methods

Giả sử chúng ta cần thêm 1 câu truy vấn Sql vào câu lệnh Eloquent của mình.

```php
// whereRaw
$orders = DB::table('orders')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();

// havingRaw
Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

// orderByRaw
User::where('created_at', '>', '2016-01-01')
  ->orderByRaw('(updated_at - created_at) desc')
  ->get();
```

####14. Replicate: tạo 1 bản copy của 1 row
Đây là cách tốt nhất để tạo 1 bản sao ò database entry:
```php
$task = Tasks::find(1);
$newTask = $task->replicate();
$newTask->save();
```

####15. Chunk() method for big tables
Không liên quan nhiều lắm đến Eloquent, nó thiên về Collection nhiều hơn, nhưng vẫn tốt khi muốn xử lý các dữ liệu lớn, bạn có thể chia chúng thành nhiều phần:
Thay vì viết như này:
```php
$users = User::all();
foreach ($users as $user) {
    // ...
```

Bạn có thể viết lại như này:
```php
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // ...
    }
});
```

####16. Tạo nhưng file bổ sung khi tạo model bằng command

Chắc hẳn tất cả mọi người đề biết về câu lệnh tạo model này:
```yaml
php artisan make:model Company
```

Nhưng k phải ai cũng biết rằng có 3 flags hữu ích để tạo các tệp liên quan đến Model

```yaml
php artisan make:model Company -mcr
```
- `-m` sẽ tạo thêm migration file
- `-c` sẽ tạo thêm controller file 
- `-r` sẽ chỉ định controller có thêm thuộc tính --resource

####17. Override updated_at when saving

Bạn có biết `save()` method có thể nhận thêm tham số không? Chúng ta có thể yêu cầu nó bỏ qua chức năng mặc định updated_at để được set bằng thời gian hiện tại.
```php
$product = Product::find($id);
$product->updated_at = '2019-01-01 10:00:00';
$product->save(['timestamps' => false]);
```

Trong trường hợp này mình đã override `updated_at` mặc định bằng giá trị được xác định từ trước mà tôi muốn.

####18. Kết quả của method `update()` là gì?

 Bạn có biết `$result` sẽ trả về gì k?
 
 ```php
$result = $products->whereNull('category_id')->update(['category_id' => 2]);
```

Câu trả lời là số hàng được update, vì vậy nếu bạn cần kiểm tra xem có bao nhiêu hàng bị ảnh hưởng thì bạn k cần làm thêm bất kỳ cái gì khác - `update()` method sẽ trả về cho bạn con số này.

####19. Nhóm các điều kiện khi sử dụng Eloquent Query

Bạn sẽ làm thế nào nếu bạn có and-or kết hợp trong SQL query kiểu như này:
```sql
... WHERE (gender = 'Male' and age >= 18) or (gender = 'Female' and age >= 65)
```

Khi chuyển qua Eloquent bạn nghĩ như này có đúng?

```php
$q->where('gender', 'Male');
$q->orWhere('age', '>=', 18);
$q->where('gender', 'Female');
$q->orWhere('age', '>=', 65);
```

Sai hoàn toàn nhé. Cách đúng sẽ phức tạp hơn một chút:

```php
$q->where(function ($query) {
    $query->where('gender', 'Male')
        ->where('age', '>=', 18);
})->orWhere(function($query) {
    $query->where('gender', 'Female')
        ->where('age', '>=', 65); 
})
```

####20. orWhere with multiple parameters

Cuối cùng, bạn có thể truyền tham số vào `orWhere()` là một array.

Với cách thông thường bạn sẽ phải viết như sau:
```php
$q->where('a', 1);
$q->orWhere('b', 2);
$q->orWhere('c', 3);
```

Nhưng bạn có thể viết lại như này:
```php
$q->where('a', 1);
$q->orWhere(['b' => 2, 'c' => 3]);
```

<br>

Hi vọng với những mẹo này sẽ giúp các bạn nhiều hơn khi làm việc với dự án laravel 
