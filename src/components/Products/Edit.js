import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as danhmucRequest from "../../api/danhmucApi";
import * as ProductRequest from "../../api/productsApi";

const { Title } = Typography;

const Edit = ({ title }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [danhMuc, setDanhMuc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApi = async () => {
    const res = await danhmucRequest.Get();
    if (res.code) {
      message.error("Không kết nối được máy chủ");
    } else setDanhMuc(res);
  };

  useEffect(() => {
    document.title = title;
    fetchApi();
  }, []);

  const onFinish = async (e) => {
    setIsLoading(true);
    const result = await ProductRequest.Edit(e);
    if (result.success) {
      message.success("Sửa thành công");
      navigate("/Products", { replace: true });
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
          <Form.Item
            initialValue={state.tendm}
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
              showSearch
              loading={danhMuc.length == 0}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {danhMuc.map((dm) => (
                <option key={dm.id} value={dm.id}>
                  {dm.tendm}
                </option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            hidden
            initialValue={state.mahh}
            name="mahh"
            label="Mã hàng hoá"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            initialValue={state.tenhang}
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
          <Form.Item name="giavon" initialValue={state.giavon} label="Giá vốn">
            <InputNumber
              type={"number"}
              min={0}
              style={{
                width: "100%",
              }}
            ></InputNumber>
          </Form.Item>
          <Form.Item name="giaban" initialValue={state.giaban} label="Giá Bán">
            <InputNumber
              min={0}
              style={{
                width: "100%",
              }}
            ></InputNumber>
          </Form.Item>
          <Form.Item
            name="soluong"
            initialValue={state.soluong}
            label="Số lượng"
          >
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
