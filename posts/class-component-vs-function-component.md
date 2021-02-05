---
title: "[React] Class Components vs Function Components"
date: "2021-02-05"
published: true
tags:
  - React
---

Chúng ta khi làm việc với React thì đôi khi cũng sẽ có sử dụng cả **Class Components** vs **Function Components** trong cùng một dự án. Nhưng giữa chúng có điều gì khác nhau khiến chúng ta phải cân nhắc để sử dụng loại component nào cho hợp lý thì tôi nghĩ mọi người đôi khi không để ý đến điểm này.

Bài viết dưới đây hay thử so sánh giữa **Class (Stateful) Components** vs **Functional (Stateless) Components** để biết lúc nào nên sử dụng chúng một cách linh hoạt.

#### 1. React Component là gì?
**1 component là một block code độc lập, có thể tái sử dụng, nó chia UI thành nhiều phần nhỏ. Một web page hoặc UI từ nhiều block code(components). Componet sẽ luôn lắng nghe sự thay đổi của STATE để render lại UI cho người dùng.**
* Việc chia source code thành các components giúp ta rất nhiều. Mỗi component có code JS và CSS riêng, chúng có thể tái sử dụng, dễ đọc, dễ viết, dễ test.
* React có 2 loại component: **Funtional (Stateless)** và **Class (Stateful)**.

#### 2. Functional (Stateless) Components
1 functional component là một hàm Javascript (hoặc ES6) trả về 1 phần tử/1 element React. Theo official docs của React, hàm dưới đây là một component React hợp lệ:
**Function này là một component React hợp lệ vì nó nhận một "props" (viết tắt của properties) làm tham số và trả về 1 React element - reactjs.org**

Chúng ta có thể khai báo component:
```js
function Example() {
  return ( <h1>I'm a functional component!</h1> );
};
```
Hoặc như ES6 arrow function:
```js
const Example = () => {
  return ( <h1>I'm a functional component!</h1> );
};
```
**Functional components** cũng được nói với một cái tên là stateless components bởi vì chúng ta không thể làm nhiều thứ phức tạp như quản lý React State (data) hoặc phương thức life-cycle trong functional components. Nhưng từ **versions 16.8** chúng ta đã có thể sử dụng **React Hooks** để sử dụng state và những features khác của class components trong functional components.

Vậy 1 React Functional Component là:

* Một function Javascript / ES6 function
* Phải trả về 1 React element
* Nhận props làm tham số nếu cần

#### 3.  Class (Stateful) Components
**Class components** là những class ES6. Chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data). Ví dụ dưới đây là class component:

```js
import React, { Component } from 'react';

class Example extends Component {
    render() {
        return (<h1>I'm a class component!</h1>);
    }
}

export default Example;
```
Bạn có thể thấy, class Example kế thừa Component, vì vậy React hiểu class này là một component, và nó renders (returns) 1 React Element.

Vì vậy, một React class component là:

* Là một class ES6, nó sẽ là một component khi nó "kế thừa" React component.
* Có thể nhận props (trong hàm khởi tạo) nếu cần.
* Được khởi tạo với 1 vòng lifecycle hoàn chỉnh
* Phải có 1 method render() trả về 1 React element (JSX), or null

#### 4. Vậy sự khác nhau giữa Class Component và Functional Component là ?
**Class Component - Stateful Components:**
Với Class Component chúng ta có thể sử dụng được state một cách dễ dàng khi khởi tạo (init) state ngay trong phương thức constructor của Class Component bằng this.state:
```js
class Counter extends React.Component {
  render() {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
    return (
      <div className="App">
         Hello {this.props.name}
         {this.state.count} //lấy dữ liệu từ state.
      </div>
    );  
  }
}
export default Counter;
```
Để thay đối state chúng ta có cách duy nhất chính là thông qua sử dụng phương thức setState().

**Functional Component - Stateless Components:**
Trái ngược với Class Component, Functional Component trước đây vốn không thể làm những thứ phức tạp như làm việc quản lí với state. Nhưng với những bản mới nhất của React đã cập nhật thêm React Hooks để cho phép chúng ta làm việc đó thông qua những function như useState() . Các ban có thể vào trang chủ của React để đọc chi tiết về chúng. Những bài viết sau trong series này mình sẽ đề cập về hooks hay lifecycles của Component.

*Tóm lại tùy vào nhu cầu sử dụng mà chúng ta có thể linh hoạt lựa chọn sử dụng Class Components hay Functional Components. Theo xu hướng hiện tại trên cá nhân tôi thấy việc sử dụng Functional Components rất tiện lợi cho việc bảo trì (maintain) sau này cũng như nhiều developer đang sử dụng Functional Components thay cho Class Components. Một phần nữa theo cá nhân tôi thấy việc sử dụng Functional Components cũng dễ đọc hiểu hơn cho những người phát triển dự án sau này. Mọi người có thể tự sử dụng cả 2 cách để đánh giá xem cách nào tối ưu hơn nhé !*

### 5. Kết luận
Như vậy, Với chia sẽ của mình, hi vọng sẽ giúp được mọi người sử dụng cơ bản được Component và có thể thay đổi 1 cách linh hoạt để phụ hợp với yêu cầu của công việc. Cảm ơn mọi người đã đọc và hẹn gặp lại ở bài viết tiếp theo.

###### *<div style="text-align: right"> [Tran Van Tuan Anh | Trần Văn Tuấn Anh ] </div>*
