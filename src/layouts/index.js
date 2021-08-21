import {Layout} from "antd";

import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

const {Content} = Layout

function BasicLayout({children, location}) {

  if (location.pathname === '/login') {
    return children
  }

  return (
    <Layout className="basic-layout">
      <Header/>
      <Content className="content">{children}</Content>
      <Footer/>
    </Layout>
  );
}

export default BasicLayout;
