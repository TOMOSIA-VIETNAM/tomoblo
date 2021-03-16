---
title: "[Facebook SDK] Lấy dữ liệu Instagramer thông qua GraphQL - Phần 2"
date: "2021-03-09"
published: true
tags:
  - facebook
  - instagram
---

[[snippet]]
| Ở phần 1, chúng ta đã tìm hiểu về Graph Facebook API và cách đăng ký ứng dụng. Ở bài viết hôm nay mình sẽ giới thiệu cho các bạn về các câu lệnh cơ bản dùng để lấy thông tin của một `Instagrammer` hoặc là các bài viết của `Instagrammer`,... :D. Nếu các bạn chưa theo dõi phần 1, hãy đọc phần __tóm tắt nội dung phần 1__ của mình ở dưới.

### Tóm tắt nội dung phần I?

Ở phần thứ nhất, mình đã hướng dẫn cách để tạo ra ứng dụng và test ở trên trang [Facebook Develop](https://developers.facebook.com/) như hình bên dưới.

![images-1.png](/images-1.png)

Nếu mọi người chưa theo dõi phần 1, các bạn có thể đọc lại [tại đây](https://blog.tomosia.com/facebook-graph-facebook-api-phan-1/).

### Hướng dẫn lấy thông tin người dùng Instagrammer thông qua graph Facebook API


Sau khi đã đăng ký app thành công như trên, chúng ta tiến hành lấy thông tin của người dùng theo các bước sau.
  1. **Truy cập trang [Facebook Developer](https://developers.facebook.com/tools/explorer).**

  Đây là công cụ của Facebook phát triển để chúng ta có thể kiểm tra các lệnh gọi API. Các bạn cũng có thể kiểm tra các lệnh gọi API của Facebook bằng __Postman__.

  2. **Tiến hành nhấn vào đăng ký quyền (permissions) cho app của mình.**

  ![images-2.png](/images-2.png)

  __Lưu ý__: Sau khi chọn quyền xong, chúng ta bắt buộc phải __generate access token__ để cập nhật lại __access_token__ mới.

  3. **Lấy thông tin của người dùng.**

  Để lấy được thông tin của người dùng, thông thường chúng ta sẽ cần Instagrammer đăng nhập Facebook qua ứng dụng của mình. Nhưng ở đây mình có thêm một cách khác để có thể lấy thông tin của Instagrammer mà không cần phải trải qua các bước __Authentication__ đó là lấy thông qua [Bussiness discovery](https://developers.facebook.com/docs/instagram-api/guides/business-discovery/).

  ```
  curl -i -X GET \
    "https://graph.facebook.com/v3.2/17841437428736936?fields=business_discovery.username(manchesterunited){followers_count,media_count}&access_token={access-token}"
  ```

  Trong đó:
  - `17841437428736936`: Là instagram user id của mình liên kết với trang Facebook ở phần 1.
  - `manchesterunited`: Ở đây là username của Instagrammer.
  - `followers_count, media_count,...`: Đây là các fields dùng để lấy thông tin của Instagrammers.

  ![images-3.png](/images-3.png)<br>

  4. **Lấy thông tin bài viết của người dùng Instagram.**

  Ở phần này sẽ tương tự như phần lấy thông tin của người dùng. Ở đây mình vẫn sẽ dùng [Bussiness discovery](https://developers.facebook.com/docs/instagram-api/guides/business-discovery/).

  ```
  curl -i -X GET \
    "https://graph.facebook.com/v3.2/17841437428736936?fields=business_discovery.username(manchesterunited){media{id,caption,like_count,comments_count,media_type}}&access_token={access-token}"
  ```

  ![images-4.png](/images-4.png)<br>

Như vậy trong bài viêt này, mình đã hướng dẫn các bạn có thể lấy được thông tin cơ bản của một Instagrammer và các bài viết của Instagrammer. Lưu ý là chúng ta sẽ chỉ lấy được tài những tài khoản `Kinh Doanh` hoặc `Creator` mà thôi. Các tài khoản `Cá Nhân` hoặc `private` thì sẽ không thể lấy được.

Ngoài ra còn rất nhiều thứ để các bạn có thể lấy thông tin của Instagrammer như Story, Insight, Hashtag,...

Cảm ơn tất cả các bạn đã theo dõi bài viết của mình, nếu có gì khó hiểu, sai hoặc thiếu mong các bạn có thể góp ý. Hi vọng bài viết này sẽ giúp ích cho các bạn.

### References:
- https://developers.facebook.com/docs/instagram-api/getting-started
- https://developers.facebook.com/docs/instagram-api
- https://developers.facebook.com/docs/instagram-api/reference/ig-media/
- https://developers.facebook.com/docs/instagram-api/reference/ig-user

[[author | Thuan Nguyen ]]
