/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 11:36:44
 * @LastEditTime: 2020-11-19 09:29:27
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/metrics/constants.go
 * @LICENSE: Apache-2.0
 */

package metrics

const (
	MonitorLevelCluster   = "cluster"
	MonitorLevelNode      = "node"
	MonitorLevelWorkspace = "workspace"
	MonitorLevelNamespace = "namespace"
	MonitorLevelPod       = "pod"
	MonitorLevelContainer = "container"
	MonitorLevelPVC       = "pvc"
	MonitorLevelWorkload  = "workload"
	MonitorLevelComponent = "component"

	ChannelMaxCapacity = 100

	RangeQuery       = "query_range"
	Query            = "query"
	DefaultQueryStep = "10m"

	StatefulSet = "StatefulSet"
	DaemonSet   = "DaemonSet"
	Deployment  = "Deployment"
)
