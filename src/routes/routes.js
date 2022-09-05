import Customers, { CustomerAdd, CustomerEdit } from "../components/Customers";
import Products, { ProductAdd, ProductEdit } from "../components/Products";
import Categories, {
  CategoryAdd,
  CategoryEdit,
} from "../components/Categories";
import Sale from "../components/Sale";
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  DownOutlined,
  BulbFilled,
  BulbOutlined,
} from "@ant-design/icons";

const Routes = [
  {
    name: "Bán Hàng",
    path: "/",
    element: Sale,
    icon: PieChartOutlined,
    showMenu: true,
    children: [],
  },
  {
    name: "Sản phẩm",
    path: "/products",
    element: Products,
    icon: DesktopOutlined,
    showMenu: true,
    children: [
      {
        name: "Chi tiết sản phẩm",
        param: ":id",
      },
    ],
  },
  {
    name: "Thêm sản phẩm",
    path: "/Products/Add",
    element: ProductAdd,
    showMenu: false,
    children: [],
  },
  {
    name: "Sửa sản phẩm",
    path: "/Products/Edit/:mahh",
    element: ProductEdit,
    showMenu: false,
    children: [],
  },

  {
    name: "Khách hàng",
    path: "/customers",
    element: Customers,
    icon: TeamOutlined,
    showMenu: true,
    children: [],
  },
  {
    name: "Thêm Khách hàng",
    path: "/customers/Add",
    element: CustomerAdd,
    icon: TeamOutlined,
    showMenu: false,
    children: [],
  },
  {
    name: "Sửa Khách hàng",
    path: "/customers/Edit/:id",
    element: CustomerEdit,
    icon: TeamOutlined,
    showMenu: false,
    children: [],
  },
  {
    name: "Danh mục",
    path: "/categories",
    element: Categories,
    icon: TeamOutlined,
    showMenu: true,
    children: [],
  },
  {
    name: "Chỉnh sửa Danh mục",
    path: "/categories/Edit/:id",
    element: CategoryEdit,
    icon: TeamOutlined,
    showMenu: false,
    children: [],
  },
  {
    name: "Danh mục",
    path: "/categories/Add",
    element: CategoryAdd,
    icon: TeamOutlined,
    showMenu: false,
    children: [],
  },
];

export default Routes;
