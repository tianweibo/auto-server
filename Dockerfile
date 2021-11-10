FROM registry.enbrands.com/node:14.15.0
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /app
ADD . /app
RUN cd /app && npm install
CMD ["npm", "run", "start:docker"]

