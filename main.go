/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-17 13:54:42
 * @LastEditTime: 2020-11-19 11:24:43
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/main.go
 * @LICENSE: Apache-2.0
 */

package main

import (
	"ferried/redis-prometheus-dashboard/pkg/api"
	"ferried/redis-prometheus-dashboard/pkg/runtime"
	"ferried/redis-prometheus-dashboard/pkg/server"
	"fmt"
	"net/http"

	"k8s.io/klog"
)

func main() {
	CreateAPIServer(server.NewServerRunOptions())
}

func CreateAPIServer(s *server.ServerRunOptions) error {
	var err error

	container := runtime.Container
	container.DoNotRecover(false)
	container.Filter(server.Logging)
	container.RecoverHandler(server.LogStackOnRecover)

	api.InstallAPIs(container)

	if s.InsecurePort != 0 {
		err = http.ListenAndServe(fmt.Sprintf("%s:%d", s.BindAddress, s.InsecurePort), container)
		if err == nil {
			klog.V(0).Infof("Server listening on insecure port %d.", s.InsecurePort)
		}
	}

	if s.SecurePort != 0 && len(s.TlsCertFile) > 0 && len(s.TlsPrivateKey) > 0 {
		err = http.ListenAndServeTLS(fmt.Sprintf("%s:%d", s.BindAddress, s.SecurePort), s.TlsCertFile, s.TlsPrivateKey, container)
		if err == nil {
			klog.V(0).Infof("Server listening on secure port %d.", s.SecurePort)
		}
	}

	return err
}
