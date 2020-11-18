/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-18 11:08:26
 * @LastEditTime: 2020-11-18 11:08:48
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/prometheus/prometheus_res.go
 * @LICENSE: Apache-2.0
 */

package prometheus

// APIResponse Prometheus query api response
type APIResponse struct {
	Status    string      `json:"status" description:"result status, one of error, success"`
	Data      QueryResult `json:"data" description:"actual metric result"`
	ErrorType string      `json:"errorType,omitempty"`
	Error     string      `json:"error,omitempty"`
	Warnings  []string    `json:"warnings,omitempty"`
}

// QueryResult includes result data from a query.
type QueryResult struct {
	ResultType string       `json:"resultType" description:"result type, one of matrix, vector"`
	Result     []QueryValue `json:"result" description:"metric data including labels, time series and values"`
}

// QueryValue Time Series
type QueryValue struct {
	Metric map[string]string `json:"metric,omitempty" description:"time series labels"`
	Value  []interface{}     `json:"value,omitempty" description:"time series, values of vector type"`
	Values [][]interface{}   `json:"values,omitempty" description:"time series, values of matrix type"`
}
