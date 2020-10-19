---
title: "About Amazon Elastic Container Registry (ECR)"
date: "2020-10-18"
published: true
tags:
  - docker
  - aws
  - erc
  - ci
  - git
---
Amazon Elastic Container Registry (**ECR**) là dịch vụ lưu trữ bộ chứa [Docker](https://aws.amazon.com/vi/docker/) được quản lý đầy đủ giúp các nhà phát triển dễ dàng lưu trữ, quản lý và triển khai hình ảnh bộ chứa Docker. Amazon **ECR** được tích hợp với [Amazon Elastic Container Service (ECS)](https://aws.amazon.com/vi/ecs/), giúp đơn giản hóa quy trình công việc từ khi khâu phát triển đến khâu sản xuất. Amazon ECR giúp bạn không phải vận hành các kho bộ chứa riêng hay thay đổi quy mô cơ sở hạ tầng ngầm. Amazon ECR sẽ trở thành máy chủ lưu trữ hình ảnh của bạn trong kiến trúc có độ sẵn sàng cao và quy mô linh hoạt, cho phép bạn triển khai các bộ chứa cho ứng dụng của mình một cách ổn định. Khả năng tích hợp với AWS Identity and Access Management (**IAM**) đem đến cho bạn khả năng kiểm soát từng kho ở cấp tài nguyên. Với Amazon **ECR**, bạn sẽ không phải trả tiền trước hay có cam kết gì. Bạn chỉ phải chi trả chi phí cho lượng dữ liệu bạn lưu trong các kho cũng như dữ liệu được truyền lên Internet.
![enter image description here](https://d1.awsstatic.com/diagrams/product-page-diagrams/Product-Page-Diagram_Amazon-ECR.bf2e7a03447ed3aba97a70e5f4aead46a5e04547.png)
# Lợi ích
- Đây là dịch vụ lưu trữ Docker image cho các dự án và nhiều môi trường sử dụng nền tảng đám mây **AWS**, ECR cho phép bạn tạo phân vùng theo [region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) định sẵn.

-  Sự kết hợp tuyệt vời với **AWS Beanstrữtalk**, đối với các dự án tích hợp deploy bằng CI/CD khi  sử dụng đến *Beanstalk* thì Docker ECR là một trong những sự lựa tối ưu và đa dụng nhất trong hệ sinh thái đám mây AWS.
- **Docker ECR** được mã hoá file và sử dụng AWS Identity nên chỉ có thể truy cập và sử dụng nếu có Identity, bạn không thể copy nguyên link của Docker image này rồi truy cập ở một nơi khác khi không có Identity được. Bạn có thể build image từ local, CI/CD và pust lên Docker ECR kèm theo **Identity** đã cho.
- Dựa vào region đã định sẵn nên tốc độ build/deploy dự án sẽ nhanh hơn là dùng Docker hub, bạn có thể sử dụng một repo chứa nhiều môi trường(test, develop, staging).
## Được quản lý toàn phần

Amazon Elastic Container Registry giúp bạn không phải vận hành và thay đổi quy mô cơ sở hạ tầng để làm nền tảng hoạt động cho sổ đăng ký bộ chứa của mình. Bạn sẽ không cần phải cài đặt và quản lý phần mềm hay thay đổi quy mô cơ sở hạ tầng. Chỉ cần đẩy hình ảnh trong bộ chứa của bạn lên Amazon ECR và lấy hình ảnh ra bằng bất kỳ công cụ quản lý bộ chứa nào khi bạn cần triển khai.

## Độ sẵn sàng cao
Amazon Elastic Container Registry có kiến trúc bền bỉ, dư thừa và có quy mô cực kỳ linh hoạt. Các hình ảnh trong bộ chứa của bạn rất dễ sử dụng và truy cập, nên bạn có thể triển khai ổn định các bộ chứa mới cho ứng dụng của mình.

## Bảo mật
Amazon Elastic Container Registry truyền hình ảnh của bạn qua kết nối HTTPS và tự động mã hóa hình ảnh được lưu trữ của bạn. Bạn có thể cấu hình các chính sách để quản lý quyền và kiểm soát truy cập vào hình ảnh của bạn bằng cách sử dụng người dùng và vai trò của AWS Identity and Access Management (IAM) mà không phải trực tiếp quản lý thông tin xác thực trên phiên bản EC2.

##  Quy trình công việc đơn giản hoá nhất có thể
Amazon Elastic Container Registry được tích hợp với Amazon ECS và CLI Docker, đem đến cho bạn khả năng đơn giản hóa quy trình công việc phát triển và sản xuất. Bạn có thể dễ dàng đẩy hình ảnh trong bộ chứa của bạn lên Amazon ECR bằng cách sử dụng CLI Docker từ bộ máy phát triển của bạn rồi Amazon ECS sẽ có thể lấy trực tiếp từ đó để phục vụ quá trình triển khai sản xuất.

# Kết hợp với CI/CD
##  Ưu điểm:
- Từ các ứng dụng CI/CD hot nhất hiện nay như: Circleci, Github Action, Gitlab Action,... có thể sử dụng để build các Docker image **ECR** và thực hiện testing trong các Docker container đó rất tiện dụng và giảm thiểu khả năng rủi do cho môi trường production.
- Chúng ta có thể linh động để build các job theo quy trình để kiểm thử code, docker hoạt động có chơn chu hay không trước khi tiến đến bước deploy dự án,...
- Sử dụng Docker ECR trong CI bạn sẽ không cần phải mất nhiều thời gian để đi chỉ cho các thanh niên develop khác rằng đoạn code này có thể lỗi hay không và lỗi đó ở đâu, cách fix như thế nào, các thanh niên đó sẽ tự biết cách fix và tìm hiểu,... Bạn có thể dành time làm các công việc khác trong một mớ công việc được giao :D.
- Bạn có thể kết nối đến các **RDS** từ bên trong mỗi container.
##  Nhược điểm:
- Docker ECR chỉ dành cho khách hàng chịu chơi, bạn sẽ phải tốn thêm chi phí cho mỗi lần build và deploy dự án.
- Chỉ dành cho người về Docker mới có thể build và sử dụng.
- Chỉ dành cho các dự án có sử dụng đến nền tảng đám mây AWS.
- Tài liệu về Docker ECR còn ít đòi hỏi khả năng research của bạn phải đạt mức thượng thừa :D.
- Bạn phải am hiểu về AWS mới có thể cấu hình cho dự án hoạt động đúng yêu cầu.

# Kết luận
Từ bài viết này bạn đã phần nào hình dung về **AWS Docker ECR** rồi đúng không nào, đừng ngại ngần hãy đề xuất và áp dụng vào dự án nhé, nó sẽ rất linh hoạt cho dự án của bạn đó.
Bạn sẽ cần tốn chút time tìm hiểu xem cơ chế hoạt động của nó thế nào,.. :D  đừng lo lắng, nó đơn giản lắm:

[[author | Lê Văn Chiến ]]
