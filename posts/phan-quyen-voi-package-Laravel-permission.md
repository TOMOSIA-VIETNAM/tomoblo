---
title: "[Laravel] Simple authorization with the Laravel permission package"
date: "2020-10-14"
published: true
tags:
  - php
  - laravel
---
Như các bạn đã biết, phân quyền trong một ứng dụng là một phần không thể thiếu trong việc phát triển phần mềm. Vậy nên, hôm nay mình sẽ giới thiệu một package có thể giúp các bạn phân quyền nhanh và đơn giản trong một website được viết bằng PHP với framework là Laravel. Đó là package laravel-permission. Chúng ta cùng tìm hiểu nhé!

# I. Cài đặt Laravel permission

Laravel permission cho phép chúng ta có thể dễ dàng phân chia các vai trò (roles) và quyền (permissions) dùng để quản lý quyền hạn truy cập trong một trang web. Để cài đặt package này, chúng ta cần:
-   Laravel phiên bản cao hơn 5.8
-   Nếu bạn đang có sẵn file ```config/permission.php``` bạn phải đổi tên hoặc xóa, bởi vì khi setup thì package sẽ được publishes vào ```config/permission.php```
Chúng ta chạy câu lệnh dưới để cài đặt package nhé:

```php
composer require spatie/laravel-permission
```

Sau đó, trong config/app.php chúng ta add service provide cho package như sau:

```php
'providers' => [
    // ...
    Spatie\Permission\PermissionServiceProvider::class,
    ];
```

Sau đó, publish migration thông qua lệnh:

```php
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

Chạy lệnh ```php artisan migrate``` và chúng ta sẽ có các bảng như roles, permissions, role_has_permissions, model_has_roles và model_has_permission

## II. Tạo Role và Permission

Đầu tiên add trait của ```Spatie\Permission\Traits\HasRoles``` vào model mà bạn muốn phần quyền ở đây thì mình sẽ add vào model ``` Admin``` nhé:

```php
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasRoles;

    // ...
}
```

Sau đó chúng ta thêm các vai trò (roles) và quyền (permissions), một role có thể có nhiều permission. Chúng ta làm như sau:
```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => 'subAdmin']);
$permission = Permission::create(['name' => 'managementUser']);
```

Như trên các bạn đã thấy, mình vừa tạo ra một Role có tên là ```subAdmin``` và một Permission là ```managementUser```

Một quyền có thể được chỉ định cho một vài cho bằng một trong các phương pháp sau:
```php
$role->givePermissionTo($permission);
//or...
$permission->assignRole($role);
```

Nhiều quyền có thể được đồng bộ hóa với một vai trò bằng một trong các phương pháp sau:
```php
$role->syncPermissions($permissions);
$permission->syncRoles($roles);
```

Có thể xóa quyền khỏi vai trò bằng một trong các phương pháp sau:
```php
$role->revokePermissionTo($permission);
$permission->removeRole($role);
```

Để lấy thông tin tất cả các ```users``` có role là ```subAdmin``` chúng ta làm như sau:
```php
$user = Admin::role('subAdmin')->get()
```

hoặc trả về các user có quyền truy cập ```managementUser```
```php
$user = Admin::permission('managementUser')->get();
```

## III. Cách sử dụng

**_1. Trao quyền trực tiếp cho 1 user_**

Bạn có thể giao một quyền cho một ```user``` như sau:
```php
$user->givePermissionTo(managementUser');
```

bạn cũng có thể giao nhiều quyền user trong một lần hoặc có thể sử dụng mảng:
```php
$user->givePermissionTo('managementUser', 'managementContact');
//or
$user->givePermissionTo(['managementUser', 'managementContact']);
```

Để xóa một quyền khỏi một ```user``` nào đó, chúng ta làm như sau :
```php
$user->revokePermissionTo('managementUser');
```

hoặc xóa và thêm mới một quyền khác thì chúng ta làm như sau:
```php
$user->syncPermissions(['managementUser', 'managementContact']);
```

Và còn một số option khác, các bạn có thể tham khảo thêm https://spatie.be

**_2. Trao quyền thông qua Role_**

Một roles có thể được trao cho bất cứ ```users``` nào bằng cách :
```php
$user->assignRole('edit');
```

Bạn cũng có thể giao nhiều roles cho user trong một lần hoặc có thể sử dụng mảng:
```php
$user->assignRole('subAdmin', 'admin');
// or
$user->assignRole(['subAdmin', 'admin'])
```

Bạn có thể xóa và thêm vai trò mới thông qua
```php
$user->syncRole('subAdmin')
```

Hoặc để xóa một role khỏi một user, chúng ta chỉ cần làm như sau:
```php
$user->removeRole('admin');
```

Bạn cũng có thể check xem liệu ```user``` có phải là ```role``` đang cần tìm bằng cách :
```php
$user->hasRole('admin');
```

**_3. Sử dụng với middleware_**

Bạn có thể sử dụng ```can``` như một mặc định để giới hạn quyền truy cập cho trang web bằng cách :
```php
Route::group(['middleware' => ['can:managementUser']], function () {
    //
});
```

Hoặc nếu bạn không muốn sử dụng mặc định, Laravel permission mang đến cho chúng ta các middleware ```RoleMiddleware```, ```PermissionMiddleware``` and ```RoleOrPermissionMiddleware```. Để sử dụng, bạn cần thêm vào app/Http/Kernel.php file như sau:
```php
protected $routeMiddleware = [
    // ...
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
];
```

Sau đó sử dụng chúng để kiểm tra các route :
```php
Route::group(['middleware' => ['role:super-admin']], function () {
    //
});

Route::group(['middleware' => ['permission:managementUser']], function () {
    //
});
```

**_4. Sử dụng trực tiếp trên Blade_**

Đối với phần view, để hiển thị view tương ứng cho các vai trò, chúng ta có thể sử dụng ```@can```, ```@cannot```, ```@canany```, and ```@guest``` để kiểm tra việc xem thông tin hiển thị trên một trang web. Chúng ta làm như sau:
```php
@can('managementUser')
  //
@endcan
```

Bạn cũng có thể dùng ```role``` để check việc này:
```php
@role('subAdmin')
    //
@endrole
```

Hoặc là:
```php
@hasrole('subAdmin')
//
@endhasrole
```

Chúng ta có thể linh hoạt trong việc check nhiều ```roles``` hơn như sau:
```php
@hasanyrole('subAdmin|admin')
   //
@else
  //
@endhasanyrole
```

## IV. Kết luận
Bài viết trên mình cũng đã giới thiệu và hướng dẫn sử dụng một số tính năng cơ bản trong package laravel permission để phân quyền trong ứng dụng chạy bằng framework Laravel. Cảm ơn các bạn đã đọc bài viết của mình ^-^

######                    *<div style="text-align: right"> - by Phan Trung </div>*
