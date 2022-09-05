import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as danhmucRequest from "../../api/danhmucApi";

const { Title } = Typography;

const Add = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, []);

  const onFinish = async (e) => {
    const result = await danhmucRequest.Add(e);
    if (result.success) {
      message.success("Thêm thành công");
      navigate("/categories", { replace: true });
    } else {
      message.error(result.message);
    }
  };

  return (
    <>
      <Title
        style={{
          fontSize: "1.5rem",
          fontWeight: "bolder",
          padding: "5px 0",
        }}
      >
        Thêm danh mục
      </Title>

      <Form
        onFinish={onFinish}
        style={{
          marginTop: "3rem",
        }}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item
          name="tendm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên danh mục",
            },
          ]}
          label="Tên danh mục"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item className="mt-3">
          <div>
            <Link
              to="/categories"
              className="ant-btn ant-btn-dashed ant-btn-dangerous mr-3"
            >
              Huỷ
            </Link>
            <Button htmlType="submit" type="primary">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Add;
