import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCategories,
  createCategory,
  deleteCategory,
  getCategory,
  editCategory,
} from "../fetches";

const initialState = {
  categories: [],
  category: {},
  loading: false,
  message: "",
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    removeCategory: (state) => {
      state.category = {};
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setCategories: (state, action) => {
      state.categories.push(action.payload);
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Category has successfully been deleted.";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.message =
          "Category can't be deleted. Possibly because it's connected to an item.";
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.message = "Category successfully added";
      })
      .addCase(editCategory.rejected, (state) => {
        state.message = "Category couldn't be deleted.";
      });
  },
});

export const { setMessage, setCategory } = categorySlice.actions;
export const getAllCategories = (state) => state.categories.categories;
export const getMessage = (state) => state.categories.message;
export default categorySlice.reducer;
