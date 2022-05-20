import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { Form, Button } from "react-bootstrap";
import { createCategory, getCategory, editCategory } from "../fetches";
//import { editCategory } from "../redux/categorySlice";

const CategoryForm = () => {
  const { category } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      dispatch(getCategory(id));
      //dispatch(setMessage(null));
      console.log(category);
    }
  }, [dispatch, id, isAddMode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (!isAddMode) {
    let fields = ["categoryName"];
    fields.forEach((field) => setValue(field, category[field]));
    // let field = "categoryName";
    // field.setValue(field, category[field]);
  }
  const onSubmit = (data) => {
    console.log("DATA: ", data);
    // const newCategory = {
    //   categoryName: data.categoryName,
    // };

    return isAddMode ? addCategory(data) : updateCategory(data);
  };

  const addCategory = (newCategory) => {
    dispatch(createCategory(newCategory));
  };

  const updateCategory = (newCategory) => {
    console.log("new category:", newCategory);
    dispatch(editCategory({ id: id, newCategory: newCategory }));
    //dispatch(editCategory(id, category));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicText">
        <Form.Control
          type="text"
          placeholder="Name"
          {...register("categoryName", { required: true, minLength: 3 })}
        />
        {errors.categoryName && (
          <span className="text-danger">Min length is 3 characters!</span>
        )}
      </Form.Group>

      <Button variant="info" type="submit" className="mt-3 mb-3">
        {isAddMode ? "Add" : "Edit"} Category
        <Add className="icon" />
      </Button>
    </Form>
  );
};

export default CategoryForm;
