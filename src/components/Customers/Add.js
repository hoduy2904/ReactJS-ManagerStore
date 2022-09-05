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
import * as CustomerRequest from "../../api/customerApi";

const { Title } = Typography;

const Add = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, []);

  const onFinish = async (e) => {
    const result = await CustomerRequest.Add(e);
    if (result.success) {
      message.success("Thêm thành công");
      navigate("/Customers", { replace: true });
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
        Thêm Khách hàng
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
          name="hoten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên Khách hàng",
            },
          ]}
          label="Tên Khách hàng"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng địa chỉ Khách hàng",
            },
          ]}
          name="diachi"
          label="Địa chỉ"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="sdt" label="Số điện thoại">
          <Input></Input>
        </Form.Item>
        <Form.Item className="mt-3">
          <div>
            <Link
              to="/Customers"
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
