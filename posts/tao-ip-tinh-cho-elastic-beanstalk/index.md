---
title: "Tạo IP tĩnh cho Elastic Beanstalk"
date: "2021-02-28"
published: true
tags:
  - aws
---

[[snippet]]
| Hệ sinh thái AWS khổng lồ cung cấp cho chúng ta vô vàn công cụ giúp đẩy nhanh thời gian đưa ý tưởng thành sản phẩm. Trong đó có Elastic Beanstalk (EB). EB là nền tảng giúp ta quản lý tất cả mọi thứ, như server,load balancer,autoscale,deploy, monitoring, vv... một cách trực quan và dễ hiểu nhất. Chỉ mất 1,2 ngày setup là tất cả mọi thứ ready. Bài viết này hướng dẫn cách gắn một IP tính cho tất cả các instances trong 1 load balanced EB environment.

## Mở đầu

Với 1 load balanced EB environment, có rất nhiều thứ có thể làm thay đổi IP server của bạn.

- deploy
- auto scaling
- stop & start server
- update config, settings ...

EB rất linh hoạt, nên server của bạn cũng sẽ rất "linh hoạt".
Vậy nếu tôi muốn gắn 1 IP cố định duy nhất cho tất cả các server của tôi thì sao?
Có nhiều kịch bản yêu cầu một IP cố định cho server. Tóm lại là không muốn công khai thông tin với người ngoài, tôi chỉ cho ông này với IP này truy cập dữ liệu của tôi thôi.

*Một số khái niệm trong bài viết có thể lạ lẫm với một số bạn chưa có kinh nghiệm làm việc với AWS.*
 
## Làm thế nào để cố định IP servers trong Loadbalanced EB

Trả lời luôn là dùng NAT Gateway. NAT Gateway dùng để làm gì? Theo tài liệu, NAT Gateway cho phép server của bạn kết nối với internet nhưng không cho internet kết nối trực tiếp tới server.

>You can use a network address translation (NAT) gateway to enable instances in a private subnet to connect to the internet or other AWS services, but prevent the internet from initiating a connection with those instances.
refs https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

nat gateway diagram | nguồn: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html
![nat gateway diagram](https://docs.aws.amazon.com/vpc/latest/userguide/images/nat-gateway-diagram.png)

Hệ thống sẽ hoạt động như sau:

- NAT gateway nằm giữa server và Internet (chiều kết nối từ server ra internet)
- NAT gateway được gắn 1 IP cố đinh
- Tất cả các kết nối từ server tới internet được router điều hướng qua NAT Gateway trước khi tới Internet

Như vậy suy ra việc bạn cần phải làm là:

- NAT Gateway cần được thiết lập để truy cập được internet
- Cần gắn một IP tĩnh cho NAT Gateway
- Cần điều hướng tất cả các kết nối của server qua NAT Gateway

Tiếp theo sẽ là các bước cụ thể, phải làm thế nào

### Bước 1: Chuẩn bị sẵn các tài nguyên cần thiết

- 1 VPC
- 1 EIP (Elastic IP) chưa được sử dụng
- 1 Route table cho internet access (public)
- 1 Route table cho NAT Gateway (private)
- 2 subnet (1 private, 1 public)
- servers (ở đây dùng luôn Loadbalanced EB servers)

### Bước 2: Tạo 1 NAT Gateway mới

- Subnet: chọn public subnet
- Elastic IP allocation ID: chọn EIP đã chuẩn bị

![create new gateway](/create-gateway.png)

NAT Gateway phải truy cập được internet nên phải chọn public subnet

### Bước 3: Thiết lập Route table private

Tạo một route table mới, sau đó edit routes, thêm routes sau

- Destination: 0.0.0.0/0
- Target: chọn NAT gateway vừa tạo.

Route table này có nhiệm vụ điều hướng tất cả kết nối đến và gửi tới NAT Gateway

![route table](/route-table-private.png)

Sau khi tạo routes thì qua subnets. Click vào private subnet đã chuẩn bị và "Edit route table association".
Chọn lại Route table private vừa tạo

![private subnet](/private-subnet.png)

Như vậy tất cả server trong subnet private, kết nối tới internet sẽ đều được điều hướng thông qua NAT Gateway

### Bước 4: Chuyển tất cả servers sang private subnet (DONE)

Khi tạo EB environment mới cần thực hiện đẩy đủ 1,2,3 
nhưng với EB có sẵn thì chỉ cần thực hiện bước 3 thôi.

1. Phần Network: chọn VPC
2. Load balancer setting

    - Visibility: chọn public
    - Chọn public subnets.

3. Instance settings

    - Public IP addres: bỏ chọn
    - Instance subnets: chọn private subnet

Như vậy ta đã hoàn tất các bước thiết lập IP cố định cho tất cả server trong 1 load balanced EB environment.
Để test thử thành quả thì rất đơn giản

- ssh vào server
- run `curl ipinfo.io` để kiểm tra IP của server

## Kết

Bài viết đã
- trình bày cách làm thế nào để gắn IP cố định cho servers trong loadbalanced EB env
- giải thích ngắn gọn về cách hoạt động cũng như tại sao lại setting thế này, setting thế kia.

Do ít thời gian nên bài viết chưa giải thích hết được các khái niệm được đề cập đến, một số bạn chưa có kinh nghiệm aws sẽ thấy khó hiểu. Thời gian tới tác giả sẽ cố gắng có nhiều bài chủ đề liên quan tới aws hơn.

Cảm ơn mọi người đã đọc bài viết, nếu có comments thì liên lạc với mình qua email anh.nguyen@tomosia.com.

[[author | Nguyen Tuan Anh ]]