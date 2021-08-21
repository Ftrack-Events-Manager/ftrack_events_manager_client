import React from 'react';
import styles from "@/pages/login/index.scss";
import {Icon, Layout} from "antd";

const Footer = () => {
  return (
    <Layout.Footer className={styles.footer}>
      Copyright <Icon type="copyright"/> Ftrack Events Manager By LiaoKong
    </Layout.Footer>
  );
};

export default Footer;
