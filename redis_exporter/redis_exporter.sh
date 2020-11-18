###
 # @Author: ferried
 # @Email: harlancui@outlook.com
 # @Date: 2020-11-18 10:07:24
 # @LastEditTime: 2020-11-18 10:07:35
 # @LastEditors: ferried
 # @Description: Basic description
 # @FilePath: /redis-prometheus-dashboard/yml/redis_exporter.sh
 # @LICENSE: Apache-2.0
### 


nohup ./redis_exporter -redis.addr 0.0.0.0:6379 -redis.password "password"  & link