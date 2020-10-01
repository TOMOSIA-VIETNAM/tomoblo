---
title: "[Aws] Cách cài đặt HTTPS bằng Cerbot cho Apache2 trên AWS EC2"
date: "2020-01-10"
published: true
tags:
  - aws
---

## Vấn đề đặt ra
- Bạn đang làm việc với API của Facebook, những plugin của Facebook. Nhưng khi deploy code lên staging để kiểm tra thì lại nhận được lỗi là API của Facebook chỉ hỗ trợ localhost và domain được cài đặt HTTPS (SSL certificate). 
- Có nhiều loại chứng chỉ SSL cung cấp các mức độ bảo mật khác nhau. Chúng ta có thể mua một chứng chỉ SSL tại Namecheap với các mức giá khác nhau. Nhưng trong bài viết này sẽ trình bày một cách để cài đặt HTTPS cho domain một cách miễn phí.

## Chuẩn bị
- 1 server AWS EC2 Ubuntu 18.04 + Apache2
- VPS EC2 đã được mở sẵn port 80 và port 443
## Cách làm

#### 1. Cài đặt Apache:
```bash
sudo apt update
sudo apt install apache2 -y
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers
sudo systemctl restart apache2
```
#### 2. Cài đặt thư viện Certbot:
```bash
sudo apt-get install software-properties-common
sudo apt-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-apache
```

#### 3. Cho phép HTTPS thông qua tường lửa:
```bash
$ sudo ufw allow 'Apache Full'
$ sudo ufw delete allow 'Apache'
$ sudo ufw status
```
- Bạn sẽ nhận đươc kết quả như bên dưới:
```
Output
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Apache Full                ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Apache Full (v6)           ALLOW       Anywhere (v6)
```
#### 4. Cài đặt HTTPS cho domain:
```bash
sudo certbot --apache
```
- Bước này sẽ yêu cầu bạn nhập email, email này sẽ được dùng để làm mới chứng chỉ SSL khi hết hạn.
```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator apache, Installer apache
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): you@your_domain
```
- Sau khi nhập Email, bạn cần xác nhận tuân thủ quy định của dịch vụ Let’s Encrypt. Chọn A để tiếp tục.
```bash
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: A
```
- Tiếp theo, bạn sẽ được hỏi liệu bạn có muốn chia sẻ email của mình với Electronic Frontier Foundation để nhận tin tức và thông tin khác hay không. Bỏ qua nếu bạn thấy không cần thiết.
```bash
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: N
```
- Bước tiếp theo bạn sẽ được chọn tên miền để cài đặt HTTPS. Nếu muốn cài đặt cho toàn bộ thì để trống và nhấn Enter để tiếp tục.
```bash
Which names would you like to activate HTTPS for?
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: your_domain
2: www.your_domain
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):
```
- Tiếp theo là quá trình kiểm tra điều kiện tên miền của bạn có đáp ứng điều kiện để cài đặt HTTPS không? Nếu hợp lệ sẽ tiến hành cài đặt HTTPS cho tên miền bạn vừa chọn.
```bash
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for your_domain
http-01 challenge for www.your_domain
Enabled Apache rewrite module
Waiting for verification...
Cleaning up challenges
Created an SSL vhost at /etc/apache2/sites-available/your_domain-le-ssl.conf
Enabled Apache socache_shmcb module
Enabled Apache ssl module
Deploying Certificate to VirtualHost /etc/apache2/sites-available/your_domain-le-ssl.conf
Enabling available site: /etc/apache2/sites-available/your_domain-le-ssl.conf
Deploying Certificate to VirtualHost /etc/apache2/sites-available/your_domain-le-ssl.conf
```
- Sau khi cài đặt kết thúc. Bạn sẽ được hỏi là có muốn chuyển hướng trang web sang HTTPS không? Cụ thể là nếu người dùng vào tên miền cửa bạn với kênh HTTP sẽ được tự động chuyển hướng sang HTTPS.
```bash
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
```
- Sau khi xác nhận. Quá trình cài đặt HTTPS cho tên miền của bạn đã hoàn tất. Bạn sẽ nhận được thông báo như bên dưới.
```bash
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Congratulations! You have successfully enabled https://your_domain and https://www.your_domain
You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=your_domain
https://www.ssllabs.com/ssltest/analyze.html?d=www.your_domain
#- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
IMPORTANT NOTES:
 -Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/your_domain/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/your_domain/privkey.pem
   Your cert will expire on 2020-07-27. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
  -Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 -If you like Certbot, please consider supporting our work by:
   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```


## Tổng kết
Vậy là chúng ta cài đặt được HTTPS cho tên miền của mình rồi. Tất nhiên bạn cần phải cài đặt Vitua Host cho domain của mình sau khi cài đặt Apache để Certbot có thể tìm được. Chứng chỉ SSL này có thời hạn 90 ngày. Khi hết hạn chỉ cần vào chạy lại từ đầu bước 4 là có thể đươc. Ngoài ra chúng ta có thể cài đặt cho máy chủ tự làm mới chứng chỉ SSL khi hết hạn. Tôi sẽ hướng dẫn cụ thể ở bài viết tiếp theo. Mong bài viết này sẽ giúp được mọi người.

## Tham khảo
- https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04
- https://vicloud.vn/community/cach-cai-dat-bo-linux-apache-mysql-php-lamp-tren-ubuntu-1804-540.html

[[author | Trần Văn Tuấn Anh ]]