---
title: "Shell Scripting Tutorial For Beginner"
date: "2020-08-25"
published: true
tags:
  - shell
  - bash
  - tutorial
---

Shell Scripting Tutorial For Beginner
---------------------------

Nếu bạn hay làm việc với môi trường linux, sẽ thường xuyên bắt gặp với file có extensions là `.sh`. Nội dung xem qua thật khó hiểu nhưng không khỏi thán phục vì nó giải quyết công việc cho bạn theo một cách thật ảo diệu. 

Bài viết này sẽ giúp bạn làm quen với cách mà `.sh` được thực thi.
Các ví dụ trong bài viết chạy tốt trên môi trường linux, macos. Trên window thì tôi chưa thử.

# 1. Hello world

Chúng ta sẽ bắt đầu từ thứ cơ bản nhất. Hello world!

Tạo 1 file `script.sh` 
```bash
#!/bin/bash

echo "Hello World"
```

Mở terminal, `cd` vào thư mục chứa file vừa tạo và chạy lệnh sau.
```bash
chmod +x ./script.sh
```

Thực thi file vừa tạo
```bash
./script.sh
```

Trên terminal, bạn sẽ thấy dòng text sau.
```
Hello World
```

## Giải thích

`#!/bin/bash` cái dòng này là [Shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29)
Nó có nhiệm vụ khai báo chương trình nào sẽ run những dòng command phía dưới.
Ví dụ như này sẽ dễ hiểu hơn.
```bash
#!/bin/node

console.log("Hello Javascript")'
```
Tiếp tục với
`echo "Hello World"`

`echo` là command đơn giản, nhận tham số là 1 string và in nó ra màn hình.

Cho những ai chưa biết
`chmod +x ./script.sh` liên quan tới quản lý file trên linux, bạn cứ tạm hiểu, câu lệnh này cho phép file `script.sh` có thể được thực thi khi run command. `./script.sh`. 

Không tin thì thử chạy `./script.sh` trước khi `chmod` xem nó sẽ thế nào.

# 2. Variables

Về cơ bản, shell script cũng là 1 ngôn ngữ mà bạn có thể lập trình được. 
Cơ bản là vậy, nhưng không thể so shell script với 1 ngôn ngữ lập trình đầy đủ như python, ruby, php ... được, đừng liên hệ chúng với nhau.

Đây là cách bạn khai báo biến và sử dụng nó
```bash
#!/bin/bash

name="Bash"

echo "Hello, $name"
```

Nếu không có `$` trước `name` thì nó sẽ in ra màn hình thế này
```bash
$ ./script.sh
Hello, name
```

Và đừng áp dụng coding convention vào đây, thêm `space` vào trước và sau `=` sẽ ko hoạt động đâu. Assign một biến, đừng thêm `space`

# 3. User Input

```bash
#!/bin/bash

read -p "What is you name: " name

echo "Hello {$name}!"
```
Với file bash nội dung như trên, khi run, bạn sẽ nhập input và in ra text bao gồm nội dung vừa nhập.
```
$ ./script.sh
What is you name: godcrampy
Hello godcrampy!
```
`read` là lệnh cho phép nhập input từ màn hình sau đó gán vào 1 biến

***tip** dùng `{}` để trỏ tới biến trong chuỗi string.

# 4. Comments

```bash
# Comments start with hash
```
Over!

# 5. Arguments

Bạn có thể truyền tham số cho 1 file bash khi run.
`$0` luôn là tên file bash

```bash
#!/bin/bash

echo $0
echo $1
echo $2
echo "${@}" # Access all the arguments
```

Sau khi run
```
$ ./script.sh first second
./script.sh
first
second
first second
```

# 6. Expressions (Biểu thức)

Bash có 3 kiểu Expressions gặp nhiều

1. **Return Values**
2. **Arithmetic Evaluation**
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTM3ODMzMTA2MiwxMjE0Njk3NTY5LDIwMT
I5NDQ0MjNdfQ==
-->