import axios from "axios";

const request = axios.create({
  baseURL: "https://localhost:7204/",
});

export const Get = async (api, params = {}) => {
  const response = await request.get(api, {
    params: params,
  });
  return response.data;
};

export const Post = async (api, params = {}) => {
  const response = await request.post(api, params);
  return response.data;
};

export const Delete = async (api, params) => {
  const response = await request.delete(
    api,
    {
      data: params,
    },
    {
      headers: {
        Accept: "/*/",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const Put = async (api, params = {}) => {
  const response = await request.put(api, params);
  return response.data;
};
export default request;
