---
title: "Sử dụng Serverless để chuyển đổi ảnh sang định dạng WEBP bằng Ruby"
date: "2020-06-29"
published: true
tags:
  - ruby
---

## Vấn đề đặt ra
- Thứ nhất: Làm thế nào để hiển thị 100 tấm ảnh/1 trang một cách nhanh nhất? Đảm bảo tối ưu tốc độ load ảnh, nâng cao hiệu quả SEO Google và trải nghiệm người dùng tốt hơn.

- Thứ hai: Để người dùng upload ảnh lên server với dung lượng trên 500MB. Nếu để web server xử lý quá trình nhận dữ liệu từ user upload lên, sau đó convert đối với file có dung lượng lớn thì không hề ổn chút nào. Vậy để giảm tải cho web server thì ta sẽ sử dụng serverless trong tình huống này. [(Vì sao sử dụng serverless?)](https://aws.amazon.com/vi/serverless/)

## Sự trổi dậy của Webp

![Compare](https://miro.medium.com/max/1698/1*fRLZo9RWFkC2rkHXJzrdQA.png)

Định dạng WebP đã trở nên ngày càng phổ biến kể từ khi Google giới thiệu nó vào năm 2010. Điểm mạnh lớn nhất của nó nằm ở khả năng tạo kích thước tệp nhỏ hơn nhiều trong khi vẫn duy trì chất lượng hình ảnh tương tự.

Định dạng Webp sẽ giúp bạn giảm 26%  dung lượng so với PNG. và  25 – 34% so với định dạng JPEG, mà vẫn vẫn giữ được chất lượng hiển thị. Điều này giúp web giảm thời gian tải ảnh, tăng tốc độ trải nghiệm người dùng.

<figure class="paragraph-image">
  <img src="https://user-images.githubusercontent.com/59222278/85985771-616f8700-ba15-11ea-9f7c-0b2161fa86f9.png" alt="web compress">
  <figcaption>Nguồn từ: https://bitsofco.de/why-and-how-to-use-webp-images-today/</figcaption>
</figure>

Tuy nhiên với định dạng Webp thì không phải tất cả các trình duyệt đều hỗ trợ. Hiện tại, WebP thực sự được hỗ trợ trong các phiên bản mới nhất của Google Chrome, Firefox, Edge, trình duyệt Opera, Trình duyệt Android và Samsung internet.

<figure class="paragraph-image">
  <img src="https://user-images.githubusercontent.com/59222278/85986227-19049900-ba16-11ea-8707-5e09c467ba4f.png" alt="WebP support table">
  <figcaption><a href="https://bitsofco.de/why-and-how-to-use-webp-images-today" target="_blank">WebP support table</a></figcaption>
</figure>

## Triển khai ý tưởng
Ở browser, khi người dùng upload ảnh thì web server sẽ có nhiệm vụ gián tiếp nhận hình ảnh, xác thực và đẩy ảnh lên S3 để lưu trữ. Khi S3 nhận thấy rằng có ảnh mới được đẩy lên sẽ gọi (trigger) đến lambda để tiến hành convert sang dạng webp. Sau khi convert ảnh thì sẽ được lưu tại thư mục mới mà ta chỉ định (dĩ nhiên ta sẽ không override lại ảnh gốc mà user đẩy lên, mà là tạo ra 1 file ảnh thumb với định dạng webp). Trong quá trình  Lambda xử lý ta có thể dùng cloudWatch để debug.

<figure class="paragraph-image">
  <img src="https://user-images.githubusercontent.com/59222278/85989062-30458580-ba1a-11ea-9a22-4dad722102d8.png" alt="diagram s3-lambda">
  <figcaption>Diagram S3 Lambda</figcaption>
</figure>

Vậy để chuyển đổi ảnh sang định dạng Webp thì chúng ta có thể dùng [imageMagick](https://imagemagick.org/index.php) hoặc [cwebp](https://developers.google.com/speed/webp/docs/cwebp).

<figure class="paragraph-image">
  <img src="https://miro.medium.com/max/500/1*_TeG6-eUitTR_l3SKpJ5Ow.jpeg" alt="LEGENDARY">
</figure>


## Thực hiện

### 1. Ở màn hình console Cloud AWS

Truy cập IAM, chọn roles và tạo full quyền S3 và CloudWatch để Lambda có thể lấy dữ liệu từ S3 và ghi log vào cloudWatch. Ở đây ta đặt tên là `full-s3-logs`

![](https://i.imgur.com/Rew8ydu.png)

Chuẩn bị 1 cặp `access_key_id` và `secret_key_id`. Nếu chưa có hãy click vào *Username > My security Credentials > Access keys > Tiến hành tạo key* (Nên download file csv về máy, vì key sau khi tạo ra sẽ không thể khôi phục lại nếu mất). Hãy nhớ bảo mật key này, không được public.

Truy cập vào trang  [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications) tìm libraries  [image-magick-lambda-layer](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer). Và click nút deploy để cài đặt thư viện *imagemagick* cho serverless.

![](https://i.imgur.com/9d8kx1C.png)

### 2. Ở môi trường Local

Cài đặt  [serverless framework](https://www.serverless.com/)  bằng npm:  `npm i serverless`

Chạy lệnh:  `serverless create -t aws-ruby -p image-resizer<:Tên Project>`  để tạo project serverless viết bằng ngôn ngữ ruby

Chạy lệnh:  `bundle init`  để tạo ra Gemfile. Ở đây ta dùng 2 gem `aws-sdk` và `minimagick`


```yaml
# Gemfile
source 'https://rubygems.org'

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

gem 'aws-sdk-s3', '~> 1.30.0'
gem 'mini_magick', '~> 4.9.0'
```

Hãy check version ruby trước khi thực hiện lệnh bundle. Hãy xác định rằng serverless sử dụng version ruby nào thì dưới local lúc bundle phải sử dụng version ruby giống như thế. Ở đây dùng rvm nên ta có lệnh  `rvm use 2.7.0`  để thiết lập phiên bản ruby.

Chạy lệnh:  `bundle install --path vendor/bundle` để bundle vào thư mục dự án

Có nhiều cách để cài đặt credential dưới local  [(Tham khảo thêm)](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/ "Hướng dẫn cài đặt credential"). Ở đây ta dùng cách đơn giản nhất là export biến trực tiếp tại 1 session tab terminal (nếu tắt tab đi thì hết hiệu lực). Gõ lệnh  `export AWS_SECRET_ACCESS_KEY=secret_keys`  và  `export AWS_ACCESS_KEY_ID=access_key`.

Sau các bước chuẩn bị ở trên thì trong project sẽ gồm các file: *Gemfile, serverless.yml, handler.rb và thư mục vendor/bundle/ruby/2.7.0*

### Code

_handler.rb:_  File này sẽ là endpoint để lambda gọi tới. Nó sẽ có 2 params truyền vào là event và context

```ruby
load_path = Dir["/opt/bundle/ruby/2.7.0/gems/**/lib"]
$LOAD_PATH.unshift(*load_path)

require 'converter'

class ImageHandler
  def self.process(event:, context:)
    event = event["Records"].first
    bucket = event["s3"]["bucket"]["name"]
    filename = event["s3"]["object"]["key"]

    file = Converter.from_s3(bucket, filename)
    file.convert2webp
    file.upload_file(ENV['BUCKET_DEST'])
  end
end
```

Tạo 1 file _converter.rb:_ File này dùng để lấy image từ s3, tiến hành convert và upload ngược lại lên s3.

```ruby
require "aws-sdk-s3"
require "mini_magick"

class Converter
  def self.from_s3(bucket_name, filename)
    puts '==###== Downloading image from S3'
    s3 = Aws::S3::Resource.new()
    object = s3.bucket(bucket_name).object(filename)

    tmp_filename = "/tmp/#{filename}"
    object.get(response_target: tmp_filename)

    puts  "==###== Successfully downloaded"

    Converter.new(filename)
  rescue => e
    puts "==!!!== Error while downloading: #{e}"
  end

  def initialize(filename)
    extname = File.extname(filename)
    @filename = filename
    @basename = filename.split(extname).first
    @tmp_file = "/tmp/#{filename}"
  end

  def convert2webp
    @converted_filename = "#{@basename}.webp"
    @converted_tmp_file = "/tmp/#{@converted_filename}"

    puts "==###== Converting the image #{@tmp_file} to #{@converted_tmp_file}"

    MiniMagick::Tool::Convert.new do |convert|
      convert << @tmp_file
      convert << @converted_tmp_file
    end
    puts  "==###== Successfully converted"
  rescue => e
    puts "==!!!== Error while converting: #{e}"
  end

  def upload_file(dest_bucket)
    puts '==###== Uploading image to S3'

    s3 = Aws::S3::Resource.new()
    object = s3.bucket(dest_bucket).object(@converted_filename).upload_file(@converted_tmp_file)
    puts  "==###== Successfully uploaded"
  rescue => e
    puts "==!!!== Error while uploading: #{e}"
  end
end

```

_serverless.yml:_ File config cho framework

```yaml
service: convert-image-to-webp

custom:
  bucket:
    source: your-images
    dest: convert-image-to-webp-2705
provider:
  name: aws
  runtime: ruby2.7
  region: us-east-1
  role: arn:aws:iam::440937316816:role/full-s3-logs

functions:
  handle_convert:
    handler: handler.ImageHandler.process
    layers:
      - {Ref: GemsLambdaLayer}
      - arn:aws:lambda:us-east-1:440937316816:layer:image-magick:1
    environment:
      BUCKET_DEST: convert-image-to-webp-2705
    memorySize: 512 # in MB
    timeout: 900 # in seconds
    events:
      - s3:
          bucket: ${self:custom.bucket.source}
          event: s3:ObjectCreated:*
package:
 exclude:
   - vendor/**
   - Gemfile
   - Gemfile.lock

layers:
  gems:
    path: vendor
    description: Project's vendor

resources:
  Resources:
    ConvertImage:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:custom.bucket.dest}

```

Cuối cùng thì chạy lệnh  `serverless deploy`. Framework sẽ tiến hành tạo cloudformation trên AWS và Cloudformation sẽ tự động build serverless lambda theo những gì ta đã cấu hình trong file serverless.yml

## Giải thích

Trong này chỉ có file serverless.yml là cần để giải thích từng đoạn code, còn file ruby thì chúng ta đọc củng có thể nắm được nội dung rồi.

**Đoạn 1**

```yaml
custom:
  bucket:
    source: your-images
    dest: convert-image-to-webp-2705
```

Dùng để tạo biến tham chiếu cho bên dưới sử dụng. Ở đây ta có 2 tham chiếu là source và dest. Cách gọi thì syntax: `${self.custom.bucket.source}` và  `${self:custom.bucket.dest}`

**Đoạn 2**

```yaml
provider:
  name: aws
  runtime: ruby2.7
  region: us-east-1
  role: arn:aws:iam::440937316816:role/full-s3-logs
```

**name:**  Sử dụng dịch vụ AWS

**runtime:**  Chạy phiên bản ruby2.7

**region:**  Region chạy lambda

**role:**  Do trước đó ta đã tạo role rồi, nên ở đây ta chỉ cần link đến là được. Còn không thì ta vẫn có thể tạo ở trong này. Có thể tham khảo thêm tại trang chủ serverless.

**Đoạn 3**

```yaml
functions:
  handle_convert:
    handler: handler.ImageHandler.process
    layers:
      - {Ref: GemsLambdaLayer}
      - arn:aws:lambda:us-east-1:440937316816:layer:image-magick:1
    environment:
      BUCKET_DEST: convert-image-to-webp-2705
    memorySize: 512 # in MB
    timeout: 900 # in seconds
    events:
      - s3:
          bucket: ${self:custom.bucket.source}
          event: s3:ObjectCreated:*
```

**functions:**  Ở đây ta chỉ định nghĩa 1 function là `handle_convert`. Ngoài ra củng có thể define nhiều function hơn

**handler:**  Sẽ define endpoint để lambda trigger  `handler(tên file).ImageHandler(tên class).process(tên method)`

**layers:**  Chúng ta sử dụng 2 lớp layer để phục vụ cho việc convert, lớp layer đầu tiên có tên là GemsLambdaLayer (layer này sẽ đề cập ở đoạn 5). Layer này chưa thư mục bundle. Function này muốn tham chiếu đến layer thì sử dụng syntax `{Ref: TenLayer<Viết theo kiểu CamelCase>}`

Layer thứ 2 là 1 đường link arn:aws. Do bước trên ta có sử dụng 1 layer có sẵn của AWS là image-magick-lambda nên ta sẽ pasted đường link layer đó vào đây.

**environment:**  Khai báo tên biến môi trường

**memorySize:**  Khai báo lượng Ram để lambda xử lý

**timeout:**  Thời gian giới hạn xử lý. Nếu ta để Ram quá ít hoặc timeout quá ít thì lambda sẽ không thực hiện được. Nhưng để nhiều quá thì lại tốn phí (bởi vì lambda sẽ dựa vào 2 tiêu chí này để tính tiền), cho nên hãy cân nhắc sao cho phù hợp.

**events:**  Ở đây ta muốn hướng đến là S3 với bucket là  your-images. Sự kiện khi có 1 object được tạo thì sẽ trigger đến lambda.

**Đoạn 4**

```yaml
package:
 exclude:
   - vendor/**
   - Gemfile
   - Gemfile.lock
```

Mục đích là ta không muốn đẩy các file bên dưới lên serverless.

**Đoạn 5**

```yaml
layers:
  gems:
    path: vendor
    description: Project's vendor
```

Ở dưới local khi ta bundle thì sẽ tạo ra thư mục vendor. Vậy ta sẽ dùng vendor này để làm 1 lớp Layer. Ở đây mình đặt tên layer là  `gems`  Cho nên khi reference thì ta phải viết cho đúng syntax mà framework yêu cầu, tức là viết dạng camelCase với suffix là  `LambdaLayer`. Cho nên dở đoạn 3 ta mới ghi là `{Ref: GemsLambdaLayer}`

**Đoạn 6**

```yaml
resources:
  Resources:
    ConvertImage:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: ${self:custom.bucket.dest}

```

Dùng để tạo 1 bucket đích. Để sau khi xử lý convert xong thì ta upload vào bucket này

## Lời kết

Trong bài này mình đã hướng dẫn và giải thích chi tiết, hi vọng khi thực hiện sẽ không phát sinh lỗi. Nếu có thì chúng ta có thể xem log trong Cloudwatch để fix dần thôi. Chúc các bạn thành công.
