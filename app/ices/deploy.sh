#!/usr/bin/env bash

docker stop ices-source-client ; docker rm ices-source-client
docker run --name ices-source-client --net icecastNets -v $(pwd)/media/:/home/helene/media -d -p 8001:8000 ices-source-client:latest
