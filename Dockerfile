# node 构建
FROM node:18 AS build-stage
MAINTAINER pepedd864 'pepedd@qq.com'
WORKDIR /app
COPY . .
# 设置阿里镜像、pnpm、依赖、编译
RUN npm config set registry https://registry.npmmirror.com && \
    npm install pnpm -g && \
    pnpm install --frozen-lockfile && \
    pnpm run build && \
    echo "🎉 编 🎉 译 🎉 成 🎉 功 🎉\n" # 这里不能用 \n 换行, 否则会导致下面的命令无法执行 会引起循环依赖(build stage 依赖 build stage)
# nginx 部署
FROM nginx:latest AS production-stage
WORKDIR /usr/share/nginx/html
# 0 代表上一步骤 使用FROM 时就创建了一个镜像层，这个镜像层的序号就是0
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

#  CMD 和 RUN 的区别
#  CMD 是在容器启动后执行的命令，而 RUN 则是在镜像构建的时候执行的命令。
CMD nginx -g 'daemon off;'
