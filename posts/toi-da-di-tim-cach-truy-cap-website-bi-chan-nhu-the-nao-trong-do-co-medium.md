---
title: "I'm trying to figure out how to access the blocked website, include Medium"
date: "2021-03-30"
published: true
tags:
  - medium
---

[[snippet]]
| Trước tiên, Medium là gì, thì có lẽ tôi và các bạn cũng không lạ gì nữa. Đó là một kho thông tin đồ sộ. Nhưng dạo này, việc truy cập gặp nhiều khó khăn quá. Đã có rất nhiều phương pháp nhưng đều lỗi sau một thời gian.



**Tôi phải đi tìm cách để có thể truy cập medium.com một cách bình thường thôi.**

Khi truy cập một trang web bị chặn, tôi thường thay đổi DNS, sửa file host hoặc dùng một VPN.

Với suy nghĩ simple như thế, tôi đã thay đổi DNS để có thể truy cập Medium, nhưng tình hình không khả quan một chút nào.

Cách thứ 2, tôi thêm vào file host: `/etc/hosts`

```
162.159.152.4 medium.com
```

Lần này thì tốt hơn chút, nhưng vẫn có lỗi: `Secure Connection Failed`

Thế thì chỉ còn 1 cách dùng VPN, và tất nhiên https://1.1.1.1 là phương án đầu tiên tôi nghĩ ra.

Nó hoạt động tốt. Ơ, thế tại sao lại có bài viết này ? Có cái này thôi cũng phải nói.



Sau khi sử dụng phương án 1.1.1.1 trên, nó hoạt động. Nhưng với tôi, đó là tốt chứ chưa đủ.

1.1.1.1 là 1 server nước ngoài, khi bật VPN lên thì mọi traffic của tôi đều phải đi qua nó. Nó dẫn đến một số website hoạt động không nhanh.

Thế là, tôi nghĩ đến phương án, tìm một VPN có thể chỉ bật khi vào medium.com thôi. Còn các website khác, tôi vẫn truy cập trực tiếp. Ngay lúc này, tôi nghĩ đến tìm extension VPN cho Chrome mà không nghĩ đến phần mềm VPN.

Có một số lý do:

- Dùng extension thì VPN chỉ tác động lên trình duyệt được cài đặt. Các traffic khác như Git, SVN vẫn hoạt động độc lập mà không bị theo dõi
- Chỉ có trình duyệt mới filter url một cách tốt nhất (cảm quan cá nhân của tôi).



### Hướng dẫn vào medium.com qua VPN

Và sau một hồi lần mò trên [Chrome Web Store](https://chrome.google.com/webstore/category/extensions?hl=en) , tôi tìm được một thư viện đúng với yêu cầu của mình [Free VPN for Chrome - VPN Proxy VeePN](https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno)

Dưới đây là hướng dẫn sử dụng, nó không đúng với tên bài viết, nên tôi chỉ nói qua đơn giản thôi

- Step 1: Truy cập vào medium.com và nhấn vào icon của extension

<img src="https://i.ibb.co/mFrWp7Q/Screen-Shot-2021-03-30-at-16-51-20.png" alt="https://i.ibb.co/mFrWp7Q/Screen-Shot-2021-03-30-at-16-51-20.png" style="zoom:33%;" />

- Step 2: Nhấn vào nút khiên như hình trên.

- Step 3: Nhấn vào `Add current site`

  <img src="https://i.ibb.co/nLddXZw/Screen-Shot-2021-03-30-at-16-59-26.png" style="zoom:50%;" />

- Step 4: Reload lại website và tận hưởng thành quả nhé

  Hãy để ý, chỉ có website bạn cho vào danh sách, VPN mới bật <img src="https://i.ibb.co/XxW7Yz4/Screen-Shot-2021-03-30-at-17-02-28.png" style="zoom: 50%;" />

  Còn các website khác, VPN trong trạng thái tắt, không làm ảnh hưởng đến trải nghiệm sử dụng internet của các bạn
