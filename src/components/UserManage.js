/*
 * @Date: 2019-11-29 22:38:12
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-20 15:58:32
 * @content: I
 */
import React from "react";
import { Skeleton, Result } from "antd";

const UserManage = () => {
  return (
    <div>
      <Skeleton active />
      <Result title='暂无内容' />
    </div>
  );
};

export default UserManage;
