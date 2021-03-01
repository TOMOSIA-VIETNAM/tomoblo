---
title: "Automation Test for iOS, part 1"
date: "2021-03-01"
published: true
tags:
  - ios
---

Đối với công việc lâp trình phần mềm thì Unit Test và UI Test là những việc vô cùng quan trọng trong việc bảo đảm 1 phần mềm đạt chất lượng tốt. Bài viết này, mình chỉ tập trung chủ yếu vào UI Test. Với lập trình viện iOS thì việc viết UI Test đã có sự support từ Apple với XCTest framework.
Nhưng sau khi làm thử với XCTest framework thì thấy nó khó cho việc viết UITest cho chúng ta. Nên mình đã tìm hiểu được 1 framework cho việc viết UITest là  [**KIF framewok**](https://github.com/kif-framework/KIF)
# 1.Cài đặt KIF
Điều đầu tiên, để sử dụng được KIF thì chúng ta cần tạo target cho việc test của chúng ta. Ở đây, KIF không sử dụng **iOS UI Testing Bundle** mà sử dụng **iOS Unit Testing Bundle**.Nên trong trường hợp bạn nào đã có unit test ở trong project thì cần chọn 1 trong 2 target để chạy test.

Chọn dự án của bạn trong Xcode và nhấp vào "Add Target" ở góc dưới bên trái của trình soạn thảo. Chọn iOS -> Test -> iOS Unit Testing Bundle. Hãy cung cấp cho nó một tên như "Acceptance Tests", "UI Tests", hoặc cái gì đó cho thấy ý định của quá trình test của bạn.

Acceptance Test Target của bạn được tạo và sẽ có thêm 1 file đi cùng với nó, ex: "Acceptance_Tests.swift" khớp với tên target. Hãy xoá nó đi.

## 1.Cài đặt với Pod
Khi Test Target của bạn đã được thiết lập, thêm đoạn mã dưới đây vào Podfile của bạn. Sử dụng đúng target cần cài đặt KIF
```
target 'Your Apps' do
  ...
end

target 'Acceptance Tests' do
  pod 'KIF', :configurations => ['Debug']
end
```
Sau khi chạy `pod install `  thì công việc tiếp theo là làm theo **Cấu hình Test Target** ở bên dưới để cấu hình thích hợp cho nó

## 2. Cài với static library
Để cài đặt KIF, bạn cần liên kết static library libKIF trực tiếp vào ứng dụng của bạn. Tải xuống nguồn từ  [KIF](https://github.com/kif-framework/KIF) và làm theo hướng dẫn dưới đây. 

Chúng tôi sẽ sử dụng một dự án đơn giản làm ví dụ và bạn có thể tìm thấy nó trong Documentation/Examples/Testable Swift trong reposity của KIF. 
![](/9eca4dad-fa29-4526-a06e-27332230fbf3.png)
### 1. Thêm KIF vào dự án

Bước đầu tiên là thêm dự án KIF vào thư mục con của ./Frameworks/KIF của dự án. Nếu dự án của bạn sử dụng Git để kiểm soát phiên bản, bạn có thể sử dụng submodules để cập nhật trong tương lai dễ dàng hơn:
```
cd /path/to/MyApplicationSource
mkdir Frameworks
git submodule add https://github.com/kif-framework/KIF.git Frameworks/KIF
```
Nếu bạn không sử dụng Git, chỉ cần tải về mã nguồn và sao chép nó vào thư mục ./Frameworks/KIF

### 2. Thêm KIF vào Workspace
Hãy để dự án của bạn biết về KIF bằng cách thêm dự án KIF vào không gian làm việc cùng với dự án chính của bạn. Tìm KIF.xcodeproj trong Finder và kéo nó vào Project Navigator (⌘1).
![](/758ee1d5-4d3e-4c9d-b477-e44c4c51a874.png)

## 3. Cấu hình Test Target
Bây giờ, bạn đã có test target cho việc viết UI Test của bạn. Tiếp theo là thêm các thư viện cần thiết cho dự án, chúng ta chọn trong **Project Navigator** và vào Test Target mà bạn đã tạo ra, chọn tab **"Build Phases"**. Trong phần **"Link Binary With Libraries"**, hãy nhấn nút "+". Trong bảng xuất hiện, chọn "libKIF.a" và nhấp vào **"Add"**. Lặp lại quá trình cho **CoreGraphics.framework** và **QuartzCore.framework**
.
KIF yêu cầu IOKit.framework, nhưng nó không nằm trong các khuôn khổ hệ thống. Để liên kết đến nó, thêm "-framework IOKit" vào **"Other Linker Flags"**.
![](/4221ceba-9604-497b-a1d0-142ffae2dd12.png)

![](/4e69f5f5-626b-4bf7-a5b2-73056022a340.png)

KIF được viết bằng Objective C nên các bạn cần thêm `-ObjC` vào **"Other Linker Flags"** trong Build Settings của Test Target 
![](/f5711a2b-6afb-44a9-a834-d0101ff2fe4c.png)

Ở phần này mình chỉ giới thiệu về việc thêm KIF framework vào dự án của chúng. Ở phần sau mình sẽ demo về KIF framework
