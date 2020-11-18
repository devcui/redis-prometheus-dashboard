<!--
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 10:12:05
 * @LastEditTime: 2020-11-18 10:15:22
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/yml/README.md
 * @LICENSE: Apache-2.0
-->

# List

- redis_exporter 连接 redis 放出 metrics 提供给 prometheus调用的二进制文件

- redis_exporter.sh 启动 redis_exporter 的脚本文件

- redis_exporter.yml k8s 通过 prometheus-operator 连接 redis_exporter服务的配置文件(ip端口需要自行配置)

- grafana.json grafana测试Redis指标监控 dashboard 数据json