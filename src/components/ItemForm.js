import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
// import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { fetchCategories, getAllCategories } from "../redux/categorySlice";
import { FormWrapper } from "../Styling";

const ItemForm = () => {
  const dispatch = useDispatch();
  //const { categories } = useSelector((state) => state.categories);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(setMessage(null));
    //DELETE
    //seeCategories();
  }, [dispatch]);
  //DELETE
  // const seeCategories = () => {
  //   console.log("categories:", categories);
  // };

  return (
    <>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <p>{category.categoryName}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemForm;
