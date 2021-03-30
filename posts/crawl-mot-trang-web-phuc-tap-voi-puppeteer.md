---
title: "Crawl a complex site with puppeteer"
date: "2021-02-28"
published: true
tags:
  - javascript
---


Chắc khi nghe tên chủ để này bạn có thể sẽ hiểu nhầm: `crawl trang web một cách đơn giản nhất`.

Nhưng nếu thế thì đơn giản quá. Nhiều khi bạn vào một trang web rất bảo mật, việc crawl một cách đơn giản không hề dễ chịu chút nào đâu. Thế nên, ở đây, tôi xin giới thiệu một con dao mổ trâu `puppeteer` để xử lý những thức phức tạp.

Thường thì các cách đơn giản để crawl một trang web chỉ là kéo một trang web về, sau đó nó sẽ đọc file html tĩnh được kéo về.

Nhưng, các trang web bây giờ không đơn giản thế nữa. Nó động, nó được render bằng javascript và chứa nhiều action khác nhau.

Do đó, việc bạn parse html tĩnh của trang web không thể thực hiện được. Và puppeteer sinh ra để giúp bạn giả lập một trình duyệt web để có thể parse trang web (tất nhiên, việc parse vẫn dựa vào html selector)



Sau đây, tôi sẽ hướng dẫn các bạn crawl lời của một bài hát ở trên zing mp3

Trước tiên, tôi sẽ khởi tạo một dự án node js

```shell
mkdir crawl_mp3
cd crawl_mp3
yarn init
```



Sau đó thêm thư viện puppeteer vào dự án với câu lệnh `yarn add puppeteer`

Như vậy, tôi đã có các công cụ cần thiết để crawl một trang web.

Bây giờ, tôi đi vào việc giả lập như một người dùng trang zing mp3.

Trước tiên, tôi tạo một file `app.js` trong thư mục dự án

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://mp3.zing.vn/');

  await browser.close();
})();

```



Tôi sẽ chạy project với câu lệnh `node app.js` (từ giờ, tôi nói chạy thì các bạn hãy hiểu là dùng câu lệnh này nhé)

Bạn sẽ thấy có một trình duyệt hiện lên, nó giống như Chrome ấy.

Đúng rồi, nó là Chromiumn đó (một phiên bản tiền nhiệm trước khi các tính năng được Google phân phối cho Chrome)

Các câu lệnh với puppeteer sẽ thực hiện các thao tác giống hết như khi bạn thao tác trên web thật đó.



Bây giờ, tôi sẽ tìm kiếm bài hát.

Tôi inspect vào ô tìm kiếm và lấy CSS Path của ô này và được kết quả: `#sug.section-search form.search input.input-txt`

<img src="https://i.imgur.com/hnKVOOF.png" style="zoom:50%;" />

Vì vậy, tôi điền bài hát tôi tìm kiếm và nhấn `Enter`

```javascript
await page.$eval('#sug.section-search form.search input.input-txt', el => el.value = 'Tinh yeu lung linh');
await page.keyboard.press('Enter')
```

Và tất nhiên, sau khi nhấn enter, tôi cần chờ để page load xong

```javascript
await page.waitForNavigation();
```

Bởi vì, sau khi vào trang search, zing có hiện lên một popup, tôi cần tắt nó đi

```javascript
await page.click('#react-cool-portal > div > div > div > div > button > i')
```

Sau đó tôi nhấn vào nút ba chấm và chờ một lúc để modal nó hiện ra

<img src="https://i.imgur.com/i9GY5DJ.png" alt="https://i.imgur.com/i9GY5DJ.png" style="zoom:50%;" />

```javascript
await page.click('#body-scroll > div.container > div.container > div > div:nth-child(1) > div > div.media-right > div > div:nth-child(4) > button > i')
await page.waitForTimeout(100)
```

Nhấn tiếp vào `Lời bài hát`

<img src="https://i.imgur.com/ePc5Nav.png" alt="https://i.imgur.com/ePc5Nav.png" style="zoom:50%;" />

```javascript
await page.click('#react-cool-portal > div > div > div > ul:nth-child(2) > div > div > button:nth-child(2) > i')
await page.waitForTimeout(100)
```



Lúc này, lời bài hát đã hiện ra, tôi select lời bài hát và in ra kết quả

```javascript
const lyrc = await page.evaluate(() => document.querySelector('#react-cool-portal > div.zm-portal-modal > div > div > div > div > div.content > textarea').value)
await console.log(lyrc)
```

<img src="https://i.imgur.com/QpHxqci.png" alt="Screen Shot 2021-02-28 at 15.51.19" style="zoom:50%;" />

Xong việc, tôi đóng trình duyệt

```javascript
await browser.close();
```



Sau khi, đã viết xong một script để crawl lời bài hát, tôi có thể tắt việc hiện trình duyệt mỗi lệnh chạy

```javascript
const browser = await puppeteer.launch({ headless: true });
```

Như vậy, tôi đã hướng dẫn một cách đơn giản nhất việc crawl một trang web.
Mong rằng bài viết giúp ích được các bạn !
