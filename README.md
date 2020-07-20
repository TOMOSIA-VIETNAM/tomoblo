
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

Tech Tags có thể sử dụng trong blog :

```js

tags:
  - react
  - nodejs
  - git
  - javascript
  - ruby
  - php
  - swift
  - ios

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


#### IV. Syncing a fork

[Tham khảo](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)

1. Add upstream đến repo đã clone ("origin")

```
git remote add upstream git@github.com:TOMOSIA-VIETNAM/tomoblo.git
> remote: Enumerating objects: 49, done.
> remote: Counting objects: 100% (49/49), done.
> remote: Compressing objects: 100% (27/27), done.
> remote: Total 49 (delta 29), reused 37 (delta 21), pack-reused 0
> Unpacking objects: 100% (49/49), done.
> From github.com:TOMOSIA-VIETNAM/tomoblo
>  * branch            master     -> FETCH_HEAD
>  * [new branch]      master     -> upstream/master
```

2. Fetch các commit và branch từ upstream

```
$ git fetch upstream
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
>  * [new branch]      master     -> upstream/master
```

3. Checkout về nhánh master trong project đã fork

```
$ git checkout master
> Switched to branch 'master'
```

4. Merge nhánh thay đổi từ `upstream/master` vào nhánh `master`

```
$ git merge upstream/master
> Updating a422352..5fdff0f
> Fast-forward
>  README                    |    9 -------
>  README.md                 |    7 ++++++
>  2 files changed, 7 insertions(+), 9 deletions(-)
>  delete mode 100644 README
>  create mode 100644 README.md
```
