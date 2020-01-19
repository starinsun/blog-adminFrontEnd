/*
 * @Date: 2019-11-29 22:38:12
 * @LastEditors  : Asen Wang
 * @LastEditTime : 2020-01-19 17:53:45
 * @content: I
 */
import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const ResultP = () => {
  const nav = useHistory();
  return (
    <div>
      <Result
        status='success'
        title='操作完成，现在可以返回主页'
        subTitle='添加文章/修改文章/添加生活/修改生活操作已成功，现在可以返回主页'
        extra={[
          <Button
            type='primary'
            key='console'
            onClick={() => {
              nav.push("/admin");
            }}
          >
            返回
          </Button>
        ]}
      />
    </div>
  );
};

export default ResultP;
