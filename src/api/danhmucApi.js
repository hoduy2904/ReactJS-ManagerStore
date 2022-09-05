import * as request from "../utils/request";

export const Get = async () => {
  try {
    const res = await request.Get("api/danhmucs");
    return res.data;
  } catch (error) {
    return error;
  }
};
