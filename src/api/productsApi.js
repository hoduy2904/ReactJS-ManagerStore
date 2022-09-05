import { request } from "../utils";

export const Get = async (page, search) => {
  try {
    const res = await request.Get("api/hanghoas", {
      page,
      search,
      pageSize: 5,
    });
    const data = res.data.map((item) => ({ key: item.mahh, ...item }));
    return { ...res, data };
  } catch (error) {
    return error;
  }
};

export const GetSP = async (mahh) => {
  try {
    const res = await request.Get(`api/hanghoas/${mahh}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const Delete = async (mahh) => {
  try {
    const res = await request.Delete("api/hanghoas/", mahh);
    return res;
  } catch (error) {
    return error;
  }
};
export const Add = async (param) => {
  try {
    const res = await request.Post("api/hanghoas/", param);
    return res;
  } catch (error) {
    return error;
  }
};

export const Edit = async (param) => {
  try {
    const res = await request.Put("api/hanghoas/", param);
    return res;
  } catch (error) {
    return error;
  }
};
