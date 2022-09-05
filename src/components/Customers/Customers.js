import React, { useEffect } from "react";

const Customers = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);
  return <div>Customers</div>;
};

export default Customers;
