import React, {Component} from 'react';
import {Modal, Form, Input, Transfer} from "antd";

const FormItem = Form.Item

const withClick = (element, handleClick = () => {
}) => {
  return <element.type  {...element.props} onClick={handleClick}/>
}

// 暂时弃用，改为页面，编辑属性的时候在用
class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTargetKeys: [],
      targetKeys: [],
      visible: false
    }
  }

  handleTransferOnChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({targetKeys: nextTargetKeys})
  }

  handleOpenClick = () => {
    this.setState({visible: true})
  }

  render() {
    const {children} = this.props

    return (
      <>
        {withClick(children, this.handleOpenClick)}
        <Modal title="添加事件" visible={this.state.visible} centered width={1000}
               maskClosable={false}>
          <Form>
            <FormItem label="事件组名" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <Input placeholder="请输入事件组名称"/>
            </FormItem>
            <FormItem label="添加事件" labelCol={{span: 6}} wrapperCol={{span: 14}}>
              <Transfer titles={['未使用事件', '已选事件']}
                        dataSource={this.state.initialTargetKeys}
                        targetKeys={this.state.targetKeys}
                        render={item => item.title}
                        onChange={this.handleTransferOnChange}
                        listStyle={{width: 255, height: 500}}
              />
            </FormItem>
          </Form>
        </Modal>
      </>
    );
  }
}

export default EventModal;
