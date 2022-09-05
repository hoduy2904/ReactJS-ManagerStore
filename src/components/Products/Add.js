import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as danhmucRequest from "../../api/danhmucApi";
import * as ProductRequest from "../../api/productsApi";

const { Title } = Typography;

const Add = ({ title }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    const res = await danhmucRequest.Get();
    if (res.code) {
      message.error("Không kết nối được máy chủ");
    } else setData(res);
  };

  useEffect(() => {
    document.title = title;
    fetchApi();
  }, []);

  const onFinish = async (e) => {
    const result = await ProductRequest.Add(e);
    if (result.success) {
      message.success("Thêm thành công");
      navigate("/Products", { replace: true });
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
        Thêm sản phẩm
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
              message: "Vui lòng chọn danh mục",
            },
          ]}
          label="Danh mục"
        >
          <Select
            placeholder="Vui lòng lựa chọn danh mục"
            defaultActiveFirstOption
            showSearch
            loading={data.length == 0}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0 ||
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data.map((dm) => (
              <Select.Option key={dm.id} children={dm.id}>
                {dm.tendm}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tenhang"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
            },
          ]}
          label="Tên sản phẩm"
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="giavon" initialValue={0} label="Giá vốn">
          <InputNumber
            type={"number"}
            min={0}
            style={{
              width: "100%",
            }}
          ></InputNumber>
        </Form.Item>
        <Form.Item name="giaban" initialValue={0} label="Giá Bán">
          <InputNumber
            min={0}
            style={{
              width: "100%",
            }}
          ></InputNumber>
        </Form.Item>
        <Form.Item name="soluong" initialValue={1} label="Số lượng">
          <InputNumber
            min={1}
            style={{
              width: "100%",
            }}
          ></InputNumber>
        </Form.Item>
        <Form.Item className="mt-3">
          <div>
            <Link
              to="/Products"
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
