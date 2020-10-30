---
title: "Authentication Laravel - Multiple Authenticate"
date: "2020-10-07"
published: true
tags:
  - php
  - laravel
---
Ở [bài viết trước](https://blog.tomosia.com/authentication-trong-laravel/) chúng ta đã tìm hiểu về Authentication cơ bản trong framework Laravel và demo một vài tính năng đăng nhập, đăng ký,... Nhưng đó là chỉ là 1 auth user, thông thường 1 website ít nhất sẽ có 2 đối tượng user (User thông thường, User Administrator). Chưa kể có những hệ thống có rất nhiều user và nằm ở các bảng khác nhau trong database. 
Ví dụ: 1 công ty có các cửa hàng, trong cửa hàng có các nhân viên và người dùng mua hàng
Chúng ta sẽ cần có Account Company, Account Shop, Account Employee, Account User và các acc này không có cùng thuộc tính giống nhau nên không thể lưu chung 1 bảng được mà phải lưu ở các bảng khác nhau trong database. Vậy Laravel sẽ xử lý ra sao chúng ta cùng tìm hiểu nhé!

_Authentication basic Laravel_ : 
[https://blog.tomosia.com/authentication-trong-laravel/](https://blog.tomosia.com/authentication-trong-laravel/)
# I. Chuẩn bị dữ liệu
**_1. Database_**
- Dùng migrations để tạo 4 bảng tương ứng với 4 authenticate user của hệ thống
```bash
php artisan make:migration create_admins_table --create=admins
php artisan make:migration create_shops_table --create=shops
php artisan make:migration create_admins_table --create=employees
php artisan make:migration create_users_table --create=users
```
  + migration `create_admins_table`
```php
  public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->string('remember_token');
            $table->timestamps();
        });
    }
```
  + migration `create_shops_table`
```php
  public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->integer('company_id');
            $table->string('remember_token');
            $table->timestamps();
        });
    }
```
  + migration `create_employees_table`
```php
  public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->integer('company_id');
            $table->integer('shop_id');
            $table->string('remember_token');
            $table->timestamps();
        });
    }
```
  + migration `create_users_table`
```php
  public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('name');
            $table->string('password');
            $table->text('address');
            $table->integer('created_by');
            $table->string('remember_token');
            $table->timestamps();
        });
    }
```
- chạy câu lệnh để chạy 4 migration trên khởi tạo thành 4 bảng tương ứng trong database
```bash
php artisan migrate
```
**_2. Model_**
- Tạo 1 thư mục app/Models trong projects sau đó tạo 4 models tương ứng các bảng vừa tạo

  + Để tránh dài dòng chúng ta chỉ ví dụ 1 Model cho bảng Admin, các bảng khác tạo tương tự:
```php
    namespace App\Models;

    use Illuminate\Notifications\Notifiable;
    use Illuminate\Foundation\Auth\User as Authenticatable;

    class Admin extends Authenticatable
    {
        use Notifiable;

        protected $guard = 'admin';

        protected $fillable = [
            'name', 'email', 'password',
        ];

        protected $hidden = [
            'password', 'remember_token',
        ];
    }
```

  + Ở đây **Model Admin** có extends **Authenticatable** của Laravel để kế thừa các dặc tính Authenticate của Laravel và sử dụng như 1 model bình thường.
  + Tiếp theo ta có thêm thành phần 
```php
  protected $guard = 'admin';
```
mục đích để khai báo tên GUARD cho model và sau này sử dụng authenticate Admin, tên GUARD sẽ sử dụng rất thường xuyên và quan trọng.

- Các model còn lại các bạn tạo tương tự Model Admin nhé!

## II Cấu hình
- Giờ chúng ta sẽ đi vào việc cấu hình các luồng xác thực cho các đối tượng User vừa khởi tạo dữ liệu và model.

**GUARD**
- Laravel cho phép chúng ta được sử dụng nhiều guardard, mỗi guard sẽ ứng với 1 thành phần xác thực khác nhau. Việc cấu hình guard ở file `Config/auth.php`
  + cấu hình guard mặc định của Laravel như sau:
```php
  'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
            'hash' => false,
        ],
    ],
```
Mặc định chỉ có 2 guard là web và api, nhưng chúng ta có tới 4 guard như đã nói trên thì sẽ câu hình như sau:
```php
'guards' => [
        'admin' => [
            'driver' => 'session',
            'provider' => 'admin_provider',
        ],
        'shop' => [
            'driver' => 'session',
            'provider' => 'shop_provider',
        ],
        'employee' => [
            'driver' => 'session',
            'provider' => 'employee_provider',
        ],
        'user' => [
            'driver' => 'session',
            'provider' => 'user_provider',
        ],
    ],
```

**PROVIDER**
- Chắc các bạn cũng đã thấy cấu hình guard vừa rồi mình cũng đã thay đổi cả tên provider của từng guard. Tiếp theo mình sẽ hướng dẫn các bạn cấu hình provider nhé!

Guard để xác thực người dùng còn Provider sẽ lấy ra dữ liệu người dùng sau khi xác thực, vậy nên việc cấu hình Provider sẽ liên quan tới việc liên kết Authenticate tới Model tương ứng. Việc cấu hình vẫn ở trong `app/auth.php`.
```php
'providers' => [
        'admin_provider' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
        'shop_provider' => [
            'driver' => 'eloquent',
            'model' => App\Models\Shop::class,
        ],
        'employee_provider' => [
            'driver' => 'eloquent',
            'model' => App\Models\Employee::class,
        ],
        'user_provider' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

    ],
```

**ROUTE**
- như vậy từ việc cấu hình ở Guard liên kết vói Provider và Provider liên kết với Model thì chúng ta đã hoàn tất việc cấu hình về cơ bản cho các autheticate. Giờ thì chúng ta khai báo các route tương ứng để thực hiện các chức năng cơ bản của 1 authenticate như đăng nhập, đăng ký, quên mật khẩu,... như sau:

+ Ví dụ với Admin, còn lại các bạn làm tương tự
```php
Route::get('/login', 'LoginController@showLoginForm');
Route::post('/login', 'LoginController@login')->name('login');

Route::group(['namespace' => 'Admin', 'prefix' => 'admin'], function () {
   Route::group(['middleware' => ['auth:admin']], function () {
       Route::get('/home', 'HomeController@index');
   });
});
```
Tại đây mình đã gọi tới LoginController để hiển thị form login với `function showLoginForm` và check login cho Admin với `function login`, sau khi login thành công với Auth Admin sẽ điều hướng tới trang home.

## III Xử lý multiple authenticate
**_1. Controller_**

- Tại đây mình mô tả cách xử lý chung các autheticate trong 1 controller, nếu các bạn muốn xử lý riêng thì tách controller xử lý tương tự.
```php
<?php
namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */

    protected $redirectTo = '/home';
    /**
     * Create a new controller instance.
     *
     * @return void
     */

     const ALL_GUARD = [
       'admin', 'shop', 'employee', 'user'
     ];

    public function guard()
    {
        return Auth::guard('admin');
    }

    function login(Request $request) 
    {
      $dataLogin = $request->only(['email', 'password']);
      foreach (self::ALL_GUARD as $guard) {
        if (Auth::guard($guard)->attempt($dataLogin)) {
          return redirect('/'.$guard.'/home');
        }
      }
      return redirect('/login');
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }
}
```
- Tại đây chúng ta khi `use AuthenticatesUsers` đã xử lý tương đối cho việc login rồi nhưng để dễ hình dung mình có viết lại 1 số function để tự xử lý logic login theo ý mình. Ví dụ:
```php
  function login(Request $request) 
    {
      $dataLogin = $request->only(['email', 'password']);
      foreach (self::ALL_GUARD as $guard) {
        if (Auth::guard($guard)->attempt($dataLogin)) {
          return redirect('/'.$guard.'/home');
        }
      }
      return redirect('/login');
    }
```
Đơn giản chỉ là check từng guard một xem email, password tại guard nào xác thực thành công sẽ khởi tạo phiên đăng nhập và điều hướng tới trang home. Tuy nhiên cách xử lý này không tối ưu mà chỉ mang tính ngắn gọn demo, còn nhiều vấn đề. Mình khuyến khích các bạn nên tách riêng Controller xử lý cho từng authenticate.

**_2. Middleware_**
- Chúng ta khởi tạo middleware để sau khi login sẽ xác thực việc truy cập tới mỗi route của người dùng. Ví dụ Middleware cho Admin như sau:

+ Chạy câu lệnh tạo middleware:
```bash
php artisan make:middleware AdminAuth
```

+ Tại middleware AdminAuth code như sau:
```php
<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Support\Facades\Auth;

class AdminAuth
{
    use ResponseTrait;

    const GUARD_ADMIN = 'admin';

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::guard(self::GUARD_ADMIN)->check()) {
            return $next($request);
        }

        return abort(401);
    }
}
```

+ Khai báo middleware trong `app/Http/Middleware/Kernel.php` để sử dụng middleware. Khai báo thêm `'admin' => \App\Http\Middleware\AdminAuth::class` vào $routeMiddleware như sau:
```php
  protected $routeMiddleware = [
      ...
      'admin' => \App\Http\Middleware\AdminAuth::class,
      ...
  ];
```

## IV. Kết luận
- **Multiple Authenticate** rất tiện lợi và dễ sử dụng, hơn nữa nó làm cho Framework Laravel trở nên ưu việt hơn khi có thể kết hợp được với nhiều thư viện authenticate khác để xây dựng hệ thống website đa dạng hơn hoặc 1 service API tuyệt vời.
- Mong bài viết này sẽ phần nào giúp các bạn hiểu được cơ bản về **multiple authenticate Laravel** giúp các bạn có thể ứng dụng được khi làm project và yêu thích PHP & Laravel hơn để có thể tìm hiểu sâu và cùng nhau chia sẻ các kiến thức về lĩnh vực lập trình PHP & Laravel nhé!
