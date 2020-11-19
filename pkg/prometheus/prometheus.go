/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 11:04:25
 * @LastEditTime: 2020-11-19 10:55:55
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/client/prometheus/prometheus.go
 * @LICENSE: Apache-2.0
 */

package prometheus

import (
	"ferried/redis-prometheus-dashboard/pkg/types"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	jsoniter "github.com/json-iterator/go"
	"k8s.io/klog"
)

// Prometheus export prometheus
var Client *PrometheusClient

// ConfigCompatibleWithStandardLibrary tries to be 100% compatible with standard library behavior
var jsonIter = jsoniter.ConfigCompatibleWithStandardLibrary

func init() {
	if Client == nil {
		o := NewPrometheusOptions()
		p, _ := NewPrometheusClient(o)
		Client = p
	}
}

// PrometheusClient request to prometheus to query data
type PrometheusClient struct {
	client            *http.Client
	endpoint          string
	secondaryEndpoint string
}

// NewPrometheusClient new prometheus client
func NewPrometheusClient(options *PrometheusOptions) (*PrometheusClient, error) {
	return &PrometheusClient{
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
		endpoint:          options.Endpoint,
		secondaryEndpoint: options.SecondaryEndpoint,
	}, nil
}

// query query metrics from the prometheus
func (c *PrometheusClient) query(endpoint string, queryType string, params string) (apiResponse types.APIResponse) {
	url := fmt.Sprintf("%s/api/v1/%s?%s", endpoint, queryType, params)

	response, err := c.client.Get(url)
	if err != nil {
		klog.Error(err)
		apiResponse.Status = "error"
		return apiResponse
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		klog.Error(err)
		apiResponse.Status = "error"
		return apiResponse
	}

	err = jsonIter.Unmarshal(body, &apiResponse)
	if err != nil {
		klog.Errorf("fail to unmarshal prometheus query result: %s", err.Error())
		apiResponse.Status = "error"
		return apiResponse
	}

	return apiResponse
}

// QueryToK8SPrometheus use endpoint to query
func (c *PrometheusClient) QueryToK8SPrometheus(queryType string, params string) (apiResponse types.APIResponse) {
	return c.query(c.endpoint, queryType, params)
}

// QueryToK8SSystemPrometheus use secondaryEndpoint to query
func (c *PrometheusClient) QueryToK8SSystemPrometheus(queryType string, params string) (apiResponse types.APIResponse) {
	return c.query(c.secondaryEndpoint, queryType, params)
}
