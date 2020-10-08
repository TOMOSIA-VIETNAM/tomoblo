---
title: "Widget trong Laravel"
date: "2020-10-08"
published: true
tags:
  - php
  - laravel
---
Bài viết này mình muốn chia sẻ với các bạn một gói xây dựng Widget trong Laravel khá hữu dụng và ổn định, để biết chi tiết hơn chúng ta cùng đi vào vấn đề luôn nhé!

_version laravel_ >= 5.5

# I. Giới thiệu
- Trong quá trình xây dựng website chúng ta thường có rất nhiều các thành phần lặp đi lặp lại việc xử lý logic
  + Calenda, Chart, List,... trong các website phía quản trị admin hoặc hệ thống quản lý
  + 1 website tin tức luôn có 1 sidebar left hiển thị các bài viết mới nhất, bài viết liên quan.
  + 1 website thương mại điện tử dưới mỗi detail sản phẩm luôn hiển thị slider sản phẩm liên quan....
- Các vấn đề trên về logic xử lý thì giống nhau nhưng có thể chỉ khác về Input. Việc lặp lại khiến code khó maintain khi thay đổi, các lớp xử lý logic sinh ra nhiều khó quản lý, hiệu năng không đảm bảo. Vì vậy mình đã tìm 1 ra gói Laravel Widget có thể hỗ trỡ mình giải quyết vấn đề đó khi xây dựng website bằng Framework Laravel.
- Laravel Widget được xây dựng nhằm mục đích hỗ trợ các website tối ưu cơ bản quá trình xây dựng các thành phần trong web cả về logic, giao diện và clean code. Tương tác tốt với các lớp và cấu hình & cài đặt dễ dàng, dễ sử dụng. Tính mở rộng cũng rất cao hỗ trợ rất tốt cho blade view. 

# II. Chi tiết
## Cài đặt
- Việc cài đặt dễ dàng với câu lệnh
```bash
composer require arrilot/laravel-widgets
```
- Version Laravel >= 5.5

## Sử dụng
_Để dễ hình dung về 1 case chúng ta sẽ đi vào ví dụ là 1 website tin tức và khi bạn truy cập vào website này, luôn có 1 thành phần hiển thị các tin tức đã xem gần đây của bạn. Chúng ta sẽ tạo 1 widget xử lý điều đó nhé!_

- Đầu tiên, chúng ta chạy 1 câu lệnh tạo ra 1 widget được cung cấp bởi gói đã cài đặt trên:
```bash 
php artisan make:widget RecentNews
```
lệnh này sẽ tạo ra 2 file: `resources/views/widgets/recent_news.blade.php` (1 file blade view trống) và `app/Widgets/RecentNews` (nếu bạn không muốn tạo file view thì thêm `--plain` vào cuối câu lệnh trên)

File `app/Widgets/RecentNews` có nội dung như sau:
```php
  namespace App\Widgets;
  
  use Arrilot\Widgets\AbstractWidget;
  
  class RecentNews extends AbstractWidget
  {
      /**
      * The configuration array.
      *
      * @var array
      */
      protected $config = [];

      /**
      * Treat this method as a controller action.
      * Return view() or other content to display.
      */
      public function run()
      {
          return view('widgets.recent_news', [
              'config' => $this->config,
          ]);
      }
  }
```
tại đây sẽ xử lý logic dữ liệu và hiển thị widget, khá giống với vai trò 1 controller. Bạn có thể đưa các lớp vào đây xử lý. Ví dụ mình muốn sử dụng 1 repository `NewsRepository` hoặc 1 model `News` có thể truyền vào `function run()` sau đó truyền params ra view của widget như sau:

```php
public function run(NewsRepository $newRepository)
{
    $listNews = News::get();
    $newsRecents = $newRepository->getListRecent();

    return view('widgets.recent_news', [
        'config' => $this->config,
        'news' => $listNews,
        'newsRecents' => $newsRecents
    ]);
}
```
- Tiếp theo để hiển thị view widget `recentNews` chúng ta có thể đặt `@widget('recentNews')` ở bất kỳ blade view nào chúng ta muốn, widget sẽ hiển thị ở vị trí đó. Ví dụ nội dung file `resource/views/widgets/recent_news.php`:
```php
<div class="col-md-4">
  <h1>Tin tức đã xem</h1>
  @foreach ($newsRecents as $news)
  <div class="box-news-recent">
    <span class="title">{{ $news->title }}</span>
    <img src="{{ $news->thumbnail }}" alt="{{ $news->title }}" width="70">
  </div>
  @foreach
</div>
```
Giờ hiển thị vào `resource/views/news/index.php` là 1 file view chúng ta chỉ cần chèn đoạn code gọi widget này ở bất kỳ đâu trong file đó:
```php
@widget('newsRecent')
```
hoặc:
```php
{{ Widget::run('recentNews') }}
```
hoặc tiếp:
```php
{{ Widget::recentNews() }}
```

## Truyền các tham số vào Widget (Passing variables to widget)
### truyền qua mảng cấu hình ($config)
```php
class RecentNews extends AbstractWidget
{
    ...
    protected $config = [
        'count' => 5
    ];
    ...
}

...
@widget('recentNews') // shows 5
@widget('recentNews', ['count' => 10]) // shows 10
```
- `count` cho phép chúng ta hiển thị widget đó lặp lại liên tiếp.
- Có thể truyền các giá trị tuỳ biến từ bên ngoài vào widget thông qua `$config` ví dụ `@widget('recentNews', ['foo' => 'bar']) `, bên trong `app/Widgets/RecentNews` tại `function run()` chúng ta có thể đọc được param vừa truyền:
```php
  public function run()
  {
    $foo = $this->config['foo']; // $foo == 'bar' 
    ...
    return view('widgets.recent_news', [
        'config' => $this->config
    ]);
  }
```

## Widget bất đồng bộ (Asynchronous widgets)

Trong một vài trường hợp, load widget bằng Ajax rất có lợi. Việc load widget bất đồng bộ cũng rất đơn giản, chỉ cần đổi cú pháp từ `Widget:: => AsyncWidget::` và `@widget => @asyncWidget` là xong.
- Các tham số của widget sẽ được mã hóa (theo mặc định) và được gửi qua lệnh gọi ajax. Vì vậy, khi nhận tham số hãy sử dụng `json_encoded()` và `json_decoded()`.

###### _Lưu ý: Bạn có thể tắt mã hóa cho một **widget** cụ thể bằng cách thêm_ `public  $encryptParams = false;` _trong đó. Tuy nhiên, hành động này là không khuyến khích nếu không thực sự cần thiết vì không an toàn._

###### _Lưu ý: Bạn có thể đặt_ `use_jquery_for_ajax_calls = true` _trong tệp cấu hình để sử dụng nó cho các cuộc gọi ajax nếu muốn, nhưng bạn cần thêm jquery vào trang của mình theo cách thủ công trong trường hợp này._

- Mặc định trong quá trình call Ajax hiển thị widget thì sẽ không có gì hiển thị khi loading, bạn có thể custom bằng `function placeholder()` cho việc hiển thị đó:
```php
  ...
  public function placeholder()
  {
      return 'Loading...';
  }
```

## Tự động tải lại Widget (Reloadable widgets)
- Bạn có thể cấu hình đơn giản tải lại Widget sau N giây bạn muốn.
- Chỉ cần set `$reloadTimeout` là xong
```php
  class RecentNews extends AbstractWidget
  {
      /**
      * The number of seconds before each reload.
      *
      * @var int|float
      */
      public $reloadTimeout = 10;
  }
``` 
###### _Lưu ý: Cân nhắc sử dụng tính năng này một cách hợp lý không sẽ trở thành spam.

## Caching
- Cache 1 widget bằng cách set `public $cacheTime`
```php
class RecentNews extends AbstractWidget
{
    /**
     * The number of minutes before cache expires.
     * False means no caching at all.
     *
     * @var int|float|bool
     */
    public $cacheTime = 60;
}
```

## Widget groups
- Thông thường chúng ta sẽ hiển thị các widget bằng cách viết chúng vào blade view muốn hiển thị. Nhưng còn 1 cách khác cho phép chúng ta có thể sắp xếp vị trí widget, nhóm chúng lại và có thể viết trong controller với cú pháp đơn giản:
```php
// add several widgets to the 'sidebar' group anywhere you want (even in controller)
Widget::group('sidebar')->position(5)->addWidget('widgetName1', $config1);
Widget::group('sidebar')->position(4)->addAsyncWidget('widgetName2', $config2);

// display them in a view in the correct order
@widgetGroup('sidebar')
// or 
{{ Widget::group('sidebar')->display() }}
```

- Bạn có thể đặt dấu phân cách tuỳ ý vào giữa các widget được group lại `Widget::group('sidebar')->setSeparator('<hr>')->...;`

- Bạn cũng có thể gói từng widget trong một nhóm bằng `wrap` bằng cách:
```php
Widget::group('sidebar')->wrap(function ($content, $index, $total) {
    // $total is a total number of widgets in a group.
    return "<div class='widget-{$index}'>{$content}</div>";
})->...;
```

### Removing widgets from a group
- Trong một số trường hợp khi hiển thị ta phải bỏ 1 số widget vì một vài điều kiện thì có các cách sau
1. loại bỏ widget khỏi group bằng unique ID
```php
  $id1 = Widget::group('sidebar')->addWidget('files');
  $id2 = Widget::group('sidebar')->addAsyncWidget('files');
  Widget::group('sidebar')->removeById($id1); // There is only second widget in the group now
```

2. Xoá tất cả widgets ra khỏi group bằng specific name
ví dụ add 2 widget cùng có specific name là `"files"` sau đó thực hiện xoá các widget có specific name = "files"
```php
Widget::group('sidebar')->addWidget('files');
Widget::group('sidebar')->addAsyncWidget('files');
Widget::group('sidebar')->removeByName('files'); // Widget group is empty now
```

3. Xoá tất cả widgets có cùng position ra khỏi group.
```php
Widget::group('sidebar')->position(42)->addWidget('files');
Widget::group('sidebar')->position(42)->addAsyncWidget('files');
Widget::group('sidebar')->removeByPosition(42); // Widget group is empty now
```
4. Xoá tất cả widget trong group
```php
Widget::group('sidebar')->addWidget('files');
Widget::group('sidebar')->addAsyncWidget('files');
Widget::group('sidebar')->removeAll(); // Widget group is empty now
```

### Kiểm tra trạng thái của group (Checking the state of a group)
```php
Widget::group('sidebar')->isEmpty(); // bool

Widget::group('sidebar')->any(); // bool

Widget::group('sidebar')->count(); // int
```

## Kết luận
- Qua bài viết trên chúng ta có thể thấy Laravel Widget dễ sử dụng, cú pháp thân thiện và giải quyết được nhiều vấn đề trong quá trình xây dựng website.
- Laravel Widget tương thích với nhiều phiên bản của Laravel và khá linh hoạt trong bất kể Design pattern nào.
- Tuy nhiên vẫn còn 1 số điểm hạn chế về việc sử dụng bất đồng bộ, pagination,... và quá trình phát triển phải custom lại 1 số thứ về logic xử lý.

## Tài liệu tham khảo
- Các bạn có thể đọc tài liệu gốc & follow update Laravel Widget tại đây
[https://github.com/arrilot/laravel-widgets](https://github.com/arrilot/laravel-widgets)

######                    *<div style="text-align: right"> - by Ngoc Quan </div>*