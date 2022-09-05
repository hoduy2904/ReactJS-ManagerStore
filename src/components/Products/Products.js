import { Button, Input, Table, Typography, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as ProductApi from "../../api/productsApi";
import { useDebounce } from "../../hooks";
const { Title } = Typography;

const { Search } = Input;

const Products = ({ title }) => {
  //useState
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(data.page ?? 1);

  const debounce = useDebounce(search, 500);

  const Fetch = async () => {
    setIsLoading(true);
    const result = await ProductApi.Get(page, search);
    if (result.code) {
      message.error(result.message);
      setIsLoading(false);

      return;
    }
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = title;
    Fetch();
  }, [debounce, page]);

  const handleDelete = async (key) => {
    const res = await ProductApi.Delete(key);
    if (res.success) {
      Fetch();
      message.success("Xoá thành công");
    }
  };

  const columns = [
    {
      title: "Mã hàng hoá",
      dataIndex: "mahh",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 4,
      },
    },
    {
      title: "Tên hàng hoá",
      dataIndex: "tenhang",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Giá vốn",
      dataIndex: "giavon",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "Giá bán",
      dataIndex: "giaban",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 2,
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 2,
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
      render: (record) => new Date(record).toLocaleString(),
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 2,
      },
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (_, record) =>
        data.data.length >= 1 ? (
          <>
            <Popconfirm
              title="Bạn có muốn xoá?"
              onConfirm={() => handleDelete([record.key])}
            >
              <DeleteOutlined
                style={{
                  color: "red",
                  margin: "0 5px",
                }}
              />
            </Popconfirm>
            <Link
              state={record}
              className="text-blue-500"
              to={`/Products/Edit/` + record.key}
            >
              <EditOutlined />
            </Link>
          </>
        ) : null,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    console.log(pagination);
  };

  const handleDeletes = () => {
    handleDelete(selectedRowKeys);
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
        Danh mục sản phẩm
      </Title>
      <div className="flex justify-between">
        <div>
          <Link to="/Products/Add" className="ant-btn ant-btn-primary mb-2">
            Thêm mới
          </Link>
          <Popconfirm
            title={`Bạn có muốn xoá ${selectedRowKeys.length} sản phẩm`}
            disabled={selectedRowKeys.length < 1}
            onConfirm={handleDeletes}
          >
            <Button
              className="ml-2"
              type="primary"
              danger
              disabled={selectedRowKeys.length < 1}
            >
              Xoá
            </Button>
          </Popconfirm>
        </div>

        <Search
          value={search}
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "200px" }}
        ></Search>
      </div>
      <Table
        scroll={{
          x: true,
        }}
        loading={isLoading}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data.data}
        onChange={onChange}
        pagination={{
          pageSize: 5,
          current: page,
          defaultCurrent: 1,
          total: data.totalPage * 5,
          hideOnSinglePage: true,
        }}
      />
    </>
  );
};

export default Products;
