/**
 * title: 添加事件组
 */

import React, {Component} from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Switch,
  InputNumber,
  Message,
  Modal
} from "antd";
import {ReloadOutlined} from "@ant-design/icons"
import {connect} from 'dva';
import {router} from "umi";

import {Content} from "@/components/Layout";

const FormItem = Form.Item

class $id$ extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id
  }

  componentDidMount() {
    if (this.id) {
      this.props.dispatch({type: 'group/fetchInfo', id: this.id})
    }
  }

  tableSelectionOnChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch({
      type: 'group/tableSelectionData',
      tableSelectionData: selectedRows,
      selectedRowKeys: selectedRowKeys
    })
  }

  switchOnChange = (id, isChecked) => {
    this.props.dispatch({type: 'group/updateEnabled', id, isChecked})
  }

  inputNumberOnChange = (id, priority) => {
    this.props.dispatch({type: 'group/updatePriority', id, priority})
  }

  handleSubmit = () => {
    this.props.form.validateFields(((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'group/update',
          name: values['name'],
          id: this.id
        })
        Message.success(`${values['name']}${this.id ? "更新" : "创建"}成功！`)
        this.props.dispatch({
          type: 'group/setModal',
          payload: {modalVisible: true}
        })
      }
    }))
  }

  handleRefresh = () => {
    this.props.dispatch({type: 'group/fetch'}).then(
      Message.success('刷新成功')
    )
  }

  handleModalOk = () => {
    this.props.dispatch({type: 'group/setModal', payload: {modalLoading: true}})
    this.props.dispatch({
      type: 'index/restartGroup',
      id: this.id
    }).then(() => {
      Message.success(`事件${this.id ? "重启" : "启动"}成功！`)
      this.props.dispatch({
        type: 'group/setModal',
        payload: {
          modalLoading: false,
          modalVisible: false
        }
      })
      router.push('/')
    })
  }

  handleCancel = () => {
    this.props.dispatch({
      type: 'group/setModal',
      payload: {
        modalLoading: false,
        modalVisible: false
      }
    })
    router.push('/')
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
    const {modalVisible, modalLoading} = this.props

    return (
      <div>
        <Content>
          <Form style={{margin: 26}}>
            <FormItem label="事件名">
              {
                getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入事件名'
                    }
                  ],
                  initialValue: this.props.name
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
                onChange: this.tableSelectionOnChange,
                selectedRowKeys: this.props.selectedRowKeys
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
                      size="large"
                      onClick={this.handleSubmit}>{this.id ? "更新" : "创建"}</Button>
            </FormItem>
          </Form>
          <Modal
            title="Title"
            visible={modalVisible}
            onOk={this.handleModalOk}
            confirmLoading={modalLoading}
            onCancel={this.handleCancel}
            maskClosable={false}
            closable={false}>
            <p>是否要{this.id ? '重启' : '启动'}该事件？</p>
          </Modal>
        </Content>
      </div>
    );
  }
};

export default connect(
  ({group, loading}) => (
    {...group, loading: loading.effects['group/fetch']}
  )
)(Form.create()($id$));
