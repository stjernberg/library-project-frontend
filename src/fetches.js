import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://localhost:44368/api";

//------------------LIBRARY ITEMS-------------------------------------

//Get all items
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${baseURL}/library-items`);
  console.log(response.data);
  return response.data;
});

//Create a new item
export const createItem = createAsyncThunk("postItem", async (item) => {
  console.log("createItem:", item);
  const response = await axios.post(`${baseURL}/library-items`, item);
  console.log("createItem-response:");
  return response.data;
});

//-----------------CATEGORIES-------------------------------------

//Get all categories
export const fetchCategories = createAsyncThunk("getCategories", async () => {
  const response = await axios.get(`${baseURL}/categories`);
  console.log(response.data);

  return response.data;
});

//Get one category with id
export const getCategory = createAsyncThunk("getCategory", async (id) => {
  const response = await axios.get(`${baseURL}/categories/${id}`);
  console.log(response.data);
  return response.data;
});

//Create a new category
export const createCategory = createAsyncThunk(
  "postCategory",
  async (category) => {
    console.log("createdata:", category);
    const response = await axios.post(`${baseURL}/categories`, category);
    console.log("Resonse createItem:", response.data);
    // .then(() => {
    //   axios.get(`${baseURL}/categories`);
    // });
    //fetchCategories();
    return response.data;
  }
);

//Edit a category
export const editCategory = createAsyncThunk(
  "putCategory",
  async (editObject) => {
    const { id, newCategory } = editObject;
    console.log("editdata:", id, newCategory);
    const response = await axios.put(
      `https://localhost:44368/api/categories/${id}`,
      newCategory
    );
    console.log("Editresponse:", response.data);
    return response.data;
  }
);

//Delete a category
export const deleteCategory = createAsyncThunk("removeCategory", async (id) => {
  const response = await axios.delete(`${baseURL}/categories/${id}`);
  console.log("deleteres:", response.status);

  return response.status;
});
