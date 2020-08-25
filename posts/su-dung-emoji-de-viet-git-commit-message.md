---
title: "Sử dụng emoji để viết git commit message"
date: "2020-08-25"
published: true
tags:
  - git
---

`git commit -m "what are you doing"`

Đó là những gì tôi và các bạn thường xuyên phải làm.

Thậm chí, viết `what are you doing` cũng là cả vấn đề. Với khá nhiều các quy tắc đặt ra, công việc thật khó khăn và nhàm chán.

Và tôi xin giới thiệu tới các 👨 👩 một thứ khiến commit của bạn trở lên tươi mới hơn . Vâng, đó là Emoji 🌞



Tất nhiên, khi viết commit git, tôi sẽ dùng một quy tắc viết commit nào đó.

Và https://www.conventionalcommits.org được lựa chọn.

Như vậy, cấu trúc một commit message của tôi là:

```
type: subject

body

footer
```



Trong đó, type có thể là:

- feat: một tính năng mới

- fix: fix bug thôi

- docs: thay đổi tài liệu, hay readme.md

- style: formatting, missing semi colons, etc; no code change

- refactor: refactoring code

- test: thêm, sửa test



Để cho tươi mới, tôi sẽ thay thế các type trên thành các emoji đặc trưng.

Tôi sẽ có hàng tá lựa chọn trong https://getemoji.com/ hoặc https://gitmoji.carloscuesta.me/

Và đây, là sở thích của tôi

- feat: ➕
- Fix: 🔨
- Docs:  📜
- Style: 💄
- refactor: ♻️
- Test: ✅



Nhằm hỗ trợ cho tôi có thể viết nhanh gọn các icon trên, tôi cài một phần mềm tên [**Espanso**](https://espanso.org/)

Sau khi cài đặt, tôi cấu hình nhằm viết tắt các icon trên.

Chạy lệnh:

```
espanso edit
```

Hoặc có thể sửa trực tiếp trong file `~/Library/Preferences/espanso/default.yml` (trên MacOS)

```
matches:
  - trigger: ":feat:"
    replace: "➕"
  - trigger: ":fix:"
    replace: "🔨"
  - trigger: ":doc:"
    replace: "📜"
  - trigger: ":style:"
    replace: "💄"
  - trigger: ":refactor:"
    replace: "♻"
  - trigger: ":test:"
    replace: "✅"
```

Khi tôi gõ `:feat: ` nó sẽ tự động convert thành `➕`



Và một đoạn `git log` nhỏ sau có làm bạn hứng thú

```
2020-08-18 e9c6a252 ➕ Add Git ignore file [cuongTomosia]
2020-08-18 ece65s49 📜 How to deploy [cuongTomosia]
2020-08-18 fc6b0qe5 🔨 Use dependent select [cuongTomosia]
2020-08-18 a0517n69 🔨 Responsive [cuongTomosia]
2020-08-18 ee40cn51 💄 indent space  [cuongTomosia]
```

Nếu bạn có một commit `:heavy_plus_sign: Add Git ignore file`, khi đẩy lên [GitHub](https://github.com/) bạn cũng sẽ có một `git log` đẹp như trên.

Nhưng, bởi vì, tôi sử dụng trực tiếp các ký tự này mà không thông qua một alias (`:heavy_plus_sign:` là 1 alias của ➕ trong [GitHub](https://github.com/)).<br>
Do đó, `git log` của tôi luôn thống nhất như trên ở mọi nơi (Terminal, Github hay các Git GUI ...)

Trên đây, là các cấu hình của tôi 👍🏻. Còn bạn, bạn sẽ chọn `type` và `emoji` như thế nào ?!


*duccuong2808* - **Tomosia**
