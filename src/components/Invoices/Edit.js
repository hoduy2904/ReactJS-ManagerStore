import { Button, Form, Input, message, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as danhmucRequest from "../../api/danhmucApi";

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
    const result = await danhmucRequest.Edit(e);
    if (result.success) {
      message.success("Sửa thành công");
      navigate("/categories", { replace: true });
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
        Sửa sản phẩm
      </Title>

      <Spin spinning={isLoading} tip="Đang thực thi">
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
          <Form.Item hidden initialValue={state.id} name="id">
            <Input></Input>
          </Form.Item>
          <Form.Item
            initialValue={state.tendm}
            name="tendm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm",
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
