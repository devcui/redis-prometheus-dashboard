/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 11:03:38
 * @LastEditTime: 2020-11-19 11:04:01
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/server/logging.go
 * @LICENSE: Apache-2.0
 */
package server

import (
	"net"
	"strings"
	"time"

	"github.com/emicklei/go-restful"
	"k8s.io/klog"
)

func Logging(req *restful.Request, resp *restful.Response, chain *restful.FilterChain) {
	start := time.Now()
	chain.ProcessFilter(req, resp)
	klog.V(4).Infof("%s - \"%s %s %s\" %d %d %dms",
		getRequestIP(req),
		req.Request.Method,
		req.Request.RequestURI,
		req.Request.Proto,
		resp.StatusCode(),
		resp.ContentLength(),
		time.Since(start)/time.Millisecond,
	)
}

func getRequestIP(req *restful.Request) string {
	address := strings.Trim(req.Request.Header.Get("X-Real-Ip"), " ")
	if address != "" {
		return address
	}

	address = strings.Trim(req.Request.Header.Get("X-Forwarded-For"), " ")
	if address != "" {
		return address
	}

	address, _, err := net.SplitHostPort(req.Request.RemoteAddr)
	if err != nil {
		return req.Request.RemoteAddr
	}

	return address
}
