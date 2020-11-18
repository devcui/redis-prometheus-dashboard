/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 11:37:47
 * @LastEditTime: 2020-11-18 11:44:57
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/metrics/types.go
 * @LICENSE: Apache-2.0
 */

package metrics

import (
	"ferried/redis-prometheus-dashboard/prometheus"
	"net/url"
)

// RequestParams ..
type RequestParams struct {
	QueryParams   url.Values
	QueryType     string
	SortMetric    string
	SortType      string
	PageNum       string
	LimitNum      string
	Type          string
	MetricsFilter string
}

// APIResponse ..
type APIResponse struct {
	MetricName string `json:"metric_name,omitempty" description:"metric name, eg. scheduler_up_sum"`
	prometheus.APIResponse
}

// Response ..
type Response struct {
	MetricsLevel string        `json:"metrics_level" description:"metric level, eg. cluster"`
	Results      []APIResponse `json:"results" description:"actual array of results"`
	CurrentPage  int           `json:"page,omitempty" description:"current page returned"`
	TotalPage    int           `json:"total_page,omitempty" description:"total number of pages"`
	TotalItem    int           `json:"total_item,omitempty" description:"page size"`
}
