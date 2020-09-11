---
title: "Xử lý Massive Data trong Rails"
date: "2020-09-11"
published: true
tags:
  - rails
---
**Mở bài(cho đúng format)**

Rails là 1 framework tuyệt vời do tính dễ tiếp cận cũng như khả năng kiểm soát logic tương đối dễ dàng của nó. Tuy nhiên, performance của Rails là vấn đề đã được đặt câu hỏi từ những ngày đầu nó xuất hiện, đặc biệt là với lượng dữ liệu lớn. Có thể bạn không xa lạ gì với câu chuyện dự án chạy với 40 server hay bottleneck khi bạn cố gắng xử lý với dữ liệu hàng triệu người dùng. Okay, có vài chuyện chúng ta có thể làm để không trở thành nhân vật trong những câu chuyện đó.

**How**

1. Bỏ qua ActiveRecord nếu có thể

ActiveRecord đã làm mọi thứ dễ dàng hơn rất nhiều, nhưng nó không được thiết kế cho raw data. Khi bạn muốn áp dụng một loạt các thao tác đơn giản cho hàng triệu row, tốt hơn bạn nên gắn bó với raw SQL statement. Nếu bạn cảm thấy mình thực sự cần một công cụ ORM để giúp bạn hình dung mọi thứ, hãy xem phần tiếp theo.

2. Update all records

Cách nông dân:

```ruby
User.where(city: “Houston”).each do |user|
  user.note = “Houstonian”
  user.save
end
  ```

Dễ đọc, dễ hiểu nhưng dễ toang. Nếu có khoảng 100k người dùng ở Houstonian, có thể đoạn code đó sẽ chạy cả ngày luôn. Một giải pháp hợp lý hơn sẽ là

```ruby
User.update_all({note: “Houstonian”}, {city: “Houston”})
```

Nó có lẽ sẽ không tốn hơn 30s với cùng lượng dữ liệu

3. Chỉ load columns cần thiết

Mã như `User.where(city: “Houston”) ` sẽ lấy tất cả thông tin của user từ database. Nếu bạn chỉ đơn giản là không quan tâm đến các thông tin khác như tuổi, giới tính hoặc nghề nghiệp, bạn không nên lấy chúng ngay từ đầu. Cố gắng sử dụng select_column khi bạn có nhiều record.

4. Sử dụng find_in_batches

Với các ứng dụng nhỏ, điều này thậm chí sẽ không được chú ý, nhưng nó thực sự quan trọng. 100 nghìn record user có thể dễ dàng chiếm hơn 5 GB memory. Server của bạn có thể sẽ crash. Do đó, bạn nên sử dụng find_in_batches

```ruby
User.find_in_batches(conditions: 'grade = 2', batch_size: 500) do |students|
  students.each do |student|
    student.find_or_create_by_class_name(‘PE’)
  end
end
```

5. Reduce transactions

```ruby
  (0.2ms) BEGIN
  (0.4ms) COMMIT
```

Transactions xảy ra mỗi khi chúng ta lưu đối tượng. Nó vẫn sẽ xảy ra hàng triệu lần ngay cả khi chúng ta sử dụng find_in_batches, cách duy nhất để giảm transactions hiệu quả là nhóm các hoạt động của chúng ta. Ví dụ trước vẫn có thể được optimized hơn nữa:

```ruby
User.find_in_batches(conditions: 'grade = 2', batch_size: 500) do |students|
  User.transaction do
    students.each do |student|
      student.find_or_create_by_class_name(‘PE’)
    end
  end
end
```

Bằng cách này, thay vì commits sau mỗi record, bây giờ nó commits mỗi 500 record, điều này hiệu quả hơn nhiều

6. Đừng quên đánh index

Biết rồi khổ lắm nói mãi, nhưng vẫn cứ nói cho chắc =)) Cần đánh index, nhưng đánh thế nào thì chắc cần 1 bài viết để nói rõ ràng hơn, các bạn tự tìm hiểu thêm nhé

7. Destroy is expensive

Mặc dù `destroy` và `delete` đều xóa các record, nhưng `destroy` cũng sẽ thực hiện tất cả các `callback`, điều này có thể thực sự tốn thời gian. Tương tự đối với `“destroy_all”` và `delete_all`. Vì vậy, nếu bạn chắc chắn rằng bạn chỉ muốn xóa các bản ghi mà không cần chạm vào bất kỳ thứ gì khác, bạn có thể chỉ cần sử dụng `delete_all`.

Một trường hợp khác là nếu bạn muốn dọn dẹp toàn model table. Giả sử bạn muốn xóa tất cả users, bạn thực sự có thể sử dụng “TRUNCATE”:

```ruby
ActiveRecord::Base.connection.execute(“TRUNCATE TABLE users”)
```

Nhưng dù sao, xóa trong database vẫn thực sự tốn thời gian. Đây là lý do tại sao đôi khi chúng ta sử dụng phương pháp `soft delete`, không chỉ để có thể sử dụng dữ liệu đã được đánh dấu xoá.

8. Không cần chạy mọi thứ ngay lập tức

Background job is your friend. Sử dụng các công cụ như Resque và Sidekiq sẽ giúp hệ thống của bạn dễ `thở` hơn nhiều

Nói một cách dễ hiểu, nếu data của bạn lớn, hãy cố gắng hết sức có thể để chạy chúng ở background. Mặc dù cung cấp sự tiện lợi, ActiveRecord làm chậm hệ thống của bạn một chút. Tuy nhiên, thông qua những mẹo thực tế này, bạn vẫn có thể giữ cho các ứng dụng Rails trở nên tuyệt vời trong khi không bị mất quá nhiều performance.

9. Chấp nhận hy sinh thứ kém quan trọng hơn

Cái này thuộc về lựa chọn, tuỳ theo business logic mà bạn gặp trong dự án nữa. Mình lấy ví dụ bài toán đếm view trang web / sản phẩm. Cách đơn giản nhất là mỗi khi có request thì bạn +1 vào biến đếm trong database. Tuy nhiên, cách này sẽ gặp vấn đề là +1 view vào database sẽ làm chậm response của người dùng, thêm nữa là ví dụ có 1000 người requét cùng lúc, sẽ là 1000 câu query update ... Nghĩ thôi cũng mệt rồi ...
Để giải quyết vấn đề này thì ta nên sử dụng 1 tầng cache, rồi tạo ra 1 scheduled job lặp đi lặp lại để ghi data từ cache xuống DB. Việc phát sinh query update vào DB chỉ xảy ra trên các scheduled job, do vậy ta đã giảm thiểu số lần update DB thành 1 con số cố định và có thể cân đối được, chưa kể tránh dồn queue nếu dùng worker để update biến đếm. Ví dụ nếu scheduled job chạy 10s 1 lần thì trong 1 phút sẽ chỉ có tối đa 6 query update DB được tạo ra (thay vì cả 1000 query update như trước). Dữ liệu view của sản phẩm sẽ không được update realtime mà sẽ có độ trễ tùy theo tần suất scheduled job. Tuy nhiên độ trễ này thường là chấp nhận được khi so sánh với những lợi ích nó mang lại.

**Tổng kết**

Done, qua bài viết trên mình muốn tổng hợp lại các kĩ thuật cơ bản mà ai cũng có thể sử dụng để tránh những mệt mỏi không đáng có khi triển khai 1 project Rails. Hy vọng bài viết sẽ có ích với mọi người.
