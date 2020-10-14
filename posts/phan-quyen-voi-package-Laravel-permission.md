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

```
composer require spatie/laravel-permission
```

Sau đó, trong config/app.php chúng ta add service provide cho package như sau:

```
'providers' => [
    // ...
    Spatie\Permission\PermissionServiceProvider::class,
    ];
```

Sau đó, publish migration thông qua lệnh:

```
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

Chạy lệnh ```php artisan migrate``` và chúng ta sẽ có các bảng như roles, permissions, role_has_permissions, model_has_roles và model_has_permission

## II. Tạo Role và Permission

Đầu tiên add trait của ```Spatie\Permission\Traits\HasRoles``` vào model mà bạn muốn phần quyền ở đây thì mình sẽ add vào model ``` Admin``` nhé:

```
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasRoles;

    // ...
}
```

Sau đó chúng ta thêm các vai trò (roles) và quyền (permissions), một role có thể có nhiều permission. Chúng ta làm như sau:
```
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => 'sub_admin']);
$permission = Permission::create(['name' => 'management user']);
```

Như trên các bạn đã thấy, mình vừa tạo ra một Role có tên là ```sub_admin``` và một Permission là ```management user```

Một quyền có thể được chỉ định cho một vài cho bằng một trong các phương pháp sau:
```
$role->givePermissionTo($permission);
//hoặc...
$permission->assignRole($role);
```

Nhiều quyền có thể được đồng bộ hóa với một vai trò bằng một trong các phương pháp sau:
```
$role->syncPermissions($permissions);
$permission->syncRoles($roles);
```

Có thể xóa quyền khỏi vai trò bằng một trong các phương pháp sau:
```
$role->revokePermissionTo($permission);
$permission->removeRole($role);
```

Để lấy thông tin tất cả các ```users``` có role là ```sub_admin``` chúng ta làm như sau:
```
$user = Admin::role('sub_admin')->get()
```

hoặc trả về các user có quyền truy cập ```management user```
```
$user = Admin::permission('management user')->get();
```

## III. Cách sử dụng

**_1. Trao quyền trực tiếp cho 1 user_**

Bạn có thể giao một quyền cho một ```user``` như sau:
```
$user->givePermissionTo('management user');
```

bạn cũng có thể giao nhiều quyền user trong một lần hoặc có thể sử dụng mảng:
```
$user->givePermissionTo('management user', 'management contact');
//hoặc
$user->givePermissionTo(['management user', 'management contact']);
```

Để xóa một quyền khỏi một ```user``` nào đó, chúng ta làm như sau :
```
$user->revokePermissionTo('management user');
```

hoặc xóa và thêm mới một quyền khác thì chúng ta làm như sau:
```
$user->syncPermissions(['management user', 'management contact']);
```

Và còn một số option khác, các bạn có thể tham khảo thêm https://spatie.be

**_2. Trao quyền thông qua Role_**

Một roles có thể được trao cho bất cứ ```users``` nào bằng cách :
```
$user->assignRole('edit');
```

Bạn cũng có thể giao nhiều roles cho user trong một lần hoặc có thể sử dụng mảng:
```
$user->assignRole('sub_admin', 'admin');
// hoặc
$user->assignRole(['sub_admin', 'admin'])
```

Bạn có thể xóa và thêm vai trò mới thông qua
```
$user->syncRole('sub_admin')
```

Hoặc để xóa một role khỏi một user, chúng ta chỉ cần làm như sau:
```
$user->removeRole('admin');
```

Bạn cũng có thể check xem liệu ```user``` có phải là ```role``` đang cần tìm bằng cách :
```
$user->hasRole('admin');
```

**_3. Sử dụng với middleware_**

Bạn có thể sử dụng ```can``` như một mặc định để giới hạn quyền truy cập cho trang web bằng cách :
```
Route::group(['middleware' => ['can:management user']], function () {
    //
});
```

Hoặc nếu bạn không muốn sử dụng mặc định, Laravel permission mang đến cho chúng ta các middleware ```RoleMiddleware```, ```PermissionMiddleware``` and ```RoleOrPermissionMiddleware```. Để sử dụng, bạn cần thêm vào app/Http/Kernel.php file như sau:
```
protected $routeMiddleware = [
    // ...
    'role' => \Spatie\Permission\Middlewares\RoleMiddleware::class,
    'permission' => \Spatie\Permission\Middlewares\PermissionMiddleware::class,
];
```

Sau đó sử dụng chúng để kiểm tra các route :
```
// Chỉ có role là super-admin mới có thể truy cập vào các route của group này
Route::group(['middleware' => ['role:super-admin']], function () {
    //
});

// Chỉ có permission là management user thì mới có thể truy cập vào các route của group  này
Route::group(['middleware' => ['permission:management user']], function () {
    //
});
```

**_4. Sử dụng trực tiếp trên Blade_**

Đối với phần view, để hiển thị view tương ứng cho các vai trò, chúng ta có thể sử dụng ```@can```, ```@cannot```, ```@canany```, and ```@guest``` để kiểm tra việc xem thông tin hiển thị trên một trang web. Chúng ta làm như sau:
```
@can('management user')
  //
@endcan
```

Bạn cũng có thể dùng ```role``` để check việc này:
```
@role('sub_admin')
    //
@endrole
```

Hoặc là:
```
@hasrole('sub_admin')
//
@endhasrole
```

Chúng ta có thể linh hoạt trong việc check nhiều ```roles``` hơn như sau:
```
@hasanyrole('sub_admin|admin')
   //
@else
  //
@endhasanyrole
```

## IV. Kết luận
Bài viết trên mình cũng đã giới thiệu và hướng dẫn sử dụng một số tính năng cơ bản trong package laravel permission để phân quyền trong ứng dụng chạy bằng framework Laravel. Cảm ơn các bạn đã đọc bài viết của mình ^-^

######                    *<div style="text-align: right"> - by Phan Trung </div>*
