---
title: "Mind Blown với Encoding"
date: "2020-08-27"
published: true
tags:
  - Ruby
---

```logs
01110100 01110101 01101001 00100000 01101100 01100001 
00100000 01101000 01101111 01100001 01101110 01100111 
00100000 01101100 01100001 01101110
```

Nhìn thoáng qua, bạn có hiểu được đây là gì không? 
Thật ra máy tính cũng không hiểu được đoạn văn bản trên là gì đâu, nó như một miếng thịt sống mà chưa được qua chế biến. Vậy chúng ta sẽ xem làm sao từ một miếng thịt sống máy tính có thể "biến" nó thành món Beefsteak thượng hạng được nhé. 😋

---
# 1. Bảng mã, encoding, UTF8 là gì?
Trước tiên hãy quay về vấn đề cơ bản nhất, khi máy tính tiếp nhận bất cứ dữ liệu gì, nó đều quy đổi về hệ nhị phân dưới hai số `0` và `1`.
Máy tính thực chất chỉ là các mạch điện tử được lắp ghép lại với nhau. Ở trên mạch điện tử chỉ có 2 trạng thái là `đóng mạch (bit1)` và `ngắt mạch (bit0)`. Vậy thì ta chỉ cần một bảng mã ký tự (char code table) để mapping nó với ngôn ngữ của máy tính thôi.

Vào đầu những năm 1963, hầu hết người sử dụng máy tính định cư ở Hoa Kỳ, họ đã phát minh và sử dụng bảng mã `ASCII`:


![image](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/USASCII_code_chart.png/1024px-USASCII_code_chart.png)


Ánh xạ như trên bảng mã ký tự `ASCII` ta thấy dấu `!` được quy đổi thành `010 0001` dưới hệ nhị phân.
Lúc đầu, mọi thứ hoạt động rất ổn định cho đến khi máy tính được sử dụng ở các quốc gia khác, và `ASCII` không có ngôn ngữ của họ.
`ASCII` sử dụng 8bit để mã hóa kí tự với các văn bản hầu hết chỉ sử dụng 1 byte, nhưng vì chỉ sử dụng 8bit nên chỉ mã hóa được `0 -255 (256)` kí tự nên không phù hợp.
`Unicode` được ra đời vì đó, nó sử dụng 16bit để mã hóa, với bộ gõ này ta có thể mã hóa được `65536 kí tự`, nên được sử dụng làm chuẩn đúng cho đến hiện nay.

Nhưng vấn đề là, một số nước sử dụng riêng của chính họ. Lấy ví dụ với JP, ta có `Shift-JIS` và `EUC-JP`, có lẽ việc `Shift-JIS` vẫn được phổ biến tại Nhật vì nó chỉ sử dụng 2byte cho việc encoding tiếng nhật thay vì 3~4byte với `UTF-8`.

`Shift-JIS` cho đến hiện nay có khá nhiều version:
```
- Windows-932 / Windows-31J
- MacJapanese
- Shift_JISx0213 and Shift_JIS-2004
```

# 2.  Bài toán
Khách hàng yêu cầu convert dữ liệu từ `UTF-8` sang `Shift-JIS`.
Rất đơn giản phải không nào, ở `Ruby` ta chỉ cần call:
```
text.encode(Encoding::SJIS)
```
Về cơ bản, đang số ký tự đều có thể convert được. Với Windows, khi dữ liệu được lưu thì định dạng default của nó sẽ là `UTF-8`.

Nhưng ở bảng mã `Unicode`, có những ký tự của `Shift-jis` không có nhưng `Cp943c` lại có và ngược lại.

![image](http://www2d.biglobe.ne.jp/~msyk/cgi-bin/charcode/img/MS932_Cp943C_4.png)

Với những ký tự đặc biệt ở trên thì khi encode ta sẽ thấy xuất hiện lỗi.
```
Encoding::UndefinedConversionError
```
Vì vậy, trước khi encode sang `Shift-jis`, ta cần convert các ký tự bị thiếu sang ký tự fullwidth của `Unicode` dưới định dạng `MS932`. Ở đây ta sẽ patching vào class `String`.
```
class String
  def sjisable
    str       = self
    from_chr  = "\u{301C 2212 00A2 00A3 00AC 2013 2014 2016 203E 00A0 00F8 203A}"
    to_chr    = "\u{FF5E FF0D FFE0 FFE1 FFE2 FF0D 2015 2225 FFE3 0020 03A6 3009}"
    str.tr!(from_chr, to_chr)
    str       = str.encode("Windows-31J","UTF-8",invalid: :replace, undef: :replace).encode("UTF-8","Windows-31J")
  end
end
```
```
text.sjisable.encode('Shift_JIS')  
```
Bài toán đã được giải quyết.

---
Vậy là mọi người đã hiểu và nắm được Unicode, UTF-8 hay Shift-JIS, khi gặp vấn đề tương tự thì hãy áp dụng như bài toán ở trên nhé. Hẹn gặp mọi người tại một bài viết khác về Encoding. Xin cảm ơn.

######                    *<div style="text-align: right"> - by Lê Hoàng Lân </div>*