import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://localhost:44368/api";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(`${baseURL}/library-items`);
  console.log(response.data);
  return response.data;
});

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
      });
  },
  // extraReducers: {
  //   [fetchItems.pending]: (state) => {
  //     console.log("pending");
  //     state.loading = true;
  //   },

  //   [fetchItems.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.items = payload;
  //   },
  //   [fetchItems.rejected]: () => {
  //     console.log("Rejected");
  //   },
  // },
});

//export const { library } = librarySlice.actions;
export const getAllItems = (state) => state.library.items;
//export const getAllItems = (state) => state.library.items;
export default librarySlice.reducer;
