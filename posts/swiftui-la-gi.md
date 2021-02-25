---
title: "What is SwiftUI ?"
date: "2021-02-23"
published: true
tags:
- ios
- swift
---

# **SwiftUI** Là Gì ?
[[snippet]]
|    **SwiftUI** là một UI **Framework** mới được phát triển bởi **Apple**. Nó cung cấp một API mới cho phép người dùng có thể viết Code mà nó có thể làm việc được trên tất cả các **Apple** platforms: **iOS, iPadOS, watchOS** và **tvOS**!

## I. Giới Thiệu:
1. Mở Đầu
    - **SwiftUI** là một UI **Framework** mới được phát triển bởi **Apple**. Nó cung cấp một API mới cho phép người dùng có thể viết Code và nó còn có thể làm việc được trên tất cả các **Apple** platforms: **iOS, iPadOS, watchOS** và **tvOS**!
    - Mô hình này được ứng dụng từ trước **iOS 13** và bây giờ đang trở thành một xu hướng mới, nó đem lại sự đơn giản trong quá trình Code và tốc độ xây dựng ứng dụng hơn so với **UIKit**, mặc dù vẫn chưa đủ khả năng thay thế hoàn toàn được **UIKit** , nhưng chưa có gì là chắc chắn cả, giống như **Swift** ra đời cũng chưa thay thế được **Objective - C** chẳng hạn. Nếu so sánh **SwiftUI** với **UIKit** ở thời điểm hiện tại thì đang cách biệt lớn bởi vì vẫn chưa có nhiều những sự trợ giúp từ các trang nổi tiếng như **Stackoverflow, Medium, Hackingswift, ...** về những rắc rối hay những vấn đề phức tạp.
    - Hiện tại **SwiftUI** đang được nhiều người lựa chọn sử dụng mặc dù vẫn đang trong quá trình nâng cấp và bổ xung, bởi vì họ tin vào **SwiftUI** sẽ phát triển mạnh mẽ trong tương lai, và có một điều rằng bạn có thể sử dụng đồng thời cả **UIKit** và **SwiftUI** trong một **project**, vậy nó nói lên rằng nếu bạn đã thông thạo **UIKit** thì có thêm một sự trợ gúp hoàn hảo khi sử dụng **SwiftUI**. Có thể nó sẽ là một **Framework** mạnh mẽ trong tương lai gần, tuy còn nhiều thiếu xót nhưng **Apple** đã và đang ngày một hoàn thiện cho nó. 
2. Yêu cầu để sử dụng:
    - macOS Catalina và XCode 11 Beta trở lên để **SwiftUI** render **Canvas**(**Simulator**).
    - Link: How To Install Catalina + XCode 11 Beta, research và làm theo, sau khi cài đặt xong thì chúng ta có thể bắt đầu vời **SwiftUI**.
3. Bắt đầu với **SwiftUI**:
    - Đầu tiên bắt đầu với khởi tạo một **Project** đơn giản:
![](https://i.ibb.co/874rTgF/Screenshot-2021-02-03-at-15-15-58.png)
    - Giao diện làm việc thật thú vị, không cần khởi chạy mỗi lần cần kiểm tra UI vừa tạo trên **simulator** như **UIKit** , giao diện bên phải tự động cập nhật theo từng dòng Code chúng ta vừa nhập vào, không cần kéo thả những **IBOutlet** hay những lần conflic những **.xib file**, điều này thật khiến ta có trải nghiệm tuyệt vời. 
    - Tiếp theo chúng ta nhìn xem cách nó tạo một **TableView** đơn giản với một Model như sau:
    ```{.sh}
        struct User {
            var id = UUID()
            var name: String
        }
    ```
    - Khởi tạo một Data:
    ```{.sh}
    let users: [User] = [User(name: "hoang"), User(name: "linh"), User(name: "nhung"), User(name: "quang")]
    ```
    - Sau đó tạo một **TableView** bằng List:
    ```{.sh}
    List(users, id:\.id) { user in
            Text(user.name)
    }
    ```
    - Kết quả bên dưới:
![](https://i.ibb.co/tbCGM1W/ezgif-com-gif-maker-4.gif)
    - Điều này so với giao diên làm việc trước đây(**UIKit**) có gì khác biệt không nhỉ, tạo một **IBOutlet** cho **TableView** sau đó phải gọi **RegisterCell** để đăng ký những **Cell** cho **TableView** rồi lại sử dụng **Delegate, Datasoure** Để liên kết Data cho chúng, rồi chúng ta vào **Cell** để tạo những **IBOutlet** cho các **Cell**, tiếp đó phải kéo các liên kết **IBOutlet** từ đó vào **.xib file** của **Cell** và phải đảm bảo được là chúng không thiếu xót hoặc nhầm lẫn, sau đó điều chỉnh **Layout**, ...  Khá là nhiều công đoạn để có thể tạo nên một **TableView** với cách làm trước đây, còn với **SwiftUI** bạn thấy rồi đấy.
    - Còn rất nhiều những tiện ích, lợi ích mà **SwiftUI** có thể mang lại cho chúng ta nữa không chỉ có code ngắn gọn và sạch, bởi vì nó hoàn toàn mới mẻ nên sẽ khiến bạn còn bất ngờ hơn nhiều nếu bạn tìm hiểu thêm về nó.
    
## II. **SwiftUI** Có Gì?
1. Cấu trúc của nó gồm:
    ![](https://i.ibb.co/68BbdVm/Screenshot-2021-02-03-at-16-00-05.png)
    a. Đầu tiên chúng ta phải biết được cách nó hoạt động:
    -   **AppDelegate**:
        -   Ngay cả trong **iOS 13**, **AppDelegate** vẫn là điểm truy cập chính của một ứng dụng. Các phương thức **AppDelegate** này được cho là phải ở đó để xử lý các sự kiện trong vòng đời ứng dụng, tức là phản hồi ứng dụng đang được khởi chạy, chạy nền, nền trước, nhận dữ liệu, v.v.
        -   Ở **AppDelegate**, những điều chúng ta thường viết mã ứng dụng cho **iOS 12** (trở xuống) là:
            -   Thiết lập trình điều khiển xem đầu tiên của ứng dụng (được gọi là trình điều khiển xem gốc), func (_: didFinishLaunchingWithOptions :) là func đầu tiên mà hệ điều hành gọi khi khởi chạy ứng dụng.
            -   Định cấu hình cài đặt ứng dụng và các thành phần khởi động. 
            -   Đăng kí trình xử lý notification.
            -   Trả lời các sự kiện trong vòng đời của ứng dụng, chẳng hạn như ứng dụng chạy **background**, **foreground** hoặc thoát khỏi ứng dụng.
        -   Nhưng bây giờ chúng ta không cần phải quá quan tâm ở **AppDelegate** nữa, bởi vì môi trường hoạt động chính của chúng ta ở **SceneDelegate**.
    -   **SceneDelegate**:
        -   Từ **iOS 13** trở lên, **SceneDelegate** đảm nhận một số vai trò đại biểu của ứng dụng. Quan trọng nhất, khái niệm về **UIWindow**(cửa sổ) được thay thế bằng **UIScene**(bối cảnh). Một ứng dụng có thể có nhiều **Scene** và một **Scene** sẽ đóng vai trò làm nền cho giao diện và nội dung ứng dụng. Vì vậy, **SceneDelegate** chịu trách nhiệm về những gì được hiển thị trên màn hình trong thuật ngữ của giao diện người dùng và dữ liệu.
        -   Người dùng cũng có thể tạo một bản sao của một **Scene**, chạy hiệu quả nhiều phiên bản của một ứng dụng cùng một lúc.
        -   **SceneDelegate** những điều chúng ta cần biết là:
            -   Một dự án **iOS** mới hiện có lớp **SceneDelegate**, được tạo tự động, bao gồm các sự kiện vòng đời quen thuộc như hoạt động, ngắt kết nối, v.v.
            -   Class **AppDelegate** có 2 chức năng mới liên quan đến các phiên **Scene**, được gọi là application(_:configurationForConnecting:options:) và application(_:didDiscardSceneSessions:).
            -   Danh sách thuộc tính **info.plist** nhận bản khai **Scene** application(Application Scene Manifest), liệt kê các **Scene** là một phần của ứng dụng này, bao gồm tên **class**, **delegate** và **Storyboard** của chúng.
            -   Thiết lập trình điều khiển xem đầu tiên của ứng dụng (được gọi là trình điều khiển xem gốc), tương tự **AppDelegate** là (_: didFinishLaunchingWithOptions :) thì ở đây chúng ta có scene(_:willConnectTo:options:), là chức năng đầu tiên mà hệ điều hành gọi khi khởi chạy ứng dụng.
        -   Trong **SceneDelegate** còn có những chức năng sau:
            -   sceneDidDisconnect (_ :) được gọi khi một **Scene** bị ngắt kết nối khỏi ứng dụng (tắt app).
            -   sceneDidBecomeActive (_ :) được gọi khi người dùng bắt đầu tương tác với một **Scene**, tức là lúc quay trở lại App từ một ứng dụng khác hoặc lúc app xuất hiện lần đầu.
            -   sceneWillResignActive (_ :) được gọi khi người dùng ngừng tương tác với một **Scene**, tức là chuyển sang **Scene** khác.
            -   sceneWill EntryForeground (_ :) được gọi khi một **Scene** đi vào **foreground**, tức là bắt đầu hoặc tiếp tục từ trạng thái **foreground**.
            -   sceneDid EntryBackground (_ :) được gọi khi một **Scene** vào **background**, tức là ứng dụng được thu nhỏ nhưng vẫn đang chạy ở **background**.
            
    b.   Bộ phận khác của **SwiftUI**:
    - **Assets.xcassets** đây chính là nơi chứa ảnh của **Project**. 
    - **LaunchScreen.xib** thì chắc hẳn bạn đã biết nó là màn hình chờ khi khởi động App.
    - Trong giao diện **ContenView** ta thấy 2 thành phần gồm **ContenView** và **ContentView_Previews**:
        - **ContenView** chính là nơi ta tạo giao diện bằng Code của mình.
        - **ContentView_Previews** chính là thứ tạo nên sự đồng bộ trực tiếp giữa Code và Design.
        - Tổ hợp phím Sau **CMD+ALT+Enter** để mở và đóng màn hình **Preview** và **CMD+ALT+P** để khởi chạy màn hình **Preview** nếu chúng ta muốn vừa Code vừa xem sự thay đổi UI vừa được thêm vào bằng Code một cách trực tiếp.
        - Bên trong **ContenView** có biến **body: some View** đây chính là **Scene** chính của mỗi **View**, các thành phần bên trong của chúng đều phải tuân theo một **Protocol** chung là **View**, cũng chính là phần khiến ta khó làm quen nhất đối với **SwiftUI**.
            
2. Ưu điểm của **SwiftUI**:
    - Đầu tiên nó đơn giản và dể học và Code của nó khá là gọn gàng dể đọc.
    - Có thể trộn cả **UIKit** vào **SwiftUI** với nhau.
    - Có thể dể dàng quản lý chủ đề cho App, có thể đặt làm mặc định chủ đề cho App.
    - Cung cấp cơ chế hoạt động cho những người đam mê lập mô hình lập trình phản ứng, **BindableObject**, **ObjectBinding**, và **Combine Framework**.
    - Cung cấp khung hình giao diện trực tiếp của **design** cho người dùng viết Code mà không cần phải khởi chạy **Simulator** hoặc **Device** để kiểm tra, xem lại kết quả như trước.
    - Không còn **InterfaceBuilder**, nó được thay thế bởi **Canvas** khi bạn, Code sẽ được thêm tự động nếu bạn kéo vào màn hình **Preview**.
    - Không còn phải gặp các sự cố crash App khi quên kéo **IBOutlet**.
    - Không còn **AutoLayout** và các vấn đề liên quan đến nó, nó được thay thế bằng các bố cục **VStack, ZStack, HStack, Groups, Lists** và những thử khác. Nó Không có **AutoLayout** nên bố cục luôn cần được khởi tạo trước, bởi vì nó không sử dụng **Storyboard** nên nó tạo thuận lợi cho làm việc nhóm đối với quản lý Code. 

3. Nhược Điểm: 
    - Đi kèm với phiên bản hổ trợ là **iOS13** trở lên nên nó sẽ không hỗ trợ được cho các phiên bản **iOS** thấp hơn, điều này thì nếu xem các bảng thông kê sử dụng của **Apple** thì hiện tại bắt đầu làm quen cũng không phải quá sớm, vì hiện nay lượng người sử dụng **iOS 13** trở lên chiếm trên 80% vào tháng 6/2020 thì hiện tại không còn phải lo ngại về vấn đề này. 
    - Cùng với sự mới mẻ của **SwiftUI** thì chắc chắn nó chưa được nhiều sự trợ giúp từ các trang nổi tiếng như **StackOverFlow** về các vấn đề phức tạp. Hay là một số vấn đề mà **Framework** này chưa hổ trợ. Hoặc bạn có thể tự giải quyết vấn đề của mình và chia sẽ lên để góp phần xây dựng cộng đồng **SwiftUI** ngày một lớn mạnh.
    - Không cho phép xem kiểm tra phân cấp **ContentView_Previews**.
    
4. Đến với ví dụ một UI của một dự án dùng **Framework** **SwiftUI** hoặc **UIKit**:

    a. **UIKit**: 
    - Đầu tiên là tạo giao diện **InterfaceBuilder**:
    ![](https://i.ibb.co/K7wLX9C/Screen-Shot-2021-02-05-at-16-43-36.png)
    - Tiếp theo là liên kết với **Swift File** như sau:
    ![](https://i.ibb.co/p305kB1/Screen-Shot-2021-02-05-at-16-51-09.png)
    ![](https://i.ibb.co/0tXMr1N/Screen-Shot-2021-02-05-at-16-51-24.png)
    - Kéo **IBOutlet** cho **View**, liên kết **.xib file** với **Class** ,.....
    - Sau mỗi lần chỉnh sửa giao diện ta đều phải khởi chạy để nhìn xem đã đúng mong muốn chưa.
    - Nhìn qua để tạo một giao diện cho **UIKit** chúng ta phải trải qua nhiều công đoạn nhỉ.
    
    b. **SwiftUI**:
    - Bắt đầu với một màn hình như sau:
    ![](https://i.ibb.co/0rthy8v/Screenshot-2021-02-05-at-17-16-02.png)
    - Sau đó chúng ta viết Code điều chỉnh giao diện bên trong body và kết quả của giao diện được cập nhật trực tiếp ở **Preview** bên cạnh, mà không không phải lo lắng vấn đề quên kéo **IBOutlet** hay **AutoLayout**, chỉ cần viết Code và cân chỉnh vị trí cho các **Scene**.
    - So với cách làm trước đây **UIKit** thì thực là một bước ngoặc lớn về sự đơn giản và tốc độ làm việc.

## III. Tổng Kết.
- Bài viết này giới thiệu về **SwiftUI**.
- Là một **Framework** mới, thời gian tới sẽ là sự khởi đầu cho **Framework** này, với thống kê của **Apple** thì **iOS13** chiếm trên 80% vào tháng 6/2020 thì hiện tại không còn phải lo ngại về vấn đề này.
- Cộng động **iOS** ngày càng chia sẽ nhiều bài viết và đang dần có nhiều hơn các sự trợ giúp về các vấn đề khó hoặc **SwiftUI** chưa hỗ trợ. 
- Hẹn gặp lại ở các bài viết sau, chúng ta cùng tìm hiểu thêm và sử dụng nó nhé!

[[author | Tri Đặng ]]



