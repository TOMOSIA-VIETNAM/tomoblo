---
title: "Shell Scripting Tutorial For Beginner"
date: "2020-08-25"
published: true
tags:
  - shell
  - bash
  - tutorial
---

# Shell Scripting Tutorial For Beginner

Nếu bạn hay làm việc với môi trường linux, sẽ thường xuyên bắt gặp với file có extensions là `.sh`. Nội dung xem qua thật khó hiểu nhưng không khỏi thán phục vì nó giải quyết công việc cho bạn theo một cách thật ảo diệu. 

Bài viết này sẽ giúp bạn làm quen với cách mà `.sh` được thực thi.
Các ví dụ trong bài viết chạy tốt trên môi trường linux, macos. Trên window thì ko biết thế nào. 

## 1. Hello world

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

### Tôi sẽ giải thích cho bạn





<!--stackedit_data:
eyJoaXN0b3J5IjpbODk2ODAwNDk3XX0=
-->