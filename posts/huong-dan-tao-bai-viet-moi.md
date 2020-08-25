---
title: "Hướng dẫn tạo bài viết mới"
date: "2020-07-03"
published: true
tags:
  -
---

# Hướng dẫn viết bài cho TOMOSIA BLOG
### Bước 1: Setup [gatsby.js](https://www.gatsbyjs.org/).
Yêu cầu: Node version 12.x
Trước tiên cài đặt gatsby CLI package
```bash
$ yarn global add gatsby-cli
```

Trờ thành contributor cho `TOMOSIA BLOG`.

Fork [https://github.com/TOMOSIA-VIETNAM/tomoblo](https://github.com/TOMOSIA-VIETNAM/tomoblo) về tài khoảng github

Clone repository sau khi `fork`, `Nguyenanh/tomoblo` là repository sau khi mình fork về

```bash
$ git clone git@github.com:Nguyenanh/tomoblo.git
```
Di chuyển sang folder `tomoblo`
```bash
$ cd tomoblo
```
Cài đặt các package

```bash
$ yarn install
```
Run dự án
```bash
$ gatsby develop
```
Mở trình duyệt và truy cập http://localhost:8000/

### Bước 2: Viết bài và đăng bài.

#### I. Tạo bài post.

Tạo một bài viết mới với tiêu đề `Hướng dẫn tạo bài viết mới` bằng `cli`
```bash
$ yarn post "Hướng dẫn tạo bài viết mới"
```
Sau khi chạy xong  chúng ta sẽ có một file `posts/huong-dan-tao-bai-viet-moi.md
-` trông như thế này:

```js
---
title: "Hướng dẫn tạo bài viết mới"
date: "2020-06-24"
published: true
tags:
  - change_me
---

```
#### II. Viết bài.
Để viết bài chúng ta sẽ thêm nội dung vào phía dưới `---`, có 2 cách để viết content.

+ Sử dụng editor và setup thêm  một số package. ví dụ mình đang sử dụng `atom` và cài đặt thêm  [markdown-preview](https://atom.io/packages/markdown-preview) package.
+ Sử dụng một editor online [stackedit.io](https://stackedit.io/app)
`stackedit.io` hỗ trợ viết markdown cho toán học  [katex](https://katex.org/) và [UML diagrams](https://mermaidjs.github.io/) nên mình suggest ae nên sử dụng `stackedit.io`

Sau khi viết bài xong truy cập vào http://localhost:8000/huong-dan-tao-bai-viet-moi để xem kết quả.
#### III. Đăng bài.
Khi đã hoàn thành viết bài hãy `push` bài viết lên repository.
```bash
$ git add --all
$ git commit -m 'Hướng dẫn tạo bài viết mới.'
$ git push origin master
```
Tạo `Pull Request` vào repository `TOMOSIA-VIETNAM/tomoblo`.

Sau khi pull request được merge vào `TOMOSIA-VIETNAM/tomoblo` chờ một vài phút thì bài viết sẽ được hiển thị lên [http://blog.tomosia.com/](http://blog.tomosia.com/).
