/*
 * @Date: 2019-11-21 17:07:29
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-20 12:06:18
 * @content: I
 */
import React, { useState } from "react";
import Editor from "for-editor";
import { notification, Button, Modal, Input, Checkbox, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../utils";

const AddPost = () => {
  const { TextArea } = Input;
  const nav = useHistory();

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [readtime, setReadtime] = useState(10);
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTag] = useState([]);
  const [csdn, setCsdn] = useState("");
  const [juejin, setJuejin] = useState("");
  const boxValue = [
    "React",
    "Vue",
    "Angular",
    "Basic",
    "ECMAScript",
    "CSS",
    "Nest",
    "Native",
    "Life"
  ];

  const [visible, setVisible] = useState(false);
  const [confirmload, setConfirm] = useState(false);
  const note = () => {
    notification.success({
      message: `Notification`,
      description: "保存成功！",
      duration: 3,
      placement: "bottomRight"
    });
  };

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = async () => {
    setConfirm(true);
    const data = {
      tags,
      title,
      intro,
      readtime: Number(readtime),
      img,
      csdn,
      juejin,
      author: "https://eswang.gitee.io/blog_pic/image/avartar.png",
      content: post,
      time: date,
      zan: 0,
      comment: 1,
      views: 0
    };
    const jwt = localStorage.getItem("jwt");
    try {
      await axios.post(`${apiUrl}admin/posts`, data, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      nav.push("/admin/success");
    } catch (err) {
      message.error("输入不正确");
    }

    setVisible(false);
    setConfirm(false);
  };
  const handleCancle = () => {
    setVisible(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 10
        }}>
        <h2 style={{ textShadow: "1px 1px 2px #ccc" }}>新建文章页面</h2>
        <Button
          type='primary'
          shape='round'
          icon='edit'
          size='large'
          onClick={showModal}>
          提交文章
        </Button>
      </div>

      <Modal
        visible={visible}
        title='完善信息'
        onOk={handleOk}
        onCancel={handleCancle}
        confirmLoading={confirmload}>
        <div>
          <h3>题目</h3>
          <Input
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <h4>简介</h4>
          <TextArea
            rows={2}
            onChange={e => {
              setIntro(e.target.value);
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 5
            }}>
            <h4>阅读时间</h4>
            <Input
              onChange={e => {
                setReadtime(e.target.value);
              }}
              style={{ marginRight: 20 }}
            />
            <h4>发布时间</h4>
            <Input
              onChange={e => {
                setDate(e.target.value);
              }}
            />
          </div>
          <h4>输入文章图像连接</h4>
          <Input
            onChange={e => {
              setImg(e.target.value);
            }}
          />
          <h4>输入文章CSDN链接</h4>
          <Input
            onChange={e => {
              setCsdn(e.target.value);
            }}
          />
          <h4>输入文章掘金连接(可选)</h4>
          <Input
            onChange={e => {
              setJuejin(e.target.value);
            }}
          />
          <h3>文章类型</h3>
          <div>
            <Checkbox.Group
              options={boxValue}
              defaultValue={tags}
              onChange={value => setTag(value.map(item => item.toLowerCase()))}
            />
          </div>
        </div>
      </Modal>
      <Editor
        value={post}
        onChange={e => setPost(e)}
        toolbar={{
          undo: true,
          expand: true,
          redo: true,
          subfield: true,
          preview: true
        }}
        onSave={() => {
          note();
        }}
      />
    </div>
  );
};

export default AddPost;
