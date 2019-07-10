FROM node:12

RUN apt-get update -y
RUN apt-get install curl -y
RUN apt-get install ices2 -y

RUN mkdir /var/log/ices/
RUN useradd -rm -d /home/helene -s /bin/bash -g root -G sudo -u 1001 helene
RUN chown helene /var/log/ices/

USER helene
WORKDIR /home/helene

# server start and configuration
COPY ./app.js .
COPY ./ices-config.xml ./ices-config.xml

CMD ices2 ./ices-config.xml & node app.js
