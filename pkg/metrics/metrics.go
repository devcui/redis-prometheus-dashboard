/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 09:15:34
 * @LastEditTime: 2020-11-19 11:17:00
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/pkg/metrics/metrics.go
 * @LICENSE: Apache-2.0
 */
package metrics

import (
	"ferried/redis-prometheus-dashboard/pkg/prometheus"
	"net/url"
	"regexp"
	"sync"

	jsoniter "github.com/json-iterator/go"
)

var jsonIter = jsoniter.ConfigCompatibleWithStandardLibrary

// GetRedisMetrics ..
func GetRedisMetrics(params RequestParams) *Response {
	client := prometheus.Client
	ch := make(chan APIResponse, ChannelMaxCapacity)
	var wg sync.WaitGroup

	// for each metric, make PromQL expression and send the request to Prometheus servers
	for _, metricName := range redisMetrics {
		matched, _ := regexp.MatchString(params.MetricsFilter, metricName)
		if matched {
			wg.Add(1)
			go func(metricName string, params RequestParams) {
				exp := makePromsqlForRedis(metricName, params)
				v := url.Values{}
				for key, value := range params.QueryParams {
					v[key] = value
				}
				v.Set("query", exp)
				response := client.QueryToK8SPrometheus(params.QueryType, v.Encode())
				ch <- APIResponse{
					MetricName:  metricName,
					APIResponse: response,
				}
				wg.Done()
			}(metricName, params)
		}
	}
	wg.Wait()
	close(ch)

	var apiResponse []APIResponse
	for e := range ch {
		apiResponse = append(apiResponse, e)
	}

	return &Response{
		MetricsLevel: MonitorLevelCluster,
		Results:      apiResponse,
	}
}
