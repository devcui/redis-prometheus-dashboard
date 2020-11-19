/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-19 09:20:09
 * @LastEditTime: 2020-11-19 10:01:16
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/metrics/makesql.go
 * @LICENSE: Apache-2.0
 */

package metrics

func makePromsqlForRedis(metricName string, _ RequestParams) string {
	return redisMetrics[metricName]
}
