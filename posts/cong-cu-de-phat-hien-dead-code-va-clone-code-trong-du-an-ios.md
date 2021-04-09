---
title: "Tools for detect dead code and duplicate in Xcode project."
date: "2021-03-31"
published: true
tags:
  - iOS
---

[[snippet]]
| Trong 1 dự án không ít thì nhiều cũng tiềm ẩn các đoạn code vô dụng hoặc duplicate. Hôm nay mình sẽ giới thiệu cho mọi người 2 công cụ để loại bỏ chúng, làm cho project sạch đẹp hơn nhé.



**Trước mắt cùng tìm hiểu xem khái niệm của 2 loại code trên là gì**

Dead code: Các đoạn mã không thể được thực thi trong project.
Copy code: Các đoạn mã (gần như) giống hệt nhau được sao chép trong các file. 

### A/ Periphery

<img alt="Periphery logo" class="uu vi t u v iv aj c" width="289" height="60" src="https://miro.medium.com/max/578/1*Jo7KjUPYaBePkf62KI0OQA.png" srcset="https://miro.medium.com/max/552/1*Jo7KjUPYaBePkf62KI0OQA.png 276w, https://miro.medium.com/max/578/1*Jo7KjUPYaBePkf62KI0OQA.png 289w" sizes="289px">

Periphery là một công cụ để xác định dead code. Nó khá thông minh và có thể phát hiện không chỉ các hàm không được sử dụng mà còn cả các cấu trúc, enum và thậm chí là các parameter được khai báo trong các function.

### 1/ Cấu hình
Chạy 2 command dưới đây
```
brew tap peripheryapp/periphery
```
```
brew install periphery
```
<a href="https://gyazo.com/be14bac262ea8bc23fdaa3b85736d72b"><img src="https://i.gyazo.com/be14bac262ea8bc23fdaa3b85736d72b.jpg" alt="Image from Gyazo" width="1663"/></a>

Sau khi cài đặt, chúng ta cần phải cấu hình nó. Periphery đi kèm với một quy trình tương tác cho phép bạn tạo cấu hình thích hợp cho dự án của mình. Chúng ta chỉ cần chạy lệnh sau để khởi tạo quá trình:
```
periphery scan --verbose --setup
```
<a href="https://gyazo.com/a7f6bd759b185d4ecfbc77e069e44460"><img src="https://i.gyazo.com/a7f6bd759b185d4ecfbc77e069e44460.jpg" alt="Image from Gyazo" width="885"/></a>

<a href="https://gyazo.com/7c42d76afb3c792b86ce31e7332befec"><img src="https://i.gyazo.com/7c42d76afb3c792b86ce31e7332befec.png" alt="Image from Gyazo" width="885"/></a>

--verbose :  Periphery sẽ tạo 1 file yaml. Khi các cấu hình đó được log ra trong console, chúng ta có thể sao chép vào file periphery.yaml: và tuỳ biến thêm nếu muốn.

--setup: Chỉ cần thêm cờ này cho lần chạy đầu tiên. Vì cờ này được sử dụng để bắt đầu thực thi configuration. 

### 2/ Sử dụng
Sau lần chạy cấu hình đầu tiên, chúng ta chỉ có thể sử dụng công cụ bằng cách chạy:
```
periphery scan
```

Đây là kết quả:
<a href="https://gyazo.com/ef5f3d8370095667d954ea5421ea89d2"><img src="https://i.gyazo.com/ef5f3d8370095667d954ea5421ea89d2.jpg" alt="Image from Gyazo" width="1363"/></a>

Nhìn chung, việc có một công cụ như vậy là cực kỳ quan trọng để giảm code dư thừa và đảm bảo rằng  không tồn tại một số code không được sử dụng.


### B/ Copy-Paste-Detector (CPD)
<img alt="Logo" class="uu vi t u v iv aj c" width="360" height="264" src="https://miro.medium.com/max/720/1*jELaHRZ6bUher88yYr_Mvw.png" srcset="https://miro.medium.com/max/552/1*jELaHRZ6bUher88yYr_Mvw.png 276w, https://miro.medium.com/max/720/1*jELaHRZ6bUher88yYr_Mvw.png 360w" sizes="360px">

Copy-Paste Detector (CPD) là một công cụ có thể sử dụng để phát hiện code đã được sao chép trong project. 
### 1/ Cấu hình
Công cụ này được viết bằng Java. Do đó, nó yêu cầu một chút công cụ bổ sung
- Tải xuống và cài đặt Java 8 cho Mac. (https://www.java.com/en/download/)
- Tải xuống tool từ GitHub(https://github.com/pmd/pmd/releases)
- Giải nén và chạy lệnh trong Terminal:
open /usr/local
- Sao chép thư mục lib từ folder đã giải nén vào thư mục lib của đường dẫn / usr / local /.
- Sao chép thư mục bin từ folder đã giải nén vào thư mục bin của đường dẫn / usr / local /. Lưu ý: Bạn nên thay đổi tên của tệp run.sh thành một cái gì đó có ý nghĩa hơn.
-  Sau các bước này, chúng ta có thể gõ run.sh (hoặc tên bạn đã chọn ở bước trên) để chạy tool.
### 2/ Sử dụng
Để sử dụng công cụ này, chúng ta cần điều hướng vào thư mục của dự án Swift của chúng ta.

Sau đó, chúng ta chạy lệnh sau:
```
run.sh cpd --minimum-tokens <N> --files . --language swift
```
--minimum-tokens và --files là bắt buộc. 
Về các parameter, các bạn có thể tìm hiểu thêm ở link sau https://pmd.github.io/latest/pmd_userdocs_cpd.html#cli-options-reference

Đây là kết quả:
<a href="https://gyazo.com/b13eb1b44f6d665c3013f26d77c28eb7"><img src="https://i.gyazo.com/b13eb1b44f6d665c3013f26d77c28eb7.jpg" alt="Image from Gyazo" width="1307"/></a>
### C/ Tổng kết
Những công cụ này có thể được chạy 1-2 tháng một lần. Team có thể lên kế hoạch để dọn dẹp lại code, cải thiện khả năng tư duy, duy trì sự "sạch sẽ" trong code và cải thiện chất lượng của dự án.

[[author | Quốc Lê - Tomosia Việt Nam ]]
