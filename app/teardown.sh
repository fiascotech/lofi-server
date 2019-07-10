#!/usr/bin/env bash

docker stop ices-source-client icecast-server ; docker rm ices-source-client icecast-server

docker rmi icecast-server ices-source-client
docker network rm icecastNets || true
