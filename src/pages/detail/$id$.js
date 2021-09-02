import React, {Component} from 'react';
import {connect} from 'dva'
import {Card, Row, Col, Switch, DatePicker, Input} from 'antd'
import moment from 'moment';


import {Content} from "@/components/Layout";

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
              <Card>
                <p>运行事件数</p>
                <p>8</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <p>暂停事件数</p>
                <p>2</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <p>日志警告数</p>
                <p>2</p>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <p>日志错误数</p>
                <p>12</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={2} style={colStyle}>
              <p>日志详情：</p>
            </Col>
            <Col span={16}>
            </Col>
            <Col span={3} style={{marginTop: 25}}>
              <p style={{display: "flex", alignItems: "center"}}>
                <span style={{marginRight: 10}}>只显示错误日志</span>
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
                style={{height: 560, marginTop: 10, resize: "none"}}
                readonly="readonly"/>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default connect(({detail}) => ({...detail}))($Id);
