---
title: "Docker Commands For Beginner"
date: "2020-10-13"
published: true
tags:
  - Docker
---


Có rất nhiều docker command được giới thiệu trong document của docker. Chúng ta chắc hẳn không sử dụng hết tất cả chúng. Vậy với những người mới bắt đầu sử dụng docker, chúng ta cần chú ý đến những command nào. Trong bài viết này, mình sẽ giới thiệu cho các bạn các lệnh docker hay sử dụng nhất.

**_1. Kiểm tra phiên bản_**

```bash
docker -v
```

**_2. Liệt kê các image_**

```bash
docker images -a
```

**_3. Xóa một image_**

```bash
docker image rm <imageId>
```

**_4. Tải về một image từ hub.docker.com_**

```bash
docker pull <imageName>:<version>
```

**_5. Kiểm tra thông tin chi tiết của 1 image_**

```bash
docker inspect <imageId>
```

**_6. Liệt kê các container đang chạy_**

```bash
docker ps
```

**_7. Liệt kê tất cả các container_**

```bash
docker ps -a
```

**_8. Xóa container_**

```bash
docker container rm <containerId>
```

**_9. Tạo mới một container_**

```bash
docker run -it <imageId>
```

**_10. Vào terminal container đang chạy_**

```bash
docker container attach <containerId>
```

**_11. Chạy container đang dừng_**

```bash
docker container start -i <containerId>
```

**_12. Chạy một lệnh trên container đang chạy_**

```bash
docker exec -it <containerId> <command>
```

**_13. Kiểm tra thông tin chi tiết của 1 container_**

```bash
docker inspect <containerId>
```

**_14. Dừng 1 container_**

```bash
docker stop <containerId>
```

**_15. Chia sẻ dữ liệu_**

```bash
docker run -it -v <pathInHost>:<pathInContainer> <imageName>
```

**_16. Liệt kê network trong docker_**

```bash
docker network ls
```

**_17. Tạo một network_**

```bash
docker network create --driver <networkType> <networkName>
```

**_18. Kết nối vào 1 network_**

```bash
docker network connect <networkName> <containerName>
```

**_19. Kiểm tra các thông tin của network_**

```bash
docker inspect <networkName>
```

**_20. Mapping post_**

```bash
docker run -p <hostPost>:<containerPost>
```

**_21. Xem lịch sử container_**

```bash
docker history <containerId>
```

**_22. Check logs container_**

```bash
docker logs <containerId>
```

**_23. Hướng dẫn sử dụng lệnh_**

```bash
docker --help
```

**_24. Xoá tất cả container, image, network, và build cache không sử dụng_**

```bash
docker system prune
```

**_25. Kiểm tra các thay đổi của container từ khi nó được tạo_**

```bash
docker diff <containerName>
```

**_26. Lưu container thành image_**

```bash
docker commit <containerId> <imageName>:<version>
```

**_27. Tạo image từ dockerfile_**

```bash
docker buid
```

# II. Lời kết

Trên dây là những lệnh docker cơ bản hay dùng. Hi vọng bài viết sẽ giúp ích cho mọi người khi làm việc với Docker.
*<div style="text-align: right"> - by Huunv </div>*
