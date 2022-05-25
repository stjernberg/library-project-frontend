import { createSlice } from "@reduxjs/toolkit";
import {
  fetchItems,
  createItem,
  deleteItem,
  getItem,
  editItem,
} from "../fetches";

const initialState = {
  items: [],
  item: {},
  itemMessage: "",
  loading: false,
};
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.message = "Item has successfully been created!";
      })
      .addCase(createItem.rejected, (state) => {
        state.message = "Item couldn't be created.";
      })
      .addCase(editItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.response);
        state.message = action.payload.message;
      })
      .addCase(editItem.rejected, (state) => {
        state.message = "Item couldn't be edited.";
      })

      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;

        state.message = "Item has successfully been deleted.";
      })
      .addCase(deleteItem.rejected, (state) => {
        state.message = "Item can't be deleted.";
      })
      .addCase(getItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      });
  },
});

export const { setMessage } = librarySlice.actions;
export const getAllItems = (state) => state.library.items;
export const getMessage = (state) => state.library.message;
export default librarySlice.reducer;
