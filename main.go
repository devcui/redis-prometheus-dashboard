/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-17 13:54:42
 * @LastEditTime: 2020-11-18 11:35:34
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/main.go
 * @LICENSE: Apache-2.0
 */

package main

import "ferried/redis-prometheus-dashboard/prometheus"

func main() {
	o := prometheus.NewPrometheusOptions()
	c, err := prometheus.NewPrometheusClient(o)
}
