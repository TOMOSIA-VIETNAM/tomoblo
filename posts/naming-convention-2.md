---
title: "Naming convention - part 2"
date: "2020-10-20"
published: true
tags:
  - convention
---

[[snippet]]
| Tiếp nối chương trước, chương này, tôi sẽ đi chi tiết hơn vào cách đặt tên.



#### Meaningful names

Có 2 ví dụ như này

```ruby
# bad
c = post.comments.where(published: true)
m = c.max_by(&:rating)


# good
post_comments = post.comments.where(published: true)
top_rated_comment = post_comments.max_by(&:rating)
```

Chắn chắn, tôi sẽ chọn viết theo kiểu viết thứ 2. Đây là một ví dụ của việc đặt tên có nghĩa

- Reveal Intention (tiết lộ ý định)

  ```ruby
  Document#write_to_file(path)
  MessageService#send(from, to, body)
  ```

  Chỉ cần nhìn vào đoạn code trên, tôi có thể hiểu rõ ý định của function `write_to_file` hay `send` mà thậm chí tôi không cần đọc nội dung code bên trong nó. Một số chú ý, khi bạn muốn đặt tên theo kiểu này:

  - Name as a comment:

    Tôi thường hạn chế comment ít nhất có thể. Bởi vì, chẳng ai rảnh mà đọc comment của bạn đâu.

    Nhưng, có một số trường hợp, tôi vẫn phải comment lại. Đó là khi

    - function thể hiện một logic phức tạp, khó có thể định nghĩa trong một câu
    - bạn không thể tìm được một câu mô tả chính xác những gì bạn làm

  - A word or a sentence

- Avoid Disinformation: tránh xa những thông tin dễ gây nhầm lẫn hoặc sai lệch

  Ví dụ, nếu bạn đặt tên biến là O (chữ o hoa) hay l (chữ l thường), nhìn rất giống 0 (số 0) hay 1 (số 1).

  Hay như, `arr = {}`, rõ ràng, việc tôi đặt tên là `arr` đã dẫn đến việc hiểu nhầm loại dữ liệu được xử lý, nếu ai đó, bỏ qua dòng khai báo kia của tôi

- Simplest

  Đặt tên `đơn giản nhất có thể` và `mọi người đều có thể hiểu`

  Tôi có thể ví dụ cho bạn 2 cách đặt tên như sau

  ```javascript
  function isSumOfPrecedingTwoNumber(number) { }

  function isFibonacciNumber(number) {}

  ```

  Tôi nghĩ bạn đã có câu trả lời cho mình.

- Can reading

  Viết rõ ràng, dễ hiểu, hạn chế viết tắt

  ```typescript
  class DtaRcrd102 {
      private Date genymdhms;
      private Date modymdhms;
  }


  class Customer {
      private Date generationTimestamp;
      private Date modificationTimestamp;
  }
  ```

  Việc đặt tên như class đầu, rất khó hiểu, trong khi với class thứ hai, tôi không tốn thêm mấy thời gian.

  Viết tắt, giúp tôi giảm bớt thời gian, nhưng đó là chỉ lúc đặt tên thôi.

  Bởi vì, các editor hay IDE bây giờ làm quá tốt việc suggest rồi, tôi viết tắt chút, nó cũng gợi ý chính xác cho tôi rồi.

- Searchable

  Các IDE hiện đại, giúp ích rất nhiều cho việc inspect code. Nhưng vì đặc thù của các ngôn ngữ hay thư viện được sử dụng, chúng ta vẫn phải search xem biến đó được dùng ở đâu.

  - More 3 letter

    Nếu tôi đặt tên biến chỉ là a, b, c. Nó sẽ hạn chế rất nhiều khả năng tìm được nơi sử dụng của biến tôi đang tìm.

  - Use Constant >=< Hardcode

    Hardcode là việc luôn phải tránh. Thay vì hardcode, tôi sử dụng biến Constant để thay thế. Nó vừa giúp tôi DRY code, mà việc DRY đó, còn giúp tôi không bao giờ phải search xem cái số được hardcode đó sử dụng những đâu.

#### Function

- Do one thing

  Nếu function của tôi có nhiều hơn một nhiệm vụ hoặc là những nhiệm vụ (A, B, C) phân biệt nhau bởi switch, tôi sẽ không viết chung chúng vào một function X.

  Lúc này, tôi sẽ tách thành 3 function A, B, C và gọi chúng trong function X.

  Việc đọc lại code sẽ rất nhanh, bởi vì, tôi đã phân chia chúng rõ ràng.

- The stepdown rule

  Cũng khá giống như trên, nếu function của tôi là tổng hợp của các bước A1, A2, A3.

  Tôi sẽ không có lý do gì để viết chung chúng vào 1 function A.

  Việc tách nhỏ, khiến tôi đọc lại code nhanh hơn.

- Switch statements

  Thú thực,  `Switch statements` trông khá khó nhìn, nhưng nếu áp dụng quy tắc `Do one thing` ở trên vào, tôi sẽ được một function khá dễ nhìn.

  ```ruby
  class Employee
    def calculatePay(type)
      case type
      when :fullTime
        calculatePayForFullTime
      when :partTime
        calculatePayForPartTime
      else
        raise Invalid::EmployeeType
      end
    end
  end

  ```



- Function arguments

  Một function với số lượng biến không xác định, quả thật sẽ làm tôi băn khoăn.

  Như ví dụ dưới đây, bất cứ khi nào `Employee` của tôi phát sinh thêm một field mới, tôi sẽ lại phải thêm biến vào trong function này ?

  ```ruby
  class Employee
    def create(name, email, address, phone, description, birthday, gender)
    end
  end
  ```

  Để giải quyết vấn đề trên, tôi cần xác định

  - Maximum arguments number is 3:

    Đây là một con số đẹp để tôi có thể dễ dàng nhớ cách sử dụng function.

    Tuỳ từng trường hợp, có thể 5 là số tối đa

  - Argument objects: Khi số lượng biến yêu cầu tăng lên, nhóm những biến có đặc điểm chung vào 1 object.

    Để dễ hiểu, bạn hãy xem cách tôi refactor class `Employee` trên

  ```ruby
  class Employee
    def create(name, email, employee_information = {})
    end
  end

  class EmployeeInformation
    attribute :address, :phone, :description, :birthday, :gender
  end
  ```

- Doing or Answer

  Một function chỉ thực hiện 1 trong 2 hành động: Doing or Answer

  Không bao giờ thực hiện 2 việc cùng lúc.

  *Ví dụ:*

  answer ở đây: `findByPaidUser` chỉ trả về tất cả các Paid User, không thực hiện bất kỳ hành động nào.

#### Variable

- Relevant for the context

  Tuỳ thuộc vào từng bối cảnh, có thể cách đặt tên biến trong một bối cảnh này là không thể được, nhưng trong một bối cảnh khác, nó được chấp nhận

- Long name

- Short name

  Thường thì tên biến sẽ dài từ 3 -> 31. Nó đủ để tôi có thể đặt một tên phù hợp với bối cảnh bài toán.

#### Ruby on Rails

Dưới đây là một số convention mà tôi áp dụng trong các project RoR:

- Case style:

  Class: PascalCase

  variable or method: snake_case

  Constant: SNAKE_CASE

- Naming convention:

  - Sử dụng prefix là `is_` nếu giá trị của biến là boolean
  - Sử dụng suffix là `!` nếu function ép buộc giá trị thành `true`

#### Tips and tricks

Đôi khi, tôi không biết cách đặt tên như thế nào.

Có thể, tôi sẽ viết rõ ràng comment và mô tả ra.

Hoặc, tôi sẽ cứ đặt một cái tên trước, sau khi code xong, lúc này, tôi có thể `sáng suốt hơn` để... đặt tên lại.



Đây là những kiến thức được tôi khái quát và cá nhân hoá. Nó giúp đỡ tôi rất nhiều khi đặt tên khi coding.

Bạn có ý tưởng gì mới, hãy comment chúng ta cùng trao đổi nhé !
