/**
 * title: 登录
 * Routes:
 *   - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */

import React from 'react';
import {router} from "umi";
import {Layout, Icon, Form, Input, Button, Message} from "antd";

import styles from './index.scss'
import {login} from './services/login'

const {Content, Footer} = Layout
const {Item} = Form
const iconStyle = {color: "rgba(0,0,0,.25)"}

const Index = ({form}) => {
  const handleSubmit = () => {
    // form 校验
    form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          if (res.status === "success") {
            const {userId, type} = res.token
            localStorage.setItem('username', userId)
            localStorage.setItem('authority', type === 0 ? 'admin' : 'user')
            router.push('/')
          } else {
            Message.error(res ? res.msg : "登录失败")
          }
        })
      }
    })
  }

  return (
    <Layout>
      <Content className={styles.content}>
        <div className={styles.form}>
          <h1>Ftrack Events Manager</h1>

          {/*Form 表单*/}
          <Form>
            <Item>
              {
                form.getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: "用户名不能为空"
                    }
                  ]
                })(<Input prefix={<Icon type="user" style={iconStyle}/>}
                          placeholder="请输入用户名" autoFocus/>)
              }
            </Item>
            <Item>
              {
                form.getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "密码不能为空"
                    }
                  ]
                })(<Input prefix={<Icon type="lock" style={iconStyle}/>}
                          type="password" placeholder="请输入密码"/>)
              }
            </Item>
            <Item>
              <Button type="primary" style={{width: "100%"}}
                      onClick={handleSubmit}>登录</Button>
            </Item>
          </Form>
        </div>
      </Content>
      <Footer className={styles.footer}>
        Copyright <Icon type="copyright"/> Ftrack Events Manager By LiaoKong
      </Footer>
    </Layout>
  );
};

export default Form.create()(Index);
