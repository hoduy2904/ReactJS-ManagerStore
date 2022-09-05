import Customers from "../components/Customers";
import Products, { ProductAdd, ProductEdit } from "../components/Products";
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
];

export default Routes;
