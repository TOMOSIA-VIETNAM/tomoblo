---
title: "Use LocalStorage, SessionStorage and Cookie"
date: "2021-03-21"
published: true
tags:
- javascript
---
[[snippet]]
| LocalStorage, SessionStorage và cookie là ba cách lưu trữ dữ liệu khác nhau trong trình duyệt.

## 1. localStorage
- Bạn có thể lưu trữ giá trị các biến vào localStorage của trình duyệt, biến đã lưu vào đây thì không bị quá hạn. Biến sẽ tồn tại cho đến khi bạn xóa nó bằng JavaScript hoặc xóa cache của trình duyệt.
- localStorage cho phép bạn lưu thông tin tương đối lớn, lên đến 10MB.
- Các biến trong localStorage không được trình duyệt gửi lên server như cookie.

#### Cách xem các biến localStorage

- Để xem localStorage bằng trình duyệt các bạn vào trang web cần xem rồi click chuột phải vào tràn web cần xem sau đó chọn Inspect rồi chọn mục Application khi đó chúng ta sẽ thấy biến phần lưu biến localStorage.
- Bạn sẽ thấy các biến và giá trị của  nó, có thể xóa nếu muốn.

#### Cách lưu giá trị của biến vào localStorage

- Dùng 1 trong 3 cách sau:

```javascript
localStorage.setItem('key', 'value');
localStorage.key = 'value';
localStorage['key'] = 'value';
```

- Trong đó: key là tên biến, value là giá trị của biến.

#### Cách lấy giá trị biến trong localStorage

- Để lấy giá trị localStorage, dùng 1 trong 2 cách:

```javascript
localStorage.getItem('key');
localStorage.key;
```

#### Cách xóa biến trong localStorage

- Để xóa 1 biến trong localStorage, sử dụng removeItem(tên_key):

```javascript
localStorage.removeItem(key);
localStorage.clear(); // xóa tất cả các biến trong localStorage
```

## 2. Session Storage

- SessionStorage là nơi lưu trữ biến trong trình duyệt. Dữ liệu bạn lưu ở đây sẽ tự động bị xóa khi đóng tab. Các biến trong sessionStorage không được gửi lên Server khi request. Thông tin lưu trữ trong sessionStorage lưu nhiều hơn cookie (lớn nhất 5MB)

#### Cách xem các biến sessionStorage

- Tương tự như xem các ở phần localStorage thì ta chọn vào phần sessionStorage.

#### Cách lưu giá trị của biến vào sessionStorage

- Ta có 3 cách sau bạn có thể dùng 1 trong 3 cách sau.

```javascript
sessionStorage.setItem('key', 'value');
sessionStorage.key = 'value';
sessionStorage ['key'] = 'value';
```

#### Cách lấy ra biến trong sessionStorage

- Để lấy giá trị của 1 biến trong sessionStorage, dùng 1 trong 2 cách:

```javascript
sessionStorage.getItem('name');
sessionStorage.key;
```

#### Xóa biến trong sessionStorage

- Để xóa 1 biến trong sessionStorage, sử dụng removeItem(tên_key)

 ```javascript
sessionStorage.removeItem('name');
sessionStorage.clear(); // xóa tất cả các biến trong sessionStorage
 ```

- Dữ liệu được lưu trong localStorage là tách biệt theo domain của website. Do đó, website A không thể truy xuất dữ liệu trong localStorage của website B và ngược lại. Đây là một tính năng bảo mật quan trọng. Ngay cả sub-domain cũng được coi như một domain name riêng.
- Giới hạn của LocalStorage là khác nhau giữa các trình duyệt, thường từ 5MB đến 10MB. Vì LocalStorage chỉ dùng lưu data dưới dạng từng cặp key-value, nên với kích thước bộ nhớ như vậy là quá đủ với một web app thông thường.
- Với sessionStorage, một trang web được mở trong hai tab của cùng một trình duyệt cũng không thể truy xuất dữ liệu lẫn nhau. Khi bạn đóng trang web thì dữ liệu lưu trong sessionStorage hiện tại bị xóa. Còn với localStorage: có thể truy xuất lẫn nhau giữa các cửa sổ trình duyệt, và dữ liệu sẽ được lưu trữ không giới hạn thời gian.

## 3. Cookie

- Cookie là nơi lưu trữ các biến đặc biệt trong trình duyệt, nó có thời điểm quá hạn và nó được http gửi tự động lên server mỗi khi có request từ client. Đây là 2 điểm mà cookie khác với localStorage và sessionStorage.
- Cookie chỉ có thể lưu trữ tối đa 4KB với vài chục biến cookie cho một domain.

#### Tạo biến cookie

```
document.cookie = 'username=teo';
```

- có thể tạo biến đồng thời khai báo thời điểm quá hạn cho cookie

```
document.cookie = 'username=teo; expires=Web, 15 July 2020 8:00:00 UTC';
```

- Hoặc đặt giờ sau bao lâu cookie sẽ hết hạn với max-age (tính bằng giây)

```
document.cookie = 'username=teo; max-age=84000';
```

#### Lấy ra giá trị tất cả các biến cookie

```javascript
var x = document.cookie;
```

- Lệnh document.cookie sẽ trả lại tất cả các biến cookie trong một chuỗi tring kiểu như: cookie1 = giá trị; cookie2 = giá trị; cookie3 = giá trị;

#### Lấy ra giá trị 1 biến cookie

- Bạn cần viết hàm lấy giá trị của 1 cookie như sau:

``` javascript
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
```

- Ví dụ muốn lấy giá trị của cookie tên là abc:

```javascript
var abc = getCookie('abc');
console.log(abc);
```

#### Thay đổi giá trị cookie

- Trong javascript, có thể thay đổi 1 cookie giống như cách tạo ra cookie, tức là ghi đè giá trị mới lên cookie đã có:

```javascript
document.cookie = "username=ty; expires=Thu, 16 Jyly 2020 9:00:00 UTC";
```

#### Xóa 1 biến cookie

- Để xóa một biến cookie chỉ cần gán lại giá trị ngày hết hạn expires về một thời điểm quá khứ

```javascript
document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
```

## Kết luận

- Vì localStorage và sessionStorage được lưu trữ trên trình duyệt của người dùng, nên các bạn cần phải xem xét nội dung lưu trữ có liên quan đến vấn đề bảo mật hay không.
- Và cũng chính vì localStorage và sessionStorage được lưu trữ trên trình duyệt nên việc sử dụng nó sẽ không ảnh hưởng đến hiệu xuất của trang web nhưng nó sẽ làm nặng trình duyệt của người dùng (không đáng kể).
- Về phạm vi: sessionStorage: giới hạn trong một cửa sổ hoăc thẻ của trình duyệt. Một trang web được mở trong hai thẻ của cùng một trình duyệt cũng không thể truy xuất dữ liệu lẫn nhau. Như vậy, khi bạn đóng trang web thì dữ liệu lưu trong sessionStorage hiện tại cũng bị xóa. Còn localStorage: có thể truy xuất lẫn nhau giữa các cửa sổ trình duyệt. Dữ liệu sẽ được lưu trữ không giới hạn thời gian.

<i>Cảm ơn mọi người đã dành thời gian đọc bài viết. Thank you!</i>

[[author | Phan Trung ]]
