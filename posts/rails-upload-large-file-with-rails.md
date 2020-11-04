---
title: "[Rails] Upload large file with rails"
date: "2020-07-20"
published: true
tags:
  - rails
---
**Problem**

Chắc hẳn ai từng động đến việc upload video đều phải đối mặt với vấn đề khi dung lượng video quá lớn, rất có thể chúng ta sẽ không thể upload mà nhận về 1 lỗi 413(request entity is too large) hoặc request time out. Cách phù hợp nhất mình tìm hiểu được để giải quyết vấn đề này là chia nhỏ các file và ghép chúng lại khi quá trình tải hoàn tất. Javascript có `FileReader API` có thể giúp chúng ta đọc và chia nhỏ file. Tuy nhiên nó không hỗ trợ thực sự tốt cho các trình duyệt. Rất may là Jquery có 1 file upload plugin có thể xử lý vấn đề này khá tốt

**Introducing jQuery File Upload Plugin**

https://github.com/blueimp/jQuery-File-Upload

Plugin trên có đầy đủ các tính năng mà chúng ta có thể cần để làm việc với file upload như tải nhiều file, kéo thả, confirm, ... Trong bài này chúng ta chỉ quan tâm tới việc hỗ trợ tải các file có dung lượng lớn

Về cơ bản, chúng ta tạo 1 form upload đơn giản để người dùng có thể chọn file tải lên và cũng cấp 1 thanh progress bar để khách hàng có thể theo dõi tiến trình upload.

```html
<!-- uploads/new.html.erb -->
<%= form_tag uploads_url, multipart: true, id: 'fileupload' do %>
  <%= label_tag 'File:' %>
  <%= file_field_tag :upload %>
  <%= submit_tag 'Upload' %>
<% end %>

<div id="progress-bar">
  <div id="progress"></div>
</div>
```

Trên đây là đoạn code để tạo form upload và progress bar. Sau đó sẽ là code javascript để chia tệp thành nhiều phần nhỏ hơn và sẵn sàng cho việc upload. Lưu ý tùy chọn  `maxChunkSize`, nếu không có nó, tệp sẽ được tải lên 1 cách bình thường. Trong callback chúng ta lặp lại với từng file đã chọn(trong trường hợp việc upload nhiều file được kích hoạt) và tạo 1 post request để tạo ra 1 Upload record mới và trả về `id` cùng với `uploaded_size` như 1 JSON object.

```js
var files = [];
$('#fileupload').fileupload({
  dataType: 'json',
  url: '/chunk_upload',
  maxChunkSize: 1000000,
  add: function(e, data) {
    $.each(data.files, function(index, file) {
      $.ajax({
        method: 'post',
        dataType: 'json',
        url: '/uploads',
        data: { filename: file.name },
        success: function(res) {
          data.formData = res;
          files.push(data);
        }
      });
    });
  },
  // more code
});
```

Trong khi tải lên sẽ có `progressall` callback trả lại. Chúng ta có thể dựa vào đó để tính toán thanh progress bar hiển thị cho user

```js
$('#fileupload').fileupload({
  // same code as above
  progressall: function(e, data) {
    var done = parseInt(data.loaded * 100) / data.total
    $('#progress').css({ width: done + '%'})
  }
});
```

Cuối cùng là 1 đoạn js để tải file lên khi người dùng nhấn nút upload.

```js
$('#fileupload').on('submit', function(e) {
  e.preventDefault();
  if (files.length < 1) return;

  $.each(files, function(index, file) {
    file.submit();
  });

  files = [];
});
```

Ok, chúng ta đã xong phía client, giờ là xử lý phía server. Chúng ta sẽ làm 2 bước, đầu tiên là tạo 1 upload record trong create action để generate 1 unique uuid, thứ được sử dụng như 1 filename để tạo path column cho upload record. Nếu thành công chúng ta nối thêm nội dung đọc từ file chunk vào file với đường dẫn từ path column của upload record, nếu không thì báo lỗi.

```ruby
class UploadsController < ApplicationController
  def create
    filename = params[:filename]
    uuid = SecureRandom.uuid
    ext  = File.extname(filename)
    dir  = Rails.root.join('tmp', 'upload').to_s
    FileUtils.mkdir_p(dir) unless File.exist?(dir)

    @upload = Upload.new(
      filename: filename,
      path: File.join(dir, "#{uuid}#{ext}")
    )

    if @upload.save
      render json: { id: @upload.id, uploaded_size: @upload.uploaded_size }
    else
      render json: { error: @upload.errors }
    end
  end

  def chunk_create
    file    = params[:upload]
    @upload = Upload.find_by(id: params[:id])
    @upload.uploaded_size += file.size

    if @upload.save
      File.open(@upload.path, 'ab') { |f| f.write(file.read) }
      render json: { id: @upload.id, uploaded_size: @upload.uploaded_size }
    else
      render json: { error: @upload.errors }, status: 422
    end
  end
end
```
Vậy là xong, trên đây là hướng dẫn về cách upload file có kích thước lớn với , nếu bài viết có gì khó hiểu hoặc sai mong các bạn góp ý cho mình, cảm ơn tất cả các bạn!

*by Ngô Thái Minh - Tomosia Việt Nam*
