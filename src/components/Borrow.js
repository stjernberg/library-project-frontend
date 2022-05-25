import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getItem, editItem } from "../fetches";
import { FormWrapper } from "../Styling";
import { getMessage, setMessage } from "../redux/librarySlice";

const Borrow = () => {
  const { id } = useParams();
  const { item } = useSelector((state) => state.library);
  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector(getMessage);

  useEffect(() => {
    dispatch(getItem(id));
    dispatch(setMessage(""));
    console.log(item);
  }, [dispatch]);
  

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmitBorrow = (data) => {
    console.log("DATA: ", data);

    const newItem = {
      title: item.title,
      author: item.author,
      pages: item.pages,
      type: item.type,
      runTimeMinutes: item.runTimeMinutes,
      categoryId: item.categoryId,
      isBorrowable: false,
      borrower: data.borrower,
      borrowDate: data.borrowDate,
    };

    editBorrow(newItem);
  };

  const onSubmitReturn = () => {
    const newItem = {
      title: item.title,
      author: item.author,
      pages: item.pages,
      type: item.type,
      runTimeMinutes: item.runTimeMinutes,
      categoryId: item.categoryId,
      isBorrowable: true,
      borrower: "",
      //BorrowDate ska nollställas, men jag lyckaded inte få det att funka,
      //så jag låter datumet vara kvar.
      borrowDate: item.borrowDate,
    };

    editBorrow(newItem);
  };

  const editBorrow = (newItem) => {
    dispatch(
      editItem({
        id: id,
        newItem: newItem,
        message: "Borrow status successfully changed",
      })
    );
  };
  return (
    <>
      <h2 class="font-italic">{item.isBorrowable ? "Borrow" : "Return"}</h2>
      <h2>{item.title}</h2>
      {item.isBorrowable && (
        <>
          <FormWrapper>
            <Form onSubmit={handleSubmit(onSubmitBorrow)}>
              <Form.Group controlId="formBorrower">
                <Form.Label className="mt-3">Borrower</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Borrower"
                  {...register("borrower", { required: true, minLength: 2 })}
                />
                {errors.text && (
                  <span className="text-danger">
                    Min 2 characters is Required!
                  </span>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-3">Borrow date:</Form.Label>
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
              </Form.Group>

              <div className="text-center m-3">
                <Button variant="info" type="submit">
                  Borrow
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
        </>
      )}
      {!item.isBorrowable && (
        <FormWrapper>
          <Form onSubmit={handleSubmit(onSubmitReturn)}>
            <input
              hidden
              type="datetime"
              placeholder="borrowDate"
              {...register("borrowDate", {})}
            />

            <div className="text-center m-3">
              <Button variant="info" type="submit">
                Return book
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
      {message && <p>{`${message}`}</p>}
    </>
  );
};

export default Borrow;
