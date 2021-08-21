/**
 * title: 首页
 */

import React from 'react';
import {Button} from "antd";

import {Content, Tool} from "@/components/Layout";
import {Table} from "@/components/Table";


const Index = () => {
  const columns = [
    {
      title: '事件组名',
      dataIndex: 'event_group',
      key: 'event_group',
      width: '22%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '22%',
    },
    {
      title: '错误数',
      dataIndex: 'error_num',
      key: 'error_num',
      width: '22%',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <div>
          <a>重启</a>
          <a>暂停</a>
          <a>详情</a>
        </div>
      )
    },
    {
      title: '编辑',
      key: 'edit',
      render: (text, record) => (
        <div>
          <a>编辑</a>
          <a>删除</a>
        </div>
      )
    },
  ]


  return (
    <Content>
      <Tool>
        <Button type="primary">添加事件组</Button>
      </Tool>
      <Table columns={columns}/>
    </Content>
  );
};

export default Index;
