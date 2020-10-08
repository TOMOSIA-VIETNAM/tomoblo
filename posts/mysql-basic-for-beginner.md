---
title: "Mysql basic for beginner"
date: "2020-08-25"
published: true
tags:
  - Mysql
---

# I. Giới thiệu

MySQL là hệ quản trị cơ sở dữ liệu quan hệ (Relational Database Management System) mã nguồn mở phổ biến nhất, sử dụng để phát triển các ứng dụng, phần mềm.

MySQL là RDBMS có tốc độ cao, ổn định, dễ sử dụng, và có lượng người dùng hỗ trợ đông đảo. Do đó, nó là sự lựa chọn hàng đầu trong việc phát triển với cơ sở dữ liệu quan hệ.
 
## II. Một số khái niệm trong MYSQL

-   **Database:**  Cơ sở dữ liệu là một tập hợp các bảng dữ liệu, các bảng này có quan hệ với nhau.
    
-   **Table:**  Bảng là một ma trận dữ liệu. Một bảng trong một cơ sở dữ liệu trông giống như một bảng tính đơn giản.

-   **Field:**  Trường là một cột trong một bảng được thiết kế để lưu trữ thông tin cụ thể về mỗi bản ghi trong bảng.
    
-   **Column:**  Cột chứa cùng một kiểu dữ liệu, ví dụ như tên khách hàng.
    
-   **Row:**  Hàng (row, entry, record) là một nhóm dữ liệu có liên quan.
    
-   **Primary Key:**  Khóa chính là duy nhất. Một giá trị key không thể xuất hiện hai lần trong một bảng.
    
-   **Foreign Key:**  Khoá ngoại dùng để liên kết bảng với nhau.

-   **Unique:**  Đảm bảo rằng tất cả các giá trị trong một cột là khác nhau.
    
-   **Index:**  Một chỉ mục trong một cơ sở dữ liệu tương tự như chỉ mục trong một cuốn sách.
    
-   **Referential Integrity:**  Đảm bảo rằng một giá trị Foreign Key luôn luôn trỏ tới một hàng đang tồn tại.

## III. Kiểu dữ liệu cơ bản trong MySQL

**_1. Kiểu dữ liệu số_**

-   **INT** - Một số nguyên với kích cỡ thông thường, có thể là signed hoặc unsigned. Nếu có dấu, thì dãy giá trị có thể là từ -2147483648 tới 2147483647, nếu không dấu thì dãy giá trị là từ 0 tới 4294967295. Bạn có thể xác định một độ rộng lên tới 11 chữ số.
    
-   **TINYINT** - Một số nguyên với kích cỡ rất nhỏ, có thể là signed hoặc unsigned. Nếu có dấu, thì dãy giá trị có thể là từ -128 tới 127, nếu không dấu thì dãy giá trị là từ 0 tới 255. Bạn có thể xác định một độ rộng lên tới 4 chữ số.
    
-   **SMALLINT** - Một số nguyên với kích cỡ nhỏ, có thể là signed hoặc unsigned. Nếu có dấu, thì dãy giá trị có thể là từ -32768 tới 32767, nếu không dấu thì dãy giá trị là từ 0 tới 65535. Bạn có thể xác định một độ rộng lên tới 5 chữ số.
    
-   **MEDIUMINT** - Một số nguyên với kích cỡ trung bình, có thể là signed hoặc unsigned. Nếu có dấu, thì dãy giá trị có thể là từ -8388608 tới 8388607, nếu không dấu thì dãy giá trị là từ 0 tới 16777215. Bạn có thể xác định một độ rộng lên tới 9 chữ số.
    
-   **BIGINT** - Một số nguyên với kích cỡ lớn, có thể là signed hoặc unsigned. Nếu có dấu, thì dãy giá trị có thể là từ -9223372036854775808 tới 9223372036854775807, nếu không dấu thì dãy giá trị là từ 0 tới 18446744073709551615. Bạn có thể xác định một độ rộng lên tới 20 chữ số.
    
-   **FLOAT(M,D)** - Một số thực dấu chấm động không dấu. Bạn có thể định nghĩa độ dài hiển thị (M) và số vị trí sau dấy phảy (D). Điều này là không bắt buộc và sẽ có mặc định là 10,2: với 2 là số vị trí sau dấu phảy và 10 là số chữ số (bao gồm các phần thập phân). Phần thập phân có thể lên tới 24 vị trí sau dấu phảy đối với một số FLOAT.
    
-   **DOUBLE(M,D)** - Một số thực dấu chấm động không dấu. Bạn có thể định nghĩa độ dài hiển thị (M) và số vị trí sau dấy phảy (D). Điều này là không bắt buộc và sẽ có mặc định là 16,4: với 4 là số vị trí sau dấu phảy và 16 là số chữ số (bao gồm các phần thập phân). Phần thập phân có thể lên tới 53 vị trí sau dấu phảy đối với một số DOUBLE. REAL là đồng nghĩa với DOUBLE.
    
-   **DECIMAL(M,D)** - Một kiểu khác của dấu chấm động không dấu. Mỗi chữ số thập phân chiếm 1 byte. Việc định nghĩa độ dài hiển thị (M) và số vị trí sau dấy phảy (D) là bắt buộc. NUMERIC là một từ đồng nghĩa cho DECIMAL.

**_2. Kiểu dữ liệu Date và Time_**

-   **DATE** - Một date trong định dạng YYYY-MM-DD, giữa 1000-01-01 và 9999-12-31. Ví dụ, ngày 25 tháng 12 năm 2015 sẽ được lưu ở dạng 2015-12-25.
    
-   **DATETIME** - Một tổ hợp Date và Time trong định dạng YYYY-MM-DD HH:MM:SS, giữa 1000-01-01 00:00:00 và 9999-12-31 23:59:59. Ví dụ, 3:30 chiều ngày 25 tháng 12, năm 2015 sẽ được lưu ở dạng 2015-12-25 15:30:00.
    
-   **TIMESTAMP** - Một Timestamp từ giữa nửa đêm ngày 1/1/1970 và 2037. Trông khá giống với định dạng DATETIME trước, khác biệt ở chỗ không có dấu gạch nối giữa các số. Ví dụ, 3:30 chiều ngày 25 tháng 12, năm 2015 sẽ được lưu dưới dạng 20151225153000 ( YYYYMMDDHHMMSS ).
    
-   **TIME** - Lưu time trong định dạng HH:MM:SS.

**_3. Kiểu dữ liệu chuỗi_**
-   **CHAR(M)**  - Một chuỗi có độ dài cố định có độ dài từ 1 tới 255 ký tự (ví dụ CHAR(5)). Nếu giá trị thật của một trường kiểu Char không bằng với độ dài khai báo thì phần thiếu bên phải của nó sẽ được thêm bằng các kí tự trắng một cách tự động. Định nghĩa độ dài là không bắt buộc, giá trị mặc định là 1.
    
-   **VARCHAR(M)** - Dữ liệu kiểu chuỗi có độ dài thay đổi, có độ dài từ 1 đến 255 kí tự (ví dụ Varchar(24)). Bạn phải định nghĩa độ dài khi tạo một trường VARCHAR.
    
-   **BLOB hoặc TEXT** - Trường kiểu này có độ dài tối đa 65535 kí tự. BLOBs là viết tắt của "Binary Large Objects", và được sử dụng để lưu trữ một lượng lớn dữ liệu nhị phân như các bức ảnh hoặc các loại tập tin khác. Với TEXT, trường cũng lưu trữ được một lượng lớn dữ liệu. Điểm khác nhau giữa chúng là: khi sắp xếp và so sánh dữ liệu đã lưu trữ thì với BLOBs là phân biệt kiểu chữ, còn với TEXT là không phân biệt kiểu chữ. Bạn không phải xác định độ dài với BLOBs hoặc TEXT.
    
-   **TINYBLOB hoặc TINYTEXT** - Một cột BLOB hoặc TEXT với độ dài tối đa là 255 ký tự. Bạn không cần xác định độ dài với TINYBLOB hoặc TINYTEXT.
    
-   **MEDIUMBLOB hoặc MEDIUMTEXT** - Một cột BLOB hoặc TEXT với độ dài tối đa là 16777215 ký tự. Bạn không cần xác định độ dài với MEDIUMBLOB hoặc MEDIUMTEXT.
    
-   **LONGBLOB hoặc LONGTEXT** - Một cột BLOB hoặc TEXT với độ dài tối đa là 4294967295 ký tự. Bạn không cần xác định độ dài với LONGBLOB hoặc LONGTEXT.
    
-   **ENUM** - Khi định nghĩa một trường kiểu này, tức là, ta đã chỉ ra một danh sách các đối tượng mà trường phải nhận (có thể là Null). Ví dụ, nếu ta muốn một trường nào đó chỉ nhận một trong các giá trị "A" hoặc "B" hoặc "C" thì ta phải định nghĩa kiểu ENUM cho nó như sau: ENUM ('A', 'B', 'C'). Và chỉ có các giá trị này (hoặc NULL) có thể xuất hiện trong trường đó

## IV. Một số câu lệnh cơ bản trong MySQL

**_1. Connect database_**

```bash
mysql -h[HOSTNAME] -u[USERNAME] -p[PASSWORD] [DATABASENAME];
```

**_2. Create database_**

```mysql
create database [DATABASENAME];
```

**_3. Drop database_**

```mysql
drop database [DATABASENAME];
```

**_4. Create Table_**

```mysql
CREATE TABLE users (  
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
firstname VARCHAR(30) NOT NULL,  
lastname VARCHAR(30) NOT NULL,  
email VARCHAR(50),  
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
)
```

**_5. Drop table_**

```mysql
drop table [TABLENAME];
```

**_6. Truncate table_**

```mysql
TRUNCATE TABLE table_name;
```

**_7. Insert data_**

```mysql
INSERT INTO table_name (column1, column2, column3,...)  
VALUES (value1, value2, value3,...)
```

**_8. Update data_**

```mysql
UPDATE table_name  
SET column1 = value1, column2 = value2, ...  
WHERE condition;
```

**_9. Select data_**

```mysql
SELECT * FROM table_name;
```

**_10. Delete data_**

```mysql
DELETE  FROM table_name WHERE  condition;
```

**_11. Show all database_**
```mysql
SHOW databases;
```

**_12. Show all table_**
```mysql
SHOW tables;
```

**_13. Show create table_**
```mysql
SHOW CREATE TABLE table_name;
```

**_14. Show all column in table_**
```mysql
DESC table_name;
```

**_14. Show index in table_**
```mysql
SHOW INDEX FORM table_name;
```

## V. Lời kết

Như vậy, chúng ta đã tìm hiểu xong các khái niệm và sử dụng một số câu truy vấn cơ bản trong MYSQL. Hi vọng bài viết sẽ giúp ích cho mọi người khi làm việc với MYSQL.
*<div style="text-align: right"> - by Huunv </div>*