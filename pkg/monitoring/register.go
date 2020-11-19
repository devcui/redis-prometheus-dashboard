/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 10:26:11
 * @LastEditTime: 2020-11-19 11:24:23
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

var GroupVersion = schema.GroupVersion{Group: GroupName, Version: "v1alpha2"}

var (
	WebServiceBuilder = runtime.NewContainerBuilder(addWebService)
	AddToContainer    = WebServiceBuilder.AddToContainer
)

func addWebService(c *restful.Container) error {
	ws := runtime.NewWebService(GroupVersion)

	ws.Route(ws.GET("/redis").To(MonitorRedis).
		Doc("Get cluster-level metric data.").
		Metadata(restfulspec.KeyOpenAPITags, []string{"Redis"}).
		Writes(metrics.Response{}).
		Returns(http.StatusOK, RespOK, metrics.Response{})).
		Consumes(restful.MIME_JSON, restful.MIME_XML).
		Produces(restful.MIME_JSON)

	c.Add(ws)

	return nil
}
