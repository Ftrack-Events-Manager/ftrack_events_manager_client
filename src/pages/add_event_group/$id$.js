/**
 * title: 添加事件组
 */

import React, {Component} from 'react';
import {Form, Input, Button, Table, Switch, InputNumber, Message} from "antd";
import {ReloadOutlined} from "@ant-design/icons"
import {connect} from 'dva';
import {router} from "umi";

import {Content, Tool} from "@/components/Layout";

const FormItem = Form.Item

class $id$ extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id
  }

  tableSelectionOnChange = (electedRowKeys, selectedRows) => {
    this.props.dispatch({
      type: 'addEventGroup/tableSelectionData',
      tableSelectionData: selectedRows
    })
  }

  switchOnChange = (id, isChecked) => {
    this.props.dispatch({type: 'addEventGroup/updateEnabled', id, isChecked})
  }

  inputNumberOnChange = (id, priority) => {
    this.props.dispatch({type: 'addEventGroup/updatePriority', id, priority})
  }

  handleSubmit = () => {
    this.props.form.validateFields(((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'addEventGroup/update',
          name: values['name']
        })
        Message.success(`${values['name']}创建成功！`)
        router.push('/')
      }
    }))
  }

  handleRefresh = () => {
    this.props.dispatch({type: 'addEventGroup/fetch'}).then(
      Message.success('刷新成功')
    )
  }

  render() {
    const columns = [
      {
        title: '事件名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        render: (text, record) => (
          <InputNumber min={0} defaultValue={text}
                       onChange={priority => this.inputNumberOnChange(record.id, priority)}/>
        )
      },
      {
        title: '启用',
        dataIndex: 'enabled',
        key: 'enabled',
        render: (text, record) => (
          <Switch checkedChildren="开启" unCheckedChildren="关闭"
                  defaultChecked={text}
                  onChange={isChecked => this.switchOnChange(record.id, isChecked)}/>
        )
      }
    ]

    const {getFieldDecorator} = this.props.form

    return (
      <div>
        <Content>
          <Tool>
            <Form>
              <FormItem label="事件名">
                {
                  getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入事件名'
                      }
                    ]
                  })(<Input placeholder="请输入事件名"/>)
                }
              </FormItem>
              <FormItem>
                <Button onClick={this.handleRefresh}
                        style={{
                          float: 'right',
                          marginRight: '10px'
                        }}><ReloadOutlined/>刷新</Button>
              </FormItem>
              <FormItem>
                <Table rowSelection={{
                  type: 'checkbox',
                  onChange: this.tableSelectionOnChange
                }} columns={columns}
                       dataSource={this.props.events}
                       rowKey={event => event.id}
                       pagination={{position: ['none', 'none']}}
                       loading={this.props.loading}
                />
              </FormItem>
              <FormItem style={{float: 'right'}}>
                <Button style={{marginRight: '10px', width: '100px'}}
                        size="large"
                        onClick={() => router.push('/')}>取消</Button>
                <Button type="primary"
                        style={{marginRight: '20px', width: '100px'}}
                        size="large" onClick={this.handleSubmit}>创建</Button>
              </FormItem>
            </Form>
          </Tool>
        </Content>
      </div>
    );
  }
};

export default connect(
  ({addEventGroup, loading}) => (
    {...addEventGroup, loading: loading.effects['addEventGroup/fetch']}
  )
)(Form.create()($id$));
