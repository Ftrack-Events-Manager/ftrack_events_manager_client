/**
 * title: 首页
 */

import React from 'react';
import {Button, Tag, Popconfirm, Message} from "antd";
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


const Index = ({groups, loading, dispatch}) => {
  const handleDelete = (group) => {
    dispatch({type: 'index/deleteGroup', group})
  }

  const handleRestartGroup = (id) => {
    dispatch({type: 'index/restartGroup', id}).then(() => {
      dispatch({type: 'index/fetch'})
      Message.success('已成功启动事件')
    })
  }

  const handleStopGroup = (id) => {
    dispatch({type: 'index/stopGroup', id}).then(() => {
      dispatch({type: 'index/fetch'})
      Message.success('已成功停止事件')
    })
  }

  const btnStyle = {marginRight: 8}
  const columns = [
    {
      title: '事件组名',
      dataIndex: 'name',
      key: 'name',
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
          <Button type="primary" size="small"
                  style={btnStyle}
                  onClick={() => handleRestartGroup(record.id)}>
            <SyncOutlined/>{record.status === 'run' ? '重启' : '启动'}
          </Button>
          <Button type="primary" size="small"
                  style={btnStyle}
                  onClick={() => handleStopGroup(record.id)}>
            <PoweroffOutlined/>暂停</Button>
          <Button type="primary" size="small"
                  style={btnStyle}>
            <Link to={`/detail/${record.id}`}><SolutionOutlined/>详情</Link>
          </Button>
        </div>
      )
    },
    {
      title: '编辑',
      key: 'edit',
      render: (text, record) => (
        <div>
          <Button type="primary" size="small" style={btnStyle}>
            <Link to={`/group/${record.id}`}>编辑</Link>
          </Button>
          <Popconfirm title="确定要删除该事件组吗？"
                      onConfirm={() => handleDelete(record)}>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ]

  return (
    <Content>
      <Tool>
        <Button type="primary"><Link to="/group">添加事件组</Link></Button>
      </Tool>
      <Table columns={columns} dataSource={groups}
             rowKey={event => event.id}
             pagination={{position: ['none', 'none']}} loading={loading}/>
    </Content>
  );
};

export default connect(
  ({index, loading}) => (
    {...index, loading: loading.effects['index/fetch']}
  )
)(Index);
