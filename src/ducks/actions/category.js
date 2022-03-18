import { API } from "../../constants";
import { apiClient } from "../../service";
import { errorToastHandler } from "../../utils/toast";

export const getCategories = ({ toast }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CATEGORIES_LOADING",
        payload: true,
      });
      const { data } = await apiClient.get(API.ROUTES.CATEGORIES);
      dispatch({
        type: "CATEGORIES_SUCCESS",
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch({
        type: "CATEGORIES_SUCCESS",
        payload: false,
      });
      errorToastHandler({
        toast,
        title: "Error!",
        error: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const getCategory = ({ toast, slug }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CATEGORIES_LOADING",
        payload: true,
      });
      const { data } = await apiClient.get(`${API.ROUTES.CATEGORY}/${slug}`);
      dispatch({
        type: "CATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Error!",
        error: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({
        type: "CATEGORIES_LOADING",
        payload: false,
      });
    }
  };
};

export const removeCategory = ({ toast, slug, onClose }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CATEGORIES_DELETE_LOADING",
        payload: true,
      });
      const res = await apiClient.delete(`${API.ROUTES.CATEGORY}/${slug}`);
      onClose();
      dispatch(getCategories({ toast }));
      return res;
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Error!",
        error: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({
        type: "CATEGORIES_DELETE_LOADING",
        payload: false,
      });
    }
  };
};

export const updateCategory = ({ toast, slug, name, history }) => {
  return async () => {
    try {
      const res = await apiClient.put(`${API.ROUTES.CATEGORY}/${slug}`, {
        name,
      });
      history.push("/admin/category/list");
      return res;
    } catch (error) {
      errorToastHandler({
        toast,
        title: "Error!",
        error: error.response ? error.response.data : error.message,
      });
    }
  };
};

export const createCategory = async ({ toast, name, history }) => {
  try {
    const res = await apiClient.post(API.ROUTES.CATEGORY, { name });
    history.push("/admin/category/list");
    return res;
  } catch (error) {
    errorToastHandler({
      toast,
      title: "Error!",
      error: error.response ? error.response.data : error.message,
    });
  }
};
