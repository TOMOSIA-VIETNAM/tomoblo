---
title: "[Docker] How to build một Docker image"
date: "2020-08-24"
published: true
tags:
  - Docker
  - Docker image
---

Mình còn nhớ hồi những năm 2011 gì đó, mình join vào làm dev php cho Chodientu.vn như bao anh em dev khác ngày đầu bỡ ngỡ và một trong những thủ tục chào hỏi cơ bản xong bắt đầu vào làm quen với dự án,
nào là checkout code về local và cài cắm môi trường,... Mọi thứ cài cắm ok hết rồi còn duy nhất một ứng dụng cài mãi không được, đó là Mongodb cái tứ *** này bị sao vậy nhỉ! Sau một buổi sáng tìm hiểu thì đã tìm ra nguyên nhân là do ở Window phải cài đúng file .dll version mới chạy được,
Cũng may dự án đó chỉ cài cắm vài thứ cơ bản mà còn vất đến vậy! Dự án đó mà cài thêm mấy cái nữa chắc mất cả tuần mất! Cần có một cái gì đó có thể build và cài sẵn để tối ưu hoá time cho các anh em khác! Hồi đó mình chưa kiếm được một ứng dụng nào có thể đảm nhận yêu cầu này, cho tới 2013 Docker mới ra đời, nó đảm bảo các yêu cầu của anh em dev tìm hiểu và cài cắm nghịch ngợm này nọ!
Bữa nay mình xin giới thiệu đôi chút về Docker, một trong những ứng dụng tuyệt vời của thế kỷ dev :D

# Problem
Đối với các dev, một trong những việc quan trọng đó là build môi trường, một trong những ưu điểm sau làm mình thích thú với nó:
    - Build môi trường cực kỳ đơn giản, hỗ trợ các hệ điều hành như: Window, Macos, Linux,...
    - Rút ngắn thời gian cho team member cài cắm dự án, đặc biệt đối với member cáo cũng như gà vào dự án.
    - Hỗ trợ tốt đối với CI/CD, deploy và test tự động,...

# Làm quen với Docker
- Khái niệm Docker là gì thì mình sẽ không nói đến ở đây, bạn nào muốn biết có thể hỏi Google nhé, ở đây mình không làm việc đó.
## Dockerfile là gì ?
    - Dockerfile là file config cho Docker để build ra image. Nó dùng một image cơ bản để xây dựng lớp image ban đầu. Một số image cơ bản: python, unbutu and alpine. Sau đó nếu có các lớp bổ sung thì nó được xếp chồng lên lớp cơ bản. Cuối cùng một lớp mỏng có thể được xếp chồng lên nhau trên các lớp khác trước đó.
    - Configs:
        FROM                Chỉ định image gốc: python, unbutu, alpine…
        LABEL               Cung cấp metadata cho image. Có thể sử dụng để add thông tin maintainer. Để xem các label của images, dùng lệnh docker inspect.
        ENV                 Thiết lập một biến môi trường.
        RUN                 Có thể tạo một lệnh khi build image. Được sử dụng để cài đặt các package vào container.
        COPY                Sao chép các file và thư mục vào container.
        ADD                 Sao chép các file và thư mục vào container.
        CMD                 Cung cấp một lệnh và đối số cho container thực thi. Các tham số có thể được ghi đè và chỉ có một CMD.
        WORKDIR             Thiết lập thư mục đang làm việc cho các chỉ thị khác như: RUN, CMD, ENTRYPOINT, COPY, ADD,…
        ARG                 Định nghĩa giá trị biến được dùng trong lúc build image.
        ENTRYPOINT          Cung cấp lệnh và đối số cho một container thực thi.
        EXPOSE              Khai báo port lắng nghe của image.
        VOLUME              Tạo một điểm gắn thư mục để truy cập và lưu trữ data.

## Ví dụ tạo nội dung Dockerfile với nội dung cơ bản sau:
```dockerfile
# The line below states we will base our new image on the Latest Official Ubuntu
FROM ubuntu:latest

#
# Identify the maintainer of an image
LABEL maintainer="chien.le@tomosia.com"

#
# Update the image to the latest packages
RUN apt-get update && apt-get upgrade -y

#
# Install NGINX to test.
RUN apt-get install nginx -y

#
# Expose port 80
EXPOSE 80

#
# Last is the actual command to start up NGINX within our Container
CMD ["nginx", "-g", "daemon off;"]
```

### Build thử
```bash
docker build .
```
### Kết quả đúng:
```bash
apples-MBP-6:test apple$ touch Dockerfile
apples-MBP-6:test apple$ nano Dockerfile
apples-MBP-6:test apple$ docker build .
Sending build context to Docker daemon  2.048kB
Step 1/6 : FROM ubuntu:latest
latest: Pulling from library/ubuntu
54ee1f796a1e: Pull complete
f7bfea53ad12: Pull complete
46d371e02073: Pull complete
b66c17bbf772: Pull complete
Digest: sha256:31dfb10d52ce76c5ca0aa19d10b3e6424b830729e32a89a7c6eee2cda2be67a5
Status: Downloaded newer image for ubuntu:latest
 ---> 4e2eef94cd6b
Step 2/6 : LABEL maintainer="chien.le@tomosia.com"
 ---> Running in aea83c9d1309
Removing intermediate container aea83c9d1309
 ---> c215e86fc7a8
Step 3/6 : RUN apt-get update && apt-get upgrade -y
 ---> Running in 89e7f73f46a8
Get:1 http://security.ubuntu.com/ubuntu focal-security InRelease [107 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal InRelease [265 kB]
Get:3 http://security.ubuntu.com/ubuntu focal-security/main amd64 Packages [204 kB]
Get:4 http://archive.ubuntu.com/ubuntu focal-updates InRelease [111 kB]
Get:5 http://security.ubuntu.com/ubuntu focal-security/multiverse amd64 Packages [1078 B]
Get:6 http://security.ubuntu.com/ubuntu focal-security/universe amd64 Packages [65.1 kB]
Get:7 http://security.ubuntu.com/ubuntu focal-security/restricted amd64 Packages [39.1 kB]
Get:8 http://archive.ubuntu.com/ubuntu focal-backports InRelease [98.3 kB]
Get:9 http://archive.ubuntu.com/ubuntu focal/universe amd64 Packages [11.3 MB]
Get:10 http://archive.ubuntu.com/ubuntu focal/main amd64 Packages [1275 kB]
Get:11 http://archive.ubuntu.com/ubuntu focal/restricted amd64 Packages [33.4 kB]
Get:12 http://archive.ubuntu.com/ubuntu focal/multiverse amd64 Packages [177 kB]
Get:13 http://archive.ubuntu.com/ubuntu focal-updates/restricted amd64 Packages [39.3 kB]
Get:14 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 Packages [423 kB]
Get:15 http://archive.ubuntu.com/ubuntu focal-updates/universe amd64 Packages [198 kB]
Get:16 http://archive.ubuntu.com/ubuntu focal-updates/multiverse amd64 Packages [17.3 kB]
Get:17 http://archive.ubuntu.com/ubuntu focal-backports/universe amd64 Packages [3216 B]
Fetched 14.4 MB in 14s (999 kB/s)
Reading package lists...
Reading package lists...
Building dependency tree...
Reading state information...
Calculating upgrade...
The following packages will be upgraded:
  liblzma5
1 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 91.7 kB of archives.
After this operation, 8192 B of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 liblzma5 amd64 5.2.4-1ubuntu1 [91.7 kB]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 91.7 kB in 1s (74.7 kB/s)
(Reading database ... 4122 files and directories currently installed.)
Preparing to unpack .../liblzma5_5.2.4-1ubuntu1_amd64.deb ...
Unpacking liblzma5:amd64 (5.2.4-1ubuntu1) over (5.2.4-1) ...
Setting up liblzma5:amd64 (5.2.4-1ubuntu1) ...
Processing triggers for libc-bin (2.31-0ubuntu9) ...
Removing intermediate container 89e7f73f46a8
 ---> 34058a73bfd5
Step 4/6 : RUN apt-get install nginx -y
 ---> Running in 66e3394dbf6a
Reading package lists...
Building dependency tree...
Reading state information...
The following additional packages will be installed:
  fontconfig-config fonts-dejavu-core iproute2 libatm1 libbsd0 libcap2
  libcap2-bin libelf1 libexpat1 libfontconfig1 libfreetype6 libgd3 libicu66
  libjbig0 libjpeg-turbo8 libjpeg8 libmnl0 libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream
  libpam-cap libpng16-16 libssl1.1 libtiff5 libwebp6 libx11-6 libx11-data
  libxau6 libxcb1 libxdmcp6 libxml2 libxpm4 libxslt1.1 libxtables12
  nginx-common nginx-core tzdata ucf
Suggested packages:
  iproute2-doc libgd-tools fcgiwrap nginx-doc ssl-cert
The following NEW packages will be installed:
  fontconfig-config fonts-dejavu-core iproute2 libatm1 libbsd0 libcap2
  libcap2-bin libelf1 libexpat1 libfontconfig1 libfreetype6 libgd3 libicu66
  libjbig0 libjpeg-turbo8 libjpeg8 libmnl0 libnginx-mod-http-image-filter
  libnginx-mod-http-xslt-filter libnginx-mod-mail libnginx-mod-stream
  libpam-cap libpng16-16 libssl1.1 libtiff5 libwebp6 libx11-6 libx11-data
  libxau6 libxcb1 libxdmcp6 libxml2 libxpm4 libxslt1.1 libxtables12 nginx
  nginx-common nginx-core tzdata ucf
0 upgraded, 40 newly installed, 0 to remove and 0 not upgraded.
Need to get 15.8 MB of archives.
After this operation, 60.8 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu focal/main amd64 libbsd0 amd64 0.10.0-1 [45.4 kB]
Get:2 http://archive.ubuntu.com/ubuntu focal/main amd64 libcap2 amd64 1:2.32-1 [15.9 kB]
Get:3 http://archive.ubuntu.com/ubuntu focal/main amd64 libelf1 amd64 0.176-1.1build1 [44.0 kB]
Get:4 http://archive.ubuntu.com/ubuntu focal/main amd64 libmnl0 amd64 1.0.4-2 [12.3 kB]
Get:5 http://archive.ubuntu.com/ubuntu focal/main amd64 libxtables12 amd64 1.8.4-3ubuntu2 [28.4 kB]
Get:6 http://archive.ubuntu.com/ubuntu focal/main amd64 libcap2-bin amd64 1:2.32-1 [26.2 kB]
Get:7 http://archive.ubuntu.com/ubuntu focal/main amd64 iproute2 amd64 5.5.0-1ubuntu1 [858 kB]
Get:8 http://archive.ubuntu.com/ubuntu focal/main amd64 libatm1 amd64 1:2.5.1-4 [21.8 kB]
Get:9 http://archive.ubuntu.com/ubuntu focal/main amd64 libexpat1 amd64 2.2.9-1build1 [73.3 kB]
Get:10 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 tzdata all 2020a-0ubuntu0.20.04 [293 kB]
Get:11 http://archive.ubuntu.com/ubuntu focal/main amd64 libicu66 amd64 66.1-2ubuntu2 [8520 kB]
Get:12 http://archive.ubuntu.com/ubuntu focal/main amd64 libpam-cap amd64 1:2.32-1 [8352 B]
Get:13 http://archive.ubuntu.com/ubuntu focal/main amd64 libssl1.1 amd64 1.1.1f-1ubuntu2 [1318 kB]
Get:14 http://archive.ubuntu.com/ubuntu focal/main amd64 libxml2 amd64 2.9.10+dfsg-5 [640 kB]
Get:15 http://archive.ubuntu.com/ubuntu focal/main amd64 ucf all 3.0038+nmu1 [51.6 kB]
Get:16 http://archive.ubuntu.com/ubuntu focal/main amd64 libpng16-16 amd64 1.6.37-2 [179 kB]
Get:17 http://archive.ubuntu.com/ubuntu focal/main amd64 libxau6 amd64 1:1.0.9-0ubuntu1 [7488 B]
Get:18 http://archive.ubuntu.com/ubuntu focal/main amd64 libxdmcp6 amd64 1:1.1.3-0ubuntu1 [10.6 kB]
Get:19 http://archive.ubuntu.com/ubuntu focal/main amd64 libxcb1 amd64 1.14-2 [44.7 kB]
Get:20 http://archive.ubuntu.com/ubuntu focal/main amd64 libx11-data all 2:1.6.9-2ubuntu1 [113 kB]
Get:21 http://archive.ubuntu.com/ubuntu focal/main amd64 libx11-6 amd64 2:1.6.9-2ubuntu1 [573 kB]
Get:22 http://archive.ubuntu.com/ubuntu focal/main amd64 fonts-dejavu-core all 2.37-1 [1041 kB]
Get:23 http://archive.ubuntu.com/ubuntu focal/main amd64 fontconfig-config all 2.13.1-2ubuntu3 [28.8 kB]
Get:24 http://archive.ubuntu.com/ubuntu focal/main amd64 libfreetype6 amd64 2.10.1-2 [341 kB]
Get:25 http://archive.ubuntu.com/ubuntu focal/main amd64 libfontconfig1 amd64 2.13.1-2ubuntu3 [114 kB]
Get:26 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 libjpeg-turbo8 amd64 2.0.3-0ubuntu1.20.04.1 [117 kB]
Get:27 http://archive.ubuntu.com/ubuntu focal/main amd64 libjpeg8 amd64 8c-2ubuntu8 [2194 B]
Get:28 http://archive.ubuntu.com/ubuntu focal/main amd64 libjbig0 amd64 2.1-3.1build1 [26.7 kB]
Get:29 http://archive.ubuntu.com/ubuntu focal/main amd64 libwebp6 amd64 0.6.1-2 [185 kB]
Get:30 http://archive.ubuntu.com/ubuntu focal/main amd64 libtiff5 amd64 4.1.0+git191117-2build1 [161 kB]
Get:31 http://archive.ubuntu.com/ubuntu focal/main amd64 libxpm4 amd64 1:3.5.12-1 [34.0 kB]
Get:32 http://archive.ubuntu.com/ubuntu focal/main amd64 libgd3 amd64 2.2.5-5.2ubuntu2 [118 kB]
Get:33 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 nginx-common all 1.18.0-0ubuntu1 [37.3 kB]
Get:34 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 libnginx-mod-http-image-filter amd64 1.18.0-0ubuntu1 [14.3 kB]
Get:35 http://archive.ubuntu.com/ubuntu focal/main amd64 libxslt1.1 amd64 1.1.34-4 [152 kB]
Get:36 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 libnginx-mod-http-xslt-filter amd64 1.18.0-0ubuntu1 [12.6 kB]
Get:37 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 libnginx-mod-mail amd64 1.18.0-0ubuntu1 [42.3 kB]
Get:38 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 libnginx-mod-stream amd64 1.18.0-0ubuntu1 [66.9 kB]
Get:39 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 nginx-core amd64 1.18.0-0ubuntu1 [425 kB]
Get:40 http://archive.ubuntu.com/ubuntu focal-updates/main amd64 nginx all 1.18.0-0ubuntu1 [3624 B]
debconf: delaying package configuration, since apt-utils is not installed
Fetched 15.8 MB in 6s (2445 kB/s)
Selecting previously unselected package libbsd0:amd64.
(Reading database ... 4122 files and directories currently installed.)
Preparing to unpack .../00-libbsd0_0.10.0-1_amd64.deb ...
Unpacking libbsd0:amd64 (0.10.0-1) ...
Selecting previously unselected package libcap2:amd64.
Preparing to unpack .../01-libcap2_1%3a2.32-1_amd64.deb ...
Unpacking libcap2:amd64 (1:2.32-1) ...
Selecting previously unselected package libelf1:amd64.
Preparing to unpack .../02-libelf1_0.176-1.1build1_amd64.deb ...
Unpacking libelf1:amd64 (0.176-1.1build1) ...
Selecting previously unselected package libmnl0:amd64.
Preparing to unpack .../03-libmnl0_1.0.4-2_amd64.deb ...
Unpacking libmnl0:amd64 (1.0.4-2) ...
Selecting previously unselected package libxtables12:amd64.
Preparing to unpack .../04-libxtables12_1.8.4-3ubuntu2_amd64.deb ...
Unpacking libxtables12:amd64 (1.8.4-3ubuntu2) ...
Selecting previously unselected package libcap2-bin.
Preparing to unpack .../05-libcap2-bin_1%3a2.32-1_amd64.deb ...
Unpacking libcap2-bin (1:2.32-1) ...
Selecting previously unselected package iproute2.
Preparing to unpack .../06-iproute2_5.5.0-1ubuntu1_amd64.deb ...
Unpacking iproute2 (5.5.0-1ubuntu1) ...
Selecting previously unselected package libatm1:amd64.
Preparing to unpack .../07-libatm1_1%3a2.5.1-4_amd64.deb ...
Unpacking libatm1:amd64 (1:2.5.1-4) ...
Selecting previously unselected package libexpat1:amd64.
Preparing to unpack .../08-libexpat1_2.2.9-1build1_amd64.deb ...
Unpacking libexpat1:amd64 (2.2.9-1build1) ...
Selecting previously unselected package tzdata.
Preparing to unpack .../09-tzdata_2020a-0ubuntu0.20.04_all.deb ...
Unpacking tzdata (2020a-0ubuntu0.20.04) ...
Selecting previously unselected package libicu66:amd64.
Preparing to unpack .../10-libicu66_66.1-2ubuntu2_amd64.deb ...
Unpacking libicu66:amd64 (66.1-2ubuntu2) ...
Selecting previously unselected package libpam-cap:amd64.
Preparing to unpack .../11-libpam-cap_1%3a2.32-1_amd64.deb ...
Unpacking libpam-cap:amd64 (1:2.32-1) ...
Selecting previously unselected package libssl1.1:amd64.
Preparing to unpack .../12-libssl1.1_1.1.1f-1ubuntu2_amd64.deb ...
Unpacking libssl1.1:amd64 (1.1.1f-1ubuntu2) ...
Selecting previously unselected package libxml2:amd64.
Preparing to unpack .../13-libxml2_2.9.10+dfsg-5_amd64.deb ...
Unpacking libxml2:amd64 (2.9.10+dfsg-5) ...
Selecting previously unselected package ucf.
Preparing to unpack .../14-ucf_3.0038+nmu1_all.deb ...
Moving old data out of the way
Unpacking ucf (3.0038+nmu1) ...
Selecting previously unselected package libpng16-16:amd64.
Preparing to unpack .../15-libpng16-16_1.6.37-2_amd64.deb ...
Unpacking libpng16-16:amd64 (1.6.37-2) ...
Selecting previously unselected package libxau6:amd64.
Preparing to unpack .../16-libxau6_1%3a1.0.9-0ubuntu1_amd64.deb ...
Unpacking libxau6:amd64 (1:1.0.9-0ubuntu1) ...
Selecting previously unselected package libxdmcp6:amd64.
Preparing to unpack .../17-libxdmcp6_1%3a1.1.3-0ubuntu1_amd64.deb ...
Unpacking libxdmcp6:amd64 (1:1.1.3-0ubuntu1) ...
Selecting previously unselected package libxcb1:amd64.
Preparing to unpack .../18-libxcb1_1.14-2_amd64.deb ...
Unpacking libxcb1:amd64 (1.14-2) ...
Selecting previously unselected package libx11-data.
Preparing to unpack .../19-libx11-data_2%3a1.6.9-2ubuntu1_all.deb ...
Unpacking libx11-data (2:1.6.9-2ubuntu1) ...
Selecting previously unselected package libx11-6:amd64.
Preparing to unpack .../20-libx11-6_2%3a1.6.9-2ubuntu1_amd64.deb ...
Unpacking libx11-6:amd64 (2:1.6.9-2ubuntu1) ...
Selecting previously unselected package fonts-dejavu-core.
Preparing to unpack .../21-fonts-dejavu-core_2.37-1_all.deb ...
Unpacking fonts-dejavu-core (2.37-1) ...
Selecting previously unselected package fontconfig-config.
Preparing to unpack .../22-fontconfig-config_2.13.1-2ubuntu3_all.deb ...
Unpacking fontconfig-config (2.13.1-2ubuntu3) ...
Selecting previously unselected package libfreetype6:amd64.
Preparing to unpack .../23-libfreetype6_2.10.1-2_amd64.deb ...
Unpacking libfreetype6:amd64 (2.10.1-2) ...
Selecting previously unselected package libfontconfig1:amd64.
Preparing to unpack .../24-libfontconfig1_2.13.1-2ubuntu3_amd64.deb ...
Unpacking libfontconfig1:amd64 (2.13.1-2ubuntu3) ...
Selecting previously unselected package libjpeg-turbo8:amd64.
Preparing to unpack .../25-libjpeg-turbo8_2.0.3-0ubuntu1.20.04.1_amd64.deb ...
Unpacking libjpeg-turbo8:amd64 (2.0.3-0ubuntu1.20.04.1) ...
Selecting previously unselected package libjpeg8:amd64.
Preparing to unpack .../26-libjpeg8_8c-2ubuntu8_amd64.deb ...
Unpacking libjpeg8:amd64 (8c-2ubuntu8) ...
Selecting previously unselected package libjbig0:amd64.
Preparing to unpack .../27-libjbig0_2.1-3.1build1_amd64.deb ...
Unpacking libjbig0:amd64 (2.1-3.1build1) ...
Selecting previously unselected package libwebp6:amd64.
Preparing to unpack .../28-libwebp6_0.6.1-2_amd64.deb ...
Unpacking libwebp6:amd64 (0.6.1-2) ...
Selecting previously unselected package libtiff5:amd64.
Preparing to unpack .../29-libtiff5_4.1.0+git191117-2build1_amd64.deb ...
Unpacking libtiff5:amd64 (4.1.0+git191117-2build1) ...
Selecting previously unselected package libxpm4:amd64.
Preparing to unpack .../30-libxpm4_1%3a3.5.12-1_amd64.deb ...
Unpacking libxpm4:amd64 (1:3.5.12-1) ...
Selecting previously unselected package libgd3:amd64.
Preparing to unpack .../31-libgd3_2.2.5-5.2ubuntu2_amd64.deb ...
Unpacking libgd3:amd64 (2.2.5-5.2ubuntu2) ...
Selecting previously unselected package nginx-common.
Preparing to unpack .../32-nginx-common_1.18.0-0ubuntu1_all.deb ...
Unpacking nginx-common (1.18.0-0ubuntu1) ...
Selecting previously unselected package libnginx-mod-http-image-filter.
Preparing to unpack .../33-libnginx-mod-http-image-filter_1.18.0-0ubuntu1_amd64.deb ...
Unpacking libnginx-mod-http-image-filter (1.18.0-0ubuntu1) ...
Selecting previously unselected package libxslt1.1:amd64.
Preparing to unpack .../34-libxslt1.1_1.1.34-4_amd64.deb ...
Unpacking libxslt1.1:amd64 (1.1.34-4) ...
Selecting previously unselected package libnginx-mod-http-xslt-filter.
Preparing to unpack .../35-libnginx-mod-http-xslt-filter_1.18.0-0ubuntu1_amd64.deb ...
Unpacking libnginx-mod-http-xslt-filter (1.18.0-0ubuntu1) ...
Selecting previously unselected package libnginx-mod-mail.
Preparing to unpack .../36-libnginx-mod-mail_1.18.0-0ubuntu1_amd64.deb ...
Unpacking libnginx-mod-mail (1.18.0-0ubuntu1) ...
Selecting previously unselected package libnginx-mod-stream.
Preparing to unpack .../37-libnginx-mod-stream_1.18.0-0ubuntu1_amd64.deb ...
Unpacking libnginx-mod-stream (1.18.0-0ubuntu1) ...
Selecting previously unselected package nginx-core.
Preparing to unpack .../38-nginx-core_1.18.0-0ubuntu1_amd64.deb ...
Unpacking nginx-core (1.18.0-0ubuntu1) ...
Selecting previously unselected package nginx.
Preparing to unpack .../39-nginx_1.18.0-0ubuntu1_all.deb ...
Unpacking nginx (1.18.0-0ubuntu1) ...
Setting up libexpat1:amd64 (2.2.9-1build1) ...
Setting up libxau6:amd64 (1:1.0.9-0ubuntu1) ...
Setting up libssl1.1:amd64 (1.1.1f-1ubuntu2) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up nginx-common (1.18.0-0ubuntu1) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up libatm1:amd64 (1:2.5.1-4) ...
Setting up libjbig0:amd64 (2.1-3.1build1) ...
Setting up libcap2:amd64 (1:2.32-1) ...
Setting up tzdata (2020a-0ubuntu0.20.04) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Configuring tzdata
------------------

Please select the geographic area in which you live. Subsequent configuration
questions will narrow this down by presenting a list of cities, representing
the time zones in which they are located.

  1. Africa      4. Australia  7. Atlantic  10. Pacific  13. Etc
  2. America     5. Arctic     8. Europe    11. SystemV
  3. Antarctica  6. Asia       9. Indian    12. US
Geographic area:
Use of uninitialized value $_[1] in join or string at /usr/share/perl5/Debconf/DbDriver/Stack.pm line 111.

Current default time zone: '/UTC'
Local time is now:      Mon Aug 24 15:05:26 UTC 2020.
Universal Time is now:  Mon Aug 24 15:05:26 UTC 2020.
Run 'dpkg-reconfigure tzdata' if you wish to change it.

Use of uninitialized value $val in substitution (s///) at /usr/share/perl5/Debconf/Format/822.pm line 83, <GEN6> line 4.
Use of uninitialized value $val in concatenation (.) or string at /usr/share/perl5/Debconf/Format/822.pm line 84, <GEN6> line 4.
Setting up libcap2-bin (1:2.32-1) ...
Setting up libx11-data (2:1.6.9-2ubuntu1) ...
Setting up libpng16-16:amd64 (1.6.37-2) ...
Setting up libmnl0:amd64 (1.0.4-2) ...
Setting up libwebp6:amd64 (0.6.1-2) ...
Setting up fonts-dejavu-core (2.37-1) ...
Setting up ucf (3.0038+nmu1) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up libjpeg-turbo8:amd64 (2.0.3-0ubuntu1.20.04.1) ...
Setting up libxtables12:amd64 (1.8.4-3ubuntu2) ...
Setting up libbsd0:amd64 (0.10.0-1) ...
Setting up libelf1:amd64 (0.176-1.1build1) ...
Setting up libpam-cap:amd64 (1:2.32-1) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up libjpeg8:amd64 (8c-2ubuntu8) ...
Setting up libnginx-mod-mail (1.18.0-0ubuntu1) ...
Setting up libxdmcp6:amd64 (1:1.1.3-0ubuntu1) ...
Setting up libxcb1:amd64 (1.14-2) ...
Setting up fontconfig-config (2.13.1-2ubuntu3) ...
Setting up iproute2 (5.5.0-1ubuntu1) ...
debconf: unable to initialize frontend: Dialog
debconf: (TERM is not set, so the dialog frontend is not usable.)
debconf: falling back to frontend: Readline
debconf: unable to initialize frontend: Readline
debconf: (Can't locate Term/ReadLine.pm in @INC (you may need to install the Term::ReadLine module) (@INC contains: /etc/perl /usr/local/lib/x86_64-linux-gnu/perl/5.30.0 /usr/local/share/perl/5.30.0 /usr/lib/x86_64-linux-gnu/perl5/5.30 /usr/share/perl5 /usr/lib/x86_64-linux-gnu/perl/5.30 /usr/share/perl/5.30 /usr/local/lib/site_perl /usr/lib/x86_64-linux-gnu/perl-base) at /usr/share/perl5/Debconf/FrontEnd/Readline.pm line 7.)
debconf: falling back to frontend: Teletype
Setting up libicu66:amd64 (66.1-2ubuntu2) ...
Setting up libnginx-mod-stream (1.18.0-0ubuntu1) ...
Setting up libfreetype6:amd64 (2.10.1-2) ...
Setting up libx11-6:amd64 (2:1.6.9-2ubuntu1) ...
Setting up libtiff5:amd64 (4.1.0+git191117-2build1) ...
Setting up libfontconfig1:amd64 (2.13.1-2ubuntu3) ...
Setting up libxml2:amd64 (2.9.10+dfsg-5) ...
Setting up libxpm4:amd64 (1:3.5.12-1) ...
Setting up libgd3:amd64 (2.2.5-5.2ubuntu2) ...
Setting up libxslt1.1:amd64 (1.1.34-4) ...
Setting up libnginx-mod-http-image-filter (1.18.0-0ubuntu1) ...
Setting up libnginx-mod-http-xslt-filter (1.18.0-0ubuntu1) ...
Setting up nginx-core (1.18.0-0ubuntu1) ...
invoke-rc.d: could not determine current runlevel
invoke-rc.d: policy-rc.d denied execution of start.
Setting up nginx (1.18.0-0ubuntu1) ...
Processing triggers for libc-bin (2.31-0ubuntu9) ...
Removing intermediate container 66e3394dbf6a
 ---> bc7d1680eeda
Step 5/6 : EXPOSE 80
 ---> Running in 7cf207c904b9
Removing intermediate container 7cf207c904b9
 ---> 91208fb5acd9
Step 6/6 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in b96361dcb08d
Removing intermediate container b96361dcb08d
 ---> 76debc75be96
Successfully built 76debc75be96
```

### Chạy thử
```bash
docker run 76debc75be96
```

## Các lệnh cơ bản trong Docker
- List các container đang chạy:
    ```bash
    docker ps
    ```
- List tất cả các container hiện có:
    ```bash
    docker container ls -a
    ```
- Xoá tất cả các Docker images hiện có:
    ```bash
    docker system prune -a
    ```
- Xem cấu hình docker-compose hiện có:
    ```bash
    docker-compose config
    ```
- Down các container đang chạy:
    ```bash
    docker-compose down
    ```
- Build image từ container:
    ```bash
    docker build -t <container name> .
    ```
- Pull một image từ hub
    ```bash
    docker pull <image name>:<tag>
    ```

## Lời kết
Như vậy bạn đã nắm được kha khá kiến thức vè Docker rồi đấy :D, nhưng nhớ là đừng mang đi chém gió nhé bay xác đấy :D
Hy vọng qua các ví dụ và hướng dãn trên bạn đã phần nào nắm và hiểu được về cách build một Docker image, bạn có thể đẩy lên Hub rồi đó, còn cách đẩy lên hub như nào thì vui lòng search thêm hoặc đợi bài viết sau của mình nhé!
Cảm ơn bạn đã dành thời gian đọc bài!
