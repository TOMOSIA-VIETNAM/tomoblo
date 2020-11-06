---
title: "Tìm hiểu về nuxtjs"
date: "2020-08-24"
published: true
tags:
  - Vuejs
  - Nuxtjs
  - Javascript
---

# Lời nói đầu
Nếu bạn đàng bắt đầu tìm hiểu hoặc đã từng có thời gian làm việc với javascript thì chắc hẳn những cái tên như **Angular**, **Reactjs**, **Vuejs** đã không còn là những từ khoá mới lạ phải không nào? Mình đã từng có thời gian làm việc với **Vuejs**, cũng tìm hiểu qua những framework javascript khác và mình nghĩ ai cũng có thể dễ dàng nhận ra chúng đều là những framework làm **Client Side Render(CSR)**.  Tuy nhiên, trong phần lớn dự án thực tế thì sẽ phải sử dụng **Server Side Render(SSR)** nhiều hơn. Vậy có một cái gì đó tương tự như **Vuejs** hay** Reactjs** nhưng hỗ trợ **SSR** không. Câu trả lời là có. 2 framework mới đã ra đời ngay sau đó là **Nextjs**(Dùng cho **Reactjs**) và **Nuxtjs**(Dành cho **Vuejs**) để đáp ứng được nhu cầu thực tiễn. Trong bài viết này mình sẽ cùng các bạn tìm hiểu cơ bản chút về **Nuxtjs** xem có gì mới không nhé. Có lẽ sẽ có bạn tự hỏi tại sao mình lại chọn **Nuxtjs** mà không phải **Nextjs** sau lời mở đầu. Cơ bản là vì mình hiện đang làm việc với **Vuejs** nên sẽ tìm hiểu **Nuxtjs** trước đã :D.

# Nội dung

## Tìm hiểu về Nuxtjs

### 1. Tổng quan về Nuxt.js:

-   Khi đánh giá một repository trên github thì điều đầu tiên mình quan tâm chính là số stars, vì nó chính là sự công nhận, đánh giá của cộng đồng, và như các bạn có thể thấy là nuxt đang nhận được > 29.2k stars trên github. Một con số đáng ngưỡng mộ trong thời gian ngắn:
![](/star-github.png)
    
-   Tiếp theo là số lượng người dùng và contributors cực kì đông đảo, bạn có thể yên tâm về việc có thể sử dụng lâu dài (vẫn liên tục được phát triển và sửa lỗi) và nhận được nhiều sự hỗ trợ với một cộng đồng người dùng lớn như thế này!
    ![](/using-quantity.png)
-   **Nuxt.js** được cài đặt bao gồm một số thư viện sau:
    
    -   [Vue 2](https://vuejs.org)
    -   [Vue Router](https://router.vuejs.org/)
    -   [Vuex](https://vuex.vuejs.org/guide/)  (được cài đặt khi sử dụng store)
    -   [Vue Server Renderer](https://ssr.vuejs.org/)  (sẽ được loại trừ nếu khi cài đặt bạn lựa chọn  `mode: 'spa'`)
    -   [Vue Meta](https://github.com/nuxt/vue-meta)
    
Tổng dung lượng sau khi cài đặt tất cả những gói trên chỉ có **60kB**(nếu không có có Vuex thì chỉ còn **57KB**), cực kì nhỏ gọn phải không nào!
    

### 2. Khởi tạo và cấu trúc thư mục của một project nuxtjs:

-   Để khởi tạo một project nuxt, chúng ta sử dụng  `create-nuxt-app`:
    
    ```bash
    # sử dụng npx (npx được cài đặt kèm với NPM từ phiên bản 5.2.0)
    $ npx create-nuxt-app <project-name> 
    # hoặc sử dụng yarn
    $ yarn create nuxt-app <project-name>
    
    ```
    
-   Trong quá trình khởi tạo project, bạn sẽ phải khai báo một số thông tin như là tên, UI framework (Ant Design, Bootstrap, Element, ...), ... cho project của bạn.!![](/create-project.png)
    
-   Thư mục project sẽ có cấu trúc như sau:![](/structure-folder.png)
    
-   Sau khi khởi tạo project thành công thì bạn sử dụng câu lệnh  `npm run dev`  để chạy project và bạn có thể truy cập thông qua đường dẫn  [http://localhost:3000](http://localhost:3000/)
    

### 3. Một số chức năng cơ bản cần chú ý

-   **Routing**: như đã nói ở phần 1, Nuxt.js đã bao gồm  `vue-router`  nên nó sẽ tự động sinh ra các router dựa trên cấu trúc thư mục  `pages`  trong project. Tức là bạn sẽ không cần phải khai báo router mà chỉ cần đặt tên file, cấu trúc thư mục theo 1 quy tắc nhất định thì sẽ tự động sinh ra router. Ví dụ như sau:
    
    -   **Basic route**:
        
        ```
            pages/
            --| users/
            -----| index.vue
            -----| profile.vue
            --| index.vue
        
        ```
        
        sẽ tự động sinh ra khai báo router như sau:
        
        ```
        router: {
          routes: [
            {
              name: 'index',
              path: '/',
              component: 'pages/index.vue'
            },
            {
              name: 'users',
              path: '/users',
              component: 'pages/users/index.vue'
            },
            {
              name: 'users-profile',
              path: '/users/profile',
              component: 'pages/users/profile.vue'
            }
          ]
        }
        
        ```
        
    -   Còn đối với  **Dynamic Route**  (tức là có truyền tham số vào router ví dụ như id, slug) thì bạn chỉ cần đặt tên folder hoặc tên file bắt đầu bằng dấu  `_`, ví dụ như là  `_id.vue`  hoặc  `_slug/`
        
        ```
        pages/
        --| users/
        -----| _id.vue
        --| index.vue
        --| _slug
        -----| index.vue
        -----| comments.vue
        ```
        
        thì sẽ tự động sinh ra khai báo router như sau:
        
        ```
        router: {
          routes: [
            {
              name: 'index',
              path: '/',
              component: 'pages/index.vue'
            },
            {
              name: 'users-id',
              path: '/users/:id?',
              component: 'pages/users/_id.vue'
            },
            {
              name: 'slug',
              path: '/:slug',
              component: 'pages/_slug/index.vue'
            },
            {
              name: 'slug-comments',
              path: '/:slug/comments',
              component: 'pages/_slug/comments.vue'
            },
          ]
        }
        
        ```
        
        Và do tham số truyền vào dynamic route này có thể là do người dùng truyền vào nên chúng ta sẽ cần validate nó theo đúng kiểu, format mà chúng ta muốn. (Sau 1 thời gian làm coder thì mình luôn nhớ rõ 1 câu  **`ĐỪNG BAO GIỜ TIN TƯỞNG HOÀN TOÀN NGƯỜI DÙNG`**).
        
        Và Nuxt.js cũng cho phép chúng ta có thể viết hàm validate trong component. Các bạn có thể tham khảo thêm về validate trong Nuxt.js ở  [đây](https://nuxtjs.org/api/pages-validate). Còn đây là ví dụ đơn giản validate id truyền vào phải là số.
        
        ```js
        export default {
          validate ({ params }) {
            // Must be a number
            return /^\d+$/.test(params.id)
          }
        }
        
        ```
        
-   **Views**:
    
    -   **Layout**: layout là một khung bố cục chung cho các trang gần giống nhau (ví dụ như các trang thuộc phần quản trị của admin sẽ dùng chung 1 layout). Để sử dụng layout cho một page, bạn chỉ cần khai báo
        
        ```
        <script>
             export default {
               layout: 'LayoutName'
             }
        </script>
        
        ```
        
        Còn trong trường hợp bạn không khai báo layout thì Nuxt.js sẽ tự sử dụng layout mặc định tại  `layouts/default.vue`.
        
        Hãy nhớ sử dụng component  `<nuxt/>`  trong layout để có thể load được nội dung của page nhé!
        
        ```html
        <template>
            <nuxt/>
        </template>
        
        ```
        
    -   **Pages**: được đặt trong thư mục  `pages`, Nuxt.js sẽ đọc tất cả các file .vue và dựa theo cấu trúc thư mục này để sinh ra các route tương ứng với các trang của bạn. Và ở trong page, Nuxt.js cung cấp thêm một số attributes và functions đặc biệt để hỗ trợ cho công việc phát triển. Điển hình như:
        
        -   [head](https://nuxtjs.org/api/pages-head): chỉ định các <meta> tags cho page để hỗ trợ cho việc SEO.
        -   [asyncData](https://nuxtjs.org/guide/async-data): xử lý bất đồng bộ để nhận dữ liệu sử dụng cho page.
        -   [fetch](https://nuxtjs.org/api/pages-fetch): tương tự với asyncData, trừ việc nó sẽ không set component data.
        -   [validate](https://nuxtjs.org/api/pages-validate#the-validate-method): validate tham số được truyền vào trong dynamic route đã nói ở phần trên.
        -   [middleware](https://nuxtjs.org/guide/routing#middleware): khai báo middleware để giới hạn xem user/guest có thể xem được trang. Và nó sẽ được gọi trước khi trang được render ra.
    -   **Error Page**: Ngoài các page hiển thị thông thường, Error Page khi có lỗi (404, 500) xảy ra cũng là một phần cần chú ý để tạo ra dấu ấn riêng cho trang web của bạn.
        
-   **Vuex Store**: Phần này mình hẹn các bạn sẽ viết trong bài sắp tới vì không thể nói hết trong 1,2 dòng được.
    
-   **Một số câu lệnh thường dùng**:
    
    Command
    
    Description
    
    `nuxt dev`
    
    start project kèm theo hot-reloading
    
    `nuxt build`
    
    build project với webpack và minify các file JS, CSS
    
    `nuxt export`
    
    sinh ra file HTML từ các route (sử dụng cho static hosting cho các phiên bản Nuxt >= 2.13)
    
    `nuxt generate`
    
    build project và sinh ra file HTML từ các route (sử dụng cho static hosting phiên bản Nuxt >= 2.13)
    

# Tổng kết

-   Sau khi đọc xong bài viết này, hi vọng rằng các bạn đã có thể nắm được một số nội dung cơ bản khi bắt đầu tìm hiểu về nuxtjs, nếu muốn tìm hiểu sâu hơn thì các bạn có thể tham khảo thêm tại trang chủ [https://nuxtjs.org/](https://nuxtjs.org/)  hoặc đón đọc những bài viết tiếp theo của mình về chủ đề này nhé.
-   Cảm ơn các bạn đã dành thời gian đọc bài viết, nếu thấy nội dung bài viết hay và hữu ích, hãy  **share**  bài viết cho bạn bè cùng đọc nhé, còn nếu có vấn đề gì chưa ổn (kiến thức, cách diễn đạt, ...) thì hãy  **comment**  góp ý xuống phía dưới để mình có thể cải thiện và viết được những bài viết chất lượng hơn nhé.

# Tài liệu tham khảo

-   Homepage:  [https://nuxtjs.org/](https://nuxtjs.org/)
-   Github:  [https://github.com/nuxt/nuxt.js](https://github.com/nuxt/nuxt.js)