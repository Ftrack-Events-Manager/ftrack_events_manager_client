/**
 * title: 首页
 */

import React from 'react';
import {Button, Tag} from "antd";
import {
  SyncOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons"
import {connect} from 'dva'
import {Link} from 'umi'

import {Content, Tool} from "@/components/Layout";
import {Table} from "@/components/Table";


const Index = ({events}) => {
  const columns = [
    {
      title: '事件组名',
      dataIndex: 'group',
      key: 'group',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: text => <Tag
        color={text === 'run' ? 'green' : 'red'}>{text === 'run' ?
        <CheckCircleOutlined/> :
        <CloseCircleOutlined/>} {text.toUpperCase()}</Tag>
    },
    {
      title: '已启动事件数',
      dataIndex: 'run_events',
      key: 'run_events',
      width: '15%',
    },
    {
      title: '错误数',
      dataIndex: 'error_num',
      key: 'error_num',
      width: '15%',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <a><Button type="primary" size="small"><SyncOutlined/>重启</Button></a>
          <a><Button type="primary" size="small"><PoweroffOutlined/>暂停</Button></a>
          <a><Button type="primary" size="small"><SolutionOutlined/>详情</Button></a>
        </div>
      )
    },
    {
      title: '编辑',
      key: 'edit',
      render: (text, record) => (
        <div>
          <a><Button type="primary" size="small">编辑</Button></a>
          <a><Button type="danger" size="small">删除</Button></a>
        </div>
      )
    },
  ]

  return (
    <Content>
      <Tool>
        <Button type="primary"><Link to="/add_event_group">添加事件组</Link></Button>
      </Tool>
      <Table columns={columns} dataSource={events}
             rowKey={event => event.id}
             pagination={{position: ['none', 'none']}}/>
    </Content>
  );
};

export default connect(({index}) => ({...index}))(Index);
