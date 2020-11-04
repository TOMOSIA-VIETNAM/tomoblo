---
title: "RESTful API những điều cần chú ý"
date: "2020-08-24"
published: true
tags:
  - php
---
##I. RESTful API là gì?

<center>

![Compare](https://topdev.vn/blog/wp-content/uploads/2019/04/restful-api.jpg)

</center>

REST (REpresentational State Transfer) hiểu một cách đơn giản thì REST là một loạt hướng dẫn và dạng cấu trúc dùng cho việc chuyển đổi dữ liệu. Nó sử dụng phương thức HTTP đơn giản để tạo giao tiếp giữa các máy. Vì vậy, thay vì sử dụng một URL cho việc xử lý một số thông tin người dùng, REST gửi một yêu cầu HTTP như GET, POST, DELETE, vv... đến một URL để xử lý dữ liệu.

Bản thân REST không phải là một loại công nghệ. Nó là phương thức tạo API với nguyên lý tổ chức nhất định. Những nguyên lý này nhằm hướng dẫn lập trình viên tạo môi trường xử lý API request được toàn diện.

Vậy, RESTful API là một tiêu chuẩn dùng trong việc thiết kế các API cho các ứng dụng web để quản lý các resource. RESTful là một trong những kiểu thiết kế API được sử dụng phổ biến ngày nay cho các ứng dụng (web, mobile…) khác nhau giao tiếp với nhau.

##II. RESTful hoạt động như thế nào?

<center>

![Compare](https://topdev.vn/blog/wp-content/uploads/2019/04/restful-rest-diagram-api.jpg)

</center>
 - Hoạt động chủ yếu của REST chính là việc dựa trên các giao thức của HTTP. Với các hoạt động cơ bản thì sẽ có thể sử dụng được các giao thức HTTP khác nhau, có thể nhắc đến như:

 * GET (SELECT): Trả về một tài nguyên hoặc một danh sách tài nguyên.
 * POST (CREATE): Tạo mới một tài nguyên.
 * PUT (UPDATE): Cập nhật thông tin cho tài nguyên.
 * DELETE (DELETE): Xoá một tài nguyên.

Những phương thức, hoạt động này trong lập trình sẽ thường được gọi với cái tên là CRUD. Cái tên này chính là viết tắt của các từ mà nó bao gồm trong đó, chính là Create, Read, Update và Delete.

##III. Những điều cần chú ý với RESTful APIs
RESTful API không sử dụng session và cookie, nó sử dụng một access_token với mỗi request. Hiện tại có 3 cơ chế Authorize chính:
  * HTTP Basic
  * JSON Web Token (JWT)
  * OAuth2

Tùy thuộc vào service của bạn, mà hãy chọn loại Authorize có mức độ phù hợp, cố gắng giữ nó càng đơn giản càng tốt.

Hiện tại đa số lập trình viên viết RESTful API giờ đây đều chọn JSON là format chính thức nhưng cũng có nhiều người chọn XML làm format.

Dữ liệu json trả về thường có cấu trúc như sau:
```js
{
  "status": true,
  "data" : {
      "id": "1",
      "name": "RESTFul API"
  },
  "error": {
      "code": 200,
      "message": "SUCCESS"
  }
}
```
Cấu trúc REST thì khó giải thích sao cho cụ thể. Tuy nhiên, vẫn có một số quy luật bất biến sau:

- Sự nhất quán trong cả API.
- Tồn tại không trang thái (ví dụ, không có server-side session).
- Sử dụng HTTP status code khi cần thiết.
- Sử dụng URL endpoint với logical hierarchy.
- Versioning trong URL chứ không phải trong HTTP header.

Luôn sử dụng version để khi bạn cần nâng cấp API mà vẫn hỗ trợ các API cũ. Một URL nên bao gồm đường dẫn tiền tố như /v2/ cho phiên bản 2 cập nhật từ API trước đó.

Return data ở endpoint sẽ thay đổi mạnh mẽ dựa vào phương thức HTTP. Ví dụ, GET trả nội dung, còn POST tạo nội dung mới. Request có thể chỉ đến cùng một endpoint, nhưng kết quả có thể rất khác.

Một vấn đề quan trọng nữa là return type data. Đa số người dùng web trông chờ nội dung JSON, vậy đây có lẽ là lựa chọn tốt nhất bên cạnh XML. JSON chính là API return type nền tảng cho lập trình web.

Khi chúng ta request một API nào đó thường thì sẽ có vài status code để nhận biết sau:

- 200 OK – Trả về thành công cho những phương thức GET, PUT, PATCH hoặc DELETE.
- 201 Created – Trả về khi một Resouce vừa được tạo thành công.
- 204 No Content – Trả về khi Resource xoá thành công.
- 304 Not Modified – Client có thể sử dụng dữ liệu cache.
- 400 Bad Request – Request không hợp lệ
- 401 Unauthorized – Request cần có auth.
- 403 Forbidden – bị từ chối không cho phép.
- 404 Not Found – Không tìm thấy resource từ URI
- 405 Method Not Allowed – Phương thức không cho phép với user hiện tại.
- 429 Too Many Requests – Request bị từ chối do bị giới hạn

###[API Document]
Mỗi một lập trình viên thì ai cũng biết việc viết API docs là cần thiết, tuy nhiên để có một API docs hoàn chỉnh cũng tiêu tốn khá nhiều thời gian. Nhất là trong lúc dự án gấp rút thì mọi người thường chỉ để API docs ở mức siêu cơ bản. Tham khảo thêm cách viết API Document.

API document là một phần tương tự như Unit Test vậy – lấy ngắn để nuôi dài.

Nếu không được chăm sóc kỹ, thì đến lúc maintain hoặc thay đổi spec thì hậu quả sẽ rất thảm khốc, dưới đây là một số lưu ý lúc viết docs:

Mô tả đầy đủ về params request: gồm những params nào, datatype, require hay optional.

Nên đưa ra các ví dụ về HTTP requests và responses với data chuẩn.

Cập nhật Docs thường xuyên, để sát nhất với API có bất cứ thay đổi gì.

Format, cú pháp cần phải nhất quán, mô tả rõ ràng, chính xác.

##IV. Lời kết
Nhìn chung, RESTful API là những API đi theo cấu trúc REST, hoạt động dựa trên các giao thức của HTTP.

Luôn sử dụng xác thực cần thiết khi truy xuất tài nguyên thông qua api.

Tạo và cập nhật API document khi có thay đổi về cấu trúc dữ liệu.

--- Cảm ơn mọi người đã đọc bài viết của mình. Chúc một ngày vui vẻ!!! ---

######                    *<div style="text-align: right"> - by Anh Lee </div>*
