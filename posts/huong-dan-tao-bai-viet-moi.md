---
title: "Hướng dẫn tạo bài viết mới"
date: "2020-07-03"
published: true
tags:
  -
---

## 1. Cài đặt blog dưới local

### 1.1. Contributor

Trở thành contributor cho `TOMOSIA BLOG`.

Fork repository [TOMOSIA-VIETNAM](https://github.com/TOMOSIA-VIETNAM/tomoblo) về tài khoản github

Clone repository sau khi fork

```bash
$ git clone git@github.com:Nguyenanh/tomoblo.git
```

Di chuyển sang folder `tomoblo`

```bash
$ cd tomoblo
```

### 1.2. Setup project

Setup [gatsby.js](https://www.gatsbyjs.org/). Yêu cầu: Node version 12.x

Cài đặt gatsby CLI package
```bash
$ yarn global add gatsby-cli
```

Cài đặt các packages được dùng trong blog

```bash
$ yarn install
```

Run dự án

```bash
$ gatsby develop [-p <PORT>]
```

Mở trình duyệt và truy cập với port default là 8000: http://localhost:8000/

## 2. Viết bài và đăng bài

### 2.1. Tạo bài post

Chạy lệnh bên dưới để tạo bài viết với tiêu đề mong muốn
```bash
$ yarn post "Tiêu đề bài viết"
```

Sau khi chạy xong chúng ta sẽ có một file `posts/tieu-de-bai-viet.md
` như thế này:

```yaml
---
title: "Tiêu đề bài viết"
date: "2020-06-24"
published: true
tags:
  -
---

[[snippet]]
| Mô tả ở đây
| Hoặc có thể viết trên nhiều dòng
```

### 2.2. Viết bài

Để viết bài chúng ta sẽ thêm nội dung vào phía dưới `---`, có 2 cách để viết content.

+ Sử dụng editor và setup thêm một số package. ví dụ mình đang sử dụng `atom` và cài đặt thêm  [markdown-preview](https://atom.io/packages/markdown-preview) package.

+ Sử dụng editor online [stackedit.io](https://stackedit.io/app)
để hỗ trợ viết bài và ta có thể viết biểu thức toán học  [katex](https://katex.org/) và [UML diagrams](https://mermaidjs.github.io/)

Sau khi viết bài xong truy cập vào `http://localhost:8000/tieu-de-bai-viet` để xem kết quả.

### 2.3. Đăng bài

Khi đã hoàn thành viết bài hãy `push` bài viết lên repository.
```bash
$ git add --all
$ git commit -m 'Tiêu đề bài viết'
$ git push origin master
```

Vào repository của [TOMOSIA-VIETNAM](https://github.com/TOMOSIA-VIETNAM/tomoblo) để tạo Pull Request

Sau khi pull request được merge vào `TOMOSIA-VIETNAM/tomoblo` chờ vài phút thì bài viết sẽ được hiển thị lên [http://blog.tomosia.com/](http://blog.tomosia.com/).

## 3. Blockcode

**Thêm description cho bài viết**

![image](https://user-images.githubusercontent.com/59222278/91420858-6919a380-e87f-11ea-8fe4-d3cdbc81ad42.png)

**Syntax:**

```
[[snippet]]
| Dòng thứ nhất
| ...
| Dòng cuối cùng
```

**Thêm author vào cuối bài viết**

![image](https://user-images.githubusercontent.com/59222278/91420710-3f607c80-e87f-11ea-99f0-2cce9740ff31.png)

**Syntax:**
```
[[author | Tên tác giả ]]

```

Ví dụ: `[[author | Minh Tang Q. ]]`

**Thêm image với caption**

![image](https://user-images.githubusercontent.com/59222278/91420581-1b9d3680-e87f-11ea-85e1-5fd5613fc8a5.png)

**Syntax:**
```
[[image_caption | Nội dung caption ]]
| markdown_image

```

Ví dụ:

```
[[image_caption | Nguồn từ: https://bitsofco.de/why-and-how-to-use-webp-images-today/ ]]
| ![Compare](https://user-images.githubusercontent.com/59222278/85985771-616f8700-ba15-11ea-9f7c-0b2161fa86f9.png)
```

## 4. Tags

Một số tags được liệt kê trong blog

Tech Tags có thể sử dụng trong blog :

```yaml
# Fontend
tags:
  - javascript
  - react
  - nodejs

# Backend
tags:
  - ruby
  - rails
  - php
  - laravel
  - cakephp

# App
tags:
  - swift
  - ios
  - kotlin
  - android

# Others
tags:
  - git
  - aws
  - instagram
  - facebook
```

## 5. Syncing a fork

Bước 1: Add upstream đến repo đã clone ("origin")

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

Bước 2: Fetch các commit và branch từ upstream

```
$ git fetch upstream
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
>  * [new branch]      master     -> upstream/master
```

Bước 3: Checkout về nhánh master trong project đã fork

```
$ git checkout master
> Switched to branch 'master'
```

Bước 4: Merge nhánh thay đổi từ `upstream/master` vào nhánh `master`

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

[Link tham khảo](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
