---
title: "Tích hợp CI với Gitlab"
date: "2020-08-25"
published: true
tags:
  - Gitlab CI
---

# 1.Vấn đề

Ngày nay, với xu hướng agile/lean dẫn đến việc phát triển tính năng là điều đã đơn giản đi rất nhiều thì điều quan trọng nhất với việc xây dựng ứng dụng là phải nhanh, chính xác với yêu cầu. Nếu một tính năng mà mất 2, 3 tháng mới release thì dẫn đến nhiều hệ lụy như làm không phù hợp nhu cầu khách hàng, hoặc đối thủ đã ra mắt trước đó, mất đi cái lợi thế dẫn đầu. Do đó, việc làm ra một sản phẩm, tính năng đòi hỏi thần tốc là ưu tiên số một hiện nay.

Bên cạnh đó, để nhanh chóng ra mắt một tính năng, phiên bản mới nếu theo cách cổ điển sẽ mất nhiều thời gian bởi công việc chân tay khá nhiều và mỗi lần release cũng huy động một cơ số người không nhỏ để cập nhật một thay đổi dù là nhỏ nhất. Bởi vậy, xu hướng CI/CD giúp cung cấp các framework, workflow giúp tiết kiệm thời gian, nguồn lực của quá trình release (delivery)

# 2.Giới thiệu
### 2.1 CI là gì ?
CI là Continuous Integration. Nó là phương pháp phát triển phần mềm yêu cầu các thành viên của team tích hợp công việc của họ thường xuyên, mỗi ngày ít nhất một lần. Mỗi tích hợp được "build" tự động (bao gồm cả test) nhằm phát hiện lỗi nhanh nhất có thể.

Hiện nay có rất nhiều hệ thống như  **Travis**,  **Jenkin**,  **Circle**,  **Gitlab**  có thể giúp bạn làm được điều đó. Trong bài viết này, mình sẽ giới thiệu với các bạn tổng quan  `Gitlab CI`  và cách để xây dựng một hệ thống cơ bản.

### 2.2 Tại sao lại là `Gitlab CI` ?

Theo mình tìm hiều thì trước khi `Gitlab CI` ra đời thì `Jenkins`  là hệ thống được tích hợp vào làm CI nhiều nhất , nên chúng ta sẽ sánh thử xem giữa `Gitlab CI` và `Jenkins`  có gì khác nhau nhé

Trước đây mình đã từng nghịch Jenkins để làm thử CI cho 1 project demo của mình thì mình thấy config khá phức tạp như `liên kết đến repo, phân quyền đủ kiểu để Jenkins có thể lấy source code từ repo`

Đến khi mình biết đến `Gitlab CI` , trái ngược với rắc rối của Jenkins là sự tuyệt vời của `Gitlab CI` luôn. Code để ở Gitlab, rồi trong đó có cho cài đặt CI/CD để test và deploy code tự động. Config dễ hiểu, không phải phân quyền giữa hệ thống CI và souce code , dễ cài đặt , quả thực đây chính là CI phù hợp với mình.

![d3358d65-f8ad-4d94-b371-9bbcc6afe3f0](https://i.ibb.co/bKzg2gf/d3358d65-f8ad-4d94-b371-9bbcc6afe3f0.png)


# 3.	Cách hoạt động

### 3.1 Luồng hoạt động của CI
Khi 1 anh (chị em ) developer hoàn thành một task nào đó và push commit lên Gitlab
Chúng ta sẽ đến bước review code (tiết mục ăn hành của đồng đội )
Nhưng trước đó chúng ta ăn hành của CI trước đã nhé !!!

Khi bạn push code lên  **Gitlab** thì `Gitlab CI`  cũng bắt đầu thực hiện công việc mà nó được giao. Nó sử dụng file  `.gitlab-ci.yml`  nằm trong thư mục gốc của repo để cấu hình project sử dụng các  `Runner`. Một  `Pipeline`  CI sinh ra và report sẽ được hiển thị trên giao diện.

![image](https://i.ibb.co/zX5cPtH/image.png)

Vậy `Pipelines` là gì nhỉ các bạn ?
###  3.2  Pipelines
#### Khái niệm trong document của `Gitlab CI`
```none
Pipelines are the top-level component of continuous integration, delivery, and deployment.
```
Theo mình thấy thì `Pipelines` là thành phần cấp cao nhất của tích hợp, phân phối và triển khai liên tục với mỗi 1 lần có sự thay đổi code

**Pipeline**  bao gồm :

-   **Jobs**  : Các công việc được giao thực thi. ( Ví dụ : biên dịch mã hoặc chạy test )
-   **Stage**  : Xác định các thời điểm và cách thực hiện. ( Ví dụ : test chỉ chạy sau khi biên dịch thành công )

**Pipeline**  hoạt động theo nguyên tắc sau :

-   Tất cả các công việc trong cùng một  `stage`  được  `Runner`  thực hiện song song, nếu có đủ số lượng  `Runner`  đồng thời.
-   Nếu Success, pipeline chuyển sang  `stage`  tiếp theo.
-   Nếu Failed, pipeline sẽ dừng lại. Có một ngoại lệ là nếu job được đánh dấu làm thủ công, thì dù bị fail thì pipeline vẫn tiếp tục.

Bên dưới là ví dụ về đồ thị Pipeline thông thường :

![af6e91ef-0fd1-41e9-9efb-5127a7b239e9](https://i.ibb.co/pb91rdh/af6e91ef-0fd1-41e9-9efb-5127a7b239e9.png)

Tóm lại, các bước để  **Gitlab CI**  hoạt động như sau :

-   Thêm`.gitlab-ci.yml`  vào thư mục gốc của repo.
-   Cấu hình gitlab  `Runner`
# 4. Cài đặt gitlab-ci.yml

#### 4.1 Create .gilab-ci.yml

`.gitlab-ci.yml`  được viết theo định dạng YAML. Bạn có thể tìm hiểu thêm tại  [đây](https://yaml.org/).

Như đã đề cập ở trên,  `.gitlab-ci.yml`  cho  `Runner`  biết những công việc cần phải làm. Mặc định, nó sẽ chạy một pipeline với 3 stage :

-   build
-   test
-   deploy

Tuy nhiên, bạn không cần phải sử dụng cả 3 stage, các stage không được giao việc sẽ được bỏ qua.

Dưới đây là ví dụ cấu hình cho một dự án Ruby on Rails :

Ở đây mình muốn thực hiện check convention nên mình sử dụng gem **rubocop** để thực hiện công việc này nhé
```yaml
image: "ruby:2.5"

before_script:
  - apt-get update -qq && apt-get install -y -qq sqlite3 libsqlite3-dev nodejs
  - gem install bundler --no-document
  - bundle install

rubocop:
  script:
    - bundle exec rubocop
```
Đây là cấu hình đơn giản nhất có thể hoạt động với hầu hết các ứng dụng Ruby

1.  Xác định  job  `rubocop`  với các lệnh thực thi khác nhau.
2.  Trước mỗi job, các lệnh được xác định bởi  **before_script**  được thực thi.

Nếu bạn muốn kiểm tra xem file `.gitlab-ci.yml` có hợp lệ hay không, có một công cụ lint trong page  **/-/ci/lint**  trong namespace project. Bạn cũng có thể thấy nút  `CI Lint`  để đến trang này trong mục  **CI/CD**  ->  **Pipelines**  và  **Pipelines**  ->  **Jobs**  trong page Project.

![Screen-Shot-2020-08-20-at-12-08-29-AM](https://i.ibb.co/1KNrCDd/Screen-Shot-2020-08-20-at-12-08-29-AM.png)
#### 4.2. Push .gitlab-ci.yml to GitLab

Sau khi tạo file  `.gitlab-ci.yml`, thêm nó vào git repos và push nó lên gitlab.

```none
 TomobloDemo git:(master) git add .gitlab-ci.yml
 TomobloDemo git:(master) git commit -m "Add .gitlab-ci.yml"
 TomobloDemo git:(master) git push origin master
```

Trở về  `Pipeline`  page, bạn sẽ thấy pipeline đang ở trạng thái  `pending`. Bạn cũng có thể tới page  `Commits`, để ý icon tạm dừng nhỏ bên cạnh commit SHA.

![Screen-Shot-2020-08-20-at-12-13-46-AM](https://i.ibb.co/99CBvrJ/Screen-Shot-2020-08-20-at-12-13-46-AM.png)
# 5. Gitlab Runner

Trong gitlab, các  `Runner`  thực thi các jobs được định nghĩa trong file  `.gitlab-ci.yml`.

Một  **Runner**  có thể là một  **máy ảo**  (VM), một  **VPS**, một  **bare-metal**, một  **docker container**  hay thậm chí là một  **cluster container**. Gitlab và Runners giao tiếp với nhau thông qua API, vì vậy yêu cầu duy nhất là máy chạy Runner có quyền truy cập Gitlab server.

Một  `Runner`  có thể xác định cụ thể cho một dự án nhất định hoặc phục vụ cho nhiều dự án trong Gitlab. Nếu nó phục vụ cho tất cả project thì được gọi là  `Shared Runner`.

Để xác định xem  **Runner**  nào được chỉ định cho project của bạn. Vào  **Settings**  ->  **CI/CD**.

Phần cài đặt này nó khá dài nên em không trình bày nhé , các bạn cứ vào bên link bên dưới , đầy đủ các loại môi trường , cứ copy xong pate và enter là ok nhé =))

Để Runner hoạt động được, bạn cần thực hiện 2 bước :

-   [Cài đặt Runner](https://docs.gitlab.com/runner/install/)
-   [Cấu hình Runner](https://docs.gitlab.com/ee/ci/runners/README.html#registering-a-specific-runner)

Sau khi cấu hình thành công, bạn có thể thấy trạng thái của commit cuối cùng đã chuyển từ `pending` thành `running` rồi `success` or `failed`...

# Kết luận

Hi vọng bài biết giúp các bạn hiểu được các khái niệm cơ bản về CI cũng như cách xây dựng hệ thống cơ bản với Gilab CI. Chúc các bạn coding vui vẻ ...

by Hà Tiến Đạt - Tomosia Việt Nam
