---
title: "[Facebook SDK] Lấy dữ liệu Instagramer thông qua Graph SQL - Phần 1"
date: "2020-07-23"
published: true
tags:
  - facebook
  - instagram
---

***Graph Facebook API là gì?***

Ngày nay các `social API` đang đóng một vai trò quan trọng trong việc thu thập thông tin về một cá nhân hoặc một tổ chức hoặc hầu hết mọi thứ. Trong bài viết này mình xin giới thiệu một social API để có thể làm được các việc đấy, đó là `Graph Facebook API`.
`Graph API` ở đây được Facebook coi là như là một "đồ thị xã hội"(Social Graph).

![images-1.png](/images-1.png)

Facebook coi các mối quan hệ giữa các thực thể như là một "đồ thị xã hội"(Social Graph).

Graph Facebook API là cách chủ yếu để tải dữ liệu vào và lấy dữ liệu ra từ đồ thị xã hội của Facebook. Đó là một HTTP API cấp thấp mà bạn có thể sử dụng để truy vấn dữ liệu, post status, tải lên hình ảnh và một loạt các nhiệm vụ khác.

***Hướng dẫn đăng ký Graph Facebook API***

Để có thể lấy được dữ liệu người dùng của Facebook hay Instagram, thì điều đầu tiên chúng ta bắt buộc phải đăng ký app của `Graph Facebook`.
  1. Truy cập trang [Facebook Develop](https://developers.facebook.com/). Giao diện của trang __develop__ sẽ trông như hình bên dưới.

  ![images-2.png](/images-2.png)

  __Lưu ý__: Các bạn phải tiến hành đăng nhập bằng tài khoản Facebook của mình thì mới có thể tiến hành đăng ký app được.

  2. Tiến hành nhấn vào __My Apps__ -> __Add a new app__.

  ![images-3.png](/images-3.png)<br>

  ![images-4.png](/images-4.png)<br>

  3. Sau đấy ta tiến hành chọn ô __Manage Business Integrations__.

  ![images-5.png](/images-5.png)<br>

  4. Điền vào thông tin như hình bên dưới sau đó nhấn __Create App ID__ thôi nào.

  ![images-6.png](/images-6.png)<br>

Với vài bước đơn giản, chúng ta đã đăng ký xong và giao diện __app__ sẽ như hình bên dưới.

  ![images-7.png](/images-7.png)<br>

***Hướng dẫn đăng ký Facebook Page***

Sau khi đã đăng ký thành công __Graph Facebook API__ app. Chúng ta sẽ tiến hành tạo một trang __App Page__ để có thể liên kết với __Instagram account__ của các bạn. Khi đã liên kết được rồi thì chúng ta mới có thể có mã truy cập nhờ đó mới có thể thực hiện các câu truy vấn API.

__Lưu ý__: Để truy cập được thì bắt buộc chúng ta phải có vai trò trên trang Page Facebook nhé :D

Bây giờ chúng ta sẽ bắt đầu đăng ký Page Facebook nào.<br>

  1. Trên giao diện `Dasboard` của Facebook App. Chúng ta tiến hành Chọn `Settings` -> `Advanced`. Sau đó kéo chuột xuống mục `App Page` và chọn `Create New Page`.

  ![images-8.png](/images-8.png)<br>

  2. Sau khi chọn `Create New Page`, chúng ta sẽ được chuyển đến trang để đăng ký `Page Facebook`. Sau đó, chúng ta chọn `Get Started` tại mục `Business or Brand`.

  ![images-9.png](/images-9.png)<br>

  3. Chúng ta điền thông tin như hình bên dưới sau đó nhấn `Continue` thôi.

  ![images-10.png](/images-10.png)<br>

  4. Sau đấy màn hình cài đặt `Page` hiện ra và chúng ta chỉ việc làm theo hướng dẫn thôi. Ở đây mình sẽ `Skip` nó và cập nhật sau.

Sau khi hoàn tất các bước trên chúng ta đã tạo thành công một trang Facebook.

  ![images-11.png](/images-11.png)<br>

Vậy là chúng ta đã hoàn thành việc đăng ký `Graph Facebook API` App và `Facebook Pages` rồi. Như vậy là đủ để chúng ta có thể lấy những thông tin cơ bản thông qua [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer). Chúng ta chỉ việc `Generate Access Token`, chọn `Facebook App` mà chúng ta sử dụng để lấy dữ liệu là được.

![images-12.png](/images-12.png)

![images-13.png](/images-13.png)

![images-14.png](/images-14.png)

Như vậy là chúng ta đã lấy được những dữ liệu cơ bản. Nhưng để có thể lấy được dữ liệu của __Instagramer__ chúng ta cần phải tiến hành thêm một số bước nữa.

Ở phần 2, mình sẽ giới thiệu và hướng dẫn cho các bạn các bước để có thể lấy dữ liệu người của __Instagramer__. Mong các bạn đón xem. :D

Cảm ơn tất cả các bạn đã theo dõi bài viết của mình, nếu có gì khó hiểu, sai hoặc thiếu mong các bạn có thể góp ý. Hi vọng bài viết này sẽ giúp ích cho các bạn.

Thanks all!!!

######                    *<div style="text-align: right"> - by Thuận Nguyễn </div>*
