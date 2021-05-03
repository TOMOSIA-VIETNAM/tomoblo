---
title: "RAILS: Hide yourself while scraping without being blocked"
date: "2021-04-26"
published: true
tags:
  - ruby
  - rails
---

[[snippet]]
| Trong bài trước, mình có hướng dẫn mọi người sử dụng capybara để scraping trong ruby on rails. Tuy nhiên để scraping một trang web thực sự không hề đơn giản một chút nào. Lần này, mình sẽ đưa ra cái nhìn tổng quan nhất và hướng dẫn cụ thể để giúp các bạn tránh bị phát hiện khi scraping.

# **I. Preface**

Việc `scraping` một trang web không khó nhưng cũng không hề đơn giản, tuỳ thuộc vào trang web của bạn cần `scraping` bảo mật như thế nào, như mình research để config, run bot thì việc tìm ra giải pháp vượt qua hàng rào của trang web thì nó tốn công khá nhiều. Vì thế lần này mình viết bài để giúp các bạn tiết kiệm thời gian nhất có thể để làm việc này.

# **II. How do websites detect bots?**

- Tổng số `requests` từ một IP nhất định trên mỗi khung thời gian cụ thể, chẳng hạn như hơn 50 `requests` mỗi giây hoặc 500 mỗi phút hoặc 5000 mỗi ngày có thể có vẻ đáng ngờ .Đếm số lượng `requests` trên mỗi IP trên một đơn vị thời gian là một kỹ thuật rất phổ biến và được cho là hiệu quả.

- Tỷ lệ gửi `requests` đều đặn, ví dụ, một luồng liên tục 10 yêu cầu mỗi giây có thể giống như một rô-bốt được lập trình để `requests`, hãy đợi một chút rồi gửi `requests` tiếp theo, v.v.

- HTTP Headers. Kiểm tra `User-Agent` người dùng có thể dự đoán được với mỗi `requests` giúp máy chủ xác định nhà cung cấp, phiên bản và thông tin khác của họ. Kết hợp với các tiêu đề khác, một máy chủ có thể phát hiện ra rằng các `requests` đến từ một nguồn không xác định.

- Kiểm tra `authentication tokens, cookies, encryption keys`

- Kiểm tra `mouse pointer position, keyboard input speed`

# **II. How To Scrape The Web Without Getting Blocked**

### **1. Use IP Rotation**

- Việc gửi các `requests` lặp đi lặp lại từ cùng một địa chỉ IP là dấu hiệu rõ ràng cho thấy bạn đang tự động hóa các `requests` HTTPS / HTTP. Hãy sử dụng máy chủ proxy hoặc mạng riêng ảo để gửi yêu cầu của bạn thông qua một loạt địa chỉ IP khác nhau. IP thực của bạn sẽ bị ẩn

### **2. Use Google Cloud Platform IPs**

- Có thể có lợi khi sử dụng Google Cloud Functions hoặc AppEngine làm nền tảng lưu trữ cho trình duyệt web. Điều này là do khi kết hợp với việc thay đổi `User-Agent` người dùng của bạn thành GoogleBot, nó có thể hiển thị cho chủ sở hữu trang web rằng bạn thực sự là GoogleBot!

### **3. Set Additional Request Headers**

- Các trình duyệt web sẽ có rất nhiều tiêu đề khác nhau được thiết lập, bất kỳ tiêu đề nào trong số này đều có thể được các trang web kiểm tra để chặn trình duyệt web của bạn.

- Setting: `“Upgrade-Insecure-Requests”, “Accept”, “Accept-Encoding” and “Accept-Language”`, nó sẽ làm cho nó giống như yêu cầu của bạn đến từ một trình duyệt web thực.

- Bạn có thể `coppy headers` từ https://httpbin.org/anything

### **4. Set A Referrer**

- `Referrer header` là một `request header` http thông báo cho trang web mà bạn đã truy cập trước đó. 

- Dùng `document.referrer` để kiểm tra `referrer`

### **5. Learn To Web Scrape Slowly**

- Khi sử dụng các dịch vụ thu thập dữ liệu trên web, bạn nên thu thập dữ liệu nhanh nhất có thể. Tuy nhiên, khi một người ở trên một trang web, tốc độ duyệt web của họ khá chậm so với trình thu thập thông tin.

- Trang web thường có thể phát hiện ra bạn đang scraping bằng phân tích: 
  - Bạn cuộn trang nhanh như thế nào.

  - Tần suất bạn nhấp và điều hướng trên các trang.

  - Nếu bạn tương tác với các trang quá nhanh, rất có thể trang web sẽ chặn bạn.

- Add In Random Sleep Delays And Actions

  - Thêm `random sleep delays ` giữa các `request` HTTPS của bạn.

  - Thêm `random breaks / delays whilst interacting with JavaScript` để mô phỏng hành vi của người dùng tiêu chuẩn.

### **6. Pursue Different Scraping Patterns**

- Tốc độ chậm không phải là đặc điểm duy nhất của hoạt động duyệt web của con người. Con người lướt qua các trang web duy nhất. Bạn cũng nên xem xét thời gian xem khác nhau, các nhấp chuột ngẫu nhiên khi người dùng truy cập một trang web. Tuy nhiên, các bot tuân theo cùng một kiểu duyệt web. Các trang web có thể dễ dàng xác định trình tìm kiếm khi họ tìm thấy các hành động duyệt lặp lại và tương tự.

- Một số hoạt động ví dụ cho bot: `Scrolling, Commenting, Liking, Watching, Taking`

### **7. Web Scrape At Different Day Times**

- Cũng như ngẫu nhiên các hành động của bạn, đăng nhập vào cùng một trang web vào các thời điểm khác nhau trong ngày cũng có thể làm giảm khả năng bị phát hiện bot.

### **8. Avoid Honeypot Traps**

- `"Honeypot là một cái bẫy mà một chuyên gia CNTT giăng ra cho một hacker độc hại, với hy vọng rằng họ sẽ tương tác với nó theo cách cung cấp thông tin thông minh hữu ích. Đó là một trong những biện pháp bảo mật lâu đời nhất trong CNTT. Chúng là các liên kết không xác định được tới người dùng vẫn nằm trong mã HTML."`

### **9. Use Real User Agents**

![Screen Shot 2021-05-01 at 4 25 27 PM](https://user-images.githubusercontent.com/79431148/116778227-d169f600-aa9a-11eb-9a33-6a55f3f4c6f0.png)

- `User-Agent` trong `request header` bao gồm một chuỗi duy nhất xác định trình duyệt đang được sử dụng, phiên bản của nó và hệ điều hành. Trình duyệt web chỉ định `User-Agent` cho trang web mỗi khi có request. Các cấu trúc chống `scraping` có thể phát hiện bot nếu bạn thực hiện một số lượng đáng kể các `request` từ một `User-Agent`. Cuối cùng, bạn sẽ bị chặn.

### **10. Use Headless Browsers**

- Một số trang web khó tìm kiếm hơn. Chúng được thiết lập để phát hiện từ tiện ích mở rộng trình duyệt, phông chữ web đến cookie trình duyệt để kiểm tra xem yêu cầu có phải đến từ người dùng thực hay không. **Headless Browsers không có cookie, web driver, plugins, ....**

# **III. Headless Browsers**

### **1. How to detect a Headless Browser?**

- **User agent:** được lấy từ các HTTP headers.

![Screen Shot 2021-05-02 at 4 14 30 PM](https://user-images.githubusercontent.com/79431148/116808181-9ed70080-ab61-11eb-8d1e-70c86c24c0f1.png)

Detect a headless Browser with JavaScript

```javascript
testUserAgent() {
    if (/HeadlessChrome/.test(window.navigator.userAgent)) {
        // Headless
        return 1;
    } else {
        // Not Headless
        return 0;
    }
}
```

- **Window.Chrome:** là một đối tượng cung cấp các tính năng cho các nhà phát triển tiện ích mở rộng của Chrome. Mặc dù có sẵn ở chế độ bình thường, nhưng nó không khả dụng ở chế độ `headless`

![Screen Shot 2021-05-02 at 4 19 42 PM](https://user-images.githubusercontent.com/79431148/116808297-3b999e00-ab62-11eb-85f1-c8d7b4994ef4.png)

Detect a headless Browser with JavaScript

```javascript
testChromeWindow() {
    if (eval.toString().length == 33 && !window.chrome) {
        // Headless
        return 1;
    } else {
        // Not Headless
        return 0;
    }
}
```

- **Notification Permissions:** Quyền không thể được xử lý ở chế độ `headless`. Điều này dẫn đến trạng thái không nhất quán trong đó các giá trị xung đột được báo cáo bởi `Notification.permission` và `Navigator.permissions.query`


```javascript
testNotificationPermissions(callback) {
    navigator.permissions.query({
        name: 'notifications'
    }).then(function(permissionStatus) {
        if (Notification.permission === 'denied' && permissionStatus.state === 'prompt') {
            // Headless
            callback(1);
        } else {
            // Not Headless
            callback(0);
        }
    });
}
```

- **No Plugins:** Headless Browsers không có plugin. Trình duyệt như Chrome có các plugin mặc định `Chrome PDF viewer, Google Native Client`

![Screen Shot 2021-05-03 at 9 40 34 AM](https://user-images.githubusercontent.com/79431148/116837687-b233ab80-abf5-11eb-8973-6d51a9d285bb.png)

```javascript
function testPlugins(resultBlock) {
    let length = navigator.plugins.length;
    return length === 0 ? 1 : 0;
}
```

- **App Version:** chế độ Headless sẽ bao gồm `Headless` trong phiên bản ứng dụng của họ.

![Screen Shot 2021-05-03 at 9 57 17 AM](https://user-images.githubusercontent.com/79431148/116837772-f6bf4700-abf5-11eb-80bb-220f6bff32e0.png)

```javascript
function testAppVersion() {
    let appVersion = navigator.appVersion;
    return /headless/i.test(appVersion) ? 1 : 0;
}
```

- **Connection Rtt:** thuộc tính có giá trị 0 trong trình duyệt `Headless` nhưng đôi khi nó thậm chí không tồn tại.

![Screen Shot 2021-05-03 at 10 02 00 AM](https://user-images.githubusercontent.com/79431148/116837937-9f6da680-abf6-11eb-9610-3e1f10edc2fd.png)


```javascript
function testConnectionRtt() {
    let connection & nbsp; = navigator.connection;
    let connectionRtt = connection ? connection.rtt : undefined;
    if (connectionRtt === undefined) {
        return 0; // Flag doesn't even exists so just return NOT HEADLESS
    } else {
        return connectionRtt === 0 ? 1 : 0;
    }
}
```

### **2. How to make Selenium undetectable and stealth in Ruby on rails ?**

- **Removing Navigator.Webdriver**: `Navigator.Webdriver` cho biết liệu trình duyệt có được kiểm soát bởi các công cụ tự động hóa như Selenium hay không và cũng là Nguồn của thanh thông báo "Chrome đang được kiểm soát bởi phần mềm kiểm tra tự động" mà bạn nhận được khi sử dụng Selenium với Chrome.

```ruby
option = webdriver.ChromeOptions()
option.add_argument('--disable-blink-features=AutomationControlled')
```

- **Changing Resolution, User-Agent, and other Details**: Một trong những cách mà Trang web sẽ phát hiện ra bạn là bằng cách tạo vân tay Trình duyệt sử dụng `Monitor Resolution, User-Agent` và các chi tiết khác của bạn, sau đó kiểm tra xem bạn có đang đưa ra một lượng yêu cầu bất thường mà một Con người thực không bao giờ có thể thực hiện hoặc áp dụng các phương pháp phỏng đoán khác cho phát hiện nếu bạn là một Bot

```ruby
#Change Browser Options
option = webdriver.ChromeOptions()
option.add_argument("window-size=1280,800")
option.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
```

- **Realistic Page Flow and avoiding Traps:** đi từ google hoặc bất kì trang nào đến trang cần `scraping` 

```ruby
def act_redirect_to_login
  visit('https://www.google.com/')
  fill_in('q', with: "{trang cần đến} \n")
end
```

- **Changing your IP Address using Proxy’s:** 

```ruby
#Add Proxy
option = webdriver.ChromeOptions()
option.add_argument('proxy-server=106.122.8.54:3128')
```

- **Using Random Delays:**

```ruby
def act_as_human
    delay
    mouse_move
    scroll_page
  end

  def delay
    sleep rand(3..5)
  end

  def mouse_move
    x = rand(10..100)
    y = rand(10..100)
    page.driver.browser.action.move_to_location(x,y).perform
  end

  def scroll_page
    x = rand(10..300)
    y = rand(10..300)
    page.execute_script "window.scrollBy(#{x},#{y})"
  end
```

- Thêm extension not detected bot

https://github.com/HugooB/chrome-headless-detection-prevention-extension

```ruby
option = webdriver.ChromeOptions()
option.extension('path')
```

# **IV. Tổng kết**

Như vậy qua bài viết này chúng ta đã có cái nhìn tổng quan về việc trang web phát hiện bot scraping như thế nào và cũng có những giải pháp đơn giản để khắc phục điều đó. 

# **V. Tài liệu tham khảo**

https://piprogramming.org/articles/6-Ways-to-detect-a-headless-Browser-with-JavaScript--How-to-detect-a-Headless-Browser-0000000030.html

https://piprogramming.org/articles/How-to-make-Selenium-undetectable-and-stealth--7-Ways-to-hide-your-Bot-Automation-from-Detection-0000000017.html

https://github.com/HugooB/chrome-headless-detection-prevention-extension

https://stackoverflow.com/questions/47956527/how-do-websites-detect-bots

https://understandingdata.com/how-to-avoid-being-blocked-web-scraping/

[[author | Tung Nguyen ]]
