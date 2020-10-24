---
title: "Create VPS (Virtual Private Server) by Docker and Dockerfile"
date: "2020-10-24"
published: true
tags:
  - Docker
---

[[snippet]]
|Thế giới ngày càng hiện đại và phát triển, đi theo nó cũng là công nghệ, các thư viện sử dụng, môi trường triển khai cũng thay đổi. Để tránh sự không đồng bộ lúc cài đặt, triển khai hệ thống đống nhất, tránh xảy ra lỗi deployment, thì một dự án open platform được ra đời, đó là Docker

## Docker là gì

  Theo wikipedia:
  _Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa."_

## Vì sao nên sử dụng Docker

Một ngày đẹp trời, được công ty cấp một con macbook pro full options mới ken để làm việc. Đúng lúc đó, bug "ở trên" ập xuống, developer phải mất ít nhất nửa ngày để làm quen và cài đặt môi trường để running project để develop.

Trong tình thế khó khăn nhất, Boss đi kiểm tra tiến độ,bảo cài Docker thôi rồi quăng một cái lệnh, rồi nói "làm task nhanh giúp anh nhé", tự nhiên lúc đó thấy Boss mới xỉn xò quá...

![alt text](/images/run-docker.png "Title")

![alt text](/images/run-docker2.png "Title")

- Đó là câu chuyện có thật ai cũng đã từng trải qua, Docker được tạo ra giúp chúng ta cài đặt môi trường đồng bộ với project hiện tại. Tránh mất thời gian fix những lỗi ở môi trường system. Đây là ưu điểm chính Docker mang đến cho developer, doanh nghiệp công nghệ.

- Cái gì cũng có nhược điểm, Docker khá là nặng, tốn khá là nhiều tiền vào việc nâng cấp hệ thống để dùng Docker (nâng ram, thêm cpu, ...), nên việc chọn Docker làm việc triển khai, build, đóng gói sản phẩm cũng phải đắng đo xem "túi" của Khách Hàng có đủ "rộng" không.

## Dockerfile

`Dockerfile` là một tập tin dạng text chứa một tập các câu lệnh để tạo mới một Image trong Docker.

### Quy Trình của Dockerfile trong Docker

![alt text](/images/quy-trinh.png "Title")

- Một bản build được tạo ra 1 image nhất định
- container là một instance của image

## Cơ chế lưu trữ Docker

- Lưu trữ Theo cơ chế copy on write
- Tạo một hệ thống mới ngay lập tức mà không cần copy tất cả file hệ thống
- Hệ thống lưu trữ lại mỗi lần thay đổi

---

## Các lệnh thường dùng trong DockerFile

### FROM

Cú Pháp:  

```bash
  FROM <base_image>:<phiên_bản>
```

- Khởi nguồn từ image nào?
- Tải nếu chưa có trong local registry
- Là lệnh đầu tiên trong local registry

### Maintainer

Cú Pháp:  

```bash
  MAINTAINER <tên_tác_giả>
```

- Khai báo tác giả của Dockerfile

### WORKDIR

Cú Pháp:  

```bash
  WORKDIR <đường_dẫn_thư_mục>
```

- Định nghĩa directory cho CMD

### CMD, ENTRYPOINT, RUN

Cú Pháp:  

```bash
  CMD <câu_lệnh>

  RUN <câu_lệnh>

  ENTRYPOINT <câu_lệnh>
```

- Chúng ta sử dụng lệnh này để chạy một command cho việc cài đặt các công cụ cần thiết cho Image của chúng ta.

- CMD và ENTRYPOINT thường dùng để chạy các câu lệnh running server (mysql, redis, ...) cuối cùng trong image trước khi đóng gói cuối cùng.

- CMD có thể bị override nếu như chúng ta run khi bắt đầu start, run container.

- Entrypoint sẽ không bị override.

### ADD

Cú Pháp

```bash
  ADD <src> <dest>
```

- Câu lệnh này dùng để copy một tập tin local hoặc remote nào đó vào một vị trí nào đó trên Container.

- Định nghĩa biến môi trường trong Container.

### ENV

Cú Pháp

```bash
  ENV <tên_biến>
```

- Định nghĩa biến môi trường trong Container.

### VOLUME

Cú Pháp

```bash
  VOLUME <tên_thư_mục>
```

Dùng để truy cập hoặc liên kết một thư mục nào đó trong Container.
Có 2 loại VOLUME:

- Volume giữa host và container
- Volume giữa các container

ví dụ

```bash
volumes:
      - ./postgres-data:/var/lib/postgresql/data
or

volumes: ./postgres-data
```

---

## Hướng dẫn tạo một VPS (VIRTUAL PRIVATE SERVER) ở local để deploy

Đây là cách mình tự vọc vạch môi trường deployment khi thời còn là dev nghèo (bây giờ cũng vậy :v). Khi developer không có môi trường server để deploy, phải chờ KH đi thuê hoặc đang gặp khó khăn về xác thực tài khoản,... dẫn đến chúng ta sẽ có thời gian "chết", thay vì đó có một cách khác để để build trước hệ thống, trên môi trường server.

Mình áp dụng docker để build lên một con vps để deployment trên đó.

Yêu cầu:

- Laptop hoặc PC, ổ cứng trên trên 40gb, (nhược điểm của Docker).
- Computer phải cài docker.
- Kiến thức về vòng đời của DockerFile.
- Nắm được một số lệnh cơ bản của Dockerfile.

### Step 1: tạo một môi forder chứa tất cả các file của bài hướng dẫn

```bash
  $ mkdir docker-example

  #tạo một Dockerfile
  $ touch Dockerfile

  # mở Dockerfile lên
  $ vim Dockerfile
```

### Step 2: Viết lệnh để build server nào

```bash
FROM ubuntu:16.04

RUN apt-get update && apt-get install -y sudo

RUN sudo apt-get install -y openssh-server curl vim

RUN mkdir /var/run/sshd

RUN sudo apt-get install -y zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev \
    libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties \
    libffi-dev libgdbm-dev libncurses5-dev automake libtool bison libffi-dev net-tools git nginx

RUN echo 'root:toor' | chpasswd

RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"

RUN echo "export VISIBLE=now" >> /etc/profile

RUN useradd -ms /bin/bash -p 123123 longvv

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

Dòng đầu tiên

```bash
FROM ubuntu:16.04
```

FROM nó sẽ tìm trong local registry, check thử có images ubuntu:16.04 hay không, nếu có thì lấy cái images đó. Nếu không thì pull trên docker hub về, cái này làm việc như git.

Tiếp theo mình dùng `RUN` để cài cách package cơ bản, chúng ta thường hay thao tác trên terminal.

Đến bước này

```bash
RUN echo 'root:toor' | chpasswd
```

Mình tạo một account gồm `USERID`, và `PASSWORD` cho con ubuntu của mình.

```bash
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
```

Cách lệnh tiếp theo mình xác thực, phân quyền account mình vừa mới tạo cho hệ thống

Có 2 cái lệnh hơi rườm rà ở đây:

```bash
ENV NOTVISIBLE "in users profile"

RUN echo "export VISIBLE=now" >> /etc/profile
```

Đây là cách vượt qua các biến môi trường khi chạy một dịch vụ Dockerized sshd. SSHD tẩy tế bào môi trường, do đó, ENV biến chứa trong Dockerfile phải được đẩy tới /etc/profile để chúng có sẵn.

Bước này là bước khi chúng ta ssh vào container của VPS, nó có lắng nghe hay không là đây.

```bash
#nếu là máy bạn đang chạy Ubuntu OS

EXPOSE 22

#nếu là Mac os

EXPOSE 22 80 3000
```

Vì sao lại có 2 options này, tại vì HDH Mac không có thể thoải mái public port như Ubuntu, Mac OS phải qua một cái tầng bảo mật nữa, còn Ubuntu thì không.

### Step 3: Bulid images từ Dockerfile nào

Ta sử dụng lệnh

```bash
$ docker build -t demo-docker .
```

cấu trúc: `docker build -t <name_container> <thư_mục_Dockerfile>`

Docker sẽ build cho chúng ta một cái image có tên là demo-docker và chạy hết những lệnh ta đã cài đặt trong Dockerfile.

![alt text](/images/docker-build.png "Title")

Ta kiểm tra images bằng lệnh `docker images`

![alt text](/images/docker-images.png "Title")

### Step 4: Run container từ image

```bash
 $ docker run -d -P --name docker-app-3 demo-docker
 ```

Cấu trúc

`docker run <option> <tên_image>`

Khi run nó sẽ tạo một container có tên là docker-app-3, để kiểm tra container đang hoạt động, ta dùng lệnh

```bash
$ docker ps
```

![alt text](/images/run-container.png "Title")

Chúng ta đã tạo ra một con VPS không khác những VPS ta hay đi thuê ở AWS hoặc AZURE,...

### Step 5: SSH vào con server vào vọc nào

![alt text](/images/result.png "Title")

Chắc cái bạn làm đến đây nên cần chú ý

Trong DockerFile mình có ```EXPOSE PORT 22```, container sẽ random cái port khác để ta ssh (ví dụ trong hình là 32779).

Tới bước gõ pass có thể các bạn có thể cũng quên, Mình có tạo một user cho SYSTEM qua lệnh

```bash
RUN echo 'root:toor' | chpasswd
```

USERID: root
PASSWORD: toor

OK, mọi thứ đã xong, giờ deoloy hệ thống các bạn lên VPS này thử nào.

---

Nếu các bạn muốn deploy một cái app chạy bằng Rails bằng Capitano gem

Mình suggest các bạn nên đọc [bài này](https://viblo.asia/p/huong-dan-deploy-ung-dung-ruby-on-rails-len-server-aws-ec2-su-dung-gem-capistrano-puma-va-nginx-Eb85oXDWK2G#_add-ssh-key-authentication-7) của trang viblo.

Cảm ơn các bạn đã đọc bài viết đầu tay của mình. <3

[[author | Long Vui Vẻ (longvv) ]]
