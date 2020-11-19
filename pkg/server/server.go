/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 11:04:11
 * @LastEditTime: 2020-11-19 11:10:32
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/server/server.go
 * @LICENSE: Apache-2.0
 */

package server

import (
	"bytes"
	"fmt"
	"net/http"
	"runtime"

	"k8s.io/klog"
)

func LogStackOnRecover(panicReason interface{}, httpWriter http.ResponseWriter) {
	var buffer bytes.Buffer
	buffer.WriteString(fmt.Sprintf("recover from panic situation: - %v\r\n", panicReason))
	for i := 2; ; i += 1 {
		_, file, line, ok := runtime.Caller(i)
		if !ok {
			break
		}
		buffer.WriteString(fmt.Sprintf("    %s:%d\r\n", file, line))
	}
	klog.Error(buffer.String())
	httpWriter.WriteHeader(http.StatusInternalServerError)
	httpWriter.Write([]byte("recover from panic situation"))
}
