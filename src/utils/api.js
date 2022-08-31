export const host = "https://localhost:7204/";

export const products = `${host}api/hanghoas`;
export const editProduct = (id) => {
  return `${host}api/hanghoas/edit/${id}`;
};
