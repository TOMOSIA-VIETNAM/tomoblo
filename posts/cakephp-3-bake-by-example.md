---
title: "CakePHP 3: For Beginner"
date: "2020-10-14"
published: true
tags:
  - php
  - cakephp
---

# CakePHP 3: Bake by example

Bài viết này hướng đến những người mới làm quen với khuôn khổ CakePHP 3.

#### _I. Trước khi bạn sử dụng bake command_
Tạo một số bảng, tuân theo [quy ước](https://book.cakephp.org/3/en/intro/conventions.html#database-conventions) CakePHP.
Kiểm tra xem bạn có đang ở thư mục gốc của dự án không, nếu bạn liệt kê danh sách thư mục, bạn sẽ thấy các thư mục "bin", "config", "src", "webroot".

#### II. Tạo controller cho một bảng được gọi là `users`
```
bin/cake bake controller Users
```
> creates src/Controller/UsersController.php

#### III. Tạo model (and entity cho một bảng được gọi là `users`
```
bin/cake bake model Users
```
> creates src/Model/Table/UsersTable.php  
> creates src/Model/Entities/User.php

#### IV. Tạo template mẫu mặc định cho bảng (add/edit/view/index)
```
bin/cake bake template Users
```
> creates src/Template/Users/index.ctp add.ctp edit.ctp view.ctp

#### V. Gộp tất cả những điều trên trong 1 lệnh
```
bin/cake bake all Users
```
#### VI. Chỉ định template users thư mục index

```
bin/cake bake template Users index
```

> creates src/Template/Users/index.ctp

#### VII. Command bake cho các thư mục tiền tố (ví dụ: )

Nếu bạn đang làm cho một phần quản trị của trang web của mình, bạn sẽ sử dụng các template và controller riêng biệt.
```
bin/cake bake controller Users --prefix admin
```

> creates src/Controller/Admin/UsersController.php  

```
bin/cake bake template Users --prefix admin
```

### VIII. Bake from a different database

Các ví dụ trước đều sử dụng kết nối db được định nghĩa trong app.php là  `app.php`  as  `'default'`. 
Nếu bạn có cơ sở dữ liệu kế thừa để xử lý hồ sơ khách hàng, ví dụ:.  `db_records`, tệp  [config file](https://book.cakephp.org/3.0/en/orm/database-basics.html#configuration) trông như thế này.

```
// in config/app.php
'Datasources' => [
        'default' => [
            'host' => 'localhost',
            'username' => 'db_user',
            'password' => 'pass123',
            'database' => 'db_application',
        ],
        'records' => [
            'host' => 'localhost',
            'username' => 'db_records_user',
            'password' => 'pass123',
            'database' => 'db_records',
        ],
]
```

#### IX. Tạo mô hình cho một bảng được gọi là  `user_records`  trong cơ sở dữ liệu bản ghi

```
bin/cake bake model UserRecords -c records
```

> creates /src/Model/Table/UserRecordsTable.php

> creates src/Template/Admin/Users/index.ctp edit.ctp add.ctp view.ctp


Điều này sẽ bao gồm trong  `UserRecordsTable.php` tệp của bạn. 

```
public static function defaultConnectionName()
{
    return 'records';
}
```

Tạo một mô hình từ cơ sở dữ liệu này cho một bảng không tuân theo quy ước
 ở trên, ví dụ: tbl_records_user. 
 
 
```
bin/cake bake model UserRecords -c records --table tbl_records_user
```

> create /src/Model/Table/UserRecordsTable.php  
> tạo /src/Model/Entities/UserRecord.php

Điều này sẽ thêm `defaultConnectionName()`và cũng đặt.  

```
$this->setTable('tbl_records_user');
```
Bạn có thể đặt các tùy chọn khác ở đây, nhưng một số tùy chọn dễ đặt hơn bằng cách chỉnh sửa tệp sau đó. Nhưng ví dụ: bạn cũng có thể đặt trường [hiển thị](https://book.cakephp.org/3.0/en/orm/retrieving-data-and-resultsets.html#finding-key-value-pairs) thành một thứ gì đó khác với trường mặc định, ví dụ: email  
```
bin/cake bake model UserRecords -c records --table tbl_records_user --display-field email
```

Điều này sẽ sửa đổi trường hiển thị  

```
$this->setDisplayField('email');

```

----------

#### X. Các quy tắc của hiệp hội

Theo mặc định, `bake` lệnh sẽ tìm kiếm các liên kết. Nếu bạn đang sử dụng bảng kế thừa hoặc một nguồn dữ liệu khác, bất kỳ tiêu đề trường nào kết thúc bằng `_id` có thể gây ra lỗi 'không tìm thấy bảng cơ sở hoặc chế độ xem'.

Để tránh điều này, bạn có thể sử dụng điều  mà không cần liên kết  

```
bin/cake bake model UserRecords -c records --table tbl_records_user --no-associations
```

### XI. Sử dụng bằng một plugin

Giả sử bạn đã cài đặt một plugin như [friendsofcake / BootstrapUI](https://github.com/FriendsOfCake/bootstrap-ui) để các tệp mẫu của bạn đang sử dụng kiểu Bootstrap theo mặc định,  
Bây giờ bạn có thể thêm `-t BootstrapUI`vào bất kỳ lệnh nào ở trên

#### XII. Tạo tệp mẫu bằng plugin

> tạo /src/Template/Users/index.ctp add.ctp edit.ctp view.ctp  

```
bin/cake bake template Users -t BootstrapUI
```

#### XIII. Tạo toàn bộ khung MVC (bộ điều khiển, bảng, thực thể, mẫu) bằng cách sử dụng cơ sở dữ liệu kế thừa

```
bin/cake bake all UserRecords -c records --table tbl_records_user -t BootstrapUI
```

----------

### XIV .Các tính năng hữu ích

Bake dựa vào kết nối cơ sở dữ liệu, do đó, để giúp bạn tải lên và ghi nhớ tất cả các bảng trong hệ thống, bạn có thể gọi một lệnh mà không cần chỉ định tên bảng để xem danh sách các bảng có sẵn. Giả sử cơ sở dữ liệu của bạn có 3 bảng:  
`users`  
`articles`  
`activity_logs`

Sử dụng lệnh `bin/cake bake model`sẽ tạo ra một danh sách các bảng có sẵn  

```
bin/cake bake model
Choose a model to bake from the following:
Users
Articles
ActivityLogs
```

Tương tự đối với:  

```
bin/cake bake controller
bin/cake bake template
```

----------

Hy vọng rằng nếu bạn đang sử dụng CakePHP lần đầu tiên, đây là tài liệu tham khảo hữu ích cho bảng điều khiển nướng.
