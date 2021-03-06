/*
 * @Date: 2019-11-13 00:13:21
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-20 21:44:20
 * @content: I
 */
import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Icon, Button, Spin, message } from "antd";
import "../static/css/loginbox.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const history = useHistory();

  const checkLogin = async props => {
    setIsLogined(true);
    if (!username) {
      message.error("用户名不能为空");
      setIsLogined(false);
    } else if (!password) {
      message.error("密码不能为空");
      setIsLogined(false);
    }
    let res = { username, password },
      jwt = {};
    try {
      jwt = await axios.post(`${apiUrl}auth`, res, {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.log(error);
    }
    if (jwt.data) {
      setIsLogined(false);
      localStorage.setItem("jwt", jwt.data["access_token"]);
      localStorage.setItem("login", true);
      history.push("/admin/all");
    } else {
      message.error("登陆失败");
      setIsLogined(false);
    }
  };

  return (
    <div className='login'>
      <Spin tip='Login state ...' spinning={isLogined}>
        <Card
          title='ESWang Blog Darshboard'
          bordered={true}
          style={{ width: 400 }}>
          <Input
            id='username'
            size='large'
            placeholder='输入您的用户名'
            prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <br />

          <Input.Password
            id='password'
            size='large'
            placeholder='请输入您的密码'
            prefix={<Icon type='key' style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type='primary' size='large' block onClick={checkLogin}>
            登录
          </Button>
        </Card>
      </Spin>
      <div className='foo'>
        <a className='gx' href='http://www.beian.miit.gov.cn'>
          鲁ICP备19044799号
        </a>
      </div>
    </div>
  );
};

export default Login;
