---
title: "Lần đầu làm chuyện đấy với Cakephp trên môi trường docker"
date: "2020-08-03"
published: true
tags:
  - php
  - cakephp
---

Lần đầu tiên em gửi lời chào đến anh chị em trong công ty chúng ta, và cũng lần đầu tiên em viết bài trên  **tomoblo** cảm xúc vẫn còn phê phê. 
Bài viết này ngoài đưa ra 1 cách để cài đặt **CakePHP** trên môi trường Docker thì cũng lưu lại 1 **quãng đường gian khổ** mày mò của em về sử dụng cái 
framework **CakePHP** rối rắm này (thực sự nó rối rắm lắm  ^^).

## Phần mở đầu lằng nhằng luyên thuyên
Vốn dĩ là một người nhút nhát, e dè em thực sự đã gặp khó khăn khi giải quyết một vấn đề. 
Sau đó em có **hỏi thẳng luôn ông anh làm cùng**, ông đã bày cho giải pháp là ảo hoá với **Vagrant**. 
Nhưng không hiểu em xử lý thế nào mà lại cũng vẫn thiếu cái extension khó chịu kia. Và em lại phải đi tìm hiểu 1 chút. Và cũng vỡ ra được vài điều. 
Vấn đề em gặp hoá ra nhiều bác trước cũng gặp rồi và các bác ấy cũng đề xuất ra mấy mô hình. 
Mô hình mà dùng Vagrant kia là mô hình thế này:
                                                                            
![enter image description here](https://images.viblo.asia/3ea4768d-c5f2-40c1-aa44-248d8063fddb.png)

Dùng **máy ảo** em không thấy hiệu quả với em. Mà kể cả hiệu quả thì việc dùng máy ảo tốn RAM em cũng không thích. 
"Vũ khí tối thượng" cũ của em toàn là các loại thiếu tài nguyên nên kể cả khi dùng đồ này thì em cũng thực sự rén.... 
Thế là em lại phải về "tà đạo", mở đồ cũ code trên **github** lấy demo cho nhanh. 😢

Về lại **"tà đạo"** thuận tiện thật, nhưng **lương tâm** bứt rứt vô cùng. 
em lại phải cố gắng làm thế nào mà nó lại có thể chạy trên môi trường kiểu Unix kia. 
Và đành vượt qua nỗi sợ + đang dịch covid, em bắt đầu dấn thân tìm hiểu Docker. 
Và sơ sơ em đã hiểu qua được mô hình của nó cũng như thích sự dùng đủ của containerization, 
không thích dùng ngốn nhưng ko dùng hết của virtualization.

![enter image description here](https://images.viblo.asia/633a002e-7f9b-4947-9aba-58a4a4933eb6.png)

## Cố gắng lần 1(fail)
Đầu tiên, dựa vào bài dịch của các bác bên trên, em đã chạy các lệnh sau:
```
$ mkdir app
$ cd app
```
Rồi chạy php:7.1.5-apache
```
$ docker run -it --rm -v ${PWD}:/usr/src/app php:7.1.5-apache bash
```
Sau đó chạy thêm các thư viện cần thiết và cài composer
```
root@f28aed5c29e7:/var/www/html# apt-get update && apt-get install -y libicu-dev libpq-dev libmcrypt-dev mysql-client git zip unzip 
root@f28aed5c29e7:/var/www/html# rm -r /var/lib/apt/lists/* && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd 
root@f28aed5c29e7:/var/www/html# docker-php-ext-install intl mbstring mcrypt pcntl pdo_mysql pdo_pgsql pgsql zip opcache
root@f28aed5c29e7:/var/www/html# curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer
```
Mọi thứ đều rất ok cho tới khi em tạo Dockerfile và docker-compose.yml. 
Đúng là mọi thứ đã chạy, vâng mọi thứ thực sự đã mỗi tội là không biết 
project đi đâu mà lần 😢 Làm sao để có thể code project được đây??

## Cố gắng lần 2: Khá trâu bò nhưng hiệu quả
Túng quá đâm em liều. Em tham khảo thêm trên docker hub rồi thêm vào Dockerfile và docker-compose.yml.

Dockerfile như sau:
```
# ROM php:7-fpm
# RUN apt-get update \
#  && apt-get install -y git libcurl4-gnutls-dev zlib1g-dev libicu-dev g++ libxml2-dev libpq-dev unzip vim \
#  && docker-php-ext-install pdo pdo_mysql intl curl json opcache xml \
#  && apt-get autoremove && apt-get autoclean \
#  && rm -rf /var/lib/apt/lists/*
# ENV COMPOSER_ALLOW_SUPERUSER 1
# ENV COMPOSER_NO_INTERACTION 1
# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#   && php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
#   && php composer-setup.php \
#   && php -r "unlink('composer-setup.php');" \
#   && mv composer.phar /usr/local/bin/composer
# CMD php-fpm

FROM php:7.4-fpm

RUN apt-get update

RUN apt-get install -y git libzip-dev zip unzip \
    && docker-php-ext-install zip

RUN docker-php-ext-install pdo_mysql

RUN apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_NO_INTERACTION 1
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  #&& php -r "if (hash_file('sha384', 'composer-setup.php') === '48e3236262b34d30969dca3c37281b3b4bbe3221bda826ac6a9a62d6444cdb0dcd0615698a5cbe587c3f0fe57a54d8f5') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
  && php composer-setup.php \
  && php -r "unlink('composer-setup.php');" \
  && mv composer.phar /usr/local/bin/composer
CMD php-fpm
```

Còn đây là docker-compose.yml
```
version: '3.4'

volumes:
  cake.db.volume:
    name: cake.db.volume

services:
  nginx:
    image: nginx:1.17
    container_name: cake_nginx
    ports:
      - '8087:80'
    volumes:
      - ./config/nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./src/htdocs:/var/www/html

  php:
    container_name: cake_php
    build: config/php
    volumes:
      - ./src/htdocs:/var/www/html

  db:
    image: mysql:5.7
    container_name: cake_db
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      # MYSQL_DATABASE: cake
      MYSQL_USER: myroot
      MYSQL_PASSWORD: mypass
      TZ: 'Asia/Tokyo'
    volumes:
      - ./config/mysql/my.cnf:/etc/mysql/my.cnf
      - ./config/mysql/init:/docker-entrypoint-initdb.d
      - cake.db.volume:/var/lib/mysql
```

Ở app.local.php em chỉnh như sau:

```
'Datasources' => [
    'default' => [
        'host' => '172.30.0.4',
        /*
         * CakePHP will use the default DB port based on the driver selected
         * MySQL on MAMP uses port 8889, MAMP users will want to uncomment
         * the following line and set the port accordingly
         */
        //'port' => 'non_standard_port_number',
        'username' => 'root',
        'password' => 'root',
        'database' => 'root_db',
        /**
         * If not using the default 'public' schema with the PostgreSQL driver
         * set it here.
         */
        //'schema' => 'myapp',
        /**
         * You can use a DSN string to set the entire configuration
         */
        'url' => env('DATABASE_URL', null),
    ],
```
Chạy lần lượt các lệnh
```
docker-compose build
docker-compose up -d
```
Sau đó nhập  **http://localhost:8087**, nó sẽ cho giao diện thế này

![enter image description here](https://i.ytimg.com/vi/0SkEU6KP7HM/hqdefault.jpg)

Tất cả các thông số đều màu xanh. Chứng tỏ là project này hoàn toàn kết nối tới 1 database và bạn hoàn toàn có thể chiến đấu thoải mái.

Các bước tiếp theo về migrate, seed,... các bạn sẽ đọc ở blog của cloud66 mình đính kèm link dưới đây.

Tuy nhiên với bản thân mình thì còn cần tạo cả khung MVC với các bảng nữa nên mình sẽ để 1 terminal chạy docker-compose up ở 1 bên và mở terminal mới chạy lệnh sau:
```
docker exec -ti <tên của container chứa cakephp> /bin/bash 
```
Với terminal này bạn có thể tuỳ ý chạy các command thông thường của CakePHP, ví dụ
```
bin/cake bake migration CreateUsers
bin/cake bake all Users
```
À với cách này bạn phải tự tạo .gitattributes và .gitignore bằng tay nhé.

## Tổng kết
Tưởng như đơn giản mà làm không ra, rồi sai sót mấy lần.

Cảm ơn các bạn (anh/chị) đã đọc cái bài post lộn xộn này. Nội dung cũng thập cẩm này nọ thật. 
Rất mong các bạn (anh/chị) thông cảm nếu thấy lằng nhằng ^^.

## Tham khảo
```
https://hub.docker.com/r/occitech/cakephp
https://github.com/diepz/cakephp
```
