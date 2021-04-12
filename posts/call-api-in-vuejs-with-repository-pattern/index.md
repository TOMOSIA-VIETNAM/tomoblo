---
title: "Call API in Vuejs with Repository Pattern"
date: "2021-12-04"
published: true
tags:
  - Javascript
  - Vuejs
---

Chào mọi người. Hẳn ai làm việc với Vuejs cũng sẽ đã làm việc với Api trong component hoặc vuex rồi. Nhưng bạn đã từng đặt ra câu hỏi, nếu như api đó dùng ở nhiều Component, nhưng ở phía backend lại đổi endpoint thì chúng ta phải xử lý như thế nào? Phải chạy qua từng componet để sửa đường dẫn hay là một cách nào đó. Nếu sử dụng API như trên thì sẽ xảy ra một số vấn đề sau:
- Việc viết API trực tiếp trong component sẽ rất khó cho việc viết unit test.
- Vì API được định nghĩa trong component nên muốn thay đổi API hay logic sẽ phải sửa trong nhiều file khác.
Và còn rất nhiều vấn đề nữa…

Sau khi tìm hiểu thì mình thấy có rất nhiều design pattern có thể áp dụng cho việc gọi API. Nhưng có 1 design pattern mà mình thấy tốt nhất đó là **Repository Factory**.

##I. Mục đích:
- Biết cách áp dụng design pattern vào việc call API. Đặc biệt là Repository Factory pattern.
- Mặc dù bài viết lấy ví dụ là VueJS nhưng mà Angular, ReactJS đều có thể áp dụng được.

##II. Vì sao lại dùng Repository Pattern:
Mình sẽ dùng repository pattern để truy cập vào tài nguyên theo cách độc lập, không có bất kì logic nào ngoài việc trả về dữ liệu.

Chắc hẳn mọi người đọc example hay tutorial cũng đều thấy axios luôn được sử dụng trong component. Vậy có vấn đề gì xảy ra chỗ này:
- Điều gì sẽ xảy ra nếu chúng ta muốn tái sử dụng việc call api?
- Điều gì xảy ra nếu endpoint thay đổi?
- Điều gì xảy ra nếu muốn tái sử dụng việc call api cho dự án khác?
- Điều gì xảy ra nếu muốn refactor 1 vài lời gọi hàm hoặc muốn di chuyển nó đến Vuex actions?
- Mình có nhiều hơn 1 cái resource, thế bây giờ phải định nghĩa tận 4 cái endpoint?
- Làm thế nào có thể dùng 1 cái mock api cho việc test?

##III. Bắt đầu:

###1. Tạo file **constants/index.js** để lưu endpoint và một số thông tin cần thiết:
![](/constant.png)
###2. Tạo file **repository/repository.js** để làm nhiệm vụ kết nối tới các resources.
Cái này mọi người đặt tên gì cũng được, Service hay là API, cá nhân mình thì nghĩ trong trường hợp này Repository sẽ là 1 cái tên hợp lý 
![](/repository.png)
###3. Tiếp theo chúng ta sẽ đi định nghĩa cho từng Entity của project. Ở đây mình ví dụ là **repository/entity/authRepository.js**:
![](/entity.png)
###4. Tiếp theo chúng ta sẽ đi định nghĩa **Factory** để đăng ký và gọi repository ở **repository/factory.js**:
![](/factory.png)
###5. Áp dụng vào trong component:
- Gọi repository **auth** từ factory:

![](/comp1.png)
- Gọi dùng hàm **login** của repository **auth**:

![](/comp2.png)

Nhìn vào chúng ta thấy khá là dễ hiểu phải không nào? Vì phần logic đã được tách ra ở 1 chỗ khác nên việc dùng 1 endpoint khác là một việc không hề khó.

##IV. Kết luận:
Hiện tại pattern này mình đang áp dụng vào dự án thấy có thể control và scale ổn. Nhưng điều đó cũng không có nghĩa là nó phù hợp với dự án của bạn được. Nên các bạn cần đánh giá về độ phức tạp của dự án trước để đưa ra một giải pháp phù hợp. Cảm ơn mọi người đã đọc bài viết.

`[[author | Tran Van Tuan Anh ]]`
