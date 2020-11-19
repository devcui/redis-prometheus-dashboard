/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 10:35:02
 * @LastEditTime: 2020-11-19 10:54:37
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/monitoring/monitoring.go
 * @LICENSE: Apache-2.0
 */

package monitoring

import (
	"ferried/redis-prometheus-dashboard/pkg/metrics"
	"net/url"
	"strings"

	"github.com/emicklei/go-restful"
)

// MonitorRedis ..
func MonitorRedis(request *restful.Request, response *restful.Response) {
	r := ParseRequestParams(request)
	var res *metrics.Response
	res = metrics.GetRedisMetrics(r)
	response.WriteAsJson(res)
}

// ParseRequestParams ..
func ParseRequestParams(request *restful.Request) metrics.RequestParams {
	var requestParams metrics.RequestParams
	// queryTime := strings.Trim(request.QueryParameter("time"), " ")
	// start := strings.Trim(request.QueryParameter("start"), " ")
	// end := strings.Trim(request.QueryParameter("end"), " ")
	// step := strings.Trim(request.QueryParameter("step"), " ")
	sortMetric := strings.Trim(request.QueryParameter("sort_metric"), " ")
	sortType := strings.Trim(request.QueryParameter("sort_type"), " ")
	pageNum := strings.Trim(request.QueryParameter("page"), " ")
	limitNum := strings.Trim(request.QueryParameter("limit"), " ")
	tp := strings.Trim(request.QueryParameter("type"), " ")
	metricsFilter := strings.Trim(request.QueryParameter("metrics_filter"), " ")
	resourcesFilter := strings.Trim(request.QueryParameter("resources_filter"), " ")
	nodeName := strings.Trim(request.PathParameter("node"), " ")
	workspaceName := strings.Trim(request.PathParameter("workspace"), " ")
	namespaceName := strings.Trim(request.PathParameter("namespace"), " ")
	workloadKind := strings.Trim(request.PathParameter("kind"), " ")
	workloadName := strings.Trim(request.PathParameter("workload"), " ")
	podName := strings.Trim(request.PathParameter("pod"), " ")
	containerName := strings.Trim(request.PathParameter("container"), " ")
	pvcName := strings.Trim(request.PathParameter("pvc"), " ")
	storageClassName := strings.Trim(request.PathParameter("storageclass"), " ")
	componentName := strings.Trim(request.PathParameter("component"), " ")

	requestParams = metrics.RequestParams{
		SortMetric:       sortMetric,
		SortType:         sortType,
		PageNum:          pageNum,
		LimitNum:         limitNum,
		Type:             tp,
		MetricsFilter:    metricsFilter,
		ResourcesFilter:  resourcesFilter,
		NodeName:         nodeName,
		WorkspaceName:    workspaceName,
		NamespaceName:    namespaceName,
		WorkloadKind:     workloadKind,
		WorkloadName:     workloadName,
		PodName:          podName,
		ContainerName:    containerName,
		PVCName:          pvcName,
		StorageClassName: storageClassName,
		ComponentName:    componentName,
	}

	if metricsFilter == "" {
		requestParams.MetricsFilter = ".*"
	}
	if resourcesFilter == "" {
		requestParams.ResourcesFilter = ".*"
	}

	v := url.Values{}

	requestParams.QueryParams = v
	requestParams.QueryType = metrics.Query
	return requestParams
}
