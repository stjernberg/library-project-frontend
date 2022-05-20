import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchItems, createItem } from "../fetches";

const baseURL = "https://localhost:44368/api";

const initialState = {
  items: [],
  item: {},
  loading: false,
};
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    removeItem: (state) => {
      state.item = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.items = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Items:", action.payload);
        state.items.push(action.payload);
      });
  },
});

//export const { library } = librarySlice.actions;
export const getAllItems = (state) => state.library.items;

export default librarySlice.reducer;
