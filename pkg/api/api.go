/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 10:57:25
 * @LastEditTime: 2020-11-19 10:58:52
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/apis/apis.go
 * @LICENSE: Apache-2.0
 */

package api

import (
	"ferried/redis-prometheus-dashboard/pkg/monitoring"

	"github.com/emicklei/go-restful"
	urlruntime "k8s.io/apimachinery/pkg/util/runtime"
)

func InstallAPIs(container *restful.Container) {
	urlruntime.Must(monitoring.AddToContainer(container))
}
