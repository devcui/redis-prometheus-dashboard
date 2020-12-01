import { Breadcrumb, Layout } from "antd";
import React from "react";
import { SHOW_HEADER } from "../../../env";
import Navigation from "../navigation/Navigation";
import "./index.less";

const { Header, Content, Footer } = Layout;
export interface BaseLayoutProps {}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  return (
    <>
      <Layout className="layout">
        {SHOW_HEADER && (
          <Header>
            <Navigation />
          </Header>
        )}

        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Redis Prometheus Dashboard ©2020 Created by 河北云在
        </Footer>
      </Layout>
    </>
  );
};

export default BaseLayout;
