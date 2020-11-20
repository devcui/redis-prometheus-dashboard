/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 11:36:44
 * @LastEditTime: 2020-11-20 17:12:34
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/metrics/constants.go
 * @LICENSE: Apache-2.0
 */

package metrics

const (
	MonitorLevelRedis = "redis"

	ChannelMaxCapacity = 100

	RangeQuery       = "query_range"
	Query            = "query"
	DefaultQueryStep = "10m"

	StatefulSet = "StatefulSet"
	DaemonSet   = "DaemonSet"
	Deployment  = "Deployment"
)
