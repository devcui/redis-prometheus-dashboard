/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-23 10:40:09
 * @LastEditTime: 2020-11-23 11:27:43
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/web/src/utils/http.ts
 * @LICENSE: Apache-2.0
 */

import { from } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
    PUT = "PUT",
    OPTIONS = "OPTIONS"
}

export interface HTTP_OPTIONS extends RequestInit {
    url: string;
}

export function http(options: HTTP_OPTIONS): Observable<Response> {
    return from(fetch(options.url, {
        method: options.method,
        body: options?.body,
        headers: options?.headers,
        credentials: 'include'
    }).then(r => r.json()))
}