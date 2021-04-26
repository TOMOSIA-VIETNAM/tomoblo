---
title: "RAILS: Hide yourself while scraping without being blocked"
date: "2021-04-26"
published: true
tags:
  - ruby
  - rails
---

[[snippet]]
| Trong bài trước, mình có hướng dẫn mọi người sử dụng capybara để scraping 
| trong ruby on rails. Tuy nhiên để scraping một trang web thực sự không hề đơn | giản một chút nào. Lần này, mình sẽ đưa ra cái nhìn tổng quan nhất và hướng  | dẫn cụ thể để giúp các bạn có thể dễ dàng thực hiện một cách nhanh chóng.

# **I. Preface**
Việc scraping một trang web không khó nhưng cũng không hề đơn giản, tuỳ thuộc vào trang web của bạn cần scrap bảo mật như thế nào, như mình research để config, run bot thì việc tìm ra giải phát vượt qua hàng rào của trang web thì nó tốn công khá nhiều. Vì thế lần này mình viết bài để giúp các bạn tiết kiệm thời gian nhất có thể để làm việc này.

# **II. How do websites detect bots?
- Tổng số yêu cầu từ một IP nhất định trên mỗi khung thời gian cụ thể, chẳng hạn như hơn 50 yêu cầu mỗi giây hoặc 500 mỗi phút hoặc 5000 mỗi ngày có thể có vẻ đáng ngờ hoặc thậm chí độc hại. Đếm số lượng yêu cầu trên mỗi IP trên một đơn vị thời gian là một kỹ thuật rất phổ biến và được cho là hiệu quả.

- Tỷ lệ yêu cầu đến đều đặn, ví dụ, một luồng liên tục 10 yêu cầu mỗi giây có thể giống như một rô-bốt được lập trình để đưa ra yêu cầu, đợi một chút, đưa ra yêu cầu tiếp theo, v.v.

- **User-Agent** lấy từ HTTP Headers thường thì bot sẽ không có nếu bạn kiểm tra User-Agent (navigator.userAgent)

```shell
testUserAgent() {
  if (navigator.userAgent)) {
      // Headless
      return 1;
  } else {
      // Not Headless
      return 0;
  }
}
```

- **windown.chrome** là một đối tượng cung cấp các tính năng cho các nhà phát triển tiện ích mở rộng của Chrome. Mặc dù có sẵn ở chế độ bình thường, nhưng nó không khả dụng ở chế độ **headless** Đó là lý do tại sao bạn có thể dễ dàng kiểm tra đoạn mã sau - Tôi cũng đã sử dụng thử thách JavaScript mà tôi đã giải thích ở phần đầu ở đây để thực hiện kiểm tra này chỉ dành cho người dùng chrome.

```shell
testChromeWindow() {
    if (eval.toString().length == 33 && !window.chrome) {
        // Headless
        return 1;
    } else {
        // Not Headless
        return 0;
    }
}
```
