---
title: "Paging Image with RecyclerView"
date: "2021-03-29"
published: true
tags:
  - kotlin
  - android
---
[[snippet]]
|Sử dụng RecyclerView để tạo hiệu ứng paging, scale animation giống như ViewPager. Ngoài ra còn có thể tùy chỉnh nhiều thứ hơn...
	
 ##1. Mục đích
<iframe src="https://giphy.com/embed/3Fu63e8GAbVLZwflgn" width="116" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/3Fu63e8GAbVLZwflgn"></a></p>

Tạo ra một ứng dụng đơn giản :
- Hiển thị ảnh dưới dạng page.
- Hoạt ảnh hấp dẫn : ảnh chính được phóng to và hiển thị ở trung tâm, ảnh phụ thu nhỏ
- Ảnh được giữ nguyên tỷ lệ khung hình.	
Thông thường trong trường hợp này chúng ta sẽ sử dụng ViewPager2. Nhưng sử dụng ViewPager2 thì bạn sẽ gặp rất nhiều vấn đề liên quan đến xử lý ảnh như : kích thước, tỷ lệ ảnh tùy biến,... 
Vì thế chúng ta sẽ xử dụng RecyclerView vạn năng, dễ dàng tùy chỉnh để tạo ra một ví dụ đơn giản cho một ứng dụng trình chiếu ảnh.
##2. Khởi tạo project
 Ở project này mình sẽ sử dụng một RecyclerView với thuộc tính :
  ```
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 ```
 Item đổ vào RecyclerView mình để một ImageView với thuộc tính :
 ```
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:scaleType="fitXY"
```
Như vậy các ảnh hiển thị lên bây giỡ sẽ có khung hình tương ứng với kích thước của nó.
Tiếp theo chúng ta sẽ cần thêm nguồn ảnh để hiển thị. Mình sẽ xử dụng ảnh từ một nguồn free khá hay từ trang https://unsplash.com/developers, các bạn có thể tham khảo cách setup từ tài liệu có sẵn của họ. Sử dụng retrofit2 để lấy data và sau đó sử dụng Glide để load ảnh lên mình có kết quả như sau đây.
<iframe src="https://giphy.com/embed/nAVO6aTjIgov1Ey9nd" width="1160" height="2400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/nAVO6aTjIgov1Ey9nd"></a></p>

<p><a href="https://github.com/LamPham030921/PagerWithRecyclerView/tree/set_up_project">Source Code Setup Project</a></p>

##3. Chỉnh sửa kích thước ảnh
Sửa lại thuộc tính chiều cao của RecyclerView thành giá trị cố định 
 ```
android:layout_height="@dimen/recycler_height"
 ```
Trong onBindViewHolder của PhotoAdapter, ta thêm đoạn code
 ```
val recyclerHeight = 
it.context.resources.getDimensionPixelSize(R.dimen.recycler_height)
val percent: Float = photo.width!!.toFloat() / photo.height!!.toFloat()
it.layoutParams =  ConstraintLayout.LayoutParams((recyclerHeight * percent).toInt(), recyclerHeight)
```
		
Như vậy chúng ta đã thay đổi lại kích thước của các ảnh mà vẫn giữ nguyên tỷ lệ. Ngoài ra mình cũng sẽ thêm vào một callback để thực hiện load thêm ảnh mỗi khi người dùng cuộn đến gần cuối của list ảnh hiện tại 
``` 
private fun initRecyclerViewItemListener() {
        val layoutManager = binding.rvPhotos.layoutManager as LinearLayoutManager  
        binding.rvPhotos.addOnScrollListener(object : RecyclerView.OnScrollListener() {  
            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {  
                super.onScrolled(recyclerView, dx, dy)  
                val lastPosition = layoutManager.findLastCompletelyVisibleItemPosition()  
                if (lastPosition == listPhoto.size - 2) viewModel.loadMoreImage()  
            }  
        })
       }
```
Và kết quả....
<iframe src="https://giphy.com/embed/iLcllIzqpGuRDKwFHw" width="116" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/iLcllIzqpGuRDKwFHw"></a></p>

<p><a href="https://github.com/LamPham030921/PagerWithRecyclerView/tree/fix_photo_size">Source Code Fix Image Size</a></p>

 ##4. Hiệu ứng phân trang
Hiện tại RecyclerView đang được cuộn một cách tự do nhưng chúng ta cần phải hiển thị ảnh đang được chọn một cách nổi bật ở trung tâm. Thật may là RecyclerView đã hỗ trờ chúng ta việc phân trang bằng cách sử dụng `SnapHelpers`.Chỉ với một  dòng code đơn giản : `PagerSnapHelper().attachToRecyclerView(binding.rvPhotos)`
Như vậy chúng ta đã có khả năng phân trang cũng như hiển thị ảnh hiện tại ở chính giữa như hiệu ứng mà ViewPager mang lại.
Tiếp đến chúng ta sẽ custom thêm`ProminentLayoutManager` kế thừa từ `LinearLayoutManager` để tạo hiệu ứng cho RecyclerView.
Chi tiết bạn có thể xem trong `PhotosAdapter` . Trong đó quan trọng nhất là thuộc tính `scaleDownBy`, thuộc tính này thể hiện cho độ chênh lệch giữa item được làm nổi bật và các item phụ ( Được tính : item phụ sẽ bằng 1 - `scaleDownBy` * 100%). 
Mình sẽ để chênh lệch là 30 % : `private val scaleDownBy: Float = 0.3f`

Thành quả thu được ...
<iframe src="https://giphy.com/embed/kzLXEKad2mzOzvgrpY" width="116" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/kzLXEKad2mzOzvgrpY"></a></p>
<p><a href="https://github.com/LamPham030921/PagerWithRecyclerView/tree/add_paging">Soucre Code Add Paging
</a></p>

##5. Hoàn thiện
Một lỗi nhỏ gặp phải khi thực hiện hiệu ứng phóng to - thu nhỏ là khoảng trắng chúng ta đặt để phân chia các item nhỏ cũng sẽ bị thay đổi theo.
Chúng ta sẽ xử lý bằng cách tính toán đoạn khoảng trắng bị phóng to ra của item chính giữa `translationXFromScale`. Sau đó thêm nó vào cho item phụ bị thu nhỏ .
Cuối cùng chúng ta thêm một callback để lắng nghe khi RecyclerView ngừng cuộn thì chúng ta sẽ đặt background là hình ảnh đang ở trung tâm của RecyclerView.
```	
override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {  
        super.onScrollStateChanged(recyclerView, newState)  
        if (newState == RecyclerView.SCROLL_STATE_IDLE) {  
            val firstPosition = layoutManager.findFirstCompletelyVisibleItemPosition()  
            Glide.with(context!!).load(listPhoto[firstPosition].urls?.regular)  
                .into(binding.ivBackground)  
        }  
    }

```
Thành quả cuối cùng mà chúng ta thu được.
<iframe src="https://giphy.com/embed/3Fu63e8GAbVLZwflgn" width="116" height="240" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/3Fu63e8GAbVLZwflgn"></a></p>
<p><a href="https://github.com/LamPham030921/PagerWithRecyclerView/tree/fix_scale_space">Source Code Final Version</a></p>

##6. Tổng Kết
Qua bài viết mình đã giới thiệu qua cho mọi người một phương pháp để tạo ra một hiệu ứng khá thú vị và rất dễ chỉnh sửa. Mong nhận được sự ủng hộ cũng như nhận xét của mọi người.
Hẹn gặp lại mọi người ở các bài viết sau.
Link bài viết gốc : https://medium0.com/m/global-identity?redirectUrl=https%3A%2F%2Fproandroiddev.com%2Fpaging-image-gallery-with-recyclerview-f059d035b7e7
[[author | Lam Pham ]]
