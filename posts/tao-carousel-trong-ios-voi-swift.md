---
title: "Tạo carousel trong iOS với Swift"
date: "2020-10-11"
published: true
tags:
  - swift
  - ios
---

# 1.Giới thiệu

Chào cả nhà, sau bài [làm sao để tạo animation sóng trong iOS](https://blog.tomosia.com/swift-tao-animation-song-trong-ios-voi-swift/) thì nay em trở lại với một chủ đề nhỏ nữa muốn chia sẻ với mọi người đặc biệt là những anh em iOS. Đó là làm sao để tạo carousel trong iOS với swift.

Với carousel thì đây là một kiểu UI UX rất là phổ biến. Nó có mặt ở hầu hết các website, mobile app, desktop app, ... Đối với mảng web và android thì được support khá là nhiều để có thể implement nó một cách rất là dễ dàng cho nên cũng không cần quá phải lo lắng 😄, tuy nhiên đối với iOS thì không được Apple support nhiều đến như vậy 🤧, cho nên là việc biết cách implement carousel trở nên rất là quan trọng. Do đó, em mong rằng sau khi đọc xong bài viết này thì mọi người có thể hiểu và áp dụng được vào cho dự án của mình.

# 2. Đặt vấn đề

Như mọi người cũng đã biết thì với UICollectionView và UICollectionViewFlowLayout hoặc từ iOS 13 trở lên có UICollectionViewCompositionalLayout thì đã có thể implement được hầu hết các chức năng của một Carousel, đó là horizontal scroll, custom UICollectionViewCell, set contentOffset, ... Tuy nhiên có một chức năng mà nếu chỉ sử dụng UICollectionViewFlowLayout hay UICollectionViewCompositionalLayout thì sẽ rất khó để có thể làm được đó là infinite scroll. Do đó, để có thể tạo ra một Carousel hoàn hảo thì em nghĩ ta phải custom lại UICollectionViewLayout.

Việc custom lại UICollectionViewLayout nghĩa là sẽ phải tự sắp xếp vị trí của các UICollectionViewCell, và việc tính toán vị trí của Cell sẽ phải giải quyết các vấn đề sau đây:

1. Tính toán vị trí của Cell sao cho phù hợp với design
2. Tính toán vị trí của Cell mỗi lần UICollectionView change offset
3. Tính toán vị trí của Cell sao cho có infinite scroll
4. Tính toán vị trí offset phù hợp để mỗi lần scroll thì các Cell hiển thị đúng với design

# 3. Ý tưởng

Về cơ bản chúng ra có 4 vấn đề như đã đề cập ở trên, tuy nhiên design là khác nhau đối với mỗi app, hay với mỗi màn hình cho nên là ở bài này em sẽ chỉ nói đến việc làm sao để có infinite scroll. Ý tưởng của em dựa trên một ý nghĩ rất là đơn giản đó là, đối với mỗi Cell mà đang được focus, thì ta sẽ phải tính được vị trí của tất cả các Cell nằm ở bên trái và tất cả các Cell nằm ở bên phải. Mỗi khi UICollectionView change offset thì sẽ phải tính toán lại tất cả mọi thứ 😄

# 4. Triển khai ý tưởng

Đầu tiên ta sẽ tạo ra class CollectionViewLayout kế thừa lại UICollectionViewLayout

``` swift
class CollectionViewLayout: UICollectionViewLayout {
    override func prepare() {
    }

    override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
        return []
    }

    override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
        return nil
    }

    override var collectionViewContentSize: CGSize {
        return CGSize.zero
    }

    override func shouldInvalidateLayout(forBoundsChange newBounds: CGRect) -> Bool {
        return true
    }
}
```

Mỗi khi UICollectionView reload data hay invalidate layout thì hàm prepare sẽ được gọi nên là chúng ta sẽ tính toán vị trí của các Cell ở hàm này.

Chúng ta sẽ tạo ra các biến sau:

``` swift
private let itemSpacing: CGFloat = 8 // khoảng cách giữa các Cell
private var currentCellIndex = 0 // IndexPath.item của cell sẽ được focus
private var offsetX: CGFloat = 0 // vị trí offset của UICollectionView khi tính toán lại vị trí của các Cell
private var leftArray: [Int] = [] // mảng chứa IndexPath.item của các Cell nằm bên trái Cell đang được focus
private var rightArray: [Int] = [] // mảng chứa IndexPath.item của các Cell nằm bên phải Cell đang được focus
private var attributes: [UICollectionViewLayoutAttributes] = []
private var contentWidth: CGFloat = 0

private var numberOfItem: Int {
    return collectionView?.numberOfItems(inSection: 0) ?? 0
}

private var sizeCell: CGSize {
  let width = collectionView!.frame.width - itemSpacing * 4
  let height = collectionView!.frame.height
  return CGSize(width: width, height: height)
}
```

Implement hàm prepare:

``` swift
override func prepare() {
  super.prepare()
  guard let collectionView = collectionView else {
      return
  }

  // Tại lần đầu prepare cần set offsetX của collectionView = 10000
  if isFirstTimePrepare {
      offsetX = cycleStart
      collectionView.contentOffset.x = cycleStart
      isFirstTimePrepare = false
  }

  // Trường hợp collectionView.reloadData
  if attributes.count != numberOfItem {
      attributes.removeAll()
      leftArray.removeAll()
      rightArray.removeAll()
  }

  // Tính số cell ở bên trái và bên phải cell đang được focus
  let numberOfLeftItem = numberOfItem % 2 == 1 ? numberOfItem / 2 : numberOfItem / 2 - 1
  let numberOfRightItem = numberOfItem - 1 - numberOfLeftItem

  // Lấy IndexPath.item của các cell ở bên trái và bên phải cell đang được focus
  var leadingRightArray: [Int] = []
  var trailingRightArray: [Int] = []
  var i = currentCellIndex - 1 < 0 ? numberOfItem - 1 : currentCellIndex - 1
  while leadingRightArray.count < numberOfLeftItem {
      leadingRightArray.append(i)
      i = (i - 1 < 0) ? numberOfItem - 1 : i - 1
  }
  var j = currentCellIndex + 1 >= numberOfItem ? 0 : currentCellIndex + 1
  while trailingRightArray.count < numberOfRightItem {
      trailingRightArray.append(j)
      j = (j + 1) >= numberOfItem ? 0 : j + 1
  }

  /*
    + Nếu item nào chưa tồn tại trong leftArray ở lần change offset này thì cần được add vào additionalLeftArray để có thể thay đổi vị trí của cell đó
    **/
  var additionalLeftArray: [Int] = []
  for item in leadingRightArray {
      if !leftArray.contains(item) {
          additionalLeftArray.append(item)
      }
  }
  leftArray = leadingRightArray

  /*
  + Nếu item nào chưa tồn tại trong rightArray ở lần change offset này thì cần được add vào additionalRightArray để có thể thay đổi vị trí của cell đó
  **/
  var additionalRightArray: [Int] = []
  for item in trailingRightArray {
      if !rightArray.contains(item) {
          additionalRightArray.append(item)
      }
  }
  rightArray = trailingRightArray

  let centerX = offsetX + collectionView.frame.width / 2

  for i in 0 ..< numberOfItem {
      let indexPath = IndexPath(item: i, section: 0)
      let attr = CollectionViewLayoutAttributes(forCellWith: indexPath)
      attr.isCenter = i == currentCellIndex

      if additionalLeftArray.contains(i) {
          if let index = leadingRightArray.firstIndex(of: i) {
              // Tính khoảng cách từ minX của cell đến vị trí trung tâm, cách tính này sẽ dựa vào design
              var distance: CGFloat = 0
              for _ in 0 ... index {
                  distance += sizeCell.width + itemSpacing
              }
              distance += sizeCell.width / 2
              attr.frame = CGRect(x: centerX - distance, y: 0, width: sizeCell.width, height: sizeCell.height)
          }
      } else if additionalRightArray.contains(i) {
          if let index = trailingRightArray.firstIndex(of: i) {
              // Tính khoảng cách từ minX của cell đến vị trí trung tâm, cách tính này sẽ dựa vào design
              var distance: CGFloat = 0
              for j in 0 ... index {
                  distance += (j == index ? 0 : sizeCell.width) + itemSpacing
              }
              distance += sizeCell.width / 2
              attr.frame = CGRect(x: centerX + distance, y: 0, width: sizeCell.width, height: sizeCell.height)
          }
      } else {
          if let frame = attributes.filter({ $0.indexPath.item == i }).first?.frame {
              attr.frame = frame
          } else {
              // Tính vị trí của cell đang được focus
              let frame = CGRect(x: centerX - sizeCell.width / 2, y: 0, width: sizeCell.width, height: sizeCell.height)
              attr.frame = frame
          }
      }

      if let index = attributes.firstIndex(where: { $0.indexPath.item == i }) {
          attributes.remove(at: index)
      }
      attributes.append(attr)
  }

  contentWidth = CGFloat(numberOfItem + 3) * itemSpacing + CGFloat(numberOfItem) * sizeCell.width
}
```

Nhìn vào hàm kia chắc hẳn mọi người cũng đã hiểu được một phần rồi nhỉ 😄, em sẽ giải thích một chút về những điểm đặc biệt sau:

1. Tại sao lần đầu tiên prepare lại cần set offset của UICollectionView lên là 10000? Như mọi người cũng biết thì offset đầu tiên mặc định của UICollectionView là 0, cho nên nếu Cell thứ 0 là đang được focus thì các Cell ở bên trái nó sẽ có vị trí x < 0, mà với UICollectionView thì các Cell ở vị trí x < 0 sẽ không thể hiển thị lên được trên màn hình, vì lý do này nên phải set offset của UICollectionView lên là 10000
2. Tại sao phải cần đến additionalLeftArray và additionalRightArray? Tại sao có những Cell được set lại frame mà nó đã có trong mảng attributes? Chắc hẳn mọi người nghĩ là mỗi khi change offset của UICollectionView thì sẽ chỉ cần tính toán lại vị trí của các Cell theo offset x mới của UICollectionView thôi, tuy nhiên nếu làm như vậy thì sẽ bị mất đi animation, vì lý do đó nên cách làm của em đó là mình chỉ tính lại vị trí của những Cell mà nó chưa có trong leftArray hoặc là rightArray mà thôi.

OK, sau đó chúng ta chỉ cần trả về những kết quả đã tính toán được ở hàm prepare mà thôi.

``` swift
override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
    return attributes
}

override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
    return attributes[indexPath.item]
}

override var collectionViewContentSize: CGSize {
    return CGSize(width: contentWidth * 20000, height: collectionView?.frame.height ?? 0)
}
```

Về cơ bản là ta đã implement xong CollectionViewLayout cho việc tạo ra Carousel rồi, chỉ còn việc xử lý tích hợp nó vào UICollectionView thôi! Mà trong bài này em sẽ không nói chi tiết về những phần đấy. Cho nên là em sẽ để source code [tại đây](https://github.com/LaptrinhvaCuocsong/CarouselDemo) để mọi người có thể tham khảo.

Em có capture video kết quả, mọi người có thể download file video [tại đây](https://github.com/LaptrinhvaCuocsong/CarouselDemo/tree/master/Video) nhé.

Như vậy, em đã trình bày xong cách để tạo Carousel trong iOS với Swift. Nếu mọi người có cách nào khác thì hãy chia sẻ hoặc comment phía dưới nhé 😄.

Happy reading!!!

by Nguyen Manh Hung - Tomosia Viet Nam