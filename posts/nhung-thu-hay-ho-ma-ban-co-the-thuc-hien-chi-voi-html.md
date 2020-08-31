---
title: "Những thứ hay ho mà bạn có thể thực hiện chỉ với HTML."
date: "2020-08-23"
published: true
tags:
  - html
---

Ngày nay, hầu như mọi tính năng trên website đều có thể dùng javascript để thực hiện <br/>
Tuy nhiên có bao giờ bạn tự hỏi liệu HTML có làm được những thứ đó không? :)) <br/>
Let's go ! <br/>
Những thứ hay ho mà bạn có thể thực hiện chỉ với HTML

### 1. Bộ chọn màu đơn giản
- Code:
```html
<input type="color" value="#e0ffee" id="colorPicker">
```
- Kết quả:
<br/>
<input type="color" value="#e0ffee" id="colorPicker">

### 2. Menu thả xuống và có thể tìm kiếm bằng văn bản
- Code:
```html
<form action="/action_page.php" method="get">
  <label for="browser">Choose your browser from the list:</label>
  <input list="browsers" name="browser" id="browser">
  <datalist id="browsers">
    <option value="Edge">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
  </datalist>
  <input type="submit">
</form>
```
- Kết quả:
<br/>
<form action="/action_page.php" method="get">
  <label for="browser">Choose your browser from the list:</label>
  <input list="browsers" name="browser" id="browser">
  <datalist id="browsers">
    <option value="Edge">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
  </datalist>
  <input type="submit">
</form>

### 3. Tạo hộp thoại

- Code:
```html
<dialog open>This is an open dialog window</dialog>
```
- Kết quả:
<br/>
<dialog open>This is an open dialog window</dialog>
<br/>
<br/>

### 4. Thanh progress đơn giản

- Code:
```html
<progress id="file" value="69" max="100"> 69% </progress>
```
- Kết quả:
<br/>
<progress id="file" value="69" max="100"> 69% </progress>

### 5. Widget tương tác mà người dùng có thể mở và đóng

- Code:
```html
<details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
```
- Kết quả:
<br/>
<details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>

### 6. Tô sáng đoạn văn bản
- Code:
```html
<p>Do not forget to buy <mark>milk</mark> today.</p>
```
- Kết quả:
<p>Do not forget to <mark>buy milk today.</mark></p>

### 7. Hiển thị văn bản bị xoá
- Code:
```html
<p>My favorite color is <del>blue</del>!</p>
```
- Kết quả:
<p>My favorite color is <del>blue</del>!</p>

### 8. Hiển thị văn bản được chèn vào
- Code:
```html
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```
- Kết quả:
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>

### 9. Tạo liên kết số điện thoại
- Code:
```html
<a href="tel:+841234567890">+8412345678902</a>
```
- Kết quả:
<a href="tel:+841234567890">+8412345678902</a>

### 10. Chỉnh sửa nội dung của trang
- Code:
```html
<p contenteditable="true">This is a paragraph. It is editable. Try to change this text.</p>
```
- Kết quả:
<p contenteditable="true">This is a paragraph. It is editable. Try to change this text.</p>

Đây là một số tính năng mà mình thấy khá hữu dụng.
Tuy nhiên, các bạn lưu ý một số trình duyệt version cũ có thể không hỗ trợ.
Các bạn có thể kiểm tra trình duyệt hỗ trợ trên <a href="https://developer.mozilla.org/" target="_blank">mdn</a> hoặc <a href="https://www.w3schools.com/" target="_blank">w3chool</a> nhé ! <br />
Cảm ơn các bạn đã kiên trì scroll đến đây. Hãy comment cho mình biết bạn là ai nhé :))

__- From ĐMH -__
