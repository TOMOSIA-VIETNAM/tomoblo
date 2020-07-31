---
title: "Gitflow trong thực tế"
date: "2020-07-16"
published: true
tags:
  - git
---

Tiếp tục chuỗi bài về git, thì ta sẽ nói về gitflow. Ta hiểu đơn giản gitflow là các quy tắc sử dụng và phối hợp git theo nhóm.
Trong tất cả các dự án thì việc xác định gitflow của dự án đó là điều bắt buộc.

## Tiền đề
* Dựa trên mô hình của GitHub Flow. Về mô hình GitHub Flow, có thể xem bản hướng dẫn gốc của GitHub [ở đây](https://guides.github.com/introduction/flow/).
* Dựa vào yêu cầu của mỗi dự án, skill của các members trong dự án mà mô hình này có thể được sửa lại cho phù hợp với từng dự án.
    * Ví dụ các dự án quá cũ, có cách vận hành gitflow khác thì không cần phải chuyển qua mô hình này.
* Không có 1 mô hình tuyệt đối chính xác hay đúng đắn. Tất cả chỉ là tương đối.

## Dự án trong giai đoạn develop

### Vai trò của các branch

* `master`
    * Luôn ở trạng thái có thể deploy.
    * Không bị fail auto test (nếu dự án có yêu cầu dùng auto test)
        * nếu có vấn đề gì thì phải ưu tiên fix đầu tiên
    * Không được commit/push trực tiếp vào branch này. Branch `master` phải được bảo vệ bằng chức năng protected branchs của GitHub.
* `feature-XXX`
    * tách ra từ branch `master`
    * `XXX`là id của backlog ( hoặc redmine, github issue, ... tuỳ theo dự án)
    * Dù chỉ có 1 commit cũng phải tạo pull request. Các pull request khi tạo phải có tiền tố `[WIP]` ở trước. Sau khi được hoàn thiện và sẵn sàng review thì bỏ tiền tố này đi. Các pull request phải hướng về `master`.
* `feature-XXX-YYY`
    * Được tách ra từ branch `feature-XXX`
    * `YYY` là tên người làm.
    * Chỉ dùng trong trường hợp có nhiều hơn 1 người cùng dev 1 chức năng.
    * Dù chỉ có 1 commit cũng phải tạo pull request. Các pull request khi tạo phải có tiền tố `[WIP]` ở trước. Sau khi được được hoàn thành và sẵn sàng review thì bỏ tiền tố này đi. Các pull request phải hướng về `feature-XXX`.

![github-flow](/GitHubFlow.png?width=400px)

### Review
* Khi tạo 1 branch mới và có commit mới thì bắt buộc phải tạo pull request và thêm prefix `[WIP]`.
* Tất cả các pull request phải được review.
    * Sau khi hoàn thiện xong chức năng và sẵn sàng review thì bỏ `[WIP]`đi và assign lại cho leader.
* Sử dụng các công cụ chatwork/slack để yêu cầu được review.
* Sau khi review xong thì leader merge vào và xoá branch đó đi.
    * Nếu có yêu cầu phải sửa thì comment vào và assign ngược lại cho member.
    * Leader sau khi review xong cần phải comment lại để cho members được biết. Ví dụ như LGTM, :+1:, ...

### Deploy

* Nếu có thay đổi trong master thì tự động deploy.
    * Quản lý bằng Jenkins / CircleCI
    * Bên web/server : sử dụng các tools deploy tự động như capistrano để tiết kiệm thời gian và giảm rủi ro.
    * Về app thì sử dụng các tools như deploygate, testflight để deploy.

> Có nhiều dự án sử dụng chức năng tự động deploy của CircleCI rất hiệu quả. Cách làm này tiết kiệm thời gian và cải thiện workflow trong team.

## Deploy lên production
* Sử dụng branch `release` chuyên để deploy lên production.
* Khi deploy lên prd, tạo pull request từ branch `master` vào branch `release`. Branch `release` phải được bảo vệ bằng chức năng protected branchs của GitHub.
* Xác nhận sự thay đổi, nếu không có vấn đề gì thì merge vào `release`.
* Sau khi merge xong thì deploy lên server prd. Khuyến khích dùng deploy tự động.

![release-branch.png](/release-branch.png)

## Fix lỗi khẩn cấp

Các lỗi khẩn cấp này không muốn gặp nhưng đôi lúc vẫn xuất hiện. Lý do vì môi trường production thường khác môi trường staging. Prd thường có ELB, S3, biến môi trường khác biệt, ...

Các lỗi này cần phải fix ngay lập tức, thường thì không có thời gian để trải qua đủ các quy trình deploy.

* hotfix-XXX
    * Tách ra từ branch `release`
    * `XXX`là ID của backlog hoặc redmine, ...
    * Sau khi làm xong thì gửi pull request vào `release`, merge và deploy lên.
    * Gửi pull request vào `master` và merge.

![hotfix-branch.png](/hotfix-branch.png)

## Mô hình git cho phase 2nd

Phần này mình sẽ giải thích về mô hình git của dự án sau khi đã release phase 1st.
Mỗi dự án thường chia thành nhiều phase. Mỗi phase có những tính năng độc lập với nhau.
Vì sự độc lập này mà mô hình git cũng có ít nhiều thay đổi cho phù hợp.


### Vai trò của các branch

* `master`
    * Là version mới nhất cho phase 2nd
    * Ngoài ra tất cả đều giống như phần trên.
* `release`
    * Tại thời điểm kết thúc phase 1st thì được tạo branch `release` từ branch `master`
        * Sau khi kết thúc phase 2nd thì merge vào `master`
* `feature-XXX` (branch thực hiện các chức năng của phase 2nd）
    * Tách ra từ branch `master`
    * Ngoài ra tất cả đều giống như phần trên.
* `bug-fix-XXX` (branch fix bugs cho phase 1st）
    * Tách ra từ branch `release`
    * `XXX`là ID của backlog, redmine, ...

![2nd-develop.png](/2nd-develop.png)
