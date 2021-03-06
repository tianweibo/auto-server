version: '3'
services:
    the-server: # service name
        build:
            context: . # 当前目录
            dockerfile: Dockerfile # 基于 Dockerfile 构建
        image: the-server # 依赖于当前 Dockerfile 创建出来的镜像
        container_name: the-server
        ports:
            - 8088:7001 # 宿主机通过 8081 访问
        depends_on:
            - my-mysql
    my-mysql:
        image: mysql # 引用官网 mysql 镜像
        container_name: my-mysql
        restart: always # 出错则重启
        privileged: true # 高权限，执行下面的 mysql/init
        command: --default-authentication-plugin=mysql_native_password # 远程访问
        ports:
            - 3309:3306 # 宿主机可以用 127.0.0.1:3305 即可连接容器中的数据库，和 redis 一样
        volumes:
            - ./mysql/log:/var/log/mysql # 记录日志
            - ./mysql/data:/var/lib/mysql # 数据持久化
            - ./mysql/init:/docker-entrypoint-initdb.d/ # 初始化 sql
        environment:
            - MYSQL_USER=root
            - MYSQL_DATABASE=auto-mysql # 初始化容器时创建数据库
            - MYSQL_ROOT_PASSWORD=314159
            - TZ=Asia/Shanghai # 设置时区
    
