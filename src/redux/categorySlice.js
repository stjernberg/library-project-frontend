import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
        console.log(action.payload);
        state.categories = action.payload;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Returned response", action.payload);
        state.message = "Category has successfully been deleted.";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = true;
        console.log("Category can't be deleted.");
        state.message = "Category can't be deleted.";
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Category:", action.payload);
        state.category = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("editCategory:", action.payload);
        state.categories.push(action.payload);
      });
  },
});

//-----------Edit a category----------------

// const editCategoryAPI = async (id, category) => {
//   return await axios.put(
//     `https://localhost:44368/api/categories/${id}`,
//     category
//   );
// };

// export const editCategory = (id, category) => (dispatch) => {
//   editCategoryAPI(id, category)
//     .then((res) => {
//       console.log("Category is edited:", res.data);
//       dispatch(setCategory(res.data));
//     })
//     .catch((err) => {
//       console.log("Error:", err);
//       // dispatch error
//     });
// };

export const { setMessage, setCategory } = categorySlice.actions;
export const getAllCategories = (state) => state.categories.categories;
export const getMessage = (state) => state.categories.message;
export default categorySlice.reducer;
