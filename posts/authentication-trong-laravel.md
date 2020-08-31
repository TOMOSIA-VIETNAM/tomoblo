---
title: "Authentication basic Laravel"
date: "2020-08-26"
published: true
tags:
  - php
  - laravel
---

Chào mọi người, hôm nay chúng ta hãy cùng nhau chia sẻ kiến thức về Authentication cơ bản trong Framework Laravel nhé!


#  Khái niệm

***Authentication là gì?***
*Authentication theo Wikipedia:*
là một hành động nhằm thiết lập hoặc chứng thực một điều gì đó (hoặc một người nào đó) đáng tin cậy, có nghĩa là, những lời khai báo do người đó đưa ra hoặc về vật đó là sự thật. Xác thực một đối tượng còn có nghĩa là công nhận nguồn gốc (_provenance_) của đối tượng, trong khi, xác thực một người thường bao gồm việc thẩm tra nhận dạng của họ. Việc xác thực thường phụ thuộc vào một hoặc nhiều nhân tố xác thực (_authentication factors_) để minh chứng cụ thể.

**Authentication Laravel**
Tương tự như khái niệm trên, authentication trong Laravel cũng được dùng để xác thực một điều gì đó như request của người dùng đến sever. 
Đặc biệt Laravel làm cho việc triển khai xác thực rất đơn giản. Trên thực tế, hầu hết mọi thứ đều được cấu hình sẵn sàng cho chúng ta sử dụng một cách dễ dàng và hiệu quả.

## Authentication trong Laravel

Như đã giới thiệu ở trên, Laravel làm cho việc triển khai xác thực trở nên đơn giản và hiệu quả, vậy cách cấu hình và sử dụng như thế nào?

Đầu tiên, hãy mở file `auth.php` trong thư mục config trong project Laravel:
```php
    <?php
    return [
    /*
    
    |--------------------------------------------------------------------------
    
    | Authentication Defaults
    
    |--------------------------------------------------------------------------
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */
    
    'defaults'  => [
	    'guard'  =>  'web',
	    'passwords'  =>  'users',
    ],
    
    /*
    
    |--------------------------------------------------------------------------
    
    | Authentication Guards
    
    |--------------------------------------------------------------------------
    
    |
    
    | Next, you may define every authentication guard for your application.
    
    | Of course, a great default configuration has been defined for you
    
    | here which uses session storage and the Eloquent user provider.
    
    |
    
    | All authentication drivers have a user provider. This defines how the
    
    | users are actually retrieved out of your database or other storage
    
    | mechanisms used by this application to persist your user's data.
    
    |
    
    | Supported: "session", "token"
    
    |
    
    */
    
      
    
    'guards'  => [
	    'web'  => [
		    'driver'  =>  'session',
		    'provider'  =>  'users',
	    ],
	    'api'  => [
		    'driver'  =>  'token',
		    'provider'  =>  'users',
		    'hash'  =>  false,
	    ], 
    ],
 
    /*
    | User Providers
    
    |--------------------------------------------------------------------------
    
    |
    
    | All authentication drivers have a user provider. This defines how the
    
    | users are actually retrieved out of your database or other storage
    
    | mechanisms used by this application to persist your user's data.
    
    |
    
    | If you have multiple user tables or models you may configure multiple
    
    | sources which represent each model / table. These sources may then
    
    | be assigned to any extra authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    
    */
    
      
    
    'providers' => [
	    'users' => [
	    'driver'  =>  'eloquent',
	    'model'  => App\User::class,
    
    ],
    
      
    
    // 'users' => [
    
    // 'driver' => 'database',
    
    // 'table' => 'users',
    
    // ],
    
    ],
    /*
    
    |--------------------------------------------------------------------------
    
    | Resetting Passwords
    
    |--------------------------------------------------------------------------
    
    |
    
    | You may specify multiple password reset configurations if you have more
    
    | than one user table or model in the application and you want to have
    
    | separate password reset settings based on the specific user types.
    
    |
    
    | The expire time is the number of minutes that the reset token should be
    
    | considered valid. This security feature keeps tokens short-lived so
    
    | they have less time to be guessed. You may change this as needed.
    
    |
    
    */
    
    'passwords'=> [
	    'users'=> [
		    'provider'  =>  'users',
		    'table'  =>  'password_resets',
		    'expire'  =>  60,
		    'throttle'  =>  60,
	    ],
    ],
    
    /*
    
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    
    |
    
    | Here you may define the amount of seconds before a password confirmation
    
    | times out and the user is prompted to re-enter their password via the
    
    | confirmation screen. By default, the timeout lasts for three hours.
    */
    'password_timeout'  =>  10800,
    ];
```
Chúng ta đang tìm hiểu cơ bản về Authentication Laravel nên tại đây chúng ta chỉ quan tâm tới phần cấu hình này 
```php
    'providers' => [ 
	    'users' => [ 
		    'driver' => 'eloquent', 
		    'model' => App\User::class, 
        ],
```
*Driver: Đây là thiết lập xác định phương thức lấy thông tin người dùng để xác thực, và như các bạn thấy thì mặc định nó sẽ sử dụng  _**[eloquent]([https://laravel.com/docs/7.x/eloquent](https://laravel.com/docs/7.x/eloquent)),**_ tuy nhiên còn một sự lựa chọn khác là _database_ và thậm trí bạn cũng có thể tạo thêm một driver riêng theo nhu cầu sử dụng của bạn (mình sẽ nói ở phần nâng cao).*

*Model: Đây là thiết lập nguồn dữ liệu lấy ra từ đâu. Ở đây mặc định Laravel chọn là moder User (local: App\User.php). Thông số này bạn có thể chỉnh thành name model của bạn muốn truy xuất để lấy dữ liệu. 
Ví dụ: App\Models\Account.php, App\Models\Admin.php,...*

Hệ thống xác thực Authentication của Laravel được xây dựng dựa trên 2 thành phần cốt lõi - guard và provider.

# Guards

`Guard`  được hiểu là một cách cung cấp logic được dùng để xác thực người dùng. Trong Laravel, thường hay dùng  `session guard`  hoặc  `token guard`.  
+ `Session guard`  duy trì trạng thái người dùng trong mỗi lần request bằng cookie. 
+ `Token guard` xác thực người dùng bằng cách kiểm tra token hợp lệ trong mỗi lần request.

Vì vậy, **guard** xác định logic của việc xác thực, và không cần thiết để luôn xác thực bằng cách lấy các thông tin hợp lệ từ phía back-end. Bạn có thể triển khai một guard mà chỉ cần kiểm tra sự có mặt của một thông tin cụ thể trong headers của request và xác thực người dùng dựa trên điều đó.

# Providers

Nếu  `Guards`  hỗ trợ việc định nghĩa logic để xác thực thì  `Providers`  lấy ra dữ liệu người dùng từ phía back-end. Nếu guard yêu cầu người dùng phải hợp lệ với bộ lưu trữ ở back-end thì việc triển khai truy suất người dùng sẽ được providers thực hiện. Laravel hỗ trợ cho việc người dùng truy xuất sử dụng Eloquent và Query Builder vào database. Tuy nhiên, chúng ta có thể thêm bất kì thay đổi vào. Ví dụ, các bạn đặt model User trong namespace App nữa mà các bạn muốn đặt trong namespace App\Model thì chúng ta sẽ thay đỏi  `providers`  trong file  `app/auth.php`  như sau:

```PHP
'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Model\User::class,
        ],
    ],
```
##  Tạo Auth login cơ bản trong Laravel

Để tạo Auth trong Laravel thì cũng hết sức đơn giản. Chúng ta dùng lệnh:
+ version laravel <= 5.x
```bash
    php artisan make:auth
```
 + version laravel >= 6.x 
```bash
composer require laravel/ui
```

```bash
php artisan ui vue --auth
```
Sau khi chạy lệnh này lên thì Laravel sẽ thêm cho chúng ta một homeController, 2 route và các view mới.

- Ngay lúc này bạn run project lên và sẽ thấy một số thay đổi về giao diện welcome mặc định của Laravel. Có thêm LOGIN & REGISTER ở bên góc trên bên phải màn hình.

![enter image description here](https://s3.ap-northeast-1.amazonaws.com/furublog/media/two-authentication-laravel/Two-Factor-Authentication-Laravel-2.png)

- Click vào LOGIN sẽ hiển thị giao diện form đăng nhập mặc định như sau

![enter image description here](https://blog.haposoft.com/content/images/2020/03/90359819_214514456312271_9219684060106850304_n.png)

- Click vào REGISTER sẽ hiển thị form đăng ký để khởi tạo 1 tài khoản với authenticate của laravel

![enter image description here](https://blog.haposoft.com/content/images/2020/03/90498509_209542350279297_5428125770587308032_n.png)

Các bạn hãy thử đăng ký tại form register và đăng nhập tại form login để hiểu hơn về tính năng. Sau đó check table users trong database xem dữ liệu tài khoản vừa tạo nhé.

## Kết luận
Chúng ta đã cùng nhau tìm hiểu về authentication laravel căn để có thể xây dựng được một authentication để sử dụng cơ bản. Ngoài ra Authentication Laravel còn có rất nhiều điều thú vị khác chúng ta sẽ cùng nhau chia sẻ ở bài viết Authentication Laravel nâng cao, các bạn sẽ thấy thêm phần thú vị về Framework Laravel.