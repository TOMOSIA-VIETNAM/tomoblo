---
title: "CakePHP 4: Routing"
date: "2020-11-05"
published: true
tags:
  - php
  - cakephp
---
Bài viết này mình sẽ giới thiệu các cách định nghĩa routing hay dùng khi làm việc với CakePHP 4. Các routing được định nghĩa trong file **config/routes.php**. Cakephp 4 sử dụng _class_ `Cake\Routing\RouterBuilder` để mapping URL với controller action.

### 1. Định nghĩa routing đơn giản
Định nghĩ 1 routing lấy tất cả các bài viết

```php
$routes->connect('/articles', ['controller' => 'Articles', 'action' => 'index']);
```

Giờ khi truy cập vào url `/articles` sẽ mapping đến method index trong controller Articles.

### 2. Truyền tham số cho action

```php
// routes.php
$routes->connect(
    '/articles/{id}',
    ['controller' => 'Articles', 'action' => 'view']
)
->setPass(['id'])
->setPatterns([
    'id' => '\d+',
]);

// Viết ngắn ngọn hơn
$routes->connect(
    '/articles/{id}',
    ['controller' => 'Articles', 'action' => 'view'],
    ['id' => '\d+', 'pass' => ['id']]
);
// src/Controller/ArticlesController.php
public function view($id = null)
{
    // Some code here...
}
```

Với khai báo này ta đã validate {id} trên url bắt buộc phải là số và khi truy cập vào url `/articles/{id}` mapping với controller Articles action view và tham số id trên url sẽ là đối số $id của action view.

### 3. Đặt tên

```php
// Đặt tên cho route dùng hàm connect.
$routes->connect(
    '/login',
    ['controller' => 'Users', 'action' => 'login'],
    ['_name' => 'login']
);

// Đặt tên khi sử dụng specific route
$routes->post(
    '/logout',
    ['controller' => 'Users', 'action' => 'logout'],
    'logout'
);
```

### 4. Gom nhóm route

Code chưa gom nhóm

```php
$routes->connect('/articles', ['controller' => 'Articles', 'action' => 'index']);
$routes->connect(
    '/articles/{id}',
    ['controller' => 'Articles', 'action' => 'view'],
    ['id' => '\d+', 'pass' => ['id']]
  );
```
Code sau khi gom nhóm

```php
$routes->scope('/articles', function (RouteBuilder $routes) {
  $routes->connect('/', ['controller' => 'Articles', 'action' => 'index']);
  $routes->connect(
    '/{id}',
    ['controller' => 'Articles', 'action' => 'view'],
    ['id' => '\d+', 'pass' => ['id']]
  );
})
```

Gom nhóm và set sub namespace cho controller

```php
$routes->scope('/admins', ['prefix' => 'Admins'], function (RouteBuilder $routes) {
  $routes->scope('/articles', function (RouteBuilder $routes) {
    $routes->connect('/', ['controller' => 'Articles', 'action' => 'index']);
    $routes->connect(
      '/{id}',
      ['controller' => 'Articles', 'action' => 'view'],
      ['id' => '\d+', 'pass' => ['id']]
    );
  })
})
```

Việc gom nhóm sẽ giúp code không bị lặp lại và quản lý code dễ dàng hơn


### 5. Matching Specific HTTP Methods

```php
$routes->scope('/articles', function (RouteBuilder $routes) {
    // route này cho mapping với POST request.
    $routes->post(
        '/',
        ['controller' => 'Articles', 'action' => 'store']
    );

    // route này cho mapping với POST hoặc PUT request.
    $routes->connect(
        '/{id}',
        [
            'controller' => 'Articles',
            'action' => 'edit',
        ]
    )->setMethods(['POST', 'PUT']);
});
```

Phần này giúp validate http request đến controller action, có thể chỉ cho phép 1 phương thức HTTP hoặc nhiều.

### 6. Route middleware

Khi muốn sử dụng middleware trong 1 scope đầu tiên cần đăng kí middleware đó.

```php
use Cake\Http\Middleware\CsrfProtectionMiddleware;
use Cake\Http\Middleware\EncryptedCookieMiddleware;

$routes->scope('/', function (RouteBuilder $routes) {
  $routes->registerMiddleware('csrf', new CsrfProtectionMiddleware());
  $routes->registerMiddleware('cookies', new EncryptedCookieMiddleware());
});

```

Sau đó mới có thể sử dụng middleware

```php
use Cake\Http\Middleware\CsrfProtectionMiddleware;
use Cake\Http\Middleware\EncryptedCookieMiddleware;

$routes->scope('/', function (RouteBuilder $routes) {
  $routes->registerMiddleware('csrf', new CsrfProtectionMiddleware());
  $routes->registerMiddleware('cookies', new EncryptedCookieMiddleware());
  $routes->scope('/cms', function (RouteBuilder $routes) {
    // Enable CSRF & cookies middleware
    $routes->applyMiddleware('csrf', 'cookies');
    $routes->get('/articles/{action}/*', ['controller' => 'Articles'])
  });
});

```

### 7. Resource Routes

Khi viết resfull api chúng ta sẽ rất hay sử dụng resource route, và cakePhp 4 cũng có luôn.

```php
$routes->scope('/api', function (RouteBuilder $routes) {
  $routes->resources('articles');
});
```

```
/api/articles
/api/articles/{id}
```

### 8. Nested Resource Routes

```php
$routes->scope('/api', function (RouteBuilder $routes) {
    $routes->resources('Articles', function (RouteBuilder $routes) {
        $routes->resources('Comments');
    });
});
```

```
/api/articles/{article_id}/comments
/api/articles/{article_id}/comments/{id}
```

### Lời kết

Trên dây là các khai báo route hay dùng khi sử dụng CakePhp 4. Hi vọng bài viết sẽ giúp ích cho mọi người.

### Nguồn tham khảo
- [https://book.cakephp.org/4/en/development/routing.html](https://book.cakephp.org/4/en/development/routing.html)

###### *<div style="text-align: right"> [Huunv | Nguyễn Văn Hữu ] </div>*
