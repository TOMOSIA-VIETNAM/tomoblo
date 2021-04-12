---
title: "Dynamic relationships in Laravel using subqueries"
date: "2021-04-12"
published: true
tags:
  - laravel
---

## 1. Giới thiệu
Khi xây dựng ứng dụng web mà có kết nối đến database, bạn cần và luôn luôn phải cân nhắc đến 2 mục tiêu đó là:
```
  Sử dụng một số lượng tối thiểu query.
  Sử dụng bộ nhớ ít nhất có thể.
```
Hai mục tiêu này có thể có ảnh hưởng mạnh đến hiệu năng ứng dụng của bạn.
Chúng ta thường khá tốt về mục tiêu thứ nhất, chúng ta nhận thức được về vấn đề N+1 và sử dụng kỹ thuật gọi là eager-loading để giảm thiểu số lượng database query. Nhưng với mục tiêu thứ hai thì không phải ai cũng nhận thức được. Thực tế, trong một số trường hợp việc giảm số lượng query có thể làm tốn thêm rất nhiều bộ nhớ.
## 2. Đặt vấn đề
Cho ví dụ sau. Bạn có một trang danh sách users trong web app, thể hiện thông tin user và lần login cuối cùng của user. Nghe có vẻ đơn giản nhưng thực tế thì nó có một số sự phức tạp thú vị.
```
Name            | Email                       | Last Login
-----------------------------------------------------------------------
Jonathan        | jonathan@reinink.com        | Jun 2, 2018 at 5:30am
Adam Wathan     | admawathan@reinink.com      | Nov 2, 2018 at 8:30am
Taylor Otwell   | taylo.otwell@laravel.com	  | Never
Adam Campbell   | adam.campbell@laravel.com   | Nov 10, 2018 at 12:01pm
```
Thông tin login của user sẽ dươch lưu trong bảng ```logins```, dưới đây là bảng cơ sở dữ liệu:
```php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('email');
    $table->timestamps();
});

Schema::create('logins', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('user_id');
    $table->string('ip_address');
    $table->timestamp('created_at');
});
```
Và đây là model tương ứng và relations:
```php
class User extends Model
{
    public function logins()
    {
        return $this->hasMany(Login::class);
    }
}

class Login extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
Vậy làm thế nào đế chúng ta hiển thị trang users như yêu cầu ở trên? Hay cụ thể là làm thế nào để chúng ta lấy ra last login date?
Một cách đơn giản nhất có thể là:
```php
$users = User::all();

@foreach ($users as $user)
    <tr>
        <td>{{ $user->name }}</td>
        <td>{{ $user->email }}</td>
        <td>
            @if ($lastLogin = $user->logins()->latest()->first())
                {{ $lastLogin->created_at->format('M j, Y \a\t g:i a') }}
            @else
                Never
            @endif
        </td>
    </tr>
@endforeach
```
Oh, nhưng bạn có thể thấy ngay vấn đề ở đây đó là N+1, với mỗi user được hiển thị chúng ta cần thêm 1 câu query để lấy ra last login date của user đó. Nếu trang của chúng ta có 50 users thì số lượng query sẽ là 51.
```sql
select * from "users";
select * from "logins" where "logins"."user_id" = 1 and "logins"."user_id" is not null order by "created_at" desc limit 1;
select * from "logins" where "logins"."user_id" = 2 and "logins"."user_id" is not null order by "created_at" desc limit 1;
// ...
select * from "logins" where "logins"."user_id" = 49 and "logins"."user_id" is not null order by "created_at" desc limit 1;
select * from "logins" where "logins"."user_id" = 50 and "logins"."user_id" is not null order by "created_at" desc limit 1;
```
Bắt đầu tối ưu lại. Cách đầu tiên đơn giản đó là eager load all Login records:
```php
$users = User::with('logins')->get();

@foreach ($users as $user)
    <tr>
        <td>{{ $user->name }}</td>
        <td>{{ $user->email }}</td>
        <td>
            @if ($user->logins->isNotEmpty())
                {{ $user->logins->sortByDesc('created_at')->first()->created_at->format('M j, Y \a\t g:i a') }}
            @else
                Never
            @endif
        </td>
    </tr>
@endforeach
```
Giải pháp này chỉ cần sử dụng 2 câu query, 1 để lấy ra danh sách users và 1 để lấy ra tất cả login records của danh sách users. Tuy nhiên, vấn đề về memory có thể xuất hiện ở đây. Chắc chắn là chúng ta đã tránh được vấn đề N+1, nhưng chúng ta lại tạo ra 1 vấn đề lớn hơn đó là big memory:
```
Users per page	            | 50 users
Average logins per user	    | 250 logins
Total login records loaded	| 12,500 records
```
Hiện giờ thì chúng ta đang load 12500 login records chỉ để lấy ra last login date cho mỗi user. Điều này không chỉ tiêu tốn bộ nhớ mà còn tốn thời gian tính toán, vì mỗi record sẽ được convert thành Eloquent Model.
## 3. Giải quyết
### 3.1. Caching
Bạn có thể suy nghĩ, "Không có vấn đề gì lớn cả, tôi sẽ cache lại last login":
```php
Schema::create('users', function (Blueprint $table) {
   $table->integer('last_login_id');
});
```
Khi user logged in, chúng ta sẽ tạo mới một bản ghi Login và update khóa ngoại last_login_id trên bảng users. Chúng ta sẽ tạo 1 relationship gọi là lastLogin và eager load nó:
```php
$users = User::with('lastLogin')->get();
```
Đây là một giải pháp đúng đắn. Nhưng thực tế caching thường không đơn giản như thế này.
### 3.2. Subquery
Có một cách giải quyết khác đó là sử dụng subquery. Subquery cho phép chúng ta select thêm các extra columns ngay trong câu query chính. Laravel hỗ trợ subquery qua method selectSub:
```php
$lastLogin = Login::select('created_at')
    ->whereColumn('user_id', 'users.id')
    ->latest()
    ->limit(1)
    ->getQuery();

$users = User::select('users.*')
    ->selectSub($lastLogin, 'last_login_at')
    ->get();

@foreach ($users as $user)
    <tr>
        <td>{{ $user->name }}</td>
        <td>{{ $user->email }}</td>
        <td>
            @if ($user->last_login_at)
                {{ $user->last_login_at->format('M j, Y \a\t g:i a') }}
            @else
                Never
            @endif
        </td>
    </tr>
@endforeach
```
Trong ví dụ này chúng ta thực tế chưa sử dụng relationship. Ở đây chúng ta mới chỉ sử dụng subquery để lấy last login date của mỗi user như một thuộc tính của user, hãy xem câu lệnh SQL thực tế được chạy:
```sql
select
    "users".*,
    (
        select "created_at" from "logins"
        where "user_id" = "users"."id"
        order by "created_at" desc
        limit 1
    ) as "last_login_at"
from "users"
```
Kỹ thuật này giúp cải thiện đáng kể hiệu năng khi chúng ta đã đạt được cả 2 mục tiêu đó là giảm số lượng query và memory, cộng thêm là chúng ta không cần dùng đến cache.
### 3.3. Macro
Trước khi đi xa hơn, tôi muốn show cho bạn một macro tôi thường sử dụng để làm cho việc sử dụng subquery ngắn gọn hơn. Macro được khai báo trong AppServiceProvider@boot:
```php
use Illuminate\Database\Query\Builder;

Builder::macro('addSubSelect', function ($column, $query) {
    if (is_null($this->columns)) {
        $this->select($this->from.'.*');
    }

    return $this->selectSub($query->limit(1), $column);
});
```
Và bây giờ chúng ta có thể sử dụng macro:
```php
$users = User::addSubSelect('last_login_at', Login::select('created_at')
    ->whereColumn('user_id', 'users.id')
    ->latest()
)->get();
```
### 3.4. Scopes
Thêm một bước nữa là đóng gói subquery trong User model scope để đơn giản hóa controller và có thể tái sử dụng:
```php
class User extends Model
{
    public function scopeWithLastLoginDate($query)
    {
        $query->addSubSelect('last_login_at', Login::select('created_at')
            ->whereColumn('user_id', 'users.id')
            ->latest()
        );
    }
}

$users = User::withLastLoginDate()->get();
```
### 3.5. Dynamic relationship
Vâng, bây giờ là đến phần chúng ta đang xây dựng. Sử dụng subquery để lấy last login date thì ok rồi nhưng nếu chúng ta muốn thêm một số thông tin khác về login thì sao? Ví dụ, có thể chúng ta sẽ muốn hiện thông tin IP của login. Làm thế nào đây?

Một lựa chọn đó là viết thêm 1 model scope nữa:
```php
$users = User::withLastLoginDate()->withLastLoginIpAddress()->get();
{{ $user->last_login_at->format('M j, Y \a\t g:i a') }} ({{ $user->last_login_ip_address }})
```
Và dĩ nhiên cách này hoạt động được, nhưng có lẽ là tốt hơn nếu có cách nào để lấy trực tiếp từ model Login, đặc biệt là khi model có sử dụng các accessors hay relationship.
```php
$users = User::withLastLogin()->get();

{{ $user->lastLogin->created_at->format('M j, Y \a\t g:i a') }} ({{  $user->lastLogin->ip_address }})
```
Chúng ta sẽ bắt đầu định nghĩa một relationship mới lastLogin belongs to relationship. Thông thường để khai báo relationship, table cần có 1 khóa ngoại, ví dụ ở đây là last_login_id như trong solution sử dụng cache ở trên. Nhưng ở đây, chúng ta không sử dụng cache, thay vào đó sẽ sử dụng subquery.
```php
class User extends Model
{
    public function lastLogin()
    {
        return $this->belongsTo(Login::class);
    }

    public function scopeWithLastLogin($query)
    {
        $query->addSubSelect('last_login_id', Login::select('id')
            ->whereColumn('user_id', 'users.id')
            ->latest()
        )->with('lastLogin');
    }
}

$users = User::withLastLogin()->get();

<table>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Last Login</th>
    </tr>
    @foreach ($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>
                @if ($user->lastLogin)
                    {{ $user->lastLogin->created_at->format('M j, Y \a\t g:i a') }}
                @else
                    Never
                @endif
            </td>
        </tr>
    @endforeach
</table>
```
Và kết quả là có hai query được thực thi, đầu tiên đó là query lấy users:
```sql
select
    "users".*,
    (
        select "id" from "logins"
        where "user_id" = "users"."id"
        order by "created_at" desc
        limit 1
    ) as "last_login_id"
from "users"
```
Nó khá giống với subquery select last login date, chỉ thay login date bằng login id. Từ đó chúng ta có column last_login_id mà không cần sử dụng cache.

Và query thứ hai sẽ tự đông được chạy khi chúng ta eager load with('lastLogin'):
```sql
select * from "logins" where "logins"."id" in (1, 3, 5, 13, 20 ... 676, 686)
```
Subquery cho phép chúng ta select duy nhất 1 bảng ghi last login của user và sử dụng như model Login.
### 3.6. Lazy-loading dynamic relationship
Một điều cần biết đó là bạn không thể sử dụng lazy-loading với kỹ thuật này bởi vì scope withLastLogin không phải là mặc định.
```php
$lastLogin = User::first()->lastLogin; // will return null
```
Nếu bạn muốn sử dụng lazy loading thì bạn vẫn có thể sử global model scope:
```php
class User extends Model
{
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(function ($query) {
            $query->withLastLogin();
        });
    }
}
```
Cách này không được tối ưu, cá nhân tối thích eager load dynamic relationship một cách rõ ràng khi cần.
## 4. Tổng kết
Mình hy vọng qua bài viết cung cấp cho mọi người cái nhìn tổng quan tốt về cách mọi người có thể sử dụng truy vấn con để tạo mối quan hệ động trong Laravel. Đây là một kỹ thuật mạnh mẽ cho phép mọi người đẩy nhiều công việc hơn vào lớp cơ sở dữ liệu của ứng dụng. Điều này có thể có tác động rất lớn đến hiệu suất bởi cho phép mọi người giảm đáng kể số lượng truy vấn cơ sở dữ liệu được thực thi và bộ nhớ tổng thể được sử dụng.

Link tham khảo: [https://reinink.ca/articles/dynamic-relationships-in-laravel-using-subqueries](https://reinink.ca/articles/dynamic-relationships-in-laravel-using-subqueries)

--- Cảm ơn mọi người đã đọc bài viết của mình. Chúc một ngày vui vẻ!!! ---

######                    *<div style="text-align: right"> - by Anh Lee </div>*
