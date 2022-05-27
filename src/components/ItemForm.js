import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { getAllCategories } from "../redux/categorySlice";
import { getMessage, setMessage } from "../redux/librarySlice";
import { fetchCategories, getItem, createItem, editItem } from "../fetches";
import { FormWrapper } from "../Styling";

const ItemForm = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.library);
  const categories = useSelector(getAllCategories);
  const message = useSelector(getMessage);
  const { id } = useParams();
  const isAddMode = !id;
  const [mediaType, setMediaType] = useState("");
  const history = useHistory();
  const [typeChosen, setTypeChosen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [isRef, setIsRef] = useState(false);
  const [isAudio, setIsAudio] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    if (isAddMode) {
      setShowButtons(true);
    }
    if (!isAddMode) {
      dispatch(getItem(id));
      dispatch(setMessage(""));
    }
  }, [dispatch, id, isAddMode]);

  const addBook = () => {
    setMediaType("Book");
    setIsBook(true);
    setTypeChosen(true);
    setShowButtons(false);
  };
  const addAudio = (type) => {
    setMediaType(type);
    setIsAudio(true);
    setTypeChosen(true);
    setShowButtons(false);
  };
  const addReference = () => {
    setMediaType("Reference Book");
    setIsRef(true);
    setTypeChosen(true);
    setShowButtons(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const onSubmit = (data) => {
    const newItem = {
      title: data.title,
      author: data.author,
      pages: data.pages,
      type: data.type,
      runTimeMinutes: data.runTimeMinutes,
      categoryId: data.categoryId,
      isBorrowable: data.isBorrowable,
      borrower: "",
      borrowDate: undefined,
    };
    reset();
    return isAddMode ? addItem(newItem) : updateItem(newItem);
  };
  const addItem = (newItem) => {
    dispatch(createItem(newItem));
  };

  const updateItem = (newItem) => {
    dispatch(
      editItem({
        id: id,
        newItem: newItem,
        message: "Item has successfully been updated",
      })
    );
  };

  return (
    <>
      <h2 className="mt-3 text-center">
        {isAddMode ? "Create an item" : "Edit an item"}
      </h2>
      {showButtons && (
        <div>
          <Button
            variant="info"
            className="m-3"
            onClick={() => {
              addAudio("DVD");
            }}
          >
            Add DVD
          </Button>
          <Button
            variant="info"
            className="m-3"
            onClick={() => {
              addBook();
            }}
          >
            {isAddMode ? "Add Book" : "Edit Book"}
          </Button>

          <Button
            variant="info"
            className="m-3"
            onClick={() => {
              addAudio("Audio Book");
            }}
          >
            {isAddMode ? "Add Audio Book" : "Edit Audio Book"}
          </Button>

          <Button
            variant="info"
            className="m-3"
            onClick={() => {
              addReference();
            }}
          >
            {isAddMode ? "Add Reference Book" : "Edit Reference Book"}
          </Button>
        </div>
      )}

      {!isAddMode && (
        <div>
          {item.type === "DVD" && (
            <Button
              variant="info"
              className="m-3"
              onClick={() => {
                addAudio("DVD");
              }}
            >
              {isAddMode ? "Add DVD" : "Edit DVD"}
            </Button>
          )}
          {item.type === "Book" && (
            <Button
              variant="info"
              className="m-3"
              onClick={() => {
                addBook();
              }}
            >
              {isAddMode ? "Add Book" : "Edit Book"}
            </Button>
          )}
          {item.type === "Audio Book" && (
            <Button
              variant="info"
              className="m-3"
              onClick={() => {
                addAudio("Audio Book");
              }}
            >
              {isAddMode ? "Add Audio Book" : "Edit Audio Book"}
            </Button>
          )}
          {item.type === "Reference Book" && (
            <Button
              variant="info"
              className="m-3"
              onClick={() => {
                addReference();
              }}
            >
              {isAddMode ? "Add Reference Book" : "Edit Reference Book"}
            </Button>
          )}
        </div>
      )}

      {typeChosen && (
        <FormWrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select
                {...register("type", { required: true })}
                aria-label="Choose type"
                className="mt-2"
              >
                {isAddMode ? (
                  <option value={mediaType}>{mediaType}</option>
                ) : (
                  <option value={item.type}>{item.type}</option>
                )}
              </Form.Select>
            </Form.Group>
            {errors.type && (
              <span className="text-danger">Type is required</span>
            )}
            <Form.Group>
              <Form.Label className="mt-3">Category</Form.Label>
              <Form.Select
                {...register("categoryId", {
                  required: true,
                  valueAsNumber: true,
                })}
                aria-label="Choose category"
              >
                <option>Choose category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {errors.category && (
              <span className="text-danger">Category is required</span>
            )}
            <Form.Group controlId="formTitle">
              <Form.Label className="mt-3">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                {...register("title", { required: true, minLength: 2 })}
              />
              {errors.title && (
                <span className="text-danger">Title is Required!</span>
              )}
            </Form.Group>
            {!isAudio && (
              <Form.Group controlId="formAuthor">
                <Form.Label className="mt-3">Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  {...register("author", { required: true, minLength: 2 })}
                />
                {errors.author && (
                  <span className="text-danger">
                    Min 2 characters is Required!
                  </span>
                )}
              </Form.Group>
            )}
            {!isAudio && (
              <Form.Group controlId="formBasicText">
                <Form.Label className="mt-3">Pages</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Pages"
                  {...register("pages", {
                    required: true,
                    valueAsNumber: true,
                    minLength: 2,
                  })}
                />
                {errors.pages && (
                  <span className="text-danger">Pages is required</span>
                )}
              </Form.Group>
            )}
            {isAudio && (
              <Form.Group controlId="formBasicText">
                <Form.Label className="mt-3">Run Time Minutes</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Runtime minutes"
                  {...register("runTimeMinutes", {
                    valueAsNumber: true,
                    required: true,
                    minLength: 2,
                  })}
                />
                {errors.runTimeMinutes && (
                  <span className="text-danger">Run Time Minutes</span>
                )}
              </Form.Group>
            )}

            {!isRef && (
              <input
                className="mt-2 ml-2"
                type="checkbox"
                hidden
                checked="checked"
                {...register("isBorrowable", {})}
              />
            )}
            {isRef && (
              <input
                className="mt-2 ml-2"
                type="checkbox"
                hidden
                {...register("isBorrowable", {})}
              />
            )}

            <div className="text-center m-3">
              <Button variant="info" type="submit">
                {isAddMode ? "Add" : "Edit"}
              </Button>

              <Button
                className="m-3"
                variant="primary"
                onClick={() => history.push("/")}
              >
                Back to list
              </Button>
            </div>
          </Form>
        </FormWrapper>
      )}
      {message && <p className="mt-3">{`${message}`}</p>}
    </>
  );
};

export default ItemForm;
