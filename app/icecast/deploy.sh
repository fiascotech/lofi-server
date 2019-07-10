#!/usr/bin/env bash

docker run --name icecast-server --ip 172.19.0.3 --net icecastNets -d -p 8000:8000 icecast-server:latest
