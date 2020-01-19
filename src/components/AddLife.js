/*
 * @Date: 2019-11-29 22:37:36
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-19 17:30:53
 * @content: I
 */
import React, { useState } from "react";
import { Button, Input } from "antd";
import Axios from "axios";
import { apiUrl } from "../utils";
import { useHistory } from "react-router-dom";

const AddLife = () => {
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const nav = useHistory();

  async function handleClick() {
    let data = { image, content, date },
      jwt = localStorage.getItem("jwt");

    try {
      await Axios.post(`${apiUrl}/admin/lives`, data, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      nav.push("/admin/success");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <div>
        <h3>图片</h3>
        <Input
          onChange={e => {
            setImage(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>内容</h3>
        <Input
          onChange={e => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div>
        <h3>日期</h3>
        <Input
          onChange={e => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button onClick={handleClick}>提交</Button>
      </div>
    </div>
  );
};

export default AddLife;
