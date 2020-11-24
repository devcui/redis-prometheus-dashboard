/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-23 09:34:12
 * @LastEditTime: 2020-11-24 10:28:47
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/web/src/utils/metrics.ts
 * @LICENSE: Apache-2.0
 */

export interface Metric {
    metric_name: string;
    status: string;
    data: {
        result: Array<MetricResult>;
        resultType: string;
        [key: string]: any;
    }
    [key: string]: any;
}

export interface MetricResult {
    metric: {
        cmd: string;
        db: string;
        endpoint: string;
        instance: string;
        job: string;
        namespace: string;
        service: string;
        [key: string]: any;
    }
    // array[1] 时间戳(秒) - array[2] value
    value: Array<Array<any>>
    [key: string]: any;
}