import axios from "axios";

const API_URL = "https://localhost:44368/api";

export const getCategoriesAPI = async () => {
  return await axios.get(API_URL + "/categories");
};

export const getPostsAPI = async () => {
  return await axios.get(API_URL + "/posts");
};

export const getPostAPI = async (id) => {
  return await axios.get(API_URL + "/posts/" + id);
};
export const addPostAPI = async (data) => {
  return await axios.post(API_URL + "/posts", data);
};

export const deletePostAPI = async (id) => {
  return await axios.delete(API_URL + "/posts/" + id);
};

export const editPostAPI = async (id, data) => {
  return await axios.put(API_URL + "/posts/" + id, data);
};

export const addCategoryAPI = async (data) => {
  return await axios.post(API_URL + "/categories", data);
};

export const deleteCategoryAPI = async (id) => {
  return await axios.delete(API_URL + "/categories/" + id);
};
