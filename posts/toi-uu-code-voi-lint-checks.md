---
title: "Optimize source code with Lint Check Tools in android"
date: "2020-09-27"
published: true
tags:
  - android
---

# 1.Giới thiệu
Chào cả nhà, dạo gần đây mình có được join vào team backend của công ty, mình vô tình tìm hiểu thêm về auto deploy và check style code , conventions code giúp mình check cú pháp code theo đúng chuẩn quốc tế và tối ưu hiệu suất cho source code, trợ giúp rất nhiều đến việc maintain, refactor hay thêm feature. Mình chợt nghĩ backend có tools xịn sò như vậy, liệu bên mobile có tools nào có khả năng tương tự không ???. 

Câu trả lời là có, sau một hồi tìm tòi thì cuối cùng mình cũng tìm được công cụ có thể trợ giúp điều đó. Đó chính là Android Lint. Vì chưa có dịp để tìm hiểu bên IOS nên ở bài viết này mình sẽ chỉ nói về công cụ Android Lint của Android.

# 1. Android Lint là gì?
Như mình đã nói ở trên, Lint là 1 công cụ mà google cung cấp cho các developers dùng để phân tích source code , bắt các issue sai, khó bảo trì , không tối ưu , cú pháp sai chuẩn gây khó maintain. Lint giúp chúng ta xác định và khắc phục lỗi sai đó để tăng chất lượng code mà không phải build lại ứng dụng. 

Lint tools có thể tìm kiếm được những vấn đề có thể gây ảnh hưởng đến cú pháp , tối ưu code, bảo mật cho code, trải nghiệm của ứng dụng. Mỗi issue được tìm thấy sẽ được thông báo bằng ghi chú, câu lệnh bị lỗi và mức độ nghiêm trọng của issue để developers có thể ưu tiên khắc phục những issue quan trọng. Ngoài ra, mình có thể tăng hoặc giảm mức độ nghiêm trọng của issue, thêm hoặc bớt các issue mà tools đưa ra để phù hợp hơn với dự án mình đang làm.

# 2. Cách hoạt động của Lint Tools ?

![Compare](https://developer.android.com/studio/images/write/lint.png)

Nhìn vào hình ảnh có thể bạn cũng hiểu được phần nào cách hoạt động của Lint tools. Trong sơ đồ này, chúng ta có 3 thành phần chính đó là AppSource Files, lint.xml và lint Tool.

### 2.1 AppSource Files
Đây là chính là source code của chúng ta muốn dùng lint Tools để kiểm tra, Lint tool có thể kiểm tra toàn bộ các extensions file trong source mà android studio tạo ra  ví dụ như file proguard, java, kotlin, icon, xml,......

### 2.2 lint.xml
Đây là thành phần quan trọng để check các issue trong source code. Trong file lint.xml , chứa tất tần tật cấu hình các issue của lint tools. Nó được viết dưới dạng thẻ xml. và bạn hòan toàn có thể chỉnh sửa file này để cấu hình các issue phù hợp với dự án đang làm. Ví dụ:
```
<?xml version="1.0" encoding="UTF-8"?>
<lint>
    <!-- Disable the given check in this project -->
    <issue id="IconMissingDensityFolder" severity="ignore" />

    <!-- Ignore the ObsoleteLayoutParam issue in the specified files -->
    <issue id="ObsoleteLayoutParam">
        <ignore path="res/layout/activation.xml" />
        <ignore path="res/layout-xlarge/activation.xml" />
    </issue>

    <!-- Ignore the UselessLeaf issue in the specified file -->
    <issue id="UselessLeaf">
        <ignore path="res/layout/main.xml" />
    </issue>

    <!-- Change the severity of hardcoded strings to "error" -->
    <issue id="HardcodedText" severity="error" />
</lint>
```
### 2.3 Lint tool
Đây là công cụ chính để thực hiện việc kiểm tra source code của bạn. Lint tools quét tất cả source code của bạn. Bạn có thể sử dụng lint tools bằng command line hoặc tool được tích hợp sẵn lên Android Studio. Nó sẽ check cấu trúc code để đưa ra những gợi ý cú pháp có thể lỗi để bạn có thể sửa nó và tối ưu ứng dụng của bạn. Đây là một công cụ mạnh mẽ để kiểm tra và nhận biết các lỗi sai trước khi đưa ứng dụng của bạn đến người dùng cuối.

### 2.4 Kết quả của lint checks
Lint Tools có thể check source code và nhận diện được các vấn đề về convention, tính đúng đắn của cú pháp, tính bảo mật, khả năng tối ưu, tính đa ngôn ngữ trong i18n, khả năng truy cập,...
Chúng ta có thể xem kết quả việc check trên console hay có thể là cửa sổ trên công cụ Android Studio.

### 2.5 Cơ chế

khi chúng ta yêu cầu check source code, thì lint tool sẽ so sánh các cú pháp trong source code của chúng ta với các issue có trong file lint.xml, sau đó đưa ra kết quả kiểm tra (lint output).

# 3. Sử dụng Lint tools như thế nào ?

## 3.1 Sử dụng command line
Nếu bạn sử dụng Gradle hay IDE Android Studio bạn chỉ cần chạy lệnh sau
- Trên hệ điều hành Windows:
```
gradlew lint
```
- Trên hệ điều hành Linux hoặc MacOS:
```
./gradlew lint
```
Đây sẽ là output:
```
> Task :app:lint
Ran lint on variant release: 5 issues found
Ran lint on variant debug: 5 issues found
Wrote HTML report to file:<path-to-project>/app/build/reports/lint-results.html
Wrote XML report to file:<path-to-project>/app/build/reports/lint-results.xml
```
Sau khi chạy lệnh lint tool sẽ báo cáo cho chúng ta số các issue và đường dẫn đến file HTML và XML chứa nội dung kết quả kiểm tra của lint tool.
![Compare](https://developer.android.com/studio/images/write/html_lint_report.png)
Chú ý rằng bạn cần cài biến môi trường JAVA_HOME cho androidsdk.
Trường hợp source code của bạn có chia ra các môi trường variant, bạn có thể chạy lint với môi trường được chỉ định
```
gradlew lintDebug
```
Ngoài ra, nếu bạn không dùng Android studio hay Gradle thì bạn có thể sử dụng lint tools độc lập, bạn cài đặt Android SDK Tools từ SDK Manager. Sau đó tìm lint tools trong thư mục android_sdk/tools/. rồi chạy lệnh với cú pháp như sau:
```
lint [flags] <project directory>
```
Để có thể thấy các flag và các tham số của lệnh bạn chạy lệnh:
```
lint --help
```
## 3.2 Sử dụng Android studio để chạy lint tools
Android Studio đã hỗ trợ rất đầy đủ cho tính năng lint tools. Để chạy lint, bạn mở android studio và project bạn cần checks, Nhấn vào Analyse -> Inspect Code, Android studio sẽ hiển thị ra cửa sổ để setting phạm vi check , cuối cùng nhấn Ok và chờ Android Studio xử lý mọi thứ cho chúng ta. Thật tiện lợi phải không nào!
![Compare](https://developer.android.com/studio/images/write/chooseinspectionscope_2x.png)- Sau khi Android Studio hoàn thành việc checks, Nó sẽ trả kết quả cho chúng ta ở cửa sổ inspect Code, cửa sổ bên trái sẽ là tất cả issue mà lint tìm được bên phải là mô tả , mức độ ưu tiên và vị trí của đoạn code gặp vấn đề.
![Compare](https://developer.android.com/studio/images/write/inspectandfix_2x.png)
## 3.3 Chỉnh sửa issue của lint tools theo project
Như mình đã chia sẻ ở trên , ngoài những issue mặc định của lint tools, bạn hoàn toàn có thể chỉnh sửa các issue, thêm, bớt để phù hợp với dự án hiện tại. file lint.xml được lưu vào trong  thư mục gốc của project.
Chúng ta có các thẻ `<lint>` `<issue>` `<ignore>` 
Để tắt checking bởi lint tools cho một methof trong kotlin , java ta dung annotations `@SuppressLint`. Tắt đối với file xml `xmlns:tools="http://schemas.android.com/tools"` và sử dụng `tools:ignore`
Cấu hình cho Gradle, ta dùng `lintOptions {}`
## 3.4 Tạo 1 warning baseline
Bạn có thể tạo 1 trạng thái cảnh báo cho project hiện tại, và bạn có thể dùng nó trong các lần tiếp theo. Những lần tiếp theo tools sẽ chỉ chạy những issue mới đã được báo cáo. Nó giúp chúng ta giải quyết các vấn đề trong tương lai mà không phải quay lại với những vấn đề đã có từ trước.
```
android { 
	lintOptions { baseline file("lint-baseline.xml")  }  
}
```
# Kết luận
Có thể thấy, Lint tools là 1 công cụ hữu ích giúp chúng ta trong việc tăng chất lượng sản phẩm , hạn chế tối đa những vấn đề xảy ra không đáng có, tăng khả năng maintain cho source code. Mặc dù vậy, Lint tools vẫn còn khá nhiều android developers lãng quên đi tầm quan trọng của nó, điển hình là mình (Nhưng mà bây giờ thì biết rồi !). Vậy mình hy vọng qua bài chia sẻ này có thể giúp bạn hiểu thêm được 1 tools mới và có thể áp dụng vào những dự án mình đang làm. Happy Coding!

by Phạm Thanh Tùng - Tomosia Việt Nam

