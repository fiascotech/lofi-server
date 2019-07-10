FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install curl -y
RUN apt-get install icecast2 -y

RUN mkdir /var/log/icecast/
RUN useradd -rm -d /home/dione -s /bin/bash -g root -G sudo -u 1000 dione
RUN chown dione /var/log/icecast

USER dione
WORKDIR /home/dione

# server start and configuration
COPY ./icecast-config.xml ./icecast-config.xml

CMD icecast2 -c ./icecast-config.xml
