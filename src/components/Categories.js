import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteForever, Add } from "@material-ui/icons";
import { Table, Form, Button } from "react-bootstrap";
import { TableWrapper } from "../Styling";
import { fetchCategories, getAllCategories } from "../redux/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Categgories:", categories);
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
                <td>{category.id}</td>

                <td>
                  <span
                    role="button"
                    className="text-danger font-bold"
                    // onClick={() => {
                    //   dispatch(deleteCategory(category.id));
                    // }}
                  >
                    Delete
                    <DeleteForever className="icon" />
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        <span
          role="button"
          className="text-success font-bold"
          // onClick={() => {
          //   dispatch(deleteCategory(category.id));
          // }}
        >
          Add new category
          <Add className="icon" />
        </span>
      </TableWrapper>
    </>
  );
};

export default Categories;
