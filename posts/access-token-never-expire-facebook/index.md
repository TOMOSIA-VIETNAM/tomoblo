---
title: "[Facebook SDK] Lấy Access Token User vĩnh viễn. "
date: "2020-09-29"
published: true
tags:
  - facebook
  - instagram
---

***Access Token là gì?***
Access Token là một chuỗi kí tự để xác định một User, App, hoặc Trang và được sử dụng bởi __App__ để gọi API. Khi ai đó
kết nối với ứng dụng bằng cách __Đăng nhập với Facebook__ và phê duyệt yêu cầu cấp quyền, ứng dụng sẽ nhận được mã thông báo truy cập tạm thời, an toàn để truy cập vào __Facebook APIs__.

Một Access Token bao gồm thông tin về thời điểm hết hạn và ứng dụng nào đã tạo mã truy cập. Có nhiều loại Access Token khác nhau để hỗ trợ trong các trường hợp khác nhau như [User Access Token, App Access Token, Page Access Token, Client Access Token](https://developers.facebook.com/docs/facebook-login/access-tokens).

***Token ngắn hạn và Token dài hạn***

User Access Token Facebook thường có 2 dạng là: __Short-Lived__ và __Long-Lived__ tokens.

  - __Short-Lived__ tokens thường tồn tại trong khoảng thời gian ngắn khoảng 1-2 giờ.
  - __Long-Lived__ tokens thường tồn tại trong thời gian dài khoảng 60 ngày.

Dù là __Short-Lived__ hay __Long-Lived__ tokens thì đều bị hết hạn trong khoảng thời gian nào đó. Nhưng trong một số dự án có các tính chất khác nhau mà chúng ta cần một Access-Token __không hết hạn__ để có thể lấy dữ liệu người dùng mà không cần phải Refresh-Token. Nên hôm nay mình hướng dẫn các bạn lấy Access-Token Facebook không bao giờ hết hạn.

***Hướng dẫn lấy User Access-Token Facebook never Expired***

1. Đầu tiên chúng ta truy cập vào trang https://developers.facebook.com/tools/explorer. Sau đó làm theo các bước trong ảnh.

![images-1.png](/images-1.png)<br>

2. Sau khi nhấn __Open In Access Token Tool__, chúng ta sẽ được di chuyển đến trang __https://developers.facebook.com/tools/debug/accesstoken?access-token=....__. Sau đó chúng ta nhấn vào __Extend Access Token__ ở dưới.

![images-2.png](/images-2.png)

![images-3.png](/images-3.png)<br>

3. Sau khi chúng ta nhấn __Extend Access Token__, giao diện sẽ hiển thị cho chúng ta một dãy __Access-Token__ mới. Chúng ta nhấn vào __Debug__

![images-4.png](/images-4.png)

Và giao diện sẽ như hình bên dưới.

![images-5.png](/images-5.png)

Như vậy là chúng ta đã lấy được User Access Token Facebook không hết hạn. Tiến hành Copy Access Token, sau đó trờ lại trang https://developers.facebook.com/tools/explorer và dán vào ô chứa __access-token__. Chúng ta sẽ thấy phần __Expired__ đã không còn hiển thị nữa.

![images-6.png](/images-6.png)

***Tổng kết***

Như vậy là chúng ta đã lấy được User Access Token không hết hạn. Với Page Access Token chúng ta cũng sẽ lấy tương tự như thế. Các bạn có thể thử lấy và trải nghiệm. :D

Hi vọng bài viết sẽ bổ ích đối với mọi người. Mọi góp ý về sai sót hoặc thảo luận mời mọi người bình luận.

__Tài liệu tham khảo:__
- https://www.sociablekit.com/get-facebook-page-access-token-never-expire/
- https://developers.facebook.com/docs/facebook-login/access-tokens/
######                    *<div style="text-align: right"> - by Thuận Nguyễn </div>*

