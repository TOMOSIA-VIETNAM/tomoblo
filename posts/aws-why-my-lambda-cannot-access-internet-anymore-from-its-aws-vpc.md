---
title: "[AWS] Why my Lambda cannot access Internet anymore from its AWS VPC?"
date: "2021-02-19"
published: true
tags:
  - aws
---
[[snippet]]
| Trong bài này tôi sẽ hướng dẫn làm thế nào để Lambda (hay các resources khác trong AWS) thuộc private subnet có thể truy cập Internet. Ngoài ra, ta có thể chỉ định được IP cố định khi lambda truy cập internet

![AWS VPC with Internet Access](https://blog.theodo.com/static/ab8c61557bfb8bb1310933f58d76e74c/a79d3/aws-vpc-internet-access-thumbnail-image.png)

## 1 - Create a VPC

> **VPC** (**Virtual Private Cloud**) Là mạng riêng ảo trên Cloud nơi mà bạn có thể tạo ra các tài nguyên cho hệ thống của mình, nó giúp bạn tạo ra một môi trường tách biệt, nơi mà bạn có thể triển khai hệ thống trong một hệ thống mạng ảo riêng mà bạn định nghĩa. Bạn có toàn quyền quyết định môi trường mạng ảo này sẽ như thế nào, bao gồm lựa chọn dải IP của riêng bạn, tạo mạng con (**subnet**), bảng định tuyến (**route table**) và cổng kết nối mạng (**net gateway**), cũng có thể sử dụng cả **IPv4** và **IPv6** cho bảo mật và dễ dàng truy cập ứng dụng, tài nguyên của bạn.

Nếu bạn chưa có VPC thì bạn cần tạo 1 cái.
Để làm điều đó, đi đến tab Services, chọn VPC, click Your VPC phía bên trái menu và tạo 1 cái
- Nhập tên VPC, ví dụ `my-wonderful-vpc`
- Trong khối CIDR (class inter-domain routing) nhập 1 dải địa chỉ IP cho VPC của bạn, ví dụ 172.30.0.0/16
![create-vpc-image.png](https://blog.theodo.com/static/12dddc4cf6be0009fc21ad56da5414af/50383/create-vpc-image.png)
> 172.30.0.0/16 chúng ta gọi là network mask. Có nghĩa là tất cả IP sẽ bắt đầu từ 172.30.0.0 đến 172.30.255.255
![infra-step-1-image.png](https://blog.theodo.com/static/49d09eacdd40b1b6616f6b32af3fa0ad/50383/infra-step-1-image.png)
## 2 - Create private and public subnets in your VPC
>Subnet đơn giản là 1 dải địa chỉ IP trong VPC. Subnet có thể được coi là phân chia các mạng lớn thành các mạng nhỏ hơn. Về việc chia các mạng nhỏ hơn sẽ giúp ta dễ dàng bảo trì, bảo mật tốt hơn.

Để dùng lambda, bạn cần tạo 1 private subnet bên trong VPC.
Click on Subnets bên trái menu VPC service và sau đó click Create Subnet:
- Nhập tên subnet của bạn, ví dụ `my-wonderful-vpc-private-subnet`
- Chọn VPC mà bạn tạo ở bước trên (`my-wonder-vpc`)
- Trong khối CIDR, chọn 1 dải IP con (subrange IPs addresses) trong dải IP của VPC, ví dụ 172.30.1.0/24 (từ 173.30.1.0 đến 172.30.1.25)
![create-subnet-image.png](https://blog.theodo.com/static/19139e2d6109ddc2f4335db22e427c4c/50383/create-subnet-image.png)
> Để dễ trực quan hơn về CIDR bạn truy cập vào trang https://cidr.xyz/ để có thể biết được lớp mạng của bạn bắt đầu từ đầu và kết thúc ở đâu, có bao nhiêu IP.

Lặp lại bước trên, ta sẽ tạo public subnets, ví dụ `my-wonderfull-vpc-public` subnet với 1 dải IP con là 172.30.2.0/24.
Bạn sẽ thiết lập public subnet và private subnet ở bước thứ 4.
![infra-step-2-image.png](https://blog.theodo.com/static/08e12c442dc676f731fb65be57f54f49/50383/infra-step-2-image.png)
## 3 - Create an Internet Gateway and a NAT Gateway in the VPC
> Internet Gateway (IGW) là 1 kết nối logical giữa VPC và Internet. Nó không phải là 1 thiết bị vật lý. Nếu VPC không có IGW thì các resources trong VPC không thể truy cập Internet.
> A Network Address Translation (NAT) giúp các instance trong private subnet có thể kết nối đến Internet, nhưng sẽ tránh Internet kết nối trực tiếp đến các instance bên trong VPC. Đề làm được điều này, NAT sẽ ánh xạ tất cả các địa chỉ IP private đã được chỉ định cho các Instance thành một địa chỉ IPv4 public được gọi là địa chỉ Elastic IP (EIP).

Để truy cập Internet, bạn sẽ cần gắn IGW đến VPC.
Chọn Internet Gateways bên menu trái và sau đó click button Create internet gateway:
- Nhập tên IGW, ví dụ `my-wonderful-vpc-igw`
![create-internet-gateway-image.png](https://blog.theodo.com/static/41ce266991f341fdb961aadce3a59dc0/50383/create-internet-gateway-image.png)

Bạn sẽ cần gắn (attach) IGW cho VPC. Mở lại tab IGW, chọn IGW mà bạn vừa tạo (`my-wonderful-vpc-igw`), click vào Action, chọn Attach to VPC và chọn VPC của bạn (`my-wonderful-vpc`).
Bạn cũng cần tạo NAT Gateway. Click NAT Gateways bên trái menu và sau đó click button Create NAT Gateway:
- Chọn subnet mà bạn muốn public (`my-vonderful-vpc-public-subnet`)
- Chọn 1 Elastic IPs. Nếu bạn chưa có, thì click Create New EIP.
![create-nat-gateway-image.png](https://blog.theodo.com/static/7aa827098d17caed31765460b403b981/50383/create-nat-gateway-image.png)

Bây giờ, Infra của bạn sẽ trông như thế này:
![infra-step-3-image.png](https://blog.theodo.com/static/803d02f074409334a01dae329754468b/50383/infra-step-3-image.png)

## 4 - Associate the right route tables to the subnets
> Route table là một tập hợp các quy tắc routes, nó sẽ định tuyến đường đi cho traffic. Bạn có thể tạo ra nhiều Route table trong VPC nếu bạn muốn. Route table có thể liên kết đến một hoặc nhiều subnets.
> Remarks:
> - Mặc dù nếu bạn không tạo route table, thì mặc định sẽ có một main route table default và tất cả các subnets trong VPC sẽ liên kết đến main route table này.
> Nếu subnet liên kết đến route table có gắn IGW thì nó được gọi là public subnet.

Chúng ta sẽ tạo 2 custom route table cho mỗi subnets.
Trong VPC service, click Route Tables bên menu trái và click button Create route table:
- Nhập tên route table, ví dụ `my-wonderful-vpc-public-route-table` và `my-wonderful-vpc-private-route-table`
- Chọn VPC đã tạo ở bước 1 (`my-wonderful-vpc`)
![create-route-table-image.png](https://blog.theodo.com/static/68f753b7d01ec4f6c004db14956c2331/50383/create-route-table-image.png)

Bây giờ bạn có 2 route tables, chúng ta sẽ thiết lập chúng. Đầu tiên là public subnet.
Quay trở lại Route Table và chọn tạo route table `my-wonderful-vpc-public-route-table`:
- Click tab Route
- Click button Edit routes
- Thêm 1 route mới với destination 0.0.0.0/0 và Target là IGW ID `igw-...` đã tạo ở bước 3 và click Save Routes
![configure-public-route-table-routes-image.png](https://blog.theodo.com/static/307cc080b0692cdf810187dfd87fb3c1/50383/configure-public-route-table-routes-image.png)

- Sau đó, click tab Subnet Associations
- Click button Edit subnet associations
- Thêm public subnet `my-wonderful-vpc-public-subnet` đã tạo ở bước 2 và click Save.
![configure-public-route-table-subnet-association-image.png](https://blog.theodo.com/static/051d00934b4a2e260d9db69048d3d22f/50383/configure-public-route-table-subnet-association-image.png)

Với cách làm như trên, bạn đã điều hướng tất cả các outgoing traffic (Traffic đầu ra) của public subnet đến IGW, điều này sẽ làm cho subnet này thành public subnet.

Bây giờ, sẽ thiết lập private route table. Quay lại tab Route Tables và chọn route table `my-wonderful-vpc-private-route-table`:
- Click tab Routes
- Click button Edit routes
- Thêm route với Destination 0.0.0.0/0 và Target là NAT Gateway ID `nat-...` tạo ở bước 3 và click Save Routes.
- Click tab Subnet Associations
- Click button Edit subnet associations
- Add private subnet `my-wonderful-vpc-private-subnet` ở bước 2 và click Save.

Với cách làm này, bạn đã điều hướng tất cả traffic của private subnet đến NAT Gateway.
![infra-step-4-image.png](https://blog.theodo.com/static/f031e446d606674453849748d76df61c/50383/infra-step-4-image.png)

## 5 - Create the lambda function and configure it
Phần khó nhất đã xong
Nếu bạn chưa tạo Lambda thì đi đến tab Lambda service, sau đó click button Create function:
- Chọn tên Lambda, ví dụ `my-wonderful-lambda`
- Chọn Node.js runtime
- Trong section Permission, chọn `create a new role with basic lambda permissions`
![configure-lambda-permissions-image.png](https://blog.theodo.com/static/a94a4a7cf62d680e58e0af7d130f7e64/50383/configure-lambda-permissions-image.png)

Click vào function lambda vừa tạo, nó sẽ mở ra 1 trang thiết lập. Kéo xuống tab Network và bạn phải điền 3 thứ:
- VPC đã tạo ở bước 1 (`my-wonderful-vpc`)
- Private subnet đã tạo ở bước 2 (`my-wonderful-vpc-private-subnet`)
- Security Group là default hoặc Security Group mà bạn tự custom `**your-vpc-name**-default-security-group`
![configure-lambda-vpc-image.png](https://blog.theodo.com/static/b2e31ea61377158c21380d99bb121885/50383/configure-lambda-vpc-image.png)

### 🔥🔥 Congrats, that's all, your AWS lambda function has access to Internet! 🔥🔥
![infra-step-5-image.png](https://blog.theodo.com/static/ed3e678879d7cd543ba42ce4566b8c9e/50383/infra-step-5-image.png)

*Nguồn: https://blog.theodo.com/2020/01/internet-access-to-lambda-in-vpc/*

[[author | Minh Tang Q. ]]
