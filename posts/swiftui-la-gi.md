---
title: "What Is SwiftUI?"
date: "2021-02-05"
published: true
tags:
  - change_me
---

[[snippet]]
|   SwiftUI là một UI framework mới được phát triển bởi Apple. Nó cung cấp một API mới cho phép người dùng có thể viết code mà nó có thể làm việc được trên tất cả các Apple platforms: iOS, iPadOS, watchOS and tvOS!.
|   

# SwiftUI Là Gì ?

## I. Giới Thiệu:
1. Mở Đầu
    - SwiftUI là một UI framework mới được phát triển bởi Apple. Nó cung cấp một API mới cho phép người dùng có thể viết code mà nó có thể làm việc được trên tất cả các Apple platforms: iOS, iPadOS, watchOS and tvOS!.
    - SwiftUI là một bộ công cụ tạo giao diện  gười dùng theo kiểu khai báo. Nó là giao diện cho phép người dùng sử dụng tương tác với ứng dụng một cách hiệu quả nhất với nhiều ràng buộc ngay lúc khởi đầu cho ứng dụng. Tất cả mọi hành động của người dùng đều được cập nhật tự động mà không cần thông qua những trình khởi tạo ràng buộc nhiều lần như trước (bởi vì nó không đẹp mắt cho lắm ). 
    - Mô hình này được ứng dụng từ trước iOS 13  và bây giờ đang trở thành một xu hướng mới, nó đem lại sự đơn giản trong lquá trình code và tốc độ mã hoá nhanh hơn so với UIKit, mặc dù vẫn chưa đủ khả năng thay thế hoàn toàn được UIKit nhưng chưa có gì là chắc chắn nếu như Swift ra đời củng chưa chắc chắn thay thế được Object - C  chẳng hạn. Nhưng nếu so sánh  SwiftUI với UIKit đến hiện tại củng là một khoảng cách lớn bởi vì vẫn chưa có nhiều những sự trợ giúp đến tất cả vấn đề.
    - Hiện tại thì SwiftUI đang được nhiều người lựa chọn sử dụng mặc dù vẫn đang trong quá trình nâng cấp và bổ xung nhiều thiếu xót nhưng sự ra đời của nó củng mang tính mới mẻ đối với chúng ta.
2. Yêu cầu để sử dụng:
    - macOS Catalina và Xcode 11 Beta trở lên để SwiftUI render Canvas (simulator).
    - Link: How To Install Catalina + Xcode 11 Beta, sau khi cài đặt xong thì chúng ta có thể bắt đầu rồi.
3. Bắt đầu với SwiftUI:
    - Đầu tiên bắt đầu với khởi tạo một dự án đơn giản, cơ bản 
![](https://i.ibb.co/874rTgF/Screenshot-2021-02-03-at-15-15-58.png)
    - Giao diện làm việc thật thú vị, không cần khởi chạy mỗi lần cần kiểm tra UI vừa tạo trên máy ảo giao diện bên phải tự động cập nhật theo từng dòng code chúng ta vừa nhập vào, không cần kéo thả những IBOutLet hay những lần conflic những .xib file, điều này thật khiến ta có trải nghiệm tuyệt vời. 
    - Tiếp nối những mới mẽ chúng ta nhìn xem cách nó tạo một table view đơn giản với một model như sau : 
    ```{.sh}
    struct User {
        var id = UUID()
        var name: String
    }
    ```
    - Khởi tạo và bắt đầu với một  data như sau :
    ```{.sh}
    let users: [User] = [User(name: "hoang"), User(name: "linh"), User(name: "nhung"), User(name: "quang")]
    ```
    - Sau đó tạo một table view bằng List như sau:
    ```{.sh}
    List(users, id:\.id) { user in
            Text(user.name)
    }
    ```
    - Kết quả bên dưới
![](https://i.ibb.co/tbCGM1W/ezgif-com-gif-maker-4.gif)
    - Điều này so với giao diên làm việc trước đây có gì khác biệt  không nhỉ ,  tạo một tableview sau đó gọi regiser cell cho table view rồi lại delegate, datasoure , ... khá là  nhiều công đoạn để có thể tạo nên một tableview còn với swift UI bạn  thấy đấy.
    - Nhưng đây chỉ là khởi đầu cho một chuỗi các tính năng của nó hay ứng dụng của nó.
    
## II. Bắt đầu với SwiftUI.
1   Cấu trúc của nó gồm: 
![](https://i.ibb.co/68BbdVm/Screenshot-2021-02-03-at-16-00-05.png)
- Để bắt đầu thì đầu tiên chúng ta phải biết được cách nó hoạt động ra sao:
    - AppDelegate: Ngay cả trong iOS 13, AppDelegate vẫn là điểm truy cập chính của một ứng dụng. Các phương thức AppDelegate được gọi cho các sự kiện vòng đời cấp ứng dụng.
    - SceneDelegate: Từ iOS 13 trở lên, SceneDelegate chiếm một số trang web phản hồi từ AppDelegate. Đặc biệt liên quan đến UIWindow từ AppDelegate bây giờ là UIScene trong SceneDelegate. Một ứng dụng có thể có nhiều hơn một cảnh mà hầu hết đều xử lý giao diện ứng dụng và nội dung ứng dụng. Vì vậy, SceneDelegate chịu trách nhiệm về những gì được hiển thị trên màn hình trong thuật ngữ của giao diện người dùng và dữ liệu.
    - Đó là lý do SwiftUI hoạt động chính trên SceneDelegate. Và chúng ta thấy được windown được khởi tạo và sử dụng ở đây !
    - Lý do khác là theo phần mở đầu đã đề cập về giao diện. 
- Assets file đây chính là nơi chứa ảnh của project. 
- LaunchScreen thì chắc hẳn bạn đã biết nó là màn hình chờ khi khởi động app.
- Trong giao diện ContenView ta thấy 2 thành phần gôm ContenView và ContentView_Previews:
    - ContenView chính là nơi ta tạo giao diện bằng code của mình.
    - ContentView_Previews chính là giao diện của màn hình preview bên phải nó hiển thị những gì chúng ta vừa thực hiện code một cách trực tiếp.
    - Tổ hợp phím Sau CMD+ALT+Enter để mở và đóng màn hình preview và CMD+ALT+P để khởi chạy màn hình preview nếu nó chúng ta muôn vừa code vừa xem UI cập nhật.
    - Bên trong ContentView có biến body : some View đây chính là phần chính của mỗi SwiftUI View bên trong và củng chúng đều phải được conform theo một protocol View. Củng chính là phần khiến ta khó làm quen hơn! 
2. Ưu điểm của Swift UI:
- Như trên chúng ta đã giới thiệu qua về ưu điểm bây giờ chúng ta đến với những ưu điểm của nó.
    - Đầu tiên nó đơn giản và dể học và mã của nó khá là gọn gàng.
    - Có thể trộn cả UIKit vào SWiftUI thông qua UIHostingController.
    - Có thể dể dàng quản lý chủ đề cho app, có thể đặt làm mặc định chủ đề cho app.
    - Cung cấp cơ chế hoạt động cho những người đam mê lập mô hình lập trình phản ứng , BindableObject, ObjectBinding, và Combine framework,
    - Cung cấp Khung hình trực tiếp mà không cần phải chạy bản build, 
    - Không còn Interface Builder, nó được thay thế bởi Canvas khi bạn, mã sẽ được thêm tự động nếu bạn kéo vào màn hình preview.
    - Không còn phải gặp các sự cố khi quên kéo IBoutlet
    - Không còn AutoLayOut và các vấn đề liên quan đến nó, nó được thay thế bằng các bố cục VStack, ZStack, HStack, Groups, Lists và những thử khác. Nó Không có Autolayout nên bố cục luôn được khởi tạo. bởi vì nó không sử dụng bảng phân cảnh nên nó tạo thuận lợi cho làm việc nhóm đối với quản lý code. 
3. Nhược Điểm:
    - Đi kèm với phiên bản hổ trợ là iOS13 trở lên nên nó sẽ không hỗ trợ được cho các phiên bản iOS thấp hơn, điều này thì nếu xem các bảng thông kê sử dụng của apple thì hiện tại bắt đầu củng không phải quá sớm. 
    - Cùng với sự mới mẻ của SwiftUI thì chắc chắn nó chưa được nhiều sự trợ giúp từ các trang nổi tiếng như StackOverFlow về các vấn đề phức tạp. 
    - không cho phép xem kiểm tra phân cấp chế độ xem trong bản xem trước. 

## III. Đến với một UI của 1 dự án dùng 2 framework SwiftUI và UIKit:
1. UIKit: 
- Đầu tiên là tạo giao diện Interface Builder:
![](https://i.ibb.co/K7wLX9C/Screen-Shot-2021-02-05-at-16-43-36.png)
- Tiếp theo là liên kết với Swift file như sau:
![](https://i.ibb.co/p305kB1/Screen-Shot-2021-02-05-at-16-51-09.png)
![](https://i.ibb.co/0tXMr1N/Screen-Shot-2021-02-05-at-16-51-24.png)
- Kéo @IBOutlet cho view, liên kết file xib với class ,.....
- Nhìn qua để tạo một giao diện cho UIKit chúng ta phải trải qua nhiều công đoạn rối rắm nhỉ !
2. SwiftUI:
- Bắt đầu với một màn hình như sau:
![](https://i.ibb.co/0rthy8v/Screenshot-2021-02-05-at-17-16-02.png)
- Sau đó chúng ta code điều chỉnh giao diện bên trong body và kết quả của giao diện được cập nhật trực tiếp ở preview bên cạnh. 
- Không có gì phải rườm rà khi điều chỉnh chỉ cần tiếp tục code, và cập nhật không phải lo lắng vấn đề kéo IBOutlet hay AutoLayout.

## IV. Tổng Kết.
- Bài viết này giới thiệu về SwiftUI.
- Là một framework mới, thời gian tới sẽ là sử khởi đầu cho framework này, với thống kê của apple thì ios 13 không phải là rào cản hiện tại.
- Nhiều bài viết và đang dần có nhiều hơn các sự trợ giúp được cộng động iOS chia sẽ. 
- Hẹn gặp các bạn ở bài viết sau, chúng ta cùng tìm hiểu thêm về nó nhé!

[[author | Tri Đặng ]]



