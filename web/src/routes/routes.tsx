/*
 * @Author: ferried
 * @Email: harlancui@outlook.com
 * @Date: 2020-11-17 16:32:15
 * @LastEditTime: 2020-11-30 20:20:19
 * @LastEditors: ferried
 * @Description: Basic description
 * @FilePath: /redis-prometheus-dashboard/web/src/routes/routes.tsx
 * @LICENSE: Apache-2.0
 */
import BaseLayout from "../components/layout/BaseLayout";
import Dashboard from "./Dashboard";
export default [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "/dashboard",
        title: "dash",
        component: Dashboard,
      },
    ],
  },
];
