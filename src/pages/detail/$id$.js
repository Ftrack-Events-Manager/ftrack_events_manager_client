/**
 * title: 事件详情
 */
import React, {Component} from 'react';
import {connect} from 'dva'
import {Card, Row, Col, Switch, DatePicker} from 'antd'
import moment from 'moment';

import {Content} from "@/components/Layout";
import styles from './index.scss'


class $id$ extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id
  }

  componentDidMount() {
    // todo 如果当前时间是今天，就定时刷新log
    if (this.id) {
      this.props.dispatch({type: 'detail/initData', id: this.id})
    }
  }

  handleDatePicker(date) {
    if (date) {
      this.props.dispatch({
        type: 'detail/handleChanged',
        id: this.id,
        payload: {logDate: date.format('YYYY/MM/DD')}
      })
    }
  }

  handleSwitch(checked) {
    this.props.dispatch({
      type: 'detail/handleChanged',
      id: this.id,
      payload: {onlyShowError: checked}
    })
  }

  render() {
    const colStyle = {marginTop: 20, display: "flex", alignItems: "center"}
    const colorType = {
      info: 'logInfo',
      warning: 'logWarning',
      error: 'logError',
      exception: 'logException'
    }
    return (
      <div>
        <Content>
          <Row gutter={16}>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>运行事件数</p>
                <p className={`${styles.text} ${styles.run}`}>
                  {this.props.runEventsCount}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>暂停事件数</p>
                <p className={`${styles.text} ${styles.stop}`}>
                  {this.props.stopEventsCount}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>日志警告数</p>
                <p className={`${styles.text} ${styles.warning}`}>
                  {this.props.warningLogCount}
                </p>
              </Card>
            </Col>
            <Col span={6}>
              <Card className={styles.number}>
                <p className={styles.title}>日志错误数</p>
                <p className={`${styles.text} ${styles.error}`}>
                  {this.props.errorLogCount}
                </p>
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
                <Switch checkedChildren="开启" unCheckedChildren="关闭"
                        defaultChecked={this.props.onlyShowError}
                        onChange={(checked => this.handleSwitch(checked))}/></p>
            </Col>
            <Col span={3} style={colStyle}>
              <DatePicker format='YYYY/MM/DD'
                          defaultValue={moment(this.props.logDate, 'YYYY/MM/DD')}
                          onChange={(date) => this.handleDatePicker(date)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.textarea}>
                {this.props.logs.map(log =>
                  <p key={log.id}
                     className={`${styles.log} ${styles[colorType[log.type]]}`}
                     dangerouslySetInnerHTML={{__html: log.msg}}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default connect(({detail}) => ({...detail}))($id$);
