/*
 * @Date: 2019-11-29 22:38:01
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-19 22:21:30
 * @content: I
 */
import React, { useEffect, useState } from "react";
import { List, Row, Col, Modal, message, Button, Input } from "antd";
import Axios from "axios";
import { apiUrl } from "../utils";
const { confirm } = Modal;

const LifeCard = () => {
  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);
  const [list, setList] = useState([]);
  const [image, setImage] = useState("");
  const [cont, setCont] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmload, setConf] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { TextArea } = Input;

  const getList = async () => {
    let res = await Axios.get(`${apiUrl}/admin/lives`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    setList(res.data);
  };
  const deleteById = id => {
    confirm({
      title: "确定要删除这篇生活记录吗?",
      content: "如果你点击OK按钮，生活记录将会永远被删除，无法恢复。",
      onOk() {
        Axios.delete(`${apiUrl}/admin/lives/life/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` }
        }).then(res => {
          message.success("生活删除成功");
          getList();
        });
      },
      onCancel() {
        message.success("无事发生");
      }
    });
  };
  async function handleOk() {
    setConf(true);
    const data = { image, date, content: cont };
    await Axios.put(`${apiUrl}/admin/lives/life/${id}`, data, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    setConf(false);
    setVisible(false);
    message.success("生活修改成功");
    getList();
  }
  function handleCancle() {
    setVisible(false);
    message.info("操作取消");
  }
  async function handleChange(id) {
    let res = await Axios.get(`${apiUrl}/admin/lives/life/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    console.log(res);
    setDate(res.data.date);
    setImage(res.data.image);
    setCont(res.data.content);
    setId(res.data._id);
    setVisible(true);
  }
  return (
    <div>
      <Modal
        visible={visible}
        title='完善信息'
        onOk={handleOk}
        onCancel={handleCancle}
        confirmLoading={confirmload}
      >
        <h3>日期</h3>
        <Input
          onChange={e => {
            setDate(e.target.value);
          }}
          value={date}
        />
        <h3>图像</h3>
        <Input
          onChange={e => {
            setImage(e.target.value);
          }}
          value={image}
        />
        <h3>内容</h3>
        <TextArea
          rows={3}
          onChange={e => {
            setCont(e.target.value);
          }}
          value={cont}
        />
      </Modal>
      <List
        header={
          <Row className='list-div'>
            <Col span={5}>
              <b>日期</b>
            </Col>
            <Col span={15}>
              <b>内容</b>
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
              <Col span={5}>{item.date}</Col>
              <Col span={15}>{item.content}</Col>
              <Col span={4}>
                <Button
                  type='primary'
                  onClick={() => {
                    handleChange(item._id);
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

export default LifeCard;
