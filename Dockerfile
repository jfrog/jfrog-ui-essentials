FROM docker.jfrog.io/node:9.11.2-slim
RUN apt-get update && \
    npm install -g gulp && \
    npm install -g npm@6.2.0

ADD ./ ./
WORKDIR /

RUN rm -r package-lock.json && npm install && gulp build