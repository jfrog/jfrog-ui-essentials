FROM docker.jfrog.io/node:9.11.2-slim
RUN mkdir -p /npm/global && chmod -R 777 /npm/global
ENV NPM_CONFIG_PREFIX=/npm/global
ENV PATH=$PATH:$NPM_CONFIG_PREFIX/bin
WORKDIR /data
ENV HOME=/data
RUN apt-get update && \
    npm install -g gulp && \
    npm install -g npm@6.2.0 && \
    npm install -g npm-cli-login

CMD ["/bin/bash", "-c", "npm install --verbose && gulp build"]