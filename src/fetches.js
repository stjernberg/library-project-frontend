import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://localhost:44368/api";

//------------------LIBRARY ITEMS-------------------------------------

//Get all items
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${baseURL}/library-items`);
  return response.data;
});

//Get one item
export const getItem = createAsyncThunk("getItem", async (id) => {
  const response = await axios.get(`${baseURL}/library-items/${id}`);
  return response.data;
});

//Create a new item
export const createItem = createAsyncThunk("postItem", async (item) => {
  const response = await axios.post(`${baseURL}/library-items`, item);
  return response.data;
});

//Edit an item
export const editItem = createAsyncThunk("putItem", async (editObject) => {
  const { id, newItem, message } = editObject;
  const response = await axios.put(
    `https://localhost:44368/api/library-items/${id}`,
    newItem
  );
  return { response: response.data, message: message };
});

//Delete an item
export const deleteItem = createAsyncThunk("removeItem", async (id) => {
  const response = await axios.delete(`${baseURL}/library-items/${id}`);
  return response.status;
});

//-----------------CATEGORIES-------------------------------------

//Get all categories
export const fetchCategories = createAsyncThunk("getCategories", async () => {
  const response = await axios.get(`${baseURL}/categories`);

  return response.data;
});

//Get one category
export const getCategory = createAsyncThunk("getCategory", async (id) => {
  const response = await axios.get(`${baseURL}/categories/${id}`);
  return response.data;
});

//Create a new category
export const createCategory = createAsyncThunk(
  "postCategory",
  async (category) => {
    const response = await axios.post(`${baseURL}/categories`, category);
    return response.data;
  }
);

//Edit a category /borrow/return book
export const editCategory = createAsyncThunk(
  "putCategory",
  async (editObject) => {
    const { id, newCategory } = editObject;
    const response = await axios.put(
      `https://localhost:44368/api/categories/${id}`,
      newCategory
    );
    return response.data;
  }
);

//Delete a category
export const deleteCategory = createAsyncThunk("removeCategory", async (id) => {
  const response = await axios.delete(`${baseURL}/categories/${id}`);

  return response.status;
});
