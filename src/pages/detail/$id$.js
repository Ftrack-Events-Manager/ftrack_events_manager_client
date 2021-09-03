import React, {Component} from 'react';
import {connect} from 'dva'
import {Card, Row, Col, Switch, DatePicker, Input} from 'antd'
import moment from 'moment';

import {Content} from "@/components/Layout";
import styles from './index.scss'

const {TextArea} = Input

class $Id extends Component {
  render() {
    const colStyle = {marginTop: 20, display: "flex", alignItems: "center"}
    const today = new Date()
    const todayStr = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
    return (
      <div>
        <Content>
          <Row gutter={16}>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>运行事件数</p>
                <p className={`${styles.text} ${styles.run}`}>8</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>暂停事件数</p>
                <p className={`${styles.text} ${styles.stop}`}>2</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>日志警告数</p>
                <p className={`${styles.text} ${styles.warning}`}>2</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>日志错误数</p>
                <p className={`${styles.text} ${styles.error}`}>12</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={2} style={colStyle}>
              <p style={{fontSize: 15}}>日志详情：</p>
            </Col>
            <Col span={15}>
            </Col>
            <Col span={4} style={{marginTop: 25}}>
              <p style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: 12, fontSize: 15}}>只显示错误日志</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭"/></p>
            </Col>
            <Col span={3} style={colStyle}>
              <DatePicker format='YYYY/MM/DD'
                          defaultValue={moment(todayStr, 'YYYY/MM/DD')}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextArea
                style={{height: 580, marginTop: 10, resize: "none"}}
                readonly="readonly"/>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default connect(({detail}) => ({...detail}))($Id);
