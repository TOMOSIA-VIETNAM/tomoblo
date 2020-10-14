---
title: "CakePHP Testing for Beginner"
date: "2020-10-14"
published: true
tags:
  - php
---
CakePHP cung cấp khá nhiều các chức năng hữu ích cho lập trình viên trong đó có việc tích hợp sẵn PHPUnit. Ngoài các tính năng do PHPUnit cung cấp, CakePHP cũng cung cấp một số tính năng bổ sung giúp việc kiểm thử dễ dàng hơn. Bài viết này bao gồm việc hướng dẫn cài đặt PHPUnit và thực hiện một vài kiểm thử đơn giản. 

# I. Cài đặt PHPUnit.

**_1. Cài đặt_**

PHPUnit có thể được cài đặt thông qua _PHAR package_ hoặc _Composer_.
- Cài đặt PHPUnit bằng Composer.
```bash
composer require --dev phpunit/phpunit:"^8.5"
```
- Cài đặt PHPUnit bằng PHAR package.
```bash
php phpunit.phar
```
**_2. Thiết lập cơ sỡ dử liệu_**

Hãy chắc chắn rằng bạn đã bật _debug_ trong tệp config/app.php trước khi chạy bất kì thử nghiệm nào. Bạn cũng cần cấu hình và tạo một cơ sở dữ liệu mới cho việc kiểm thử để tránh mất dữ liệu trong dự án. Đây là cấu hình cơ bản mà CakePHP hỗ trợ:
```php
'Datasources' => [
    'test' => [
        'datasource' => 'Cake\Database\Driver\Mysql',
        'persistent' => false,
        'host' => 'dbhost',
        'username' => 'dbname',
        'password' => 'dbpass',
        'database' => 'test_database'
    ],
],
```
**_3. Chạy PHPUnit_**

Bây giờ bạn có thể chạy PHPUnit bằng cách:
```bash
vendor/bin/phpunit
```
hoặc
```bash
composer test
```
Để chạy PHPUnit cho một thử nghiệm cụ thể, bạn có thể cung cấp đường đẫn đến thử nghiệm theo dạng tham số. Ví dụ: nếu bạn có một thử nghiệm cho lớp **ArticlesTableTest**, bạn có thể chạy:
```bash
composer test tests/TestCase/Model/Table/ArticlesTableTest
```
Nếu bạn thấy thông báo màu xanh với trạng thái là **OK** cùng một số thông tin về quá trình thử nghiệm thì việc kiểm thử của bạn đã thành công. Ngược lại, nếu thấy thông báo màu đỏ và trạng thái là **FAILURES** cùng các thông tin về lỗi thì việc kiểm thử đã thất bại, bạn cần kiểm tra lại code của mình. Lưu ý, nếu bạn đang sử dụng Window thì thông báo sẽ không hiện thị màu nên hãy nhận biết bằng trạng thái để biết việc kiểm thử có thành công hay không.

# II. Quy ước và tạo kiểm thử.

**_1. Quy ước về kiểm thử_**

Giống như hầu hết mọi thứ trong CakePHP, việc tạo và chạy các kiểm thử cũng có một số quy ước:
1. Các tệp PHP chứa các thử nghiệm phải nằm trong thư mục _tests/TestCase/[Type]_.
2. Tên các tệp phải kết thúc bằng **Test.php** thay vì **.php** như các tệp thông thường.
3. Các lớp chứa các thử nghiệm nên được kế thừa từ các lớp: Cake\TestSuite\TestCase, Cake\TestSuite\IntegrationTestCase hoặc \PHPUnit\Framework\TestCase.
4. Tên lớp cần phải khớp với tên tệp. VD: class RouterTest extends TestCase.
5. Tên của bất kì phương thức nào trong tệp mà có chứa các khẳng định (assertion) phải bắt đầu bằng test, ví dụ: testPublished. 

**_2. Tạo kiểm thử đầu tiên_**

Trong ví dụ sau, chúng ta sẽ tạo phương thức _bar()_ trong một _Helper_.
```php
namespace App\View\Helper;

use Cake\View\Helper;

class ProgressHelper extends Helper
{
    public function bar($value)
    {
        $width = round($value / 100, 2) * 100;
        return sprintf(
            '<div class="progress-container">
                <div class="progress-bar" style="width: %s%%"></div>
            </div>', $width);
    }
}
```
Đây là một ví dụ đơn giản, nhưng sẽ rất hữu ích để bắt đầu một thử nghiệm. Sau khi tạo _Helper_ chúng ta sẽ tạo tệp **tests/TestCase/View/Helper/ProgressHelperTest.php**.
```php
namespace App\Test\TestCase\View\Helper;

use App\View\Helper\ProgressHelper;
use Cake\TestSuite\TestCase;
use Cake\View\View;

class ProgressHelperTest extends TestCase
{
    public function setUp()
    {
    }

    public function testBar()
    {
    }
}
```
Trong lớp thử nghiệm hãy luôn có phương thức _setUp()_. Phương thức này sẽ được gọi đầu tiên và giúp tạo các đối tượng cần thiết cùng thực hiện bất kì cấu hình nào của bạn.
```php
public function setUp()
{
    parent::setUp();
    $view = new View();
    $this->Progress = new ProgressHelper($view);
}
```
Sau khi tạo phương thức _setUp()_, chúng ta sẽ tiếp tục làm việc với phần quan trọng nhất đó là phương thức thử nghiệm _testBar()_. Hãy tạo một số khẳng định để đảm bảo rằng _Helper_ hoạt động và tạo ra kết quả mong đợi.
```php
public function testBar()
{
    $result = $this->Progress->bar(90);
    $this->assertStringContainsString('width: 90%', $result);
    $this->assertStringContainsString('progress-bar', $result);

    $result = $this->Progress->bar(33.3333333);
    $this->assertStringContainsString('width: 33%', $result);
}
```
Phương thức _assertStringContainsString()_ để đảm bảo rằng chuỗi trả về chứa nội dung mà chúng ta mong đợi. Nếu kết quả không chứa nội dung mong đợi quá trình kiểm tra sẽ không thành công và code đang chưa được chính xác. Đây là ví dụ khi quá trình kiểm tra diễn ra thành công.
```bash
...............                                                   1 / 1 (100%)

Time: 0.21 minutes, Memory: 2.00 MB

OK (1 tests, 3 assertions)
```

# III. Kết luận.

Bằng việc sử dụng các thử nghiệm, chúng ta có thể mô tả mối quan hệ giữa các đầu vào đã biết và đầu ra mong đợi của chúng. Điều này giúp chúng ta tự tin hơn về code đang viết vì có thể đảm bảo rằng code đã đáp ứng được các kì vọng và khẳng định mà các thử nghiệm đưa ra.

Hi vọng bài viết này sẽ giúp các bạn hiểu hơn về cách tạo và chạy một thử nghiệm trong CakePHP và hãy luôn sử dụng các thử nghiệm cho dự án của mình nhé! 

######                    *<div style="text-align: right"> - by Phu Thai </div>*