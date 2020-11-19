---
title: "Code Refactoring"
date: "2020-11-19"
published: true
tags:
  - refactoring
---
**Refactoring là gì?**

Nói 1 cách ngắn gọn, đó là biến 1 mớ hỗn độn thành mã sạch và thiết kế đơn giản. Nhưng làm cách nào? Liệu có 1 hệ thống các quy tắc có thể áp dụng để refactor code 1 cách khoa học? Rất may mắn là có. Đây là các phương pháp cụ thể để thực hiện việc refactor:

 1.  Xử lí các method (Composing Methods)
 2. Di chuyển features giữa các object (Moving Features between Objects)
 3. Tổ chức lại dữ liệu (Organizing Data)
 4. Đơn giản hoá các biểu thức điều kiện (Simplifying Conditional Expressions)
 5. Đơn giản hoá việc gọi các method (Simplifying Method Calls)
 6. Xử lí tổng quát (Dealing with Generalization)

Trong bài viết này, mình sẽ đề cập đến phương pháp mọi người thường sử dụng nhất (do đây là thứ đầu tiên đập vào mặt chúng ta khi làm việc với code thối :()

**Các kĩ thuật Composing Methods**

***1. Extract Method***

  Vấn đề: Bạn có một đoạn mã có thể được nhóm lại với nhau.

  Giải pháp: Di chuyển mã này sang một phương thức (hoặc hàm) mới riêng biệt và thay thế mã cũ bằng một lệnh gọi phương thức.

  Ví dụ:
  ```
  void printOwing() {
    printBanner();

    // Print details.
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
  }
  ```
  chúng ta có thể tách ra thành
  ```
  void printOwing() {
    printBanner();
    printDetails(getOutstanding());
  }

  void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
  }
  ```
***2. Inline method***

  Vấn đề: khi code bên trong method còn rõ ràng hơn cả tên của nó.

  Giải pháp: gọi luôn phần code tại nơi sử dụng và xoá luôn phần gọi method đó

  Ví dụ:
  ```
  class PizzaDelivery {
    // ...
    int getRating() {
      return moreThanFiveLateDeliveries() ? 2 : 1;
    }
    boolean moreThanFiveLateDeliveries() {
      return numberOfLateDeliveries > 5;
    }
  }
  ```
  chuyển thành
  ```
  class PizzaDelivery {
    // ...
    int getRating() {
      return numberOfLateDeliveries > 5 ? 2 : 1;
    }
  }
  ```
***3. Extract Variable***

  Vấn đề: Bạn có một cách diễn đạt khó hiểu.

  Giải pháp: Đặt kết quả của biểu thức hoặc các phần của nó trong các biến riêng biệt có thể tự giải thích.

  Ví dụ:
  ```
  void renderBanner() {
    if ((platform.toUpperCase().indexOf("MAC") > -1) &&
         (browser.toUpperCase().indexOf("IE") > -1) &&
          wasInitialized() && resize > 0 )
    {
      // do something
    }
  }
  ```
  sửa lại
  ```
  void renderBanner() {
    final boolean isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
    final boolean isIE = browser.toUpperCase().indexOf("IE") > -1;
    final boolean wasResized = resize > 0;

    if (isMacOs && isIE && wasInitialized() && wasResized) {
      // do something
    }
  }
  ```
***4. Inline Temp***

  Vấn đề: Bạn có một biến tạm thời được gán kết quả của một biểu thức đơn giản và không có gì khác.

  Giải pháp: Thay thế các tham chiếu đến biến bằng chính biểu thức.

  Ví dụ:
  ```
  boolean hasDiscount(Order order) {
    double basePrice = order.basePrice();
    return basePrice > 1000;
  }
  ```
  sửa lại
  ```
  boolean hasDiscount(Order order) {
    return order.basePrice() > 1000;
  }
  ```
***5. Replace Temp with Query***

  Vấn đề: Bạn đặt kết quả của một biểu thức trong một biến cục bộ để sử dụng sau này trong mã của bạn.

  Giải pháp: Di chuyển toàn bộ biểu thức sang một phương thức riêng biệt và trả về kết quả từ nó. Truy vấn phương thức thay vì sử dụng một biến. Kết hợp phương pháp mới với các phương pháp khác, nếu cần.

  Ví dụ:
  ```
  double calculateTotal() {
    double basePrice = quantity * itemPrice;
    if (basePrice > 1000) {
      return basePrice * 0.95;
    }
    else {
      return basePrice * 0.98;
    }
  }
  ```
  Sửa lại:
  ```
  double calculateTotal() {
    if (basePrice() > 1000) {
      return basePrice() * 0.95;
    }
    else {
      return basePrice() * 0.98;
    }
  }
  double basePrice() {
    return quantity * itemPrice;
  }
  ```
***6. Split Temporary Variable***

  Vấn đề: Bạn có một biến cục bộ được sử dụng để lưu trữ các giá trị trung gian khác nhau bên trong một phương thức.

  Giải pháp: Sử dụng các biến khác nhau cho các giá trị khác nhau. Mỗi biến chỉ nên chịu trách nhiệm về một thứ cụ thể.

  Ví dụ:
  ```
  double temp = 2 * (height + width);
  System.out.println(temp);
  temp = height * width;
  System.out.println(temp);
  ```
  Sửa thành
  ```
  final double perimeter = 2 * (height + width);
  System.out.println(perimeter);
  final double area = height * width;
  System.out.println(area);
  ```
***7. Remove Assignments to Parameters***

  Vấn đề: Một số giá trị được gán cho một tham số bên trong phần thân của phương thức.

  Giải pháp: Sử dụng một biến cục bộ thay vì một tham số.

  Ví dụ:
  ```
  int discount(int inputVal, int quantity) {
    if (quantity > 50) {
      inputVal -= 2;
    }
    // ...
  }
  ```
  Sửa lại:
  ```
  int discount(int inputVal, int quantity) {
    int result = inputVal;
    if (quantity > 50) {
      result -= 2;
    }
    // ...
  }
  ```
***8. Replace Method with Method Object***

  Vấn đề: Bạn có một method dài, trong đó các biến cục bộ đan xen nhau đến mức bạn không thể áp dụng Extract Method.

  Giải pháp: Chuyển method thành một class riêng biệt để các biến cục bộ trở thành các trường của class. Sau đó, bạn có thể chia method thành nhiều method trong cùng một class.

  Ví dụ:
  ```
  class Order {
    // ...
    public double price() {
      double primaryBasePrice;
      double secondaryBasePrice;
      double tertiaryBasePrice;
      // Perform long computation.
    }
  }
  ```
  Chuyển thành
  ```
  class Order {
    // ...
    public double price() {
      return new PriceCalculator(this).compute();
    }
  }

  class PriceCalculator {
    private double primaryBasePrice;
    private double secondaryBasePrice;
    private double tertiaryBasePrice;

    public PriceCalculator(Order order) {
      // Copy relevant information from the
      // order object.
    }

    public double compute() {
      // Perform long computation.
    }
  }
  ```
***9. Substitute Algorithm***

  Vấn đề: bạn muốn thay thế một thuật toán hiện có bằng một thuật toán mới?

  Giải pháp: Thay thế phần thân của phương thức thực hiện thuật toán bằng một thuật toán mới

  Ví dụ:
  ```
  String foundPerson(String[] people){
    for (int i = 0; i < people.length; i++) {
      if (people[i].equals("Don")){
        return "Don";
      }
      if (people[i].equals("John")){
        return "John";
      }
      if (people[i].equals("Kent")){
        return "Kent";
      }
    }
    return "";
  }
  ```
  Chuyển thành:
  ```
  String foundPerson(String[] people){
    List candidates =
      Arrays.asList(new String[] {"Don", "John", "Kent"});
    for (int i=0; i < people.length; i++) {
      if (candidates.contains(people[i])) {
        return people[i];
      }
    }
    return "";
  }
  ```
**Tổng kết**

Tất cả các phương pháp trên đều cần các kĩ thuật và lưu ý nhỏ hơn mà mình khó có thể liệt kê hết trong khuôn khổ 1 bài viết, cách tốt nhất để làm tốt là để ý và ghi nhớ trong quá trình làm việc và học hỏi từ các đồng nghiệp nhiều kinh nghiệm hơn. Hy vọng bài viết giúp ích cho các bạn khi phải vật lộn với 1 đống hổ lốn do người khác hoặc chính mình tạo ra =))

*Bài viết tổng hợp từ https://refactoring.guru/*
