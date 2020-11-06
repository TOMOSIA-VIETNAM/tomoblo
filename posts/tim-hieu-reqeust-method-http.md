---
title: "Learn about HTTP request method "
date: "2020-11-05"
published: true
tags:
  - technical
---
# 1. Cùng tìm hiểu về HTTP request methods
Đối với các lập trình viên web nói chung thì chúng ta không thể nào mà không nghe đến các từ như **get** hoặc **post**,  bởi vì nó thực sự rất phổ biển.

Nhưng ngoài ra còn có nhiều method khác mà chúng ta ít sử dụng hơn nhưng sự tồn tại của chúng cũng là rất cần thiết.

Trong bài viết này, tôi sẽ giới thiệu các bạn về các request methods hiện có để nếu như các bạn cần sử dụng đến chúng có thể tìm ở ngay đây.

# 2. Sơ lược về các request

*Đầu tiên phải nói đến là có tất cả 9 loại request, get và post là 2 loại thông dụng được sử dụng nhiều.* 

 1. GET:
 > Được sử dụng để lấy thông tin từ sever theo URI đã cung cấp.
 2. HEAD:
 > Giống với GET nhưng response trả về không có body, chỉ có header
 3. POST:
 > Gửi thông tin tới sever thông qua các biểu mẫu http( đăng kí chả hạn..)
 4. PUT:
 > Ghi đè tất cả thông tin của đối tượng với những gì được gửi lên
 5. PATCH:
 > Ghi đè các thông tin được thay đổi của đối tượng.
 6. DELETE:
 > Xóa tài nguyên trên server.
 7. CONNECT:
 > Thiết lập một kết nối tới server theo URI.
 8. OPTIONS:
 > Mô tả các tùy chọn giao tiếp cho resource.
 9. TRACE:
 > Thực hiện một bài test loop - back theo đường dẫn đến resource.
# 3.  Đặc tính
Có 4 đặc tính nổi bật của các method là:

### Safe (Độ an toàn)
- Một method được coi là safe khi nó không làm thay đổi trạng thái "sate" của server. 
-  Nói cách khác, an toàn là chỉ đọc mà không làm thay đổi bất kì điều gì.
-  Các method được coi là safe chỉ có: GET, HEAD và OPTIONS.  
- Unsafe: PUT, DELETE, POST và PATCH.

### Idempotent (tính bất biến)
- Một request được xem là **idempotent** nếu sau nhiều lần gọi, nó vẫn trả về kết quả như nhau.
- Vì điều này nên các method safe thì đều idempotent. Nhưng unsafe chưa chắc đã idempotent.
	``int i = 100; // idempotent``
	``i++; // not idempotent`` 
> Thao tác gán đầu tiên được hiểu là **idempotent**, vì cho dù ta **thực hiện câu lệnh này bao nhiêu lần**, **giá trị của i cũng vẫn chỉ là 100**. Ngược lại, khi giá trị i++, **mỗi lần gọi sẽ tăng giá trị i lên 1**. Vì vậy, **i không là idempotent**.
- Hãy chú rằng kết quả ở đây là trạng thái của nguồn dữ liệu trên server (lưu ý rằng các mã trạng thái (200,400,403,…) không liên quan tới tính ổn định).
- 1 số lưu ý: header dài tối đa 8kb và cũng phụ thuộc cả vào trình duyệt body thì limit của nó tùy trình duyệt.  *Url không dài quá 2 nghìn kí tự (ror)*

### Visibility (Tính che giấu thông tin)
- Một request trong http methods được xem là **visibility** khi nó **không để lộ ra thông tin trên URL** khi request được gửi.
>  *Cần lưu ý rằng visibility ở đây **chỉ giới hạn ở URL** (phần người dùng có thể nhìn thấy được).*

### Cachable (Có thể cache được)
- Một request được xem là **cacheable** khi **sau lần gửi thứ nhất của request**, kết quả phản hồi **có thể được lưu** vào một trong các loại cache trên websites (localStorage, [cookies](https://45.76.152.160/tim-hieu-ve-http-cookie-cookies/), …).
- Các bạn có thể xóa cache trong trình duyệt của mình

# 4. So sánh Get và Post
GET và POST là hai phương thức của giao thức HTTP, đều là gửi dữ liệu về server xử lí sau khi người dùng nhập thông tin vào form và thực hiện submit. Trước khi gửi thông tin, nó sẽ được mã hóa bằng cách sử dụng một giản đồ gọi là url encoding. Giản đồ này là các cặp name/value được kết hợp với các kí hiệu = và các kí hiệu khác nhau được ngăn cách bởi dấu &.

## GET
- Phương thức GET gửi thông tin người dùng đã được mã hóa thêm vào trên yêu cầu trang:
``https://example.com/index?name=value1&name1=value2&name2=value3 ``

> Chúng ta thấy rằng GET lộ thông tin trên đường dẫn URL. Băng thông của nó chỉ khoảng 1024 kí tự vì vây GET hạn chế về số kí tự được gửi đi. GET không thể gửi dữ liệu nhị phân , hình ảnh ... Có thể cached và được bookmark (đánh dấu trên trình duyệt). Lưu trong browser history.

## POST
Phương thức POST truyền thông tin thông qua HTTP header, thông tin này được mã hóa như phương thức GET. Dữ liệu đươc gửi bởi phương thức POST rất bảo mật vì dữ liệu được gửi ngầm, không đưa lên URL, bằng việc sử dụng Secure HTTP, bạn có thể chắc chắn rằng thông tin của mình là an toàn. Parameters được truyền trong request body nên có thể truyền dữ liệu lớn, hạn chế tùy thuộc vào cấu hình của Server.

> Không cache và bookmark được cũng như không được lưu lại trong browser history. POST không có bất kì hạn chế nào về kích thước dữ liệu sẽ gửi, có thể gửi dữ liệu nhị phân, hình ảnh.

## So sánh

- **Lưu trữ (cache)** 
>Dữ liệu gửi bằng phương thức GET sẽ được lưu trữ lại trong query string và có thể được xem trong lịch sử trình duyệt. 
Ngược lại thì dữ liệu và địa chỉ URL của các request gửi bằng POST không được trình duyệt lưu lại. 

- **Tốc độ**
>GET nhanh hơn rất nhiều so với POST về quá trình thực thi vì dữ liệu gửi đi luôn được webrowser cached lại, khi dùng phương thức POST thì server luôn thực thi và trả kết quả cho client, còn dùng GET thì webrowser cached sẽ kiểm tra có kết quả tương ứng đó trong cached chưa, nếu có thì trả về ngay mà không cần đưa tới server. 

- **Đánh dấu (bookmark)** 
>Đối với request gửi bằng phương thức GET người dùng có thể bookmark lại được trên trình duyệt. Ngược lại các request gửi bằng POST sẽ không thể bookmark được. 

- **Gửi lại form**
> Với form gửi đi bằng phương thức GET bạn có thể gửi lại bằng cách bấm phím F5 hoặc Ctrl + R. Tuy nhiên với phương thức POST, nếu bạn muốn thực hiện việc gửi lại dữ liệu của form thì trình duyệt sẽ hiển thị một hộp thoại cảnh báo.

- **Trở lại trang trước**
>Trong trường hợp bạn đã gửi form dữ liệu đi rồi sau đó bấm phím Backspace để quay lại trang trước thì với phương thức GET bạn sẽ vẫn được cùng một nội dụng (chứa form). Ngược lại với POST thì bạn sẽ thấy một trang trống.

-  **Bảo mật** 
>Phương thức POST bảo mật hơn GET vì dữ liệu được gửi ngầm, không xuất hiện trên URL, dữ liệu cũng không được lưu lại trong khi đó với GET thì bạn có thể hiển thị lại được các dữ liệu này. 

 - **Dữ liệu**
 >Phương thức POST không giới hạn dung lượng dữ liệu gửi đi cũng như loại nhữ liệu (văn bản thông thường hay file nhị phân như upload tập tin hay hình ảnh, video...). Ngược lại, với phương thức GET dữ liệu gửi đi bị giới hạn sử dụng các ký tự chữ có trong bộ ký tự ASCII. Đồng thời dữ liệu của GET được gửi trong URL thông qua query string nên sẽ bị giới hạn bởi số lượng ký tự tối đa cho phép trong URL.

# 5. Lời cuối cùng
Ở trên chỉ là tóm tắt cơ bản về các request methods trong HTTP . Ngoài ra, để tìm hiểu thêm về bảo mật Http methods, các bạn có thể đọc thêm ở các nguồn tài liệu khác nhé.
**See ya!!**

######                    *<div style="text-align: right"> - by Thắng Đặng</div>*
