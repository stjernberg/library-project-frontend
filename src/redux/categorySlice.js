import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getCategoriesAPI, addCategoryAPI, deleteCategoryAPI } from "../API";
const baseURL = "https://localhost:44368/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`${baseURL}/categories`);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  categories: [],
  category: {},
  loading: false,
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    removeCategory: (state) => {
      state.category = {};
    },
    setCategories: (state, action) => {
      state.categories.push(action.payload);
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
      });
  },
});

export const getAllCategories = (state) => state.categories.categories;
export default categorySlice.reducer;

//export const { library } = librarySlice.actions;
//export const getAllItems = (state) => state.library.items;
//export const getAllItems = (state) => state.library.items;
//export default categorySlice.reducer;
// const initialState = {
//   categories: [],
//   category: {},
//   message: "",
//   error: null,
//   loading: false,
// };

// export const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {
//     requestStarted: (state) => {
//       state.loading = true;
//     },
//     requestFailed: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//       state.posts = [];
//       state.posts = {};
//     },

//     setCategories: (state, action) => {
//       state.categories = action.payload;
//       state.loading = false;
//       state.error = null;
//     },

//     setMessage: (state, action) => {
//       state.message = action.payload;
//     },
//   },
// });

// //-----------Get all Categories----------------

// export const getCategories = () => (dispatch) => {
//   dispatch(requestStarted());
//   getCategoriesAPI()
//     .then((res) => {
//       console.log(res.data);
//       // dispatch({ type: postsFetched.type, payload: res.data });
//       dispatch(setCategories(res.data));
//     })
//     .catch((err) => {
//       console.log("Error:", err);
//       // dispatch error
//     });
// };

// //--------Create a new category ----------------
// export const addCategory = (category) => (dispatch) => {
//   dispatch(requestStarted());

//   addCategoryAPI(category)
//     .then((res) => {
//       dispatch(categoriesAdded(res.data));
//       // dispatch(setMessage("Category successfully added!"));
//       getCategories()
//         .then((fetchRes) => {
//           dispatch(categoriesFetched(fetchRes.data));
//         })
//         .catch((err) => {
//           console.log("ERR:", err);
//           // dispatch error
//         });
//     })

//     .catch((err) => {
//       // dispatch error
//       console.log("ERR:", err);
//     });
// };

// //--------Delete a category ----------------
// export const deleteCategory = (id) => (dispatch) => {
//   dispatch(requestStarted());
//   deleteCategoryAPI(id)
//     .then((deleteRes) => {
//       switch (deleteRes.status) {
//         case 200:
//           dispatch(setMessage("Category successfully deleted!"));
//           break;
//         case 400:
//           dispatch(setMessage("Bad request, category couldn't be deleted!"));
//           break;
//         case 409:
//           dispatch(
//             setMessage(
//               "Category couldn't be deleted, due to it's being linked to a post!"
//             )
//           );
//           break;
//         default:
//           break;
//       }
//       getCategoriesAPI()
//         .then((fetchRes) => {
//           dispatch(categoriesFetched(fetchRes.data));
//         })
//         .catch((err) => {
//           console.log("ERR:", err);
//         });
//     })
//     .catch((err) => {
//       console.log("ERR:", err);
//     });
// };

// export const {
//   category,
//   requestStarted,
//   requestFailedPost,
//   setMessage,
//   setCategories,
// } = categorySlice.actions;
