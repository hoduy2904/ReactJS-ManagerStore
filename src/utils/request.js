import axios from "axios";

const request = axios.create({
  baseURL: "",
  params: {
    Headers: {},
  },
});

export const get = async (api, params = {}) => {
  const response = await request.get(api, params);
  return response.data;
};
export default request;
