###
 # @Date: 2020-01-20 20:45:06
 # @LastEditors  : Asen Wang
 # @LastEditTime : 2020-01-21 00:20:21
 # @content: I
 ###
docker build -t registry.cn-shanghai.aliyuncs.com/first_ry/bblog:v3 .
docker run -d -p 5000:5000 --name blog registry.cn-shanghai.aliyuncs.com/first_ry/bblog:v2
docker push registry.cn-shanghai.aliyuncs.com/first_ry/bblog:v3

version: '2'

services:
  mblog:
    image: registry.cn-shanghai.aliyuncs.com/first_ry/bblog:v2
    restart: always
    ports:
      - 5000:5000