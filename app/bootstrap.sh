#!/usr/bin/env bash

docker network create --subnet=172.19.0.0/16 icecastNets || true
cd icecast
./build.sh
./deploy.sh

cd ../ices
./build.sh
./deploy.sh
