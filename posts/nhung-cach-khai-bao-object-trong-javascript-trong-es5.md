---
title: "The ways to declare objects in ES5"
date: "2020-09-29"
published: true
tags:
  - javascript
---

**ES5 là gì ?**

ES (ECMAScript) là một ngôn ngữ được chuẩn hóa bởi tổ chức ECMA và được giám sát bởi hội đồng TC39. Và Javascript là cài đặt cụ thể của chuẩn ECMAScript này và trở thành một ngôn ngữ thông dụng trong lập trình web hiện nay. ES5 là phiên bản thứ năm cửa ECMAScript, nó được giới thiệu vào năm 2009. Nó được chúng ta sử dụng nhiều nhất trong nhiều năm để làm chuẩn cài đặt ra Javascript được hỗ trợ hầu hết bởi tất cả các trình duyệt hiện tại. Trong bài viết này, chúng ta sẽ chỉ đề cập đến ES5 các bạn nhé.

**Tổng quan về object trong JS**

Objects trong JS, cũng tương tự như những ngôn ngữ khác, tuy nhiên nó được thiết kế trên mô hình đối tượng đơn giản. Một object là một tập hợp các thuộc tính (property), và một thuộc tính là sự liên kết giữa một cái tên và giá trị. Giá trị của một thuộc tính có thể là một hàm (method).

```js
var animal = {
  name: 'Cat',
  showName: function() {
    console.log('This is ' + this.name)
  }
}
```

Chúng ta cùng đi vào tìm hiểu những cách khai báo object trong ES5 nhé.

<br/>

**Những cách khai báo object trong JS**

Trong các ngôn ngữ khác, để khai báo object chỉ cần dùng từ khoá `new` + `class name`. Nhưng trong JS không có khái niệm class cho nên chúng ta thường khởi tạo bởi một trong các cách sau:

### Cách 1: Object literal

Sử dụng cặp dấu ngoặc nhọn `{}` và thêm thuộc tính vào bên trong nó (Viết đoạn này xong lại nhớ đến `this` :)). Mình sẽ có 1 bài viết về nó sau)

```js
var animal = {
  name: 'Cat',
  showName: function() {
    console.log('This is ' + this.name)
  }
}

console.log(animal.name) // Cat
animal.showName() // This is Cat
```

### Cách 2: Object constructor

Sử dụng từ khoá `new Object()`

```js
var animal = new Object()
animal.name = 'Cat'
animal.showName = function() {
  console.log('This is ' + this.name)
}

console.log(animal.name) // Cat
animal.showName() // This is Cat
```

### Cách 3: Constructor function

Hay còn gọi là constructor pattern. Trong cách này, sẽ dùng một function đóng vai trò là constructor để khởi tạo object. Nhìn chung bao gồm 2 bước sau:

1. Định nghĩa kiểu cho object bằng cách khai báo một constructor function. Bạn nên viết hoa chữ cái đầu tiên của tên hàm này
2. Khởi tạo object với từ khoá `new`

```js
function Animal(name) {
  this.name = name
  this.showName = function() {
    console.log('This is ' + this.name)
  }
}

// Khởi tạo object
var cat = new Animal('Cat')
console.log(cat.name) // Cat
cat.showName() // This is Cat

var dog = new Animal('Dog')
console.log(dog.name) // Dog
dog.showName() // This is Dog
```

Ngoài ra ta cũng có thể sử dụng prototype để khai báo:

```js
function Animal() {}

Animal.prototype.name = 'Cat'
Animal.prototype.showName = function() {
  console.log('This is ' + this.name)
}

var cat = new Animal()
console.log(cat.name) // Cat
cat.showName() // This is Cat
```

### Cách 4: Object.create method

Object có thể được tạo bằng phương thức Object.create(). Phương thức này có thể rất hữu ích, bởi vì nó cho phép bạn chọn prototype cho object bạn muốn tạo ra, mà không cần phải định nghĩa constructor function.

```js
var Animal = {
  name: 'Cat',
  showName: function() {
    console.log('This is ' + this.name)
  }
}

var catA = Object.create(Cat)
catA.showName() // Cat
catA.name = 'Dog'
catA.showName() // This is Cat
```
<br/>

**Tổng kết**

Từ thời ES5, để khai báo một object khá dài dòng và rắc rối. Kể từ khi ES6 (một bản nâng cấp lớn cho JavaScript) ra đời, cung cấp cho chúng ta cú pháp class / object một cách dễ dàng hơn để làm việc với các đối tượng, làm cho hướng đối tượng trong JS trở nên dễ dàng và tường minh hơn. Tuy nhiên, trong thực tế rất nhiều dự án đang triển khai vẫn còn sử dụng ES5 cho nên việc biết đến những cách khai báo object trong bài viết nãy vẫn còn rất hữu dụng phải không các bạn.

Cảm ơn các bạn đã theo dõi, hẹn gặp lại trong một bài viết khác nhé.

__- From ĐMH (Don't Make Haste) -__
