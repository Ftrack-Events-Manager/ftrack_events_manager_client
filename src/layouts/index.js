import {Layout, ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN"

import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const {Content} = Layout

function BasicLayout({children, location}) {

  if (location.pathname === '/login') {
    return children
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="basic-layout">
        <Header/>
        <Content className="content">{children}</Content>
        <Footer/>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
