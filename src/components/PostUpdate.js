/*
 * @Date: 2019-11-29 22:38:24
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-20 13:19:13
 * @content: I
 */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import { apiUrl } from "../utils";
import { Button, Input } from "antd";
import Editor from "for-editor";

const Comments = () => {
  const nav = useHistory();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [list, setList] = useState({});
  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [csdn, setCsdn] = useState("");
  const [juejin, setJuejin] = useState("");
  const [content, setCont] = useState("");

  const getPost = async () => {
    let res = await Axios.get(`${apiUrl}admin/posts/post/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    setList(res.data);
    setTitle(res.data.title);
    setCont(res.data.content);
    setCsdn(res.data.csdn);
    setJuejin(res.data.juejin);
    setIntro(res.data.intro);
  };
  async function handleChange() {
    let newData = {
      title: title,
      intro,
      csdn,
      juejin,
      content,
      readtime: list.readtime,
      time: list.time,
      img: list.img,
      author: list.author,
      zan: list.zan,
      comment: list.comment,
      tags: list.tags,
      views: list.views
    };
    await Axios.put(`${apiUrl}admin/posts/post/${id}`, newData, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    nav.push("/admin/postlist");
  }
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <h2 style={{ textShadow: "1px 1px 2px #ccc" }}>修改文章页面</h2>
        <Button
          type='primary'
          shape='round'
          icon='edit'
          size='large'
          onClick={handleChange}
        >
          修改文章
        </Button>
      </div>
      <div>
        <h3>题目</h3>
        <Input
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <h4>简介</h4>
        <Input
          onChange={e => {
            setIntro(e.target.value);
          }}
          value={intro}
        />
        <h4>CSDN</h4>
        <Input
          onChange={e => {
            setCsdn(e.target.value);
          }}
          value={csdn}
        />
        <h4>掘金</h4>
        <Input
          onChange={e => {
            setJuejin(e.target.value);
          }}
          value={juejin}
        />
      </div>
      <Editor
        value={content}
        onChange={e => setCont(e)}
        toolbar={{
          undo: true,
          expand: true,
          redo: true,
          subfield: true,
          preview: true
        }}
      />
    </div>
  );
};

export default Comments;
