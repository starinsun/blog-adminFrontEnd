/*
 * @Date: 2019-11-15 20:12:52
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-19 17:47:59
 * @content: I
 */
import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import "../static/css/adminbox.css";
import AddPost from "../components/AddPost";
import AddLife from "../components/AddLife";
import LifeCard from "../components/LifeCard";
import PostList from "../components/PostList";
import UserManage from "../components/UserManage";
import Result from "../components/Result";
import Comments from "../components/Comments";
import { Route, useHistory } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useHistory();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={collapsed => {
          setCollapsed(collapsed);
        }}
      >
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item
            key='1'
            onClick={() => {
              nav.push("/admin");
            }}
          >
            <Icon type='pie-chart' />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item
            key='2'
            onClick={() => {
              nav.push("/admin/addpost");
            }}
          >
            <Icon type='book' />
            <span>增加文章</span>
          </Menu.Item>
          <Menu.Item
            key='3'
            onClick={() => {
              nav.push("/admin/addlife");
            }}
          >
            <Icon type='instagram' />
            <span>添加生活</span>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <Icon type='user' />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item
              key='4'
              onClick={() => {
                nav.push("/admin/postlist");
              }}
            >
              文章列表
            </Menu.Item>
            <Menu.Item
              key='5'
              onClick={() => {
                nav.push("/admin/comments");
              }}
            >
              评论管理
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key='6'
            onClick={() => {
              nav.push("/admin/lifecard");
            }}
          >
            <Icon type='camera' />
            <span>生活管理</span>
          </Menu.Item>
          <Menu.Item
            key='7'
            onClick={() => {
              nav.push("/admin/users");
            }}
          >
            <Icon type='team' />
            <span>用户管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <Route path='/admin/addpost' component={AddPost}></Route>
          <Route path='/admin/addlife' component={AddLife}></Route>
          <Route path='/admin/postlist' component={PostList}></Route>
          <Route path='/admin/lifecard' component={LifeCard}></Route>
          <Route path='/admin/comments' component={Comments}></Route>
          <Route path='/admin/users' component={UserManage}></Route>
          <Route path='/admin/success' component={Result}></Route>
        </Content>
        <Footer style={{ textAlign: "center" }}>www.eswang.top</Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
