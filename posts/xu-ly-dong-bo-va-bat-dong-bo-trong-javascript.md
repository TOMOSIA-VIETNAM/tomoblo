---
title: "Xử lý đồng bộ và bất đồng bộ trong javascript"
date: "2021-02-03"
published: true
tags:
  - javascript
---

Chào mọi người, hôm nay em xin giới thiệu về xử lý bất đồng bộ trong javascript (ES7). Cùng bắt đầu nào.

## I. Đồng bộ và bất đồng bộ:
**1. Đồng bộ (synchronous/sync)** là xử lý theo từng bước. Chỉ khi nào công việc hiện tại thực hiện xong thì mới thực hiện công việc tiếp theo. Điều này sinh ra một trạng thái được gọi là *trạng thái chờ*.
>Ưu điểm:
> - Hạn chế mắc các lỗi liên quan đến quá trình chạy
> - Dễ dàng sửa lỗi
> 
>Hạn chế:
>- Vì chạy tuần tự và phải chờ đợi nhau nên sinh ra *trạng thái chờ*. Thời gian xử lý lâu khi các câu lệnh cần thao tác với dữ liệu bên ngoài gây ảnh hưởng đến trải nghiệm người dùng

**2. Bất đồng bộ (asynchronous/async)** cho phép xử lý nhiều tác vụ cùng lúc. Nếu tác vụ nào xong trước sẽ cho ra kết quả trước.
>Ưu điểm:
>- Xử lý nhiều tác vụ cùng lúc nên giảm thiểu được thời gian xử lý và không sinh ra *trạng thái chờ*
>
>Hạn chế:
>- Khó kiểm soát

**Lưu ý:** 
>*Hạn chế xử dụng bất đồng bộ trong các tác vụ thêm, sửa với cở sở dữ liệu. Vì một công việc phải trải qua hai giai đoạn:*
>- Validate dữ liệu
>- Insert vào database
>
>=> Giả sử giai đoạn validate hoàn thành sau giai đoạn insert dữ liệu thì nó là một cái gì đó rất tệ nếu giai đoạn validate có lỗi


## II. Callback (ES5)
**1. Khái niệm:**
 >*Callback là giải pháp đầu tiên được đưa ra của Javascript để giải quyết các vấn đề liên quan đến xử lý bất đồng bộ theo đúng trình tự mong muốn.*
 
 Định nghĩa về *callback* theo trang ```MDN web docs```
 >*A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.*
>
>Callback là một hàm được truyền vào một hàm khác dưới dạng đối số, sau đó được gọi bên trong hàm để hoàn thành một số loại quy trình hoặc hành động.

**2. Ví dụ và cách hoạt động**
Ví dụ: Con mèo ăn cơm mất 5s sau đó uống nước
```javascript
// con mèo cần 5s để ăn cơm 
function an_com() { 
  setTimeout(() => { console.log('ăn cơm'); }, 5000); 
} 
// con mèo uống nước
function uong_nuoc() { console.log('uống nước'); }
//gọi hàm
an_com();
uong_nuoc();
```
Ví dụ trên cho kết quả uống nước xong trước ăn cơm mặc dù hàm ăn cơm được gọi trước.
=> Để con mèo ăn và uống theo đúng trình tự thì chúng ta cần phải có thông tin khi nào con mèo ăn xong mới cho nó uống nước.
**3. Ưu nhược điểm của callback**
>Ưu điểm:
>- Là mô hình khá phổ biến nên rất dễ hiểu.
>- Rất dễ implement trong function của chúng ta

> Nhược điểm:
> - Khi thao tác bất đồng bộ, các callback phải chờ nhau thực hiện dẫn đến tổng thời gian hoàn thành tác vụ lâu hơn.
> - Dài dòng, khó đọc, khó bảo trì.
> - *Callback hell (pyramid of doom):* là cách code không tối ưu, dẫn đến nhiều callback lồng nhau gây khó debug hay bảo trì.

Ví dụ: callback hell
```javascript
a(function(resultA){
  b(resultA, function(resultB){
	c(resultB, function(resultC){
	  console.log(resultC);
	});
  });
});
```
>Để tránh *callback hell* thì có nhiều cách như: thiết kế ứng dụng theo dạng module, đặt tên callback, định nghĩa hàm trước khi gọi,...

## III.  Promise (ES6)
**1. Định nghĩa**
>Promise là người em sinh sau đẻ muộn so với callback nên nó có thể khác phục được những vấn đề như callback hell hay pyramid of doom khá là tốt, giúp code trở nên dễ đọc, gọn gàng hơn.

>Promise có nghĩa là một sự hứa hẹn hay lời hứa, mà lời hứa thì sẽ có hai trạng thái là hoàn thành và thất bại.

**2. Cách sử dụng**

Cách tạo ra một promise:
```javascript
let promise = new Promise(/* executor */(resolve, reject) => {
// xử lý tác vụ ở đây
// gọi resolve(result) khi tác vụ hoàn thành.
// gọi reject(result) khi tác vụ sảy ra lỗi
});
```
Hàm  `executor`  là một hàm sẽ được gọi ngay khi Promise được gọi tới, nó chứa hai tham số:

-   resolve: hàm sẽ được gọi khi xử lý thành công.
-   reject: hàm được gọi khi xử lý thất bại.

Tại mỗi thời điểm, Promise sẽ có những trại thái khác nhau, bắt đầu với  `pending`  hay  `unsetted`. Trạng thái này chính là trạng thái ban đầu của Promise khi được khởi tạo và đang chờ kết quả trả về. Khi quá trình xử lý thực hiện xong xuôi, promise sẽ chuyển sang trạng thái  `setted`, khi kết quả được trả về, sẽ có hai khả năng có thể xảy ra:

-   `fulfilled`: trạng thái xử lý thành công.
-   `rejected`: trạng thái xử lý thất bại.

Ví dụ: trước hôm thi đại học, mẹ ngồi cạnh bạn và nói "Cố đỗ đại học rồi mẹ sẽ mua iphone 12 pro max cho". Khi đó, lời hứa của mẹ bạn sẽ trông như sau:
```javascript
function loi_hua_cua_me() { 
  return Promise((thuc_hien_loi_hua, that_hua) => { 
    // Sau khi thi đại học xong 
    // Nếu điểm bạn cao 
    if (diem_cao) { 
	  // Lúc này trạng thái lời hứa là fulfilled	
	  thuc_hien_loi_hua("mua iphone 12 pro max"); 
    } else { 
	  // Lúc này trạng thái của lời hứa là rejected
	  that_hua("mua iphone x");
	} 
  }); 
} 
// Khi vừa được khởi tạo xong, trạng thái của promise sẽ là
pendding
// Mẹ vừa hứa với bạn xong, đang chờ điểm thi đại học của bạn 
var promise = hua_cho_vui(); 
promise
.then((iphone_12_pro_max) => { ... })
.catch((iphone_x) => { ... });
```

Khi một promise được thực hiện, nếu thành công thì sẽ **gọi callback trong hàm then**, nếu thất bại thì promise sẽ **gọi promise trong hàm catch**.


![](https://images.viblo.asia/full/d3c97aa7-0a13-425e-b39f-5c870ec479da.png)

**3. Promise chaining**

Nếu xử lý các câu lệnh bất đồng bộ liên tiếp nhau với **callback** rất dễ dẫn đến tình trạng _callback hell_ như đã nói ở trên khi mà có quá nhiều hàm callback bị lồng vào nhau làm cho việc đọc hiểu cũng như debug trở nên khó khăn. Promise chaining hay chuỗi promise được sinh tra nhằm khắc phục vấn đề trên.
Giá trị trả về của hàm `then()` sẽ là một promise khác, do đó có thể dùng promise để gọi liên tiếp các hàm bất đồng bộ. Promise thứ hai sẽ được xử lý khi promise thứ nhất trả về `fulfilled` hoặc `reject`.

Ví dụ: Có một đoạn callback như sau:

```javascript
api.getUser('user', function(error, user) {
  if (error) throw error
  api.getPostsOfUser(user, function(error, posts) {
    if (error) throw error
    api.getCommentsOfPosts(posts, function(error, comments) {
      if (error) throw error
      // ...
    })
  })
})
```

Đoạn callback trên sau khi được viết lại bằng Promise:

```javascript
api
  .getUser('user')
  .then(user => api.getPostsOfUser(user))
  .then(posts => api.getCommentsOfPosts(posts))
  .catch(error => {
    throw error
  })
```

Trong ví dụ ở trên ta lần lượt gọi đến ba hàm  `getUser`,  `getPostsOfUser`  và  `getCommentsOfPosts`. Chỉ cần một trong ba hàm này bị lỗi, promise sẽ chuyển qua trạng thái  _reject_  và  _callback_  trong hàm  _catch_  sẽ được gọi đến, lúc này việc bắt lỗi sẽ trở nên dễ dàng hơn.

Tuy nhiên tiện là như vậy nhưng toàn bộ các hàm  `then()`  chỉ được tính là một câu lệnh. Điều này sẽ gây khó khăn cho việc debug sau này.

**4. Promise.all()**

`Promise.all()`  nhận và là một đối số và thông thường là một mảng các promise. Trạng thái của promise này sẽ là  `fulfilled`  nếu trạng thái của tất cả các promise được truyền vào là  `fulfilled`  ngược lại, promise sẽ mang trạng thái  `reject`.

```javascript
let promise_1 = new Promise((resolve, reject) => {
  resolve(1);
});

let promise_2 = new Promise((resolve, reject) => {
  resolve(2);
});

let promise_3 = new Promise((resolve, reject) => {
  resolve(3);
});

let promise = Promise.all([promise_1, promise_2, promise_3]);
promise.then((value) => {
  console.log(value[0]); // 1
  console.log(value[1]); // 2
  console.log(value[2]); // 3
});
```

**5. Promise.race()**

Khác với  `Promise.all()`, hàm  `Promise.race()`  sẽ xử lý promise đầu tiên có kết quả trả về không quan tâm kết quả trả về có lỗi hay không.

Ví dụ promise_1 được resolve đầu tiên nên giá trị mà promise trả về sẽ là giá trị của promise_1 và bằng 1.

```javascript
let promise_1 = Promise.resolve(1);

let promise_2 = new Promise((resolve, reject) => {
  resolve(2);
});

let promise_3 = new Promise((resolve, reject) => {
  resolve(3);
});

let promise = Promise.race([promise_1, promise_2, promise_3]);
promise.then((value) => {
  console.log(value); // 1
});
```

## IV.  Async/await (ES7)

Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ  _một cách tuần tự hơn_  , giúp đoạn code nhìn qua tưởng như đồng bộ nhưng thực ra lại là chạy bất đồng bộ, giúp chúng ta dễ hình dung hơn.

![](https://images.viblo.asia/e2f5d967-9eab-4aa5-bafd-9e80c50ebd71.jpg)

**1.  Async**

Để định nghĩa một hàm bất đồng bộ với async, ta cần khai báo từ khóa  `async` ngay trước từ khóa định nghĩa hàm.

Regular function:
```javascript
async function getUser() {
  return ...
}
```
Function expression:
```javascript
getUser = async function() {
  return ...
}
```
Kết hợp với cú pháp  _arrow function_  của ES6
```javascript
getUser = async () => { ... }
```

Giá trị trả về của Async Function sẽ luôn là một  _Promise_  mặc cho bạn có gọi await hay không, nếu trong code không trả về Promise nào thì sẽ có một promise mới được resolve với giá trị lúc đầu (nếu không có giá trị nào trong return kết quả trả về sẽ là undefine). Promise này sẽ ở trạng thái thành công với kết quả được trả về qua từ khóa  _return_  của hàm async, hoặc ở trạng thái thất bại với kết quả được đẩy qua từ khóa  _throw_  trong hàm async.

**2.  Await**

Về cơ bản thì  `await`  giúp cho cú pháp trông dễ hiểu hơn, thay thì phải dùng  `then()`  nối tiếp nhau thì chỉ cần đặt  `await`  trước mỗi hàm mà chúng ta muốn đợi kết quả của thao tác bất đồng bộ. Chỉ dùng được  `await`  trong hàm nào có  `async`  đứng phía trước.

```javascript
async function getUser() {
  const user = await fetchUser();
}
```

**3.  Tại sao nên dùng async/await**

Vì là sinh sau đẻ muộn nên nó có nhiều ưu điểm vượt trội so với các đàn anh đi trước như:

-   **Code ngắn và sạch hơn**. Điều dễ thấy nhất khi dùng async/await số lượng code phải viết giảm đi đáng kể, không phải  _then_  rồi  _catch_  gì cả hay là đặt tên cho một biến mà ta không sử dụng, tránh được các khối code lồng nhau, code được viết ra như code chạy tuần tự dễ đọc hơn rất nhiều.
-   Công việc debug trở nên dễ dàng hơn vì so với promise, mỗi một lần dùng await sẽ được tính là một dòng code.
-   Khi có lỗi, thay vì báo chung chung  _un-resolved_  như ở promise thì exception sẽ chỉ ra là lỗi xảy ra ở dòng số bao nhiêu.


## V. Một số ví dụ
1. Synchronous

```javascript
// sync
function  demo_sync(){
  var  i = 0;
  while (i < 5){
    console.log(i);
    i++;
  }
}

demo_sync();

// kết quả:
// 0
// 1
// 2
// 3
// 4
```

2. Callback

```javascript

// callback
function  hello(){
  setTimeout(() => { console.log("Hello"); }, 1000);
}

function  goodbye(){
  console.log("Good bye");
}

function  demo_callback(){
  hello();
  goodbye();
}

demo_callback();

// kết quả:
// Good bye
// Hello
```

3. Promise

```javascript
// promise
function  myDisplayer(some) {
  console.log(some);
}

let  myPromise = new  Promise(function(myResolve, myReject) {
  let  x = 0;
  if (x == 0) {
    myResolve("OK");
  } else {
    myReject("Error");
  }
});

myPromise.then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);}
);

// kết quả:
// OK
```

4. Async, await

```javascript
// async, await
function  myDisplayer(some) {
  console.log(some);
}

function  resolveAfter2Seconds() {
  return  new  Promise(resolve  => {
	setTimeout(() => {resolve('resolved');}, 2000);
  });
}

async  function  asyncCall() {
  myDisplayer('calling');
  const  result = await  resolveAfter2Seconds();
  myDisplayer(result);
}

asyncCall(); 

// kết quả:
// calling
// resolved
```

## VI. Kết luận

 - Qua bài viết trên chúng ta có thể thấy được async/await là một trong những tính năng mang tính cách mạng được thêm vào JavaScript trong vài năm gần đây. Nó giúp chúng ta nhận ra Promise còn thiếu sót như thế nào, cũng như cung cấp giải pháp thay thế.


[[author | Lê Văn Ninh - Tomosia Việt Nam ]]
