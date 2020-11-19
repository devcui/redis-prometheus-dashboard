/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 10:55:40
 * @LastEditTime: 2020-11-19 10:30:26
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/client/prometheus/options.go
 * @LICENSE: Apache-2.0
 */

package prometheus

import (
	"ferried/redis-prometheus-dashboard/pkg/env"
	"os"
)

// PrometheusOptions ..
type PrometheusOptions struct {
	Endpoint          string `json:"endpoint,omitempty" yaml:"endpoint"`
	SecondaryEndpoint string `json:"secondaryEndpoint,omitempty" yaml:"secondaryEndpoint"`
}

// NewPrometheusOptions new Prometheus option
func NewPrometheusOptions() *PrometheusOptions {
	o := &PrometheusOptions{
		Endpoint:          "http://127.0.0.1:30313",
		SecondaryEndpoint: "http://127.0.0.1:30313",
	}
	o.InstallConfig()
	return o
}

// InstallConfig get config from env
func (s *PrometheusOptions) InstallConfig() {
	if end := os.Getenv(env.PROMETHEUS_ENDPOINT); end != "" {
		s.Endpoint = end
	}
	if send := os.Getenv(env.PROMETHEUS_SECONDARY_ENDPOINT); send != "" {
		s.SecondaryEndpoint = send
	}
}

// ApplyTo apply options to s
func (s *PrometheusOptions) ApplyTo(options *PrometheusOptions) {
	if s.Endpoint != "" {
		options.Endpoint = s.Endpoint
	}

	if s.SecondaryEndpoint != "" {
		options.SecondaryEndpoint = s.SecondaryEndpoint
	}
}
