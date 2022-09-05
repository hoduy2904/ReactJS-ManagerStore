import React, { useEffect } from "react";

const Sale = ({ title }) => {
  useEffect(() => {
    document.title = title;
  });
  return <div>Sale</div>;
};

export default Sale;
