import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { getAllCategories } from "../redux/categorySlice";
import { fetchCategories, createItem } from "../fetches";
import { FormWrapper } from "../Styling";

const ItemForm = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.library);
  const categories = useSelector(getAllCategories);
  const { id } = useParams();
  const isAddMode = !id;
  const [type, setType] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  //let typeChosen = false;

  useEffect(() => {
    dispatch(fetchCategories());
    if (!isAddMode) {
      //dispatch(getItem(id));
      //dispatch(setMessage(null));
      //console.log(item);
    }
  }, [dispatch]);

  const types = ["Book", "DVD", "Audio Book", "Reference Book"];
  const inputRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  if (!isAddMode) {
    let fields = [
      "title",
      "author",
      "pages",
      "type",
      "isBorrowable",
      "categoryId",
      "borrower",
      "borrowDate",
      "runTimeMinutes",
    ];
    fields.forEach((field) => setValue(field, item[field]));
  }

  const handleChange = (event) => {
    setType(event.target.value);
    console.log(type);
    //typeChosen = true;
  };

  const onSubmit = (data) => {
    console.log("DATA: ", data);
    // const newItem = {
    //   title: data.title,
    //   author: data.author,
    //   pages: data.pages,
    //   type: data.type,
    //   categoryId: data.categoryId,
    //   isBorrowable: data.isBorrowable,
    //   borrower: data.borrower,
    //   borrowDate: data.borrowDate,
    //   runTimeMinutes: data.runTimeMinutes,
    // };
    dispatch(createItem(data));

    //return isAddMode ? createItem(newItem) : updateItem(id, newItem);
  };
  // const createItem = (newItem) => {
  //   dispatch(addItem(newItem));
  // };

  // const updateItem = (id, newItem) => {
  //   dispatch(editItem(id, newItem));
  // };

  return (
    <>
      <h2 className="mt-3 text-center">
        {isAddMode ? "Create an item" : "Edit an item"}
      </h2>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Select
            {...register("type", { required: true })}
            aria-label="Choose type"
            className="mt-2"
            onChange={handleChange}
          >
            <option>Choose type</option>
            {types.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </Form.Select>
          {/* <div>*/}

          <Form.Select
            {...register("categoryId", { required: true, valueAsNumber: true })}
            aria-label="Choose category"
            className="mt-2"
          >
            <option>Choose category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
          {/* {errors.title && (
            <span className="text-danger">Category is required</span>
          )} */}
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: true, minLength: 2 })}
            />
            {errors.title && (
              <span className="text-danger">Title is Required!</span>
            )}
          </Form.Group>

          {type != "DVD" && (
            <Form.Group controlId="formAuthor">
              <Form.Label className="mt-2">Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                //disabled={(type = "DVD")}
                {...register("author", { required: true, minLength: 2 })}
              />
              {errors.text && (
                <span className="text-danger">
                  Min 2 characters is Required!
                </span>
              )}
            </Form.Group>
          )}

          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Pages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pages"
              {...register("pages", {
                required: true,
                valueAsNumber: true,
                minLength: 2,
              })}
            />
            {errors.createdBy && (
              <span className="text-danger">Pages is required</span>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mt-2">Run Time Minutes</Form.Label>
            <Form.Control
              type="number"
              placeholder="Runtime minutes"
              {...register("runTimeMinutes", {
                valueAsNumber: true,
                required: true,
                minLength: 2,
              })}
            />
            {errors.createdBy && (
              <span className="text-danger">Run Time Minutes</span>
            )}
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label className="mt-2">Borrower</Form.Label>
            <Form.Control
              type="text"
              placeholder="Borrower"
              {...register("borrower", { required: true, minLength: 2 })}
            />
            {errors.text && (
              <span className="text-danger">Min 2 characters is Required!</span>
            )}
          </Form.Group>
          <Controller
            control={control}
            name="borrowDate"
            render={({ field }) => (
              <DatePicker
                className="mt-4"
                placeholderText="Select date"
                format="yyyy-MM-dd"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
          {/* {errors.borrowDate && (
            <span className="text-danger">Borrowdate is required</span>
          )} */}
          {/* <input
            type="datetime"
            placeholder="borrowDate"
            {...register("borrowDate", {})}
          /> */}
          <Form.Group
            controlId="formisBorrowable"
            className="d-flex align-items-center"
          >
            <Form.Label className="mt-3 mr-2">Is Borrowable</Form.Label>
            <Form.Check
              className="mt-2 ml-2"
              type="checkbox"
              placeholder="isBorrowable"
              {...register("isBorrowable", {})}
            />
          </Form.Group>

          <div className="text-center mt-3">
            <Button variant="info" type="submit">
              {isAddMode ? "Add" : "Edit"}
            </Button>
            {/* </div>*/}
          </div>
        </Form>
      </FormWrapper>
      {/* {message && <h4>{`${message}`}</h4>} */}
      {/* <span
        className="font-bold"
        role="button"
        onClick={() => history.push("/posts")}
      >
        View posts
        <DoubleArrowIcon className="icon" />
      </span> */}

      {/* {message && <p>{message}</p>} */}
    </>
  );
};

export default ItemForm;
