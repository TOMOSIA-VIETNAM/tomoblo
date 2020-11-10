---
title: "Stop Using console.log() In JavaScript - Part 1"
date: "2020-11-10"
published: true
tags:
  - Javascript
---

Tiêu đề bài này có thể làm bạn ngạc nhiên bởi vì `console.log()` là một phương thức cơ bản và phổ biến nhất để debug trong JavaScript. Ấy vậy mà mình lại nói "Ngừng sử dụng" nó. Tại sao?
 
Thực ra không hẳn là vậy, nhưng ngoài `log()` ra thì chúng ta có thể dùng nhiều phương thức khác để có thể debug. Và bạn sẽ cảm thấy chúng rất thú vị và mạnh mẽ. Hãy bắt đầu bằng việc liệt kê các phương thức khác: 


 1. Console.log()
 2. Console.error()
 3. Console.warn()
 4. Console.clear()
 5. Console.time()
 6. Console.timeEnd()
 7. Console.table()
 8. Console.group()
 9. Console.count()
 10. Console.debug()
 11. Console.dir()
 12. Console.dirxml()
 13. Console.exception()
 14. Console.groupCollapsed()
 15. Console.groupEnd()
 16. Console.profile()
 17. Console.profileEnd()
 18. Console.timeStamp()
 19. Console.trace()
 20. Console.info()
 
Trong bài này mình sẽ giới thiệu 6 phương thức đầu tiên. Nhưng trước tiên hãy cùng nhắc lại "Console là gì?" 

Javascript console là một tính năng được xây dựng trong các trình duyệt ngày nay, nó đưa ra các công cụ giúp lập trình kiểm tra rõ ràng trên các giao diện. Nó cho phép lập trình viên:

-   Nhìn thấy những lỗi (errors) hay cảnh báo (warnings) xảy ra trên một trang web.
-   Tương tác với trang web sử dụng Javascript commands.
-   Gỡ lỗi (Debug) ứng dụng web ngay trên trình duyệt của mình
-   Kiểm tra và nghiên cứu các hoạt động của network

Đơn giản là nó trao quyền cho người dùng, lập trình viên thao tác với Javascript ngay trên trình duyệt. Giờ thì bắt đầu đi vào chi tiết nào !

## 1. Console.log()

Thao tác này quá quen thuộc rồi, đơn giản là hiển thị giá trị của một hoặc nhiều biến ra console, có thể là text, number, array, object, v.v..

Ví dụ : 

```js
console.log ('JavaScript');  
console.log (7);  
console.log (true);  
console.log (null);  
console.log (undefined);  
console.log ([1, 2, 3]);  
console.log ({a: 1, b: 2, c: 3}); 

```
Kết quả: 

![image-1.png](/image-1.png)

## 2. Console.error()

Phương thức này rất hữu ích trong khi test code. Nó được sử dụng để ghi lỗi vào browser console. Theo mặc định, thông báo lỗi sẽ được tô sáng bằng màu đỏ.

Ví dụ: 

```js
console.error ('Error found');
```

Kết quả: 

![image-2.png](/image-2.png)


## 3. Console.warn()

Cũng giống như `console.error()`, phương thức này cũng dùng khi testing code. Nó cũng giúp ghi các cảnh báo vào console. Mặc định thì các thông báo này có màu vàng 

Ví dụ: 

```js
console.warn('Warning!');
```

Kết quả: 

![image-3.png](/image-3.png)

## 4. Console.clear()

Phương thức này dùng để xóa console. Nó thường được sử dụng nếu console của bạn bị tắc nghẽn với các thông báo hoặc lỗi. 

Ví dụ : 

```js
console.clear()
```

Kết quả: 

![image-4.png](/image-4.png)

Sau khi thực hiện lệnh này, sẽ có thông báo "Console was cleared"

## 5. Console.time () và Console.timeEnd()

Cả hai phương pháp này được sử dụng kết hợp với nhau. Bất cứ khi nào chúng ta muốn biết lượng thời gian dành cho một khối hoặc một hàm, chúng ta có thể sử dụng các phương thức `time()`và `timeEnd()`. Cả hai hàm này đều nhận một chuỗi làm tham số. Đảm bảo rằng bạn sử dụng cùng một chuỗi cho cả hai hàm này để đo thời gian.

Ví dụ :

```js
console.time('timer');

const hello =  function(){  
  console.log('Hello Console!');  
}

const bye = function(){  
  console.log('Bye Console!');  
}

hello();
bye();

console.timeEnd('timer');
```

Kết quả: 

![image-5.png](/image-5.png)

Trên đây là 6 phương thức hữu ích giúp khai thác tối đa console của bạn và giúp việc xem nhật ký trình duyệt một cách sinh động hơn. Những phương pháp tiếp theo mình sẽ giới thiệu trong bài viết tới.

Cảm ơn và hẹn gặp lại ! See yaaaa

 *From Vnus with love ....*

