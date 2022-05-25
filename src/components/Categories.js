import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeleteForever, Add, Edit } from "@material-ui/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Table, Button } from "react-bootstrap";
import { TableWrapper } from "../Styling";
import { fetchCategories, deleteCategory } from "../fetches";
import {
  getAllCategories,
  getMessage,
  setMessage,
} from "../redux/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const message = useSelector(getMessage);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(setMessage(""));
  }, [dispatch]);

  const deleteConfirm = ({ categoryName, id }) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Do you want to delete ${categoryName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteCategory(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };

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
                      deleteConfirm({ ...category });
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

        <Button
          className="font-bold"
          onClick={() => {
            history.push("/add-category");
          }}
        >
          Add new Category
          <Add className="icon" />
        </Button>

        {message && <p className="mt-3">{`${message}`}</p>}
      </TableWrapper>
    </>
  );
};

export default Categories;
