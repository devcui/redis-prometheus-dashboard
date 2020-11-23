/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-23 09:34:12
 * @LastEditTime: 2020-11-23 17:44:59
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/web/src/utils/metrics.ts
 * @LICENSE: Apache-2.0
 */

export interface Metric {
    metric_name: string
    status: string
    data: {
        result: Array<MetricResult>
        resultType: string
    }
}

export interface MetricResult {
    metric: {
        cmd: string;
        db: string;
        endpoint: string,
        instance: string,
        job: string,
        namespace: string;
        service: string
    }
    value: Array<any>
}