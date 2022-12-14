import { request } from "../utils";

export const Get = async (page, search) => {
  try {
    const res = await request.Get("api/danhmucs", {
      page,
      search,
      pageSize: 5,
    });
    const data = res.data.map((item) => ({ key: item.id, ...item }));
    return { ...res, data };
  } catch (error) {
    return error;
  }
};

export const GetDM = async (id) => {
  try {
    const res = await request.Get(`api/danhmucs/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const Delete = async (id) => {
  try {
    const res = await request.Delete("api/danhmucs/", id);
    return res;
  } catch (error) {
    return error;
  }
};
export const Add = async (param) => {
  try {
    const res = await request.Post("api/danhmucs/", param);
    return res;
  } catch (error) {
    return error;
  }
};

export const Edit = async (param) => {
  try {
    const res = await request.Put("api/danhmucs/", param);
    return res;
  } catch (error) {
    return error;
  }
};
