---
title: "97 điều một programmer nên biết"
date: "2020-10-04"
published: true
tags:
  - blog
---


Nếu “Đắc nhân tâm” là cuốn sách chia sẻ ứng xử trong cuộc sống thường ngày thì “97 điều một programmer nên biết“ là cuốn sách kỹ năng dành cho programmer trong “thế giới lập trình” của họ. Cuốn sách không chia sẻ những kỹ thuật phát triển hay những kiến thức nền tảng của một người lập trình viên, mà nó cho bạn những kỹ năng mềm, những mẹo có ích, những vấn đề thường gặp của người đang làm lập trình.

Trong bài viết này tôi xin dịch chia sẻ điều thứ 1 trong 97 điều.

## Hành động một cách thận trọng ( Act with Prudence) by Seb Rose

> “Khi làm một việc gì đó, hãy nhớ phải thật thận trọng. Bạn hãy suy nghĩ thật kỹ xem việc mình làm sẽ có kết quả như thế nào.” (Tác giả: không rõ)

Cho dù schedule có cho bạn thấy rằng bạn có dư thời gian cỡ nào thì thực tế khi bạn bắt đầu công việc thì ở đâu đó bạn sẽ rơi vào tình trạng bị “dí” chạy. 

Cùng một công việc nếu có hai lựa chọn là “Cách làm đúng” và “Cách làm nhanh” thì phần lớn bạn sẽ bị hấp dẫn bởi cách thứ 2. Nếu bạn chọn cách thứ 2, ngay cả khi bạn biết rằng có thể sau này bạn phải fix nó thì bạn sẽ tự hứa với bản thân rằng "Chắc chắn mình sẽ sửa nó ngay lập tức". Và bạn cũng hứa điều này với member trong team, với khách hàng v.v.. Khi bạn hứa điều đó đương nhiên bạn nghĩ rằng mình nhất định phải giữ lời. Ở những công việc tiếp theo chính là cơ hội để bạn fix nó nhưng thực tế là khi bạn bắt đầu công việc lại có những vấn đề khác phát sinh, và rồi bạn phải tập trung vào nó. Kết quả là bạn không thể fix lỗi.

Công việc sửa chữa bị trì hoãn như vậy đôi khi được gọi là "nợ kỹ thuật" (Technial debt). Đương nhiên đây không phải là việc tốt. Martin Fowler gọi đó là “Nợ kỹ thuật có chủ ý” để phân biệt với “Nợ kỹ thuật phát sinh không có chủ ý”.

“Nợ kỹ thuật” đúng như tên gọi của nó, nó giống như một món nợ về tiền bạc. Nó cho bạn lợi ích ngắn hạn nhưng bạn phải tiếp tục trả lãi cho đến khi trả hết. Nếu vì nhanh chóng mà bạn bỏ qua code thì việc add features hay refactor code sẽ trở nên khó khăn hơn. Lỗi đó trở thành “ổ” sinh ra những bug mới, là nguyên nhân khiến testcase mất giá trị. Để càng lâu ảnh hưởng càng lớn. Cuối cùng khi chúng ta giải quyết được vấn đề ban đầu, thì có thể là đã có một đống vấn đề mới do vấn đề đó gây ra.

Trong một số trường hợp chúng ta không thể lựa chọn thiết kế đúng vì vấn đề bị bỏ qua. Và bạn viết code theo một cách khó refactor, khó fix, cứ viết tiếp như vậy.

Trên thực tế, mãi cho đến khi mọi thứ trở nên tồi tệ đến mức bạn không thể làm gì khác được nữa bạn mới bắt tay vào khắc phục sự cố ban đầu. Lúc này khi bạn muốn sửa nó thì bạn mất quá nhiều thời gian và phát sinh những risk vượt quá tầm kiểm soát. 

Nhưng cũng có những lúc để kịp deadline và để add feature món nợ kỹ thuật này được tạo ra. Chúng ta nỗ lực ngăn chặn điều này xảy ra nhưng có những lúc ta buộc phải làm như vậy. Trong trường hợp đó, không có lựa chọn nào khác ngoài việc đi theo con đường gánh nợ kỹ thuật. Nhưng (từ đây trở đi quan trọng hơn tất cả), bạn nhất định không được quên sự tồn tại của món nợ kỹ thuật và trả nợ càng sớm càng tốt. Nếu không mọi thứ sẽ trở nên tồi tệ rất nhanh chóng. Nếu bạn đưa ra quyết định gánh nợ, bạn nên ghi ngay vào task card hay đăng ký nó vào hệ thống quản lý sự cố,… để chắc chắn rằng bạn không quên sự tồn tại của món nợ này.

Nếu bạn có thể lên lịch cho việc trả nợ vào dự định tiếp theo của mình thì bạn chỉ phải trả một khoản lãi nhỏ nhất. Còn nếu bạn bỏ qua khoản nợ đó bạn sẽ phải gánh một khoản lãi khổng lồ. Bạn cần theo dõi khoản lãi và làm rõ cost. Điều này sẽ giúp bạn nhận ra được nợ kỹ thuật ảnh hưởng lớn như thế nào đến business value và tự nhiên bạn sẽ biết cách nâng mức độ ưu tiên công việc tiếp theo để trả nợ. Cách bạn tính toán và theo dõi lãi sẽ khác nhau giữa các dự án, nhưng tất cả các dự án đều có điểm giống nhau là bạn PHẢI theo dõi nó.

Hãy trả nợ kỹ thuật càng sớm càng tốt. Nếu không bạn sẽ trở thành một người thiếu thận trọng đấy!


Nếu bạn có hứng thứ với điều thứ 2. Hãy chờ ở bài viết tiếp theo nhé!

Translate by: Mahi








