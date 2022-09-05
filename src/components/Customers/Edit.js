import { Button, Form, Input, message, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as CustomerRequest from "../../api/customerApi";

const { Title } = Typography;

const Edit = ({ title }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = title;
  }, []);

  const onFinish = async (e) => {
    setIsLoading(true);
    const result = await CustomerRequest.Edit(e);
    if (result.success) {
      message.success("Sửa thành công");
      navigate("/Customers", { replace: true });
    } else {
      message.error(result.message);
    }
    setIsLoading(false);
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
      <Spin spinning={isLoading}>
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
            name="id"
            hidden
            initialValue={state.id}
            label="Tên Khách hàng"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="hoten"
            initialValue={state.hoten}
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
            initialValue={state.diachi}
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
          <Form.Item initialValue={state.sdt} name="sdt" label="Số điện thoại">
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
                Sửa
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default Edit;
