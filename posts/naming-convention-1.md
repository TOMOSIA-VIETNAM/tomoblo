---
title: "Naming convention - part 1"
date: "2020-10-19"
published: true
tags:
  - convention
---


Đối với developer, việc đặt tên là việc thường xuyên phải làm.

Đôi khi, thật dễ dàng để đặt tên cho một đối tượng hay một hành động nào đó.

Nhưng, khi một project quá lớn, số đối tượng ngày càng phình to, việc đặt tên của tôi ngày càng khó khăn.

#### Problem

Thậm chí, tôi còn lăn tăn, liệu tôi có thể đặt tên trùng với một thành viên nào đó trong team không.

Có một số vấn đề tôi thường gặp phải khi đặt tên:

- Conflict name: đây là vấn đề thường gặp nhất, khi project của tôi có nhiều thành viên.

- Obscure (Dark): Tối nghĩa, cái tên chẳng nêu lên được ý nghĩa của hành động được thực hiện.

  Việc này thường xảy ra với những bạn chưa hiểu rõ được spec, hoặc đôi khi, bạn chẳng nghĩ ra được cái tên gì nó thực tế, nên đặt cho có lệ

- Complex: tên quá dài, trong khi đó, tôi có thể đặt ngắn gọn hơn nhưng vẫn giữ được ý nghĩa đầy đủ.

#### Goal

Rõ ràng, việc đặt tên chuẩn, giúp tôi có lướt nhanh project mà không cần thiết phải đọc từng dòng code một.

Với một chút ít kinh nghiệm coding của tôi, hiện tại, tôi có thể:

- Dễ dàng đặt tên biến hoặc tên function.
- Sử dụng ít thời gian đọc lại code nhất có thể
- Bất kỳ ai cũng có thể đọc hiểu code



#### The first requirement

Mỗi người đều có một tính cách và hành động riêng. Nhưng, hiển nhiên, tôi sống trong một xã hội, và tôi phải tuân thủ theo những quy tắc, luật lệ được đặt ra.

Tương tự, việc naming, tôi cũng không thể bừa bãi được.

##### Reserved Word

Theo wikipedia

> Trong ngôn ngữ máy tính, một từ dành riêng, còn được gọi là định danh dành riêng là một từ không thể được sử dụng làm định danh, chẳng hạn như tên của một biến, hàm hoặc nhãn - đó là "dành riêng cho việc sử dụng"

Như vậy, ngay ở cách định nghĩa, nó đã yêu cầu tôi tránh xa `Reserved Word`.

`Reserved Word` tuỳ thuộc vào từng programing language hay framework bạn sử dụng.

Ví dụ:

Đối với Ruby, reserved word là: alias, and, class, def ,else, ...

Đối với Ruby on Rails, là: ActionController, ActionView, Binding

Đối với javascript, là: function, char, var, ...

Tôi có thể dùng từ khoá: `Reserved Word + Programing language` để có thể tìm hiểu thêm về các language khác.

##### Convention

Việc tuân theo convention, giúp tôi có thể naming một cách thống nhất, thoải mái, hạn chế tối đa sai sót có thể xảy ra.

- Project convention

  Khi bạn tham gia vào một dự án, việc tuân thủ quy tắc của dự án là việc bắt buộc. Có thể quy tắc này khá lạ lẫm và nghịch lý với bạn và với ngôn ngữ bạn sử dụng. Nhưng, hãy nhớ tuân theo, mọi người trong dự án đang sử dụng, bạn đừng phá vỡ nó, mọi người sẽ khá khó chịu khi đọc code của bạn đó.

- Programing convention (Style guide)

  Nhưng `Style guide` này quy định, cách comment, lùi dòng, hay có thể giúp tôi optimize code luôn.

  Và đặc biệt là tên biến được đặt theo quy tắc nào. Việc này, giúp tôi không đặt tên biến loạn xì ngậu lên.

  Mỗi một ngôn ngữ đều có một hoặc rất nhiều bộ quy tắc. Ví dụ Javascript có rất nhiều style guide: [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html), [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) . Hãy lựa chọn một bộ quy tắc. Đừng tham, nếu bạn không hiểu rõ từng quy tắc một trong từng bộ quy tắc.

- Personal

  Ngoài những quy tắc chung kể trên, hãy tự tạo cho mình một số quy tắc, đừng phá vỡ quy tắc chung.

#### Structure & Namespace

Tôi có thể cho bạn một ví dụ sau

```javascript
// application.js
function saveresume(destination, dset) {
    document.forms.member_resume.destination.value = destination;
    document.forms.member_resume.submit();
}

function previewsaveresume(destination, dset) {
    document.forms.member_resume.destination.value = destination;
    document.forms.member_resume.dset.value = dset;
    document.forms.member_resume.submit();
}

```

Đây là một ví dụ nhỏ, tôi có thể dễ dàng đọc hiểu được.

Nếu tôi code lại, chúng như thế này, liệu có thể dễ hiểu hơn ?

```javascript
// resume.js
class Resume {
    constructor(){}
    function save(destination, dset) {
        document.forms.member_resume.destination.value= destination;
        document.forms.member_resume.submit();
    }

    function preview(destination, dset) {
        document.forms.member_resume.destination.value = destination;
        document.forms.member_resume.dset.value = dset;
        document.forms.member_resume.submit();
    }
}
```

Tôi đã `Structure` lại (chuyển chúng ra file resume.js) và `Namespace` (sử dụng object `Resume`).

Việc `chia nhỏ` như trên, giúp tôi không bị conflict với bất kỳ một tác vụ nào có thể phát sinh. Biết đâu, trong quá trình coding, tôi có thể phát sinh thêm nhiều `save` và `preview` với một đối tượng nào đó. Nó có thể khiến tôi nhầm lẫn. Do đó, tôi `chia để trị`

#### Case style

Khi code javascript, tôi hay gặp trường hợp, cùng một developer, lúc thì bạn đó viết: `save_file`, lúc thì bạn viết `saveFile`.

Thật may mắn, khi bạn sử dụng `Programing convention (Style guide)` mà tôi đã nhắc ở trên, nó hạn chế việc bạn đặt tên lung tung như vậy.

Vậy có bao nhiêu loạ `case style`

- camelCase: sử dụng để khai báo biến
- PascalCase: sử dụng để khai báo class
- snake_case
  - snake_case: tên trường hoặc bảng trong database, hay là `instance variable`
  - SNAKE_CASE: sử dụng như một hằng số
- keybab-case: sử dụng trong url

Dài quá, tôi sẽ tiếp tục ở phần 2
