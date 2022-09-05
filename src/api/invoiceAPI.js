import { request } from "../utils";

export const Get = async (page, search) => {
  try {
    const res = await request.Get("api/hoadons", {
      page,
      search,
      pageSize: 5,
    });
    const data = res.data.map((item) => ({ key: item.mahd, ...item }));
    return { ...res, data };
  } catch (error) {
    return error;
  }
};

export const GetHD = async (mahd) => {
  try {
    const res = await request.Get(`api/hoadons/${mahd}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const Delete = async (mahd) => {
  try {
    const res = await request.Delete("api/hoadons/", mahd);
    return res;
  } catch (error) {
    return error;
  }
};
export const Add = async (param) => {
  try {
    const res = await request.Post("api/hoadons/", param);
    return res;
  } catch (error) {
    return error;
  }
};

export const Edit = async (param) => {
  try {
    const res = await request.Put("api/hoadons/", param);
    return res;
  } catch (error) {
    return error;
  }
};
