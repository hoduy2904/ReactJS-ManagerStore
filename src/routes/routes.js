import React from "react";
import Customers from "../components/Customers";
import Products from "../components/Products";
import Sale from "../components/Sale";

const Routes = [
  {
    name: "Bán Hàng",
    path: "/",
    element: Sale,
    children: [],
  },
  {
    name: "Sản phẩm",
    path: "/products",
    element: Products,
    children: [
      {
        path: "Edit/:id",
        element: "",
      },
      {
        path: "Add",
        element: "",
      },
    ],
  },
  {
    name: "Khách hàng",
    path: "/customers",
    element: Customers,
    children: [],
  },
];

export default Routes;
