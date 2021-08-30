import React from 'react';
import {Affix, Menu, Dropdown, Icon} from "antd";
import {Link, withRouter, router} from "umi";

import './index.scss'

const MenuItem = Menu.Item


const Header = ({location}) => {
  const onLogout = () => {
    localStorage.clear()
    router.push('/login')
  }


  const menu = (
    <Menu>
      <MenuItem>
        <span onClick={onLogout}>退出</span>
      </MenuItem>
    </Menu>
  )
  return (
    <Affix offsetTop={0}>
      <div className="header">
        <h2 className='logo'>Ftrack Events Manager</h2>
        <Menu className="menus" mode="horizontal"
              selectedKeys={[location.pathname]} theme="dark">
          <MenuItem key="/">
            <Link to="/">首页</Link>
          </MenuItem>
        </Menu>
        <div className="right">
          <Dropdown overlay={menu}>
            <a href="/">
              <Icon type="user"
                    style={{marginRight: 3}}/> {localStorage.usernmame}
            </a>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default withRouter(Header);
