import { Input, Table, Typography, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as CustomerAPI from "../../api/customerApi";
import { useDebounce } from "../../hooks";
const { Title } = Typography;

const { Search } = Input;

const Customers = ({ title }) => {
  //Hooks
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(data.page ?? 1);

  const debounce = useDebounce(search, 500);

  const Fetch = async () => {
    setIsLoading(true);
    const result = await CustomerAPI.Get(page, search);
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
    const res = await CustomerAPI.Delete(key);
    if (res.success) {
      Fetch();
      message.success("Xoá thành công");
    }
  };

  const columns = [
    {
      title: "Tên Khách hàng",
      dataIndex: "hoten",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 2,
      },
      render: (date) => new Date(date).toLocaleString(),
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
              to={`/Customers/Edit/` + record.key}
            >
              <EditOutlined />
            </Link>
          </>
        ) : null,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    console.log(pagination);
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
        Danh mục Khách hàng
      </Title>
      <div className="flex justify-between">
        <div>
          <Link to="/Customers/Add" className="ant-btn ant-btn-primary mb-2">
            Thêm mới
          </Link>
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

export default Customers;
