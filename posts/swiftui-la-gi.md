---
title: "What is SwiftUI ?"
date: "2021-02-05"
published: true
tags:
  - iOS
  - SwiftUI
---

[[snippet]]

|   ***SwiftUI*** là một UI ***Framework*** mới được phát triển bởi ***Apple***. Nó cung cấp một API mới cho phép người dùng có thể viết ***Code*** mà nó có thể làm việc được trên tất cả các nền tảng của ***Apple***: ***iOS, iPadOS, watchOS*** và ***tvOS*** !
|   

# **SwiftUI** Là Gì ?


## I. Giới Thiệu:
1. Mở Đầu
    - ***SwiftUI*** là một UI ***Framework*** mới được phát triển bởi ***Apple***. Nó cung cấp một API mới cho phép người dùng có thể viết ***Code*** và nó còn có thể làm việc được trên tất cả các ***Apple platforms: iOS, iPadOS, watchOS*** và ***tvOS***!
    - Mô hình này được ứng dụng từ trước ***iOS 13*** và bây giờ đang trở thành một xu hướng mới, nó đem lại sự đơn giản trong quá trình ***Code*** và tốc độ xây dựng ứng dụng hơn so với ***UIKit***, mặc dù vẫn chưa đủ khả năng thay thế hoàn toàn được ***UIKit*** nhưng chưa có gì là chắc chắn nếu như ***Swift*** ra đời củng chưa chắc chắn thay thế được ***Objective - C*** chẳng hạn. Nhưng nếu so sánh ***SwiftUI*** với ***UIKit*** đến hiện tại thì đang là một khoảng cách lớn bởi vì vẫn chưa có nhiều những sự trợ giúp từ các trang nổi tiếng như ***Stackoverflow, Medium, Hackingswift, ...*** 
    - Hiện tại ***SwiftUI*** đang được nhiều người lựa chọn sử dụng mặc dù vẫn đang trong quá trình nâng cấp và bổ xung, bởi vì có một điều rằng bạn có thể sử dụng đồng thời cả ***UIKit*** cùng ***SwiftUI***, điều này nói lên rằng nếu bạn đã thông thạo ***UIKit*** thì có thêm một sự trợ gúp hoàn hảo khi sử dụng ***SwiftUI***. có thể nó sẽ là một ***Framework*** mạnh mẽ trong tương lai gần, tuy còn nhiều thiếu xót nhưng ***Apple*** đã và đang ngày một hoàn thiện cho nó. 
2. Yêu cầu để sử dụng:
    - macOS Catalina và XCode 11 Beta trở lên để ***SwiftUI*** render ***Canvas*** (***Simulator***).
    - Link: How To Install Catalina + XCode 11 Beta, research và làm theo, sau khi cài đặt xong thì chúng ta có thể bắt đầu vời ***SwiftUI***.
3. Bắt đầu với ***SwiftUI***:
    - Đầu tiên bắt đầu với khởi tạo một ***Project*** đơn giản:
![](https://i.ibb.co/874rTgF/Screenshot-2021-02-03-at-15-15-58.png)
    - Giao diện làm việc thật thú vị, không cần khởi chạy mỗi lần cần kiểm tra UI vừa tạo trên máy ảo, giao diện bên phải tự động cập nhật theo từng dòng ***Code*** chúng ta vừa nhập vào, không cần kéo thả những ***IBOutlet*** hay những lần conflic những ***.xib file***, điều này thật khiến ta có trải nghiệm tuyệt vời. 
    - Tiếp theo chúng ta nhìn xem cách nó tạo một ***TableView*** đơn giản với một Model như sau: 
    ```{.sh}
    struct User {
        var id = UUID()
        var name: String
    }
    ```
    - Khởi tạo một Data như sau:
    ```{.sh}
    let users: [User] = [User(name: "hoang"), User(name: "linh"), User(name: "nhung"), User(name: "quang")]
    ```
    - Sau đó tạo một ***TableView*** bằng List như sau:
    ```{.sh}
    List(users, id:\.id) { user in
            Text(user.name)
    }
    ```
    - Kết quả bên dưới:
![](https://i.ibb.co/tbCGM1W/ezgif-com-gif-maker-4.gif)
    - Điều này so với giao diên làm việc trước đây(***UIKit***) có gì khác biệt không nhỉ, tạo một ***IBOutlet*** cho ***TableView*** sau đó phải gọi ***RegisterCell*** để đăng ký những ***Cell*** cho ***TableView*** rồi lại sử dụng ***Delegate, Datasoure*** Để liên kết Data cho chúng, rồi chúng ta vào ***Cell*** để tạo những ***IBOutlet*** cho các ***Cell***, tiếp đó phải kéo các liên kết ***IBOutlet*** từ đó vào ***.xib file*** của ***Cell*** và phải đảm bảo được là chúng không thiếu xót hoặc nhầm lẫn, sau đó điều chỉnh ***Layout***, ...  Khá là nhiều công đoạn để có thể tạo nên một ***TableView*** với cách làm trước đây, còn với ***SwiftUI*** bạn thấy rồi đấy.
    - Còn rất nhiều những tiện ích, lợi ích mà ***SwiftUI*** có thể mang lại cho chúng ta nữa, bởi vì cách thức hoạt động nó hoàn toàn mới mẻ nên sẽ khiến bạn còn bất ngờ hơn nhiều nếu bạn tìm hiểu thêm về nó.
    
## II. ***SwiftUI*** Có Gì?

1. Cấu trúc của nó gồm:
    ![](https://i.ibb.co/68BbdVm/Screenshot-2021-02-03-at-16-00-05.png)

    - Đầu tiên chúng ta phải biết được cách nó hoạt động:
        - ***AppDelegate***: Ngay cả trong ***iOS 13***, ***AppDelegate*** vẫn là điểm truy cập chính của một ứng dụng. Các phương thức ***AppDelegate*** này được cho là phải ở đó để xử lý các sự kiện trong vòng đời ứng dụng, tức là phản hồi ứng dụng đang được khởi chạy, chạy nền, nền trước, nhận dữ liệu, v.v.
            -   Ở ***AppDelegate***, những điều chúng ta thường viết mã ứng dụng cho ***iOS 12*** (trở xuống) là:
                -   Thiết lập trình điều khiển xem đầu tiên của ứng dụng (được gọi là trình điều khiển xem gốc), chức năng (_: didFinishLaunchingWithOptions :) là chức năng đầu tiên mà hệ điều hành gọi khi khởi chạy ứng dụng.
                -   Định cấu hình cài đặt ứng dụng và các thành phần khởi động. 
                -   Đăng kí trình xử lý thông báo.
                -   Trả lời các sự kiện trong vòng đời của ứng dụng, chẳng hạn như ứng dụng chạy nền, tiếp tục ứng dụng hoặc thoát khỏi ứng dụng.
            -   Nhưng bây giờ chúng ta không cần phải quá quan tâm ở ***AppDelegate*** nữa, bởi vì môi trường hoạt động chính của chúng ta ở ***SceneDelegate***.
        - ***SceneDelegate***: 
            -   Từ ***iOS 13*** trở lên, ***SceneDelegate*** đảm nhận một số vai trò đại biểu của ứng dụng. Quan trọng nhất, khái niệm về ***UIWindow***(cửa sổ) được thay thế bằng ***UIScene***(bối cảnh). Một ứng dụng có thể có nhiều bối cảnh và một cảnh sẽ đóng vai trò làm nền cho giao diện và nội dung ứng dụng. Vì vậy, ***SceneDelegate*** chịu trách nhiệm về những gì được hiển thị trên màn hình trong thuật ngữ của giao diện người dùng và dữ liệu.
            -   Người dùng cũng có thể tạo một bản sao của một cảnh, chạy hiệu quả nhiều phiên bản của một ứng dụng cùng một lúc.
            -   ***SceneDelegate*** những điều chúng ta cần biết là:
                -   Một dự án ***iOS*** mới hiện có lớp ***SceneDelegate***, được tạo tự động, bao gồm các sự kiện vòng đời quen thuộc như hoạt động, ngắt kết nối.
                -   Class ***AppDelegate*** có 2 chức năng mới liên quan đến các phiên cảnh, được gọi là application(_:configurationForConnecting:options:) và application(_:didDiscardSceneSessions:).
                -   Danh sách thuộc tính ***info.plist*** nhận bản khai cảnh application(Application Scene Manifest), liệt kê các cảnh là một phần của ứng dụng này, bao gồm tên lớp, đại biểu và bảng phân cảnh của chúng.
                -   Thiết lập trình điều khiển xem đầu tiên của ứng dụng (được gọi là trình điều khiển xem gốc), tương tự ***AppDelegate*** là (_: didFinishLaunchingWithOptions :) thì ở đây chúng ta có scene(_:willConnectTo:options:), là chức năng đầu tiên mà hệ điều hành gọi khi khởi chạy ứng dụng.
            -   Trong ***SceneDelegate*** còn có những chức năng sau:
                -   sceneDidDisconnect (_ :) được gọi khi một cảnh bị ngắt kết nối khỏi ứng dụng (Lưu ý rằng nó có thể kết nối lại sau này).
                -   sceneDidBecomeActive (_ :) được gọi khi người dùng bắt đầu tương tác với một cảnh, chẳng hạn như chọn nó từ trình chuyển đổi ứng dụng.
                -   sceneWillResignActive (_ :) được gọi khi người dùng ngừng tương tác với một cảnh, ví dụ bằng cách chuyển sang cảnh khác.
                -   sceneWill EntryForeground (_ :) được gọi khi một cảnh đi vào ***foreground***, tức là bắt đầu hoặc tiếp tục từ trạng thái nền.
                -   sceneDid EntryBackground (_ :) được gọi khi một cảnh vào ***background***, tức là ứng dụng được thu nhỏ nhưng vẫn hiện diện trong nền.
    - Assets.xcassets đây chính là nơi chứa ảnh của ***Project***. 
    - LaunchScreen.xib thì chắc hẳn bạn đã biết nó là màn hình chờ khi khởi động App.
    - Trong giao diện ***ContenView*** ta thấy 2 thành phần gồm ***ContenView*** và ***ContentView_Previews***:
        - ***ContenView*** chính là nơi ta tạo giao diện bằng ***Code*** của mình.
        - ***ContentView_Previews*** chính là giao diện của màn hình ***Preview*** bên phải nó hiển thị những gì chúng ta vừa thực hiện ***Code*** một cách trực tiếp.
        - Tổ hợp phím Sau ***CMD+ALT+Enter*** để mở và đóng màn hình ***Preview** và ***CMD+ALT+P*** để khởi chạy màn hình ***Preview*** nếu chúng ta muốn vừa ***Code*** vừa xem sự thay đổi UI vừa được thêm vào bằng ***Code*** một cách trực tiếp.
        - Bên trong ***ContenView*** có biến ***body: some View*** đây chính là bối cảnh chính của mỗi ***View***, các thành phần bên trong của chúng đều phải tuân theo một giao thức chung ***View***, củng chính là phần khiến ta khó làm quen nhất đối với ***SwiftUI***.
    
2. Ưu điểm của ***SwiftUI***:
    - Đầu tiên nó đơn giản và dể học và ***Code*** của nó khá là gọn gàng dể đọc.
    - Có thể trộn cả ***UIKit*** vào ***SwiftUI***.
    - Có thể dể dàng quản lý chủ đề cho App, có thể đặt làm mặc định chủ đề cho App.
    - Cung cấp cơ chế hoạt động cho những người đam mê lập mô hình lập trình phản ứng, ***BindableObject***, ***ObjectBinding***, và ***Combine Framework***.
    - Cung cấp khung hình giao diện trực tiếp cho người dùng ***Code*** mà không cần phải khởi chạy ***Simulator*** hoặc ***Device*** để kiểm tra, xem lại kết quả như trước.
    - Không còn ***InterfaceBuilder***, nó được thay thế bởi ***Canvas*** khi bạn, mã sẽ được thêm tự động nếu bạn kéo vào màn hình ***Preview***.
    - Không còn phải gặp các sự cố crash App khi quên kéo ***IBOutlet***.
    - Không còn AutoLayOut và các vấn đề liên quan đến nó, nó được thay thế bằng các bố cục ***VStack, ZStack, HStack, Groups, Lists*** và những thử khác. Nó Không có Autolayout nên bố cục luôn cần được khởi tạo trước, bởi vì nó không sử dụng bảng phân cảnh nên nó tạo thuận lợi cho làm việc nhóm đối với quản lý ***Code***. 

3. Nhược Điểm: 
    - Đi kèm với phiên bản hổ trợ là ***iOS13*** trở lên nên nó sẽ không hỗ trợ được cho các phiên bản ***iOS*** thấp hơn, điều này thì nếu xem các bảng thông kê sử dụng của ***Apple*** thì hiện tại bắt đầu làm quen củng không phải quá sớm, vì hiện nay lượng người sử dụng ***iOS 13*** trở lên chiếm trên 80% vào tháng 6/2020 thì hiện tại không còn phải lo ngại về vấn đề này. 
    - Cùng với sự mới mẻ của ***SwiftUI*** thì chắc chắn nó chưa được nhiều sự trợ giúp từ các trang nổi tiếng như ***StackOverFlow*** về các vấn đề phức tạp. Hay là một số vấn đề mà ***Framework*** này chưa hổ trợ. Hoặc bạn có thể tự giải quyết vấn đề của mình và chia sẽ lên để góp phần xây dựng cộng đồng ***SwiftUI*** ngày một lớn mạnh.
    - không cho phép xem kiểm tra phân cấp chế độ xem trong bản xem trước.
    
## III. Đến với ví dụ một UI của 1 dự án dùng 2 ***Framework*** ***SwiftUI*** và ***UIKit***:
1. ***UIKit***: 
    - Đầu tiên là tạo giao diện ***InterfaceBuilder***:
    ![](https://i.ibb.co/K7wLX9C/Screen-Shot-2021-02-05-at-16-43-36.png)
    - Tiếp theo là liên kết với ***Swift File*** như sau:
    ![](https://i.ibb.co/p305kB1/Screen-Shot-2021-02-05-at-16-51-09.png)
    ![](https://i.ibb.co/0tXMr1N/Screen-Shot-2021-02-05-at-16-51-24.png)
    - Kéo ***@IBOutlet*** cho ***View***, liên kết ***.xib file*** với ***Class*** ,.....
    - Sau mỗi lần chỉnh sửa giao diện ta đều phải khởi chạy để nhìn xem đã đúng mong muốn chưa.
    - Nhìn qua để tạo một giao diện cho ***UIKit*** chúng ta phải trải qua nhiều công đoạn rối rắm nhỉ?
2. ***SwiftUI***:
    - Bắt đầu với một màn hình như sau:
    ![](https://i.ibb.co/0rthy8v/Screenshot-2021-02-05-at-17-16-02.png)
    - Sau đó chúng ta ***Code*** điều chỉnh giao diện bên trong body và kết quả của giao diện được cập nhật trực tiếp ở ***Preview*** bên cạnh. 
    - Không có gì phải rườm rà khi điều chỉnh chỉ cần tiếp tục ***Code***, và cập nhật không phải lo lắng vấn đề quên kéo ***IBOutlet*** hay ***AutoLayout***.

## IV. Tổng Kết.
- Bài viết này giới thiệu về ***SwiftUI***.
- Là một ***Framework*** mới, thời gian tới sẽ là sự khởi đầu cho ***Framework*** này, với thống kê của ***Apple*** thì ***iOS13*** chiếm trên 80% vào tháng 6/2020 thì hiện tại không còn phải lo ngại về vấn đề này.
- Cộng động ***iOS*** ngày càng chia sẽ nhiều bài viết và đang dần có nhiều hơn các sự trợ giúp về các vấn đề khó hoặc ***SwiftUI*** chưa hỗ trợ. 
- Hẹn gặp lại ở các bài viết sau, chúng ta cùng tìm hiểu thêm và sử dụng nó nhé!

[[author | Tri Đặng ]]



