---
title: "Tutorial using reminders on Slack"
date: "2021-03-01"
published: true
tags:
  - Slack
  - Reminder
---

Slack là một ứng dụng chat nhóm hỗ trợ trao đổi thông tin với bạn bè, đồng nghiệp và là một lựa chọn hoàn hảo cho công việc, nội bộ công ty hay làm dự án. Với Slack, mọi người có thể trò chuyện, chia sẻ hình ảnh / video / tập tin, quản lý theo từng nhóm / bộ phận, tạo ra các chủ đề thảo luận ở các kênh riêng biệt.

Slack là một sản phẩm của hãng TinySpeck với đồng sáng lập là Stewart Butterfield – trước đây từng là đồng sáng lập dịch vụ chia sẻ ảnh nổi tiếng Flickr của Yahoo. Stewart rời Yahoo hồi tháng 7/2008 và thành lập TinySpeck một năm sau đó. Theo Stewart: “Slack giải phóng con người ta khỏi mớ email lộn xộn. Tại sao phải dùng email để vừa đính kèm file vừa trao đổi công việc, nó phức tạp, mất thời gian lại quá rắc rối. Trong khi một dịch vụ chat như Slack có thể cho người ta chat nhóm theo thời gian thực lại vừa truy cập được toàn bộ file được lưu trữ trên các dịch vụ khác”.

## Những lợi ích sử dụng SLack:
- Người dùng có thể trao đổi với nhau từ bất kỳ nền tảng nào như Windows, Linux, MacOS, Android, iOS,…
- Liên kết với các ứng dụng lưu trữ của bên thứ 3 như Google Drive, Dropbox, Google Calendar, Github, Task Reminder, Trello… thậm chí là cả các dịch vụ thanh toán.
- Miễn phí dung lượng lưu trữ lên đến 10K tin nhắn, 5GB dung lượng lưu trữ và kết nối đến 5 dịch vụ hãng khác. Tuy nhiên các gói trả phí sẽ có nhiều tính năng cao cấp hơn và khả năng kết nối là vô hạn.

## Giới thiệu về reminder
### Reminder Là gì?
 - Reminder là một ứng dụng nho nhỏ giúp bạn nhắc nhở các công việc cần làm, nó được tích hợp sẵn trong ứng dụng SLack. 
 - Reminder có thể đặt lời nhắc cho bản thân hoặc các thành viên khác trong workspace của bạn.
 - Thay vì phải cài cắm crontab thủ công và cấu hình phức tạp bạn chỉ cần thao tác một command cơ bản là có một Reminder tiện lợi.
 - Bạn không cần biết về kỹ thuật cũng có thể tạo các Reminder dễ dàng.

### Cách sử dụng Reminder:
- Cách tạo nhắc nhở:
    /remind [@someone or #channel] [what] [when]
    /remind @here " Nội dung thông báo " Thời gian
```
    ví dụ tạo nhắc nhở hàng ngày trong tuần:
    /remind @here "Mọi người báo cáo công việc ngày nhé" at every weekday at 4pm
    
    ví dụ tạo nhắc nhở ngày hôm nay:
    /remind @here "Mọi người báo cáo công việc ngày nhé" at 10am today
    
    ví dụ tạo nhắc nhở ngày mai:
    /remind @here "Anh em team PHP nhớ viết bài blog nhé" at 10am tomorrow
    
    ví dụ tạo nhắc nhở vào thứ 2 tuần sau:
    /remind @here "Anh em team PHP nhớ viết bài blog nhé" at 10am next week
    
    ví dụ tạo nhắc nhở vào ngày 01 đầu tháng sau:
    /remind @here "Anh em team PHP nhớ viết bài blog nhé" at 10am next month
```
- List các remind hiện có:
    /remind list
- Xoá remind hiện có:
    bạn có thể dụng command `/remind list` để list các reminds sau đó chọn remind cần xoá rồi click vào link "Delete".

## Mẹo vặt trong Slack:
- Nhấn mạnh phần văn bản: Để tạo ra văn bản in đậm, hãy bao quanh từ hay cụm từ của bạn bằng dấu sao (*….*). Để in nghiêng văn bản, đặt dấu gạch chân quanh phần văn bản (_……_)
- Gạch bỏ phần văn bản: Để gạch bỏ một số từ, hãy sử dụng dấu ~ bao quanh văn bản
- Lập danh sách: Để tạo danh sách, hãy chọn “Shift” + “Enter” để thêm một dòng mới. Để thêm các dấu đầu dòng, hãy chọn Opt + 8 (Mac) hoặc Alt + 0149 (PC)
- Trích dẫn khối: Để thêm các dấu ngoặc góc vào đầu tin nhắn của bạn, gõ “>” để thụt lề một dòng hoặc “>>>” để thụt lề nhiều đoạn văn
- Các khối mã: Để hiển thị một phần dưới dạng văn bản nội tuyến có chiều rộng cố định, hãy sử dụng dấu backtick (`) quanh khu vực được chọn. Để tạo một khối văn bản có định dạng sẵn, có chiều rộng cố định, hãy sử dụng dấu backtick ba lần.

## Tìm kiếm người dùng, tin nhắn hay tập tin:
Các Kênh Và Tin Nhắn Trực Tiếp
    Type "in:tên kênh" – để tìm kiếm các tin nhắn và / hoặc tập tin trong một kênh cụ thể
    Type "in:tên" – để tìm kiếm các tin nhắn trực tiếp của bạn với một người dùng cụ thể

Tin Nhắn Hoặc Tệp Tin Từ Một Người Cụ Thể
    Type "from:tên người dùng" – để giới hạn tìm kiếm của bạn với các tin nhắn từ một người gửi cụ thể, tìm kiếm này sẽ rà soát tất cả các kênh và mọi tin nhắn trực tiếp
    Type "from:me" – để tìm kiếm các tin nhắn mà bạn đã gửi, ở bất cứ đâu trong Slack

Các Liên Kết, Mục Có Gắn Dấu Sao Và Emoji
    Type "has: đường link" – Thu hẹp tìm kiếm của bạn vào các tin nhắn có chứa một URL cụ thể
    Type "has: star"- để tìm những thư mà bạn đã gắn dấu sao
    Type "has::tên emoji" – để tìm kiếm những thư có chứa một biểu tượng cảm xúc cụ thể

Ngày Và Giờ
    Type "before" rồi sử dụng những từ chỉ thời gian như “hôm qua”, “hôm nay”
    Type "after" rồi sử dụng các từ như “tuần”, “tháng” hoặc “năm”
    Type "on" hoặc “during” và sử dụng các từ khoá cụ thể chỉ ngày hoặc phạm vi thời gian, chẳng hạn như “Yesterday”, “July” hoặc “2021”

------------ END ------------
> Ở trên mình đã giới thiệu cơ bản về Slack, và cách thiết lập Reminder, nếu có thắc mắc gì bạn có thể pm mình để trao đổi thêm nhé.

> Cảm ơn bạn đã dành thời gian đọc bài :D

> Còn đây là địa chỉ USDT của mình, nếu bạn thấy hay thì có thể donate cho mình nhé: 0x9d8fce9ac29c686b54b9ea0430c10d3919279a43

[[author | Chien Le ]]

