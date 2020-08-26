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
2. **Arithmetic Evaluation** (Dạng toán tử)
3. **`Test`  Command** (Dùng để check true false)

## 6.1 Return values

Điển hình ví dụ như `grep` `find` 

## 6.2 Arithmetic Evaluation

Toán tử được đặt trong  `(( ))`
Vd:
```bash
(( 1 <= 5 ))

i=1
(( i++ ))
```

## 6.3 Test command

Test command được đặt trong `[]` hoặc `[[ ]]` với biểu thức phức tạp.

```bash
[[ -e "$file" ]] # True if file exists
[[ -d "$file" ]] # True if file exists and is a directory
[[ -f "$file" ]] # True if file exists and is a regular file
[[ -z "$str" ]]  # True if string is of length zero
[[ -n "$str" ]]  # True is string is not of length zero

# Compare Strings
[[ "$str1" == "$str2" ]]
[[ "$str1" != "$str2" ]]

# Integer Comparisions
[[ "$int1" -eq "$int2" ]] # $int1 == $int2
[[ "$int1" -ne "$int2" ]] # $int1 != $int2
[[ "$int1" -gt "$int2" ]] # $int1 > $int2
[[ "$int1" -lt "$int2" ]] # $int1 < $int2
[[ "$int1" -ge "$int2" ]] # $int1 >= $int2
[[ "$int1" -le "$int2" ]] # $int1 <= $int2

# And , Or
[[ ... ]] && [[ ... ]] # And
[[ ... ]] || [[ ... ]] # Or

```

# 7. Conditionals (IF..THEN..ELSE)

```bash
# 1. Return values

# If notes.md file doesn't exist, create one and 
# add the text "created by bash"
if find notes.md
then
  echo "notes.md file already exists"
else
  echo "created by bash" | cat >> notes.md
fi
```

```bash
# 2. Arithmetic Evaluations
read -p "Enter your age: " age

if (( "$age" > 18 ))
then
  echo "Adult!"
elif (( "$age" > 12 ))
then
  echo "Teen!"
else
  echo "Kid"
fi
```

```bash
# 3. Test Expressions
# Check if argument was passed
# "$1" corresponds to first argument
if [[ -n "$1" ]]
then
  echo "Your first argument was $1"
else
  echo "No Arguments passed"
fi
```

# 8. Looping (For loop)

```bash
# print numbers 1 to 10

# c like for loop
for (( i = 1; i <= 10; ++i ))
do
  echo "$i"
done

# for in
for i in {1..10}
do
  echo "$i"
done

# while
i=1
while [[ "$i" -le 10 ]]
do
  echo "$i"
  ((i++))
done

# until
i=1
until [[ "$i" -eq 11 ]]
do
  echo "unitl $i"
  ((i++))
done
```

```bash
arr=(a b c d)

# For in
for i in "${arr[@]}"
do
  echo "$i"
done

# c like for
for (( i = 0; i < "${#arr[@]}"; i++))
do
  echo "${arr[$i]}"
done

# while
i=0
while [[ "$i" -le "${#arr[@]}" ]]
do
  echo "${arr[$i]}"
  (( i++ ))
done
```

# 9. Arrays

Khởi tạo array
```bash
arr=(a b c d)
```

```bash
echo "${arr[1]}"     # Single element
echo "${arr[-1]}"    # Last element
echo "${arr[@]:1}"   # Elements from 1
echo "${arr[@]:1:3}" # Elements from 1 to 3
```

Insert, update
```bash
arr[5]=e                            # direct address and insert/update
arr=(${arr[@]:0:1} new ${arr[@]:1}) # Adding 'new' to array
```

Delete 
```bash
arr=(a b c d)
unset arr[1]
echo << "${arr[1]}" # Outputs nothing
```

Delete không tự động update index của các phần tử khác nên để đánh lại index
```bash
arr=(a b c d)
unset arr[1]
arr=("${arr[@]}")
echo << "${arr[1]}" # sẽ print c
```

# 10. Functions

```bash
greet() {
  echo "Hello, $1"
}

greet Bash # Hello, Bash
```

```bash
greet() {
  echo "Hello, ${@}"
}

greet every single body # Hello, every single body
```

# Tổng kết

OK, nếu bạn đọc đến đây, tôi nghĩ bạn sẽ không còn bỡ ngỡ khi gặp những file bash nữa. Hi vọng bài này sẽ là base để bạn tự mày mò sâu hơn về thế giới 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc1MjYxOTg2MiwxMjE0Njk3NTY5LDIwMT
I5NDQ0MjNdfQ==
-->