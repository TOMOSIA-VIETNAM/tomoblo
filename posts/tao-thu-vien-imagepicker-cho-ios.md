---
title: "Tạo thư viện ImagePicker cho IOS"
date: "2020-11-16"
published: true
tags:
  - ios
  - swift
---

## Chào cả nhà!
 
Đầu tiên hình ảnh là gì:

[[snippet]]
|    Khái niệm về hình ảnh Hình ảnh là những gì chúng ta thấy được thông qua thị giác, rồi sau đó chuyển về não giúp ta cảm nhận nhận hình ảnh đó một cách chân thực nhất, từ đó đưa ra những phản xạ,cảm nhận về hình ảnh mà ta vừa thu nhận.

<iframe src="https://giphy.com/embed/WJjLyXCVvro2I" width="480" height="423" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/WJjLyXCVvro2I">via GIPHY</a></p>

  Tiếp theo ta đến với chủ đề chính là điều chỉnh hình ảnh và cách tạo thư viện hổ trợ chọn hình ảnh từ thư viện của điện thoại iOS

# Chào mừng bạn đến với bài viết của mình!

##1. Về xử lý hình ảnh:

  - Khi mình tải một hình ảnh điều gì sẽ sảy ra nếu hình ảnh bạn đưa lên "quá lớn", tất nhiên hình ảnh của bạn sẽ bị giảm kích thước (độ phân giải) và được đưa lên mà bạn không biết rằng hình ảnh của mình đã bị thay đổi kích thước (độ phân giải) vì sao lại có vấn đề này sảy ra?
  - Xử lý hình ảnh giảm kích thước ban đầu của nó, không phải tất cả nhưng hầu hết các ứng dụng hay các trang mạng xã hội , ... đều phải xử lý kích thước hình ảnh gửi lên. Tại sao phải giảm kích thước nó đi nó đâu có ảnh hưởng gì ? hình ảnh sẽ bị giảm phân giải đi nếu bị giảm kích thước trông nó sẽ thể nào?
  - Và nếu khi upload nén lại vậy, khi load ra sẽ không còn chuẩn như ảnh gốc, vậy người dùng sẽ nghỉ thế nào khi ảnh của họ bị thay đổi?
  - Đầu tiên mình sẽ chia sẽ một chút hiểu biết của mình về vấn đề xử lý hình ảnh:
    - Xử lý hình ảnh là việc chọn lọc những thông tin mong muốn từ những bức ảnh chụp từ máy ảnh hay máy scan, để chọn lọc những thông tin mong muốn được chứa trong bức ảnh, phương pháp cơ bản được dùng trong xử lý hình ảnh là loại bỏ những phần thông tin ảnh không mong muốn.
    - Xử lý hình ảnh hay ở đây là tối giản lại kích thước hình ảnh cho phù hợp với nhu câu sử dụng hình ảnh để đảm bảo ảnh được tải lên lưu trữ và hiển thị tốt nhất (túm gọn lại là hình ảnh có độ phân giải quá lớn sẽ cần phải giảm kích thước lại cho phù hợp với nhu cầu lưu trữ hay hiển thị để đảm bảo tốc độ tải lên củng như tải xuống), ví dụ như bạn thích góc phải của hình ảnh gốc thì bạn cắt hình ảnh mới từ góc phải của ảnh gốc để lấy hình ảnh bạn yêu thích.
    - Chất lượng hình ảnh thì sẽ ra sao khi bị nén lại, tất nhiên nó vẫn xem được với đúng kích thước bạn đã resize theo pixel của hình ảnh, hay chính là kích thước chiều rộng x chiều ngang nó sẽ hiển thị ra theo màn hình bạn tỉ lệ đó, và với kích thước được điều chỉnh đó ảnh bạn trông vẫn ổn chỉ là bạn không thể phóng to hình ảnh ra như phim Bollywood thôi.
    - Còn vấn đề xử lý hình ảnh chi tiết thì bạn nên tìm hiểu chuyên sâu về xử lý hình ảnh bằng chị Google có rất nhiều bài viết khá thú vị. Đến với phần chính của bài viết nào!

##2. iOS làm thế nào để tạo một ImagePicker?
  - Vì sao phải tạo ImagePickerView riêng mình mà không dùng UIImagePickerController ? Tốn thời gian nhiều để tạo một thư viện làm gì ? Tất nhiên tốn thời gian hơn nhưng sẽ có lợi ích riêng, Nếu bạn đang sử dụng UIImagePickerController bạn thử chọn những hình ảnh có kích thước lớn hơn 20 mb điều gì sẽ xảy ra nhỉ, không có hình ảnh nào được trả về, và củng chẳng có thông báo gì vậy lỗi này là gì ? bạn sẽ mất hàng giờ để tìm hiểu nguyên nhân và kết quả là vì hình ảnh quá lớn nên kết quả trả về là sự chấm dứt việc chọn hình ảnh (bạn chọn hình ảnh lớn củng trả về cùng kết quả với hành động từ chối ko chọn hình ảnh nữa). vậy điều này khiến bạn tìm đến thư viện hoặc trợ giúp từ google vậy tại sao bạn không tự kiểm soát vấn đề của mình ?
  - Mình giới thiệu cách mình xử lý trường hợp trên (tự tạo thư viện để sử dụng, nếu bạn thích thì củng có thể từ đây tạo ra một thư viện chọn ảnh theo phong cách của bạn) , các bước tạo thư viện cần thiết là:
    1. Lấy ảnh từ thư viện(request truy cập thư viện rồi lấy dữ liệu hình ảnh trong thư viện).
    2. Tạo giao diện show các hình ảnh đó (collection view, .... tuỳ khả năng design của bạn).
    3. Giảm kích thước hình ảnh (giảm data của hình ảnh)
    4. Trả về hình ảnh (lấy hình ảnh đã được chỉnh sữa hoặc data của hình ảnh)
  
  - Resource để làm các bước trên (ví dụ) :

    1. Tạo File cho thư viện PickerViewController:
    
                import Photos

                 class ImagePickerViewController: UIViewController, PHPhotoLibraryChangeObserver {
                    var assetArray: [PHAsset] = []
                    func GetAllPhoto() {
                      PHPhotoLibrary.shared().register(self)
                      let status = PHPhotoLibrary.authorizationStatus()
                      let locationManager = CLLocationManager()
                      if status == .restricted || status == .denied {
                        locationManager.requestWhenInUseAuthorization()
                        return
                      }
                      DispatchQueue.global(qos: .userInteractive).async {
                        let allPhotosOptions = PHFetchOptions()
                        allPhotosOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
                        allPhotosOptions.predicate = NSPredicate(format: "mediaType == %d", PHAssetMediaType.image.rawValue)
                        let fetchAssets = self.assetsFetchResult ?? PHAsset.fetchAssets(with: allPhotosOptions)
                        self.dataSource.seletedAssetArray.append(self.dataSource.assetArray.first?.asset ?? PHAsset())
                        self.dataSource.dataChanged = false
                        DispatchQueue.main.async {
                          self.reloadCollectionView()
                        }
                      }
                    }
                  }
  
    2. Tạo giao diện bạn mong muốn (ví dụ bạn tạo một collection view show toàn bộ hình ảnh lấy được từ thư viện ra, khi selected 1 hình ảnh thì chuyển sang màn hình chỉnh sửa cắt ,.... ). Và để lấy một ảnh thì từ PHAsset thì:

            getImage(asset: PHAsset)-> UIImage {
                let imageManager = PHImageManager.default()
                let imageRequestOption = PHImageRequestOptions()
                imageRequestOption.isSynchronous = true
                imageRequestOption.resizeMode = .exact
                imageRequestOption.deliveryMode = .opportunistic
                imageManager.requestImage(for: asset, targetSize: CGSize(width: 200, height: 200), contentMode: .aspectFill, options:
                imageRequestOption, resultHandler: {
                  (image, _) -> Void in
                    // here your image (image)
                })
            }

        - imageRequestOption là thiết lập cho hình ảnh

        - imageManager.requestImage là func trả về một hình ảnh !

        - imageManager.requestImageData ta có thể request data image thay vì request image nếu không muốn lấy image:

                imageManager.requestImageData(for: asset, options: imageRequestOption) { data, _, _, _ in
                  guard let data = data else { return }
                  DispatchQueue.main.async {
                    if let image = UIImage(data: data) {
                     //note: here your image (image)
                    }
                  }
                }


    3. Xử lý hình ảnh thì khi ta có image rồi thì mọi việc dể dàng hơn chỉ cần gọi func dưới:

            public func jpegData(compressionQuality: CGFloat) -> Data? // return image as JPEG. May return nil if image has no CGImageRef or invalid bitmap format. compression is 0(most)..1(least)

        - Cách gọi:

                let image = UIImage(data: dataImage)?.jpegData(compressionQuality: 0.5)

    4. Sau bước 3 thì ta đã có hình ảnh đã được chỉnh sửa kích thước. Việc còn lại thì bạn chỉ cần liên kết thư viện bạn vừa tạo đến với nơi bạn gọi hàm mở thư viện trả về hình ảnh cho nó là xong.

        - Tới đây thì việc lấy ảnh từ thư viện và chỉnh sửa ảnh giảm kích thước hay không giảm thì tuỳ thuộc vào option của bạn. hi vọng nó giúp được bạn ít nhiều . một vài option để lấy hình ảnh mình có sử dụng là :

                public  func  requestPreviewImage(for asset: PHAsset, progressHandler: Photos.PHAssetImageProgressHandler?, resultHandler: @escaping (UIImage?, Data?, [AnyHashable: Any]?) -> Void) -> PHImageRequestID {
                  let option = PHImageRequestOptions()
                  option.isNetworkAccessAllowed = true
                  option.progressHandler = progressHandler
                  return requestImageData(for: asset, options: option) { (data,  _,  _, dictionry: Dictionary?) in
                    if let data = data, let image = UIImage(data: data, scale: 1) {
                      resultHandler(image, data, dictionry)
                    }
                  }
                }
        - func này trả về một hình ảnh nguyên bản và data của nó .
        - tới đây thì có lẽ bạn đã biết được cách lấy hình ảnh từ thư viện hi vọng bạn có thể tạo được bộ source cho PickerImage theo ý mình !
        - Các option của bạn củng có thể dẫn đến tình trạng lỗi không chọn được hình ảnh nên nếu gặp vấn đề như vậy thì bạn chỉ cần kiểm tra lại ở các option của bạn khi lấy hình ảnh là được (sửa hoặc thay thế option để nhận kết quả mới) vậy thì còn lý do gì để bạn không dùng phương pháp này lỗi mình sửa được vẫn hơn trông cậy một ai đó giúp đỡ khi bạn bị task dí đít mà gặp bug ?
## Đến đây chắc hẳn bạn đã tạo được cho mình một ImagePicker cho chình mình rồi nhỉ, Cảm ơn Bạn đã đọc bài viết của mình !

[[author | Đặng Cao Trí ]]

