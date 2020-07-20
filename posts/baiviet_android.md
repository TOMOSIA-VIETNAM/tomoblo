---
title: "Hướng dẫn tạo Custom View [Android]"
date: "2020-07-20"
published: true
tags:
  - kotlin
  - android
---

# Hướng dẫn tạo custom View Android



Chào anh em.  nếu anh em đã từng xem những video dạy iOS của kênh 
[Lets Build That App](https://www.youtube.com/channel/UCuP2vJ6kRutQBfRmdcI92mA) trên Youtube thì có lẽ không xa lạ gì với việc dựng view 100% bằng code. Xem xong mấy anh em bên Android chắc cũng thắc mắc là không biết bên mình có làm được như vậy không.

Câu trả lời là có, tuy nhiên do bên Android dựng view bằng XML cũng rất ngon rồi nên chẳng ai quan tâm đến việc dựng view bằng code. Đấy là trong đa số các trường hợp nhưng đôi khi sẽ có những view mặc định Android không hỗ trợ, như một view dạng hình tròn chằng hạn, khi đó chúng ta sẽ phải dùng tới thư viện hoặc tự tạo một class để vẽ view đó.

Bài hôm nay sẽ hướng dẫn mọi người vẽ một view bằng code. Để bắt đầu cùng đọc qua những thuật ngữ cơ bản, bắt đầu thôi


# View là gì?
`This class represents the basic building block for user interface components. A View occupies a rectangular area on the screen and is responsible for drawing and event handling.  View is the base class for widgets, which are used to create interactive UI components (buttons, text fields, etc.). The ViewGroup subclass is the base class for layouts, which are invisible containers that hold other  Views (or other ViewGroups) and define their layout properties.`

Mình trích dẫn nguyên từ tài liệu của  [Google](https://developer.android.com/reference/android/view/View?authuser=1#) vì thấy nó cũng dễ hiểu, dịch ra sẽ làm sai lệch đi nội dung của định nghĩa.


- Đầu tiên chúng ta sẽ tạo một project mới. Chọn Empty Project

![alt text](https://firebasestorage.googleapis.com/v0/b/tudiendanhngon-ba6bc.appspot.com/o/Image%2FLinhTinh%2FScreenshot%20(23).png?alt=media&token=bdd473a4-8b33-4856-b403-3751ca11ca3f)


- Ngôn ngữ sử dụng là Kotlin, rồi ấn Finish


![alt text](https://firebasestorage.googleapis.com/v0/b/tudiendanhngon-ba6bc.appspot.com/o/Image%2FLinhTinh%2FScreenshot%20(24).png?alt=media&token=827a921b-4fbb-4b1d-ac87-8584fde5ef41)


- Sau đó tạo class tên là CircleView, class này kế thừa class View
  
  
```kotlin
  
class CircleView (context: Context, attrs: AttributeSet): View(context, attrs){  
    var paint: Paint = Paint()  
    var centerOfX =  340F  
  var centerOfY =  340F  
  var radiusOfCircleView =  140F  
  
  
  init {  
        paint.color = ContextCompat.getColor(context,android.R.color.holo_green_light)  
        paint.strokeWidth = 40f  
  paint.style = Paint.Style.STROKE// Constructor Call  
  }  
  
    override fun onDraw(canvas: Canvas?) {  
        canvas?.drawCircle(centerOfX,centerOfY,radiusOfCircleView,paint)  
        super.onDraw(canvas)  
    }  
}

```
Trong Android Canvas là công cụ dùng để vẽ View, Paint là bút vẽ. Tạo class xong rồi, chúng ta sang bên XML khai báo để sử dụng thằng này.


```xml 
<?xml version="1.0" encoding="utf-8"?>  
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
  xmlns:app="http://schemas.android.com/apk/res-auto"  
  xmlns:tools="http://schemas.android.com/tools"  
  android:layout_width="match_parent"  
  android:layout_height="match_parent"  
  tools:context=".MainActivity">  
  
 <com.tomosia.customviewexample.CircleView  android:layout_width="match_parent"  
  android:layout_height="match_parent"  
  app:layout_constraintBottom_toBottomOf="parent"  
  app:layout_constraintLeft_toLeftOf="parent"  
  app:layout_constraintRight_toRightOf="parent"  
  app:layout_constraintTop_toTopOf="parent" />  
  
</androidx.constraintlayout.widget.ConstraintLayout>
```

- Chúng ta sẽ thấy hiện ra một View như thế này

![alt text](https://firebasestorage.googleapis.com/v0/b/tudiendanhngon-ba6bc.appspot.com/o/Image%2FLinhTinh%2FScreenshot%20(26).png?alt=media&token=8c3ddfbb-1770-4b33-8330-bd9998bc22e2)

Vậy là chúng ta đã hoàn thành xong bước đầu của phần tạo một custom view trong Android. Phần tiếp theo mình sẽ hướng dẫn để thêm các thuộc tính cho view.