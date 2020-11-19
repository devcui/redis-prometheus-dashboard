/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 11:05:09
 * @LastEditTime: 2020-11-19 11:09:29
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/server/options.go
 * @LICENSE: Apache-2.0
 */
package server

type ServerRunOptions struct {
	// server bind address
	BindAddress string

	// insecure port number
	InsecurePort int

	// secure port number
	SecurePort int

	// tls cert file
	TlsCertFile string

	// tls private key file
	TlsPrivateKey string
}

func NewServerRunOptions() *ServerRunOptions {
	// create default server run options
	s := ServerRunOptions{
		BindAddress:   "0.0.0.0",
		InsecurePort:  9090,
		SecurePort:    0,
		TlsCertFile:   "",
		TlsPrivateKey: "",
	}

	return &s
}
