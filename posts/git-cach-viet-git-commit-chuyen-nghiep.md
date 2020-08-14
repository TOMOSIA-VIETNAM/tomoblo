---
title: "[Git] Cách viết git commit chuyên nghiệp"
date: "2020-07-15"
published: true
tags:
  - git
---

Trong công việc thì chúng ta cũng không lạ gì Git, và 1 trong những câu lệnh thường dùng nhất là `git commit`. Tuy nhiên, không phải ai trong chúng ta cũng viết git commit 1 cách chuyên nghiệp. Thỉnh thoảng xem `git log` mà thấy 1 list các commit chỉ có 1 từ :

![alt](https://blog.cpanel.com/wp-content/uploads/2018/06/image2018-3-14_13-49-23.png)

Lúc suôn sẻ thì nó là 1 câu chuyện cười, còn lúc cần revert, cần cherry-pick, rebase, ... thì không còn nước mắt để khóc đâu.

Vậy nên, hãy viết commit 1 cách có tâm :)).

# Nguyên tắc chung

```
Dòng 1 : tóm tắt nội dung thay đổi (title, summary)
Dòng 2 : dòng trống
Dòng 3 : nội dung, lý do thay đổi, thay đổi như thế nào, thay đổi ở đâu, ...
```

Ngôn ngữ sử dụng để viết commit thì đương nhiên là tiếng Anh rồi :)).

## Dòng 1
Dòng 1 mình viết tóm tắt nội dung thay đổi, và type của commit.
```
[type] tóm tắt #id
```

### Type
Type thì có rất nhiều, nhưng tóm gọn lại thì cũng chỉ có 1 số loại sau :
- **fix**: hay dùng nhất :)), để fix bugs
- **hotfix**: để fix những bugs nghiêm trọng, khẩn cấp
- **add**: thêm tính năng mới, thêm file mới
- **update**: sửa lại tính năng (không phải bugs)
- **change**: yêu cầu bị thay đổi
- **clean**: tinh chỉnh code（kiểu như refactoring）
- **disable**: tắt 1 tính năng nào đó（kiểu như comment out）
- **remove**: xoá 1 tính năng, hoặc 1 file
- **upgrade**: nâng version
- **revert**: xoá 1 thay đổi

Hoặc đơn giản hơn thì chỉ có 4 kiểu :

- **fix**
- **add**
- **update**
- **remove**

### Tóm tắt
Phần tóm tắt thì viết đơn giản, ngắn gọn mà vẫn hiểu được nội dung nhé.
Cố gắng chỉ viết trong 1 dòng, và dùng các từ khoá của chức năng đó.

### ID
ID ở đây thường là cách để link tới task của chức năng đó.

Nếu dùng github thì nó là issue ID. Nếu dùng trello thì cũng là ID của task đó.

Cách này để mình dễ tìm đọc lại requirement của task.

## Dòng 3
Phần 3 là phần mô tả chi tiết hơn nội dung của commit.

Dòng 1 là câu trả lời cho câu hỏi "Cái gì (What)", thì dòng 3 là câu trả lời cho những câu hỏi "Tại sao (Why)", "Ở đâu(Where)", "Như thế nào (How)". Đây là mô hình 3W1H khá đơn giản.

Cách viết full thường dùng cho những commit trong branch chính như `develop`, `staging`, `master`.

Còn trong các commit đơn giản nằm trong branch features, ta có thể dùng bản rút gọn, chỉ còn dòng 1. Tuy nhiên, hãy cố gắng đảm bảo format cho 1 dòng đó.

Tổng kết lại, chúng ta sẽ có những commit dạng thế này :
```
[add] new post to "git-commit"

New post on how to write gitcommit professional.
```

Hoặc thế này :
```
[fix] some typo on new post.
```

# Tricks
Để đảm bảo commit đẹp, anh em nên cố gắng sử dụng rebase. Trong github, khi merge cũng có 3 options, là merge thông thường, squash merge, rebase merge. Cá nhân anh thấy rebase merge đẹp và dễ thao tác khi gặp vấn đề phức tạp sau này hơn.

Sau khi dev xong 1 features, thì nên rebase lại các commit. Commit đối với dev cũng giống như "cái răng cái tóc", mình ở nhà thế nào cũng được, nhưng ra đường thì phải tử tế, thơm ngon :)). Rebase giống như kiểu chải lại tóc, đánh lại răng ấy :)).

Anh em nên coi viết code, lập trình giống như làm thơ, mình phải chau chuốt và nghệ sĩ.

Đến đây anh xin hết :)).

