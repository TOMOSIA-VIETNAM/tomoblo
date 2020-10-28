---
title: "Friendly url in Rails"
date: "2020-10-27"
published: true
tags:
  - rails
---

Chúng ta thường thấy các trang web từ Rails xây dựng url dựa trên primary key-cột id từ database. Bây giờ hãy tưởng tượng chúng ta có một model Person và các associated. Chúng ta có 1 record người dùng với tên Bob Martin và có id là 6. Theo mặc định, url show record trên sẽ là

```ruby
/people/6
```

Nhưng đối với các mục đích về SEO hay thậm chí là thẩm mĩ, chúng ta sẽ muốn có tên của Bob trong url. Số 6 ở cuối url được gọi là "slug". Chúng ta hãy xem xét 1 vài cách để implement url trên tốt hơn

**Simple Approach**

Phương pháp đơn giản nhất là override method to_param trong Persol model. Bất cứ khi nào cúng ta gọi route helper như sau:

```ruby
person_path(@person)
```

Rails sẽ gọi đến method to_param để chuyển object đến 1 slug cho url. Trong model của chúng ta nếu không define 1 method to_param thì Rails sẽ mặc định sử dụng method trong ActiveRecord::Base và trả về id
Để sử dụng to_param, điều quan trọng là sử dụng các đối tượng ActiveRecord thay cho id. Đừng bao giờ sử dụng:

```ruby
person_path(@person.id) # Bad!
```

Thay vào đó, hãy sử dụng:

```ruby
person_path(@person)
```

**Slug Generation with to_param**

Trong model, chúng ta có thẻ override to_param bao gồm 1 parameterized version của person's name:

```ruby
class Person < ActiveRecord::Base
  def to_param
    [id, name.parameterize].join("-")
  end
end
```

Phương pháp trên sẽ biến bất kì 1 chuỗi nào thành kí tự hợp lệ cho url. Trong ví dụ của chúng ta, kết quả trả về sẽ là

```ruby
/people/6-bob-martin
```

**Object Lookup**

Chúng ta cần làm gì để thay đổi finder của chúng ta? Không gì cả :))

Khi chúng ta gọi Person.find(x), tham số x được chuyển đổi sang một số nguyên để thực hiện việc tra cứu SQL. Chúng ta có thể thử kiểm tra kết quả với 1 vài string gồm cả số và chữ:

```ruby
"1".to_i
# => 1
"1-with-words".to_i
# => 1
"1-2345".to_i
# => 1
"6-bob-martin".to_i
# => 6
```

Method to_i sẽ ngừng việc interpreting string ngay khi nó bắt gặp 1 kí tự không phải chữ số. Do đó method to_param sẽ luôn thực hiện các tra cứu dựa trên id và loại bỏ phần còn lại của slug.

**Benefits / Limitations**

Lợi ích đầu tiên chúng ta có thể thấy là việc cải thiện SEO và làm cho url của chúng ta dễ đọc hơn

Một hạn chế  của phương pháp này là người dùng không thể tha tác với các url 1 cách có ý nghĩa.

Một hạn chế khác là id vẫn tồn tại trong url. Nếu bạn muốn che giấu, hay làm id trở nên khó hiểu hoặc không có ý nghĩa thì sẽ không nhận được hỗ trợ từ phương pháp này

**Using a Non-ID Field**

Đôi khi bạn muốn có được từ ID tất cả các thuộc tính khác trong cơ sở dữ liệu để tra cứu. Hãy tưởng tượng chúng ta có một object Tag và nó có một cột name. Nó có thể có giá trị là ruby hoặc rails.

**Link Generation**

Chúng ta có thể override to_param để tạo links:

```ruby
class Tag < ActiveRecord::Base
  validates_uniqueness_of :name

  def to_param
    name
  end
end
```

Và bây giờ khi chúng ta gọi tag_path(@tag), chúng ta sẽ được /tags/ruby

**Object Lookup**

Việc tra cứu sẽ khó khăn hơn, mặc dù khi có 1 request đến url này nó sẽ được lưu trữ trong param[:id] bởi router.

1 controller bình thường sẽ gọi ra Tag.find ("ruby"), và nó sẽ fail chặt :))

Chúng ta có 1 vài lựa chọn ở đây:

**Option 1: Query Name from Controller**

Chúng ta có thể thay đổi controller để sử dụng Tag.find_by_name(params[:id]). Nó sẽ đảm bảo code của chúng ta chạy được, nhưng lại làm xấu thiết kế hướng đối tượng. Chúng ta đang phá vỡ tính đóng gói của class Tag.

**Option 2: Custom Finder**

Chúng ta có thể custom trong model Tag:

```ruby
class Tag < ActiveRecord::Base
  validates_uniqueness_of :name

  def to_param
    name
  end

  def self.find_by_param(input)
    find_by_name(input)
  end
end
```

**Option 3: Overriding Find**

Chúng ta sẽ override find method:

```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    find_by_name(input)
  end
end
```

Nó sẽ làm việc với column name của model Tag, nhưng sẽ thất bại với id. Làm thế nào để xử lí với cả 2?

```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    if input.is_a?(Integer)
      super
    else
      find_by_name(input)
    end
  end
end
```

Ok, giờ thì nó đã làm việc. Nhưng khi phải viết is_a, bạn nên suy nghĩ xem có cách nào tốt hơn. Và ở đây chúng ta có thể dựa trên 1 vài nguyên tắc để làm nó tốt hơn:

Databases cung cấp id 1 cho bản ghi đầu tiên
Ruby converts strings bắt đầu với 1 kí tự thành 0

```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    if input.to_i != 0
      super
    else
      find_by_name(input)
    end
  end
end
```

Hoặc:

```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    input.to_i == 0 ? find_by_name(input) : super
  end
end
```

Có vẻ đã ổn, nhưng có 1 lỗi có thể xảy ra: nếu 1 cái tên bắt đầu bằng 1 số, nó sẽ được hiểu như 1 id. Hãy thêm xác nhận để biết rằng 1 cái tên không thể bắt đầu bằng 1 số

```ruby
class Tag < ActiveRecord::Base
  #...
  validates_format_of :name, without: /^\d/
  def self.find(input)
    input.to_i == 0 ? find_by_name(input) : super
  end
end
```

## Using the FriendlyID Gem

Tiện lợi hơn 1 chút thì chúng ta có thể sử dụng gem FriendlyID

Add gem vào Gemfile:

```ruby
gem "friendly_id", "~> 4.0.0"
```

Gõ bundle trong terminal để cài đặt

**Simple Usage**

Thêm vào model

```ruby
class Tag < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name
end
```

**Dedicated Slug**

```ruby
class Tag < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
end
```

**Usage**

Chúng ta có thể thấy trong action sau:

```ruby
t = Tag.create(name: "Ruby on Rails")
=> #<Tag id: 16, name: "Ruby on Rails", created_at: "2011-09-11 15:42:53", updated_at: "2011-09-11 15:42:53", slug: "ruby-on-rails">
Tag.find 16
=> #<Tag id: 16, name: "Ruby on Rails", created_at: "2011-09-11 15:42:53", updated_at: "2011-09-11 15:42:53", slug: "ruby-on-rails">
Tag.find "ruby-on-rails"
=> #<Tag id: 16, name: "Ruby on Rails", created_at: "2011-09-11 15:42:53", updated_at: "2011-09-11 15:42:53", slug: "ruby-on-rails">
t.to_param
=> "ruby-on-rails"
```

Như vậy, qua bài viết này chúng ta đã tiếp cận với friendly url bằng cả cách "hơi lười" và cách "hơi chăm", chúc các bạn có những giây phút coding thú vị
Bài viết dịch từ http://tutorials.jumpstartlab.com/topics/controllers/friendly-urls.html
