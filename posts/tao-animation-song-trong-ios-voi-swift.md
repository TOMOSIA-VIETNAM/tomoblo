---
title: "Làm sao để tạo một chuyển động sóng đơn giản trong iOS với Swift"
date: "2020-07-04"
published: true
tags:
  - Swift and iOS
---

##Vấn đề đặt ra
* Tạo ra một View có animation sóng trong iOS với Swift.

##Ý tưởng
Sử dụng phương trình sóng cơ trong vật lý là:
> y = $A$$\cos$(2π($\frac{t}{T}$ - $\frac{x}{λ}$))

Với:
* A là biên độ của sóng
* t là thời gian
* T là chu kì của sóng
* x là toạ độ theo trục hoành của hệ toạ độ
* λ là bước sóng

Ta có công thức tính T theo λ là: T = $\frac{λ}{v}$. Với v là vận tốc truyền sóng.

Với công thức trên, ý tưởng để tạo chuyển động sóng là:
> Với biên độ A, bước sóng λ, chu kì T cố định, x là giá trị thay đổi trên trục hoành, và ứng với mỗi thời gian t tăng dần ta sẽ tìm được giá trị toạ độ y => ta tạo được một điểm CGPoint dùng để vẽ với UIBezierPath

##Triển khai ý tưởng
* Đầu tiên ta khởi tạo class **WaveView** với các thuộc tính và phương thức khởi tạo. Việc tạo ra một class riêng giúp ta có thể tái sử dụng ở nhiều ViewController khác nhau.
  
```swift
import UIKit

class WaveView: UIView {
    var waveHeight: CGFloat = 10
    var waveSpeed: CGFloat = 1.5

    private var A: CGFloat = 0
    private var v: CGFloat = 0
    private var 𝛌: CGFloat = 0
    private var T: CGFloat = 0
    private var t: CGFloat = 0
    private let pi = CGFloat.pi

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .clear
        A = waveHeight
        v = waveSpeed
        𝛌 = frame.width / 1.2
        T = 𝛌 / v
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
}

```

Ở trên mình đã khai báo và khởi tạo các thuộc tính như biên độ A, vận tốc v, chu kì T và bước sóng λ.

Tiếp theo, để vẽ sóng thì ta cần override lại method draw của UIView.

``` swift
override func draw(_ rect: CGRect) {
    super.draw(rect)
    guard let context = UIGraphicsGetCurrentContext() else { return }
    drawWave(rect: rect, in: context)
}

private func drawWave(rect: CGRect, in context: CGContext) {
    context.clear(rect)
    let path = UIBezierPath()
    path.move(to: CGPoint(x: 0, y: rect.height))
    for x in 0 ..< Int(rect.width) {
        let z = 2 * pi * (t / T - CGFloat(x) / 𝛌)
        let y = center.y - A * cos(z)
        path.addLine(to: CGPoint(x: CGFloat(x), y: y))
    }
    path.addLine(to: CGPoint(x: rect.width, y: rect.height))
    path.addLine(to: CGPoint(x: 0, y: rect.height))
    UIColor.cyan.setStroke()
    path.stroke()
    UIColor.cyan.setFill()
    path.fill()
    path.close()
    context.addPath(path.cgPath)
    context.drawPath(using: .fill)
}
```

Ở trên, vì hàm draw có thể gọi lại nhiều lần nên cần phải dùng UIGraphicsGetCurrentContext clear đi mỗi lần nó vẽ lại. Ở hàm drawWave, mình cho x thay đổi từ 0 đến rect.width từ đó dùng để tính y theo phương trình sóng cơ mình đã đề cập ở phần ý tưởng.

Nếu chỉ dừng lại ở đây, thì sẽ không có animation cho sóng vì thời gian t đang được fix cứng là 0. Do đó để t có thể tăng dần theo thời gian thì ta phải dùng tới Timer.

``` swift
private var timer: CADisplayLink?

@objc private func reDraw() {
    t += 1
    setNeedsDisplay()
}

func start() {
    timer = CADisplayLink(target: self, selector: #selector(reDraw))
    timer?.add(to: RunLoop.current, forMode: .common)
}

func stop() {
    timer?.invalidate()
    timer = nil
}
```

CADisplayLink cũng giống với Timer, nó hay được dùng cho việc draw trong View vì có cơ chế tự tính thời gian repeat sao cho phù hợp với device.

Cuối cùng, để sử dụng WaveView ta chỉ cần khởi tạo một instance của nó rồi addSubView vào một View trong ViewController là được. Bạn có thể tham khảo [tại đây](https://github.com/LaptrinhvaCuocsong/WaveView/blob/master/WaveViewDemo/WaveViewDemo/ViewController.swift)

Mình có capture video kết quả, bạn có thể download file video [tại đây](https://github.com/LaptrinhvaCuocsong/WaveView/blob/master/Demo/Screen%20Recording%202020-07-05%20at%2016.38.17.mov.zip) nhé.

Như vậy, mình đã trình bày xong cách để tạo ra một chuyển động sóng đơn giản sử dụng phương trình sóng cơ. Nếu bạn có cách nào khác thì hãy chia sẻ hoặc comment phía dưới nhé 😄.

Happy reading!!!