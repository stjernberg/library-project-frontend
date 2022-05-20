import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DeleteForever, Add, Edit } from "@material-ui/icons";
import { Table, Form, Button } from "react-bootstrap";
import { TableWrapper } from "../Styling";
import { fetchCategories, deleteCategory } from "../fetches";
import { getAllCategories, getMessage } from "../redux/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const message = useSelector(getMessage);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <TableWrapper>
        <h1 className="text-center mb-3">Categories</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          {categories.map((category) => (
            <tbody key={category.id}>
              <tr>
                <td>{category.categoryName}</td>

                <td>
                  <span
                    role="button"
                    className="text-danger font-bold"
                    onClick={() => {
                      dispatch(deleteCategory(category.id));
                    }}
                  >
                    Delete
                    <DeleteForever className="icon" />
                  </span>
                </td>
                <td>
                  <span
                    role="button"
                    className="text-warning "
                    onClick={() => {
                      history.push(`/edit-category/${category.id}`);
                    }}
                  >
                    Edit
                    <Edit className="icon" />
                  </span>
                </td>
                <td></td>
              </tr>
            </tbody>
          ))}
        </Table>

        <span
          role="button"
          className="text-success font-bold"
          onClick={() => {
            history.push("/add-category");
          }}
        >
          Add new Category
          <Add className="icon" />
        </span>

        {/* <Form onSubmit={handleSubmit(onSubmit)}>
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
            Add category
            <Add className="icon" />
          </Button>
        </Form> */}
        {message && <h4>{`${message}`}</h4>}
      </TableWrapper>
    </>
  );
};

export default Categories;
