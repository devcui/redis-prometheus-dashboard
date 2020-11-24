/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 10:26:11
 * @LastEditTime: 2020-11-24 09:22:44
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/monitoring/register.go
 * @LICENSE: Apache-2.0
 */

package monitoring

import (
	"ferried/redis-prometheus-dashboard/pkg/metrics"
	"ferried/redis-prometheus-dashboard/pkg/runtime"
	"net/http"

	"github.com/emicklei/go-restful"
	restfulspec "github.com/emicklei/go-restful-openapi"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

//http://localhost:9090/kapis/monitoring.kube.io/v1alpha2/redis

const (
	GroupName = "monitoring.kube.io"
	RespOK    = "ok"
)

var (
	GroupVersion      = schema.GroupVersion{Group: GroupName, Version: "v1alpha2"}
	WebServiceBuilder = runtime.NewContainerBuilder(addWebService)
	AddToContainer    = WebServiceBuilder.AddToContainer
)

func addWebService(c *restful.Container) error {
	ws := runtime.NewWebService(GroupVersion)

	ws.Route(ws.GET("/redis").To(MonitorRedis).
		Doc("Get cluster-level metric data.").
		Param(ws.QueryParameter("metrics_filter", "The metric name filter consists of a regexp pattern. It specifies which metric data to return. For example, the following filter matches both cluster CPU usage and disk usage: `cluster_cpu_usage|cluster_disk_size_usage`. View available metrics at [kubesphere.io](https://docs.kubesphere.io/advanced-v2.0/zh-CN/api-reference/monitoring-metrics/).").DataType("string").Required(false)).
		Param(ws.QueryParameter("start", "Start time of query. Use **start** and **end** to retrieve metric data over a time span. It is a string with Unix time format, eg. 1559347200. ").DataType("string").Required(false)).
		Param(ws.QueryParameter("end", "End time of query. Use **start** and **end** to retrieve metric data over a time span. It is a string with Unix time format, eg. 1561939200. ").DataType("string").Required(false)).
		Param(ws.QueryParameter("step", "Time interval. Retrieve metric data at a fixed interval within the time range of start and end. It requires both **start** and **end** are provided. The format is [0-9]+[smhdwy]. Defaults to 10m (i.e. 10 min).").DataType("string").DefaultValue("10m").Required(false)).
		Param(ws.QueryParameter("time", "A timestamp in Unix time format. Retrieve metric data at a single point in time. Defaults to now. Time and the combination of start, end, step are mutually exclusive.").DataType("string").Required(false)).
		Param(ws.QueryParameter("type", "Additional operations. Currently available types is statistics. It retrieves the total number of workspaces, devops projects, namespaces, accounts in the cluster at the moment.").DataType("string").Required(false)).
		Metadata(restfulspec.KeyOpenAPITags, []string{"Redis"}).
		Writes(metrics.Response{}).
		Returns(http.StatusOK, RespOK, metrics.Response{})).
		Consumes(restful.MIME_JSON, restful.MIME_XML).
		Produces(restful.MIME_JSON)

	c.Add(ws)

	return nil
}
