---
title: "How to install Apollo iOS library for Graph API"
date: "2020-09-04"
published: true
tags:
  - ios
---

# I.Giới thiệu về GraphQL API
## 1. GraphQL là gì?
GraphQL là Graph Query Language do Facebook tạo ra từ năm 2012 cung cấp giao thức chung cho phép giao tiếp giữa client và server để cập nhật và lấy dữ liệu.

Client truy vấn đến máy chủ GraphQL bằng các truy vấn với đặc điểm: format của dữ liệu trả về được mô tả trong câu truy vấn và được định nghĩa ở phía client thay vì ở server. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client mà chỉ cần dùng duy nhất 1 endpoint.
![](https://viblo.asia/uploads/7e2761e2-b970-4768-a20e-63e0007cb84c.png)

## 2. Tổng quan GraphQL
Điều quan trọng là GraphQL không phải là một ngôn ngữ truy vấn thực sự, nó chỉ là giao thức giao tiếp giữa client và server, rất cả client (web, mobile) đều có thể giao tiếp với bất kỳ server nào mà sử dụng ngôn ngữ GraphQL.

Khái niệm chính về GraphQL bao gồm:
* Cấu trúc phân tầng (Hierarchical)
* Hướng sản phẩm (Product0-centric)
* Định kiểu mạnh (Strong-typing)
* Truy vấn hướng client (Client-specified queries)
* Nội quan (Introspective)

## 3.GraphQL giải quyết vấn đề gì ?
GraphQL khắc phục điểm yếu của của REST API bởi REST có tính chất dựa trên tài nguyên cố định, ví dụ:

```GET /articles/1?include=author.name,author.email,likes.user.name```
Như truy vấn trên thuộc loại liên kết nhiều bảng, REST API cho articles sẽ xử lý khá nhiều và không được linh động. Đối với GraphQL thì sẽ như sau:
```
{
  articles(id:1) {
    title,
    content,
    author {
      name,
      email
    },
    likes {
      user {
        name
      }
    } 
  }
}
{
  articles(id:1) {
    title,
    content,
    author {
      name,
      email
    },
    likes {
      user {
        name
      }
    } 
  }
}
```
Với GraphQL, chúng ta quy định chỉ trả về title và content cho article, rất linh động và không bị thừa dữ liệu, hơn nữa cấu trúc trên nhìn khá rõ ràng mạch lạc.

Cũng giống như REST, GraphQL hoàn toàn có thể create, update, delete, nhưng với cấu trúc sáng sủa và cấu trúc phân tầng nên dễ dàng cho lập trình viên phía client.

# II. Cài đặt thư viện Apollo để sử dụng cho GraphQL
Trong mỗi API theo kiểu GraphQL sẽ luôn có 1 file `schema`. Đây là file dùng để server đinh nghĩa ra các câu query, mutation và type.
## 1.Giới thiệu về Apollo
Apollo IOS là một thư viện hỗ trợ mạnh và tốt cho việc giao tiếp với GraphQL. Được viết bởi ngôn ngữ Swift

Nó cho phép bạn thực hiện truy vấn và thay đổi dữ liệu đối với máy chủ GraphQL và trả về kết quả theo kiểu Swift cụ thể. Điều này có nghĩa là bạn không phải đối phó với việc phân tích cú pháp JSON, hoặc truyền đi các tham số và khiến các bạn chuyển đổi kiểu dữ liệu bằng tay. Bạn cũng không phải tự viết các kiểu mô hình, bởi vì chúng được tạo ra từ các định nghĩa GraphQL mà UI của bạn sử dụng.

Vì các model được tao ra với những kiểu cơ bản, bạn chỉ có thể truy cập dữ liệu mà chúng ta chỉ định muốn lấy về. Nếu bạn không yêu cầu một trường, bạn sẽ không thể truy cập vào thuộc tính tương ứng. Trong thực tế, điều này có nghĩa là bạn có thể dựa vào trình kiểm tra kiểu Swift để đảm bảo lỗi trong quá trình truy cập dữ liệu xuất hiện tại thời điểm biên dịch. Với tích hợp Xcode của Apollo, bạn có thể làm việc thuận tiện với mã UI và các định nghĩa GraphQL tương ứng bên cạnh và thậm chí nó sẽ xác thực các tài liệu truy vấn của bạn và hiển thị lỗi trong dòng.

## 2. Cài đặt Apollo
Làm theo cùng với các bước được mô tả chi tiết bên dưới để sử dụng Apollo iOS trong ứng dụng của bạn:

* Cài đặt  `Apollo` framework vào dự án của bạn và liên kết nó với project.
* Cài đặt `apollo-codegen` trên máy thông qua NPM.
* Thêm mã vào Build Phases để sinh các model và các câu query từ file`schema`.
* Thêm file `schema` vào project.
* Chạy thử.
* Thêm tệp API được tạo ra sau khi chạy thử vào project.
* Cài đặt thêm add-on để là highlight mã trong file `.graphql`.
* Tạo các file có định extension `.graphql` với các truy vấn hoặc thay đổi.

### Cài đặt Apollo framework
Chúng ta có thể cài đặt `Apollo` framework bằng những cách sau: Carthage, CocoaPods hoặc kéo thả thư viện vào project bằng tay.

#### Carthage
1. Thêm github "apollostack / apollo-ios" vào Cartfile.
2. Chạy bản cập nhật carthage.
3. Kéo và thả `Apollo.framework` từ thư mục `Carthage/Build/iOS` đến phần “Linked Frameworks and Libraries” trong tab "General".
4. Chuyển qua tab "Build Phases", nhấp vào biểu tượng "+" và chọn "New Run Script Phase". Tạo một script chạy trong đó bạn chỉ định Shell : bin / sh thêm đoạn code bên dưới vào khung script:
```
/ Usr/local/bin/carthage copy-frameworks
```
Và thêm đường dẫn của thư viện Apollo vào "Input Files" ở bên dưới, ví dụ:
```
$ (SRCROOT) /Carthage/Build/iOS/Apollo.framework
```

#### Cocopods
1. Bởi vì Apollo iOS được viết bới Swift 3.1. Cho nên nó yêu cầu CocoaPods phiên bản 1.1.0. Bạn có thể nó nếu muốn sử dụng:
```
gem install cocoapods
```
2. Thêm `pod "Apollo"` và Podfile.
3. Chạy `pod install`
4. Sử dụng `.xcworkspace` được tạo ra bởi CocoaPods để làm việc.

#### Kéo thả thư viện
Bạn hãy  download reposity của [apollo-iOS](https://github.com/apollographql/apollo-ios), và kéo `Apollo.xcodeproj` và thả vào trong project hoặc workspace, thêm Apollo.framework vào target

### Cài đặt apollo-codegen
 Cài đặt `apollo-codegen` thông npm bằng câu lệnh bên dưới:
 ``` 
 npm install -g apollo-codegen
 ```
 
 ### Cài đặt script để sinh ra mã API
 
Thêm bước tạo mã ở` buid phases`

Để gọi `apollo-codegen` hoạt động trong  Xcode, tạo một bước script chạy trước "Compile Sources".

Trên tab cài đặt "Build Phases", nhấp vào biểu tượng "+" và chọn "New Run Script Phase". Tạo một Run Script, đổi tên thành "Generate Apollo GraphQL API" và kéo nó ngay phía trên "Compile Sources". Sau đó, thêm các nội dung bên dưới vào khung scrip  :
```
APOLLO_FRAMEWORK_PATH="$(eval find $FRAMEWORK_SEARCH_PATHS -name "Apollo.framework" -maxdepth 1)"

if [ -z "$APOLLO_FRAMEWORK_PATH" ]; then
  echo "error: Couldn't find Apollo.framework in FRAMEWORK_SEARCH_PATHS; make sure to add the framework to your project."
  exit 1
fi

cd "${SRCROOT}/${TARGET_NAME}"
$APOLLO_FRAMEWORK_PATH/check-and-run-apollo-codegen.sh generate $(find . -name '*.graphql') --schema schema.json --output API.swift
```

Tập lệnh trên sẽ gọi apollo-codegen thông qua script wrapper check-and-run-apollo-codegen.sh, mà thực sự chứa trong gói `Apollo.framework`. Lý do chính của việc này là để kiểm tra xem phiên bản apollo-codegen đã được cài đặt trên hệ thống của bạn có tương thích với phiên bản khung được cài đặt trong dự án của bạn và để cảnh báo bạn nếu không. Nếu không có kiểm tra này, bạn có thể sẽ chỉ tạo ra mã không tương thích với mã chạy có trong framework.

### Tải về file schema
Apollo IOS bắt buộc người developer phải thêm vào 1 file schema của GraphQL. File schema là một file JSON có chứa các thông tin về cú pháp truy vấn của GraphQL. Thông thường tập tin này được gọi là schema.json, và bạn lưu trữ nó bên cạnh tệp .graphql trong dự án.

Bạn có thể sử dụng `apollo-codegen` để tải xuống GraphQL schema bằng cách gửi truy vấn phân tích đến máy chủ:
```
apollo-codegen download-schema http://localhost:8080/graphql --output schema.json
```

Nếu cần thiết bạn có thể sử dụng  header trong HTTP header cho request. Nhiều GraphQL API yêu cầu cần phải có token chứng thực mới có thể lấy về, lúc này chỉ cần thêm `--header "Authorization: Bearer <token>"` :
```
apollo-codegen download-schema https://api.github.com/graphql --output schema.json --header "Authorization: Bearer <token>"
```

### Chạy thử
Tại thời điểm này thì chúng ta có thể build project. Việc này giúp chúng ta xác định `apollo-codegen` có thể tìm thấy file ` schema.json` trong dự án. Nếu không thì sẽ xuất hiện lỗi như thế này:
```
Cannot find GraphQL schema file […]
```

### Thêm tệp API được tạo ra
Sau bước trên nếu chúng ta build thành công thì lúc này thư viện Apollo iOS sẽ sinh ra 1 file có tên là `API.swift`. Lúc này ta cần thêm nó vào dự án.

### Cài đặt Add-on cho Xcode
1. Tải [repository](https://github.com/apollographql/xcode-graphql) `xcode-apollo` xuống.
2. Đóng toàn bộ màn hình Xcode nếu đang được mở.
3. Tiếp theo cần tạo 1 thư mục bên trong đường dẫn `~/Library/Developer/Xcode`:
```
mkdir ~/Library/Developer/Xcode/Plug-ins ~/Library/Developer/Xcode/Specifications
```
4. Copy file `GraphQL.ideplugin` vào trong `~/Library/Developer/Xcode/Plug-ins`:
```
cp -R GraphQL.ideplugin ~/Library/Developer/Xcode/Plug-ins
```
5. Copy file `GraphQL.xclangspec` vào trong `~/Library/Developer/Xcode/Specifications`:
```
cp -R GraphQL.xclangspec ~/Library/Developer/Xcode/Specifications
```
*Có thể sẽ xuất hiện vài cảnh báo sau khi cài đặt add-on vào Xcode.

### Tạo file `.graphql`
Apollo iOS sẽ tự tạo các câu truy vấn và thay đổi từ file `.graphql` trong dự án .

Lúc này ta cần 1 quy ước cho việc đặt tên dễ quản lý các việc truy vấn, thay đổi bằng cách tạo file ` <name>.graphql` bên cạnh file `<name>.swift`.

Nếu lúc này, chúng ta cài đặt add-on cho Xcode thì có thể sử dụng chế độ xem đồng thời file `.graphql` và `.swift`.

# III. Kết thúc
Mình đã giới thiệu và hướng dẫn các bạn cài đặt thư viện Apollo cho việc quản lý và giao tiếp với GrapQL API. Sau thời gian sử dụng, mình thấy thư viện này còn nhiều hạn chế về việc quản lý các task, khó cho việc mapper đối với model do chúng ta định nghĩa, khó get được status code khi hoàn thành xong request, và còn nhiều hạn chế khác. Mình nghĩ chắc thư viện này còn mới nên vẫn còn nhiều hạn chế như vậy.Mong tương lại, thư viện Apollo sẽ hỗ trợ chúng ta nhiều hơn. Cảm ơn các bạn đã theo dõi bài viết
