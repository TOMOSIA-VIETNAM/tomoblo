---
title: "Get Information Account From Facebook, Twitter, Line In Rails"
date: "2020-10-26"
published: true
tags:
  - ruby
  - rails
  - twitter
  - facebook
  - line
---

[[snippet]]
| Chào các bạn, mình có 1 topic nho nhỏ đó là lấy thông tin người dùng từ bên thứ 3 (facebook, twitter, line), khi mà chúng ta cần đăng kí và đăng nhập vào ứng dụng của mình bằng facebook, twitter, line thì việc lấy dữ liệu từ bên thứ 3 nó rất cần thiết. Vậy thì làm thế nào để lấy được dữ liệu đó? Thì trong bài viết này mình sẽ hướng dẫn các bạn lấy dữ liệu thông qua các thư viện hỗ trợ trong Rails nhé.

## 1. Facebook

- Cách 1 : sử dụng gem koala (https://github.com/arsduo/koala)

Đầu tiên ở thư mục project hiện tại vào gemfile add dòng sau : 
    
```ruby
gem 'koala'
```

Tiếp theo : 

`bundle install`

Lúc này cần define method để lấy dữ liệu : 

```ruby
  def fetch_facebook(token)
    profile = nil
    begin
      graph   = Koala::Facebook::API.new(token)
      fb_hash = graph.get_object('me', fields: 'id, email')  
      profile = { uid: fb_hash['id'], email: fb_hash['email'] } if fb_hash
    ensure
      profile
    end
  end
```
ở đây mình có 1 chú ý nhỏ về cái email mình cần phải cấp quyền cho nó mới lấy được email và các bạn vào link dưới để cấp quyền và lấy token để test thử nhé (https://developers.facebook.com/tools/explorer/).

Ngoài ra, thì dưới app cũng có thể cấp quyền và gửi token lên cho server thì ta có thể lấy được thông tin của người dùng từ facebook rồi.

- Cách 2 : Sử dụng gem httparty (https://github.com/jnunemaker/httparty)

Tương tự với gem koala thì chúng ta phải add gem và bundle nó nhé: 

`gem 'httparty'`

run:

`bundle install`

Tiếp theo thì cũng define method để dùng cho việc lấy dữ liệu nha:

```ruby
  def fetch_facebook(token)
    profile = nil
    begin
      fb_hash = HTTParty.get('[https://graph.facebook.com/v5.0/me?fields=email,id](https://graph.facebook.com/v5.0/me?fields=email,id)', query: {  
                           access_token: token  
                         }).parsed_response   
      profile = { uid: fb_hash['id'], email: fb_hash['email']} if fb_hash
    ensure
      profile
    end
  end
```
Để lấy được cái link trong get thì các bạn vào đây tham khảo để lấy nha:(https://developers.facebook.com/docs/graph-api/using-graph-api).

Qua method này thì mình có thể lấy được email và id rồi, nếu các bạn muốn lấy thêm thông tin khác như tên, ngày sinh,... thì thêm vào chỗ email,id nhé.

## 2. Twitter

Đối với twitter thì mình thấy có gem twitter hỗ trợ cũng khá ổn nên mình hướng dẫn các bạn dùng nó nhé. (https://github.com/sferik/twitter)

Tương tự thì mình cũng phải add gem và install nó thôi.

`gem 'twitter'`

`bundle install`

Tiếp đến thì mình cần tạo application của twitter để lấy được consumer_key và consumer_secret để config cho nó nhé: (https://developer.twitter.com/en/apps)
 
Đầu tiên các bạn tạo app như này giúp mình nhé:

![alt](https://user-images.githubusercontent.com/44299177/96090443-6556e480-0ef2-11eb-9c3c-ac0b6e404994.png)

Chi tiết app sẽ như sau:

Ở details app:

 ![alt](https://user-images.githubusercontent.com/44299177/96090807-f8901a00-0ef2-11eb-96eb-3015796a55e0.png)

 ![alt](https://user-images.githubusercontent.com/44299177/96090813-faf27400-0ef2-11eb-871d-2ddd85681554.png)

Ở keys and tokens:

 ![alt](https://user-images.githubusercontent.com/44299177/96090578-9c2cfa80-0ef2-11eb-8d9f-c3ff6b22317e.png)

Ở permissions:

 ![alt](https://user-images.githubusercontent.com/44299177/96091333-a8fe1e00-0ef3-11eb-9073-dd02f292011f.png)
 
Dựa vào mục keys and token thì các bạn đã lấy được consumer key, consumer secret, access token, access token secret, để test thoải mái rồi nha.

Sau đó mình cũng define method như sau và truyền các giá trị vừa lấy được vào đây nhé:

```ruby
def fetch_twitter(token, token_secret)
  profile = nil
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
      config.access_token        = token
      config.access_token_secret = token_secret
    end
    if client
      infor = client.verify_credentials(include_email: true)
      profile = { uid: infor.id, email: infor.email} 
    end
  ensure
    profile
  end
end
```

Các bạn nhớ chú ý cái method verify_credentials giúp mình nhé, nhờ nó mà mình mới lấy được email đó. Mình phải search đủ đường, kiểm tra đủ kiểu mới kiếm được nó đó nha. 

## 3. Line

Còn line thì mình đã và đang sử dụng cái gem rest-client nó hỗ trợ cho việc lấy dữ liệu của account line nè. (https://github.com/rest-client/rest-client).

Tương tự với Facebook và Twitter thì mình cũng add gem và bundle thôi: 

`gem 'rest-client'`

`bundle install`

Các bạn vào đây để lấy api get profile của line nha: (https://developers.line.biz/en/reference/social-api/#profile).

Line thì đơn giản hơn một xíu chẳng cần tạo app hay lấy key gì cả và chỉ cần define method như sau là được rồi:

```ruby 
  def fetch_line(token)
    profile = nil
    RestClient.get(
      'https://api.line.me/v2/profile',
      {
        "Authorization": "Bearer #{token}",
        "Content-Type": 'application/json'
      }
    ) do |response, _request, _result|
        response = JSON.parse(response)   
        profile = { uid: response['userId'] } if response['userId']
      end
      return profile
    end
  end
```
Thằng line này mình chưa lấy token bằng web mà mình nên mình nhờ phía app lấy token và gửi token lên cho mình nhé.

Line này thì mình không lấy được email đâu vì nó đăng nhập bằng số điện thoại mà và account nó không có email thì làm sao mà lấy. nên dựa vào method trên là mình đã lấy được id của nó rồi nha.

## 4. Kết luận

Vậy là xong phần lấy thông tin người dùng của facebook, twitter, line rồi ạ, ở bài viết này thì mình chỉ quan tâm nhiều đến việc lấy id và email, nếu mọi người cần lấy thêm nhiều thông tin hơn thì hãy đọc kỹ các thư viện trên nhé nó sẽ có thứ mà các bạn cần. Hi vọng bài viết này có thể giúp đỡ 1 phần nào đó trong dự án của bạn, và có khó khăn gì về cái này cứ comment ở dưới nhé mình sẽ check comment và support nếu có thể ạ. Cảm ơn mọi người đã đọc!

Happy coding !!!

[[author | Vo Van Tra ]]
