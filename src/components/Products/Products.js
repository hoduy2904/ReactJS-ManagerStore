import { Button, Input, Table, Typography, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { products, editProduct } from "../../utils";
const { Title } = Typography;

const { Search } = Input;

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(products)
      .then((res) => res.json())
      .then((data) => {
        data = data.map((item) => ({ key: item.mahh, ...item }));
        setIsLoading(false);
        setData(data);
        setLstFilter(data);
      });
  }, []);

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setLstFilter(newData);
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
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 2,
      },
    },
    {
      title: "Chức năng",
      dataIndex: "chucnang",
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <Popconfirm
              title="Bạn có muốn xoá?"
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined
                style={{
                  color: "red",
                  margin: "0 5px",
                }}
              />
            </Popconfirm>
            <Link className="text-blue-500" to={`/Products/Edit/` + record.key}>
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
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleDeletes = () => {
    console.log(selectedRowKeys);
  };

  const [search, setSearch] = useState("");
  const [lstFilter, setLstFilter] = useState(data);

  useEffect(() => {
    if (search) setLstFilter(data.filter((item) => item.name.includes(search)));
    else setLstFilter(data);
  }, [search]);

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
          <Button
            className="ml-2"
            type="primary"
            danger
            disabled={selectedRowKeys.length < 1}
            onClick={handleDeletes}
          >
            Xoá
          </Button>
        </div>

        <Search
          value={search}
          placeholder="Tìm kiếm..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "200px" }}
        ></Search>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={lstFilter}
        onChange={onChange}
      />
    </>
  );
};

export default Products;
