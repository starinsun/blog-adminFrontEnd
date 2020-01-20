/*
 * @Date: 2019-11-30 05:37:48
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-19 23:04:29
 * @content: I
 */
import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import { apiUrl } from "../utils";
import { useHistory } from "react-router-dom";
const { confirm } = Modal;

const PostList = () => {
  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);
  const [list, setList] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const nav = useHistory();

  const getList = async () => {
    let res = await axios.get(`${apiUrl}/admin/posts`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    setList(res.data);
  };

  const deleteById = id => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击OK按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios
          .delete(`${apiUrl}/admin/posts/post/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` }
          })
          .then(res => {
            message.success("文章删除成功");
            getList();
          });
      },
      onCancel() {
        message.success("无事发生");
      }
    });
  };

  const updatePost = async id => {
    nav.push(`/admin/postUpdate/${id}`);
  };
  return (
    <div>
      <List
        header={
          <Row className='list-div'>
            <Col span={11}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>点赞数</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className='list-div' style={{ width: "100%" }}>
              <Col span={11}>{item.title}</Col>
              <Col span={3}>{item.tags[0]}</Col>
              <Col span={3}>{item.time}</Col>
              <Col span={3}>{item.zan}</Col>
              <Col span={4}>
                <Button
                  type='primary'
                  onClick={() => {
                    updatePost(item._id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  type='danger'
                  onClick={() => {
                    deleteById(item._id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PostList;
