import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sortBy } from "lodash";
import { DeleteForever, Add, Edit } from "@material-ui/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Table, Button, Form } from "react-bootstrap";
import { TableWrapper } from "../Styling";
import { getAllItems, getMessage, setMessage } from "../redux/librarySlice";
import { fetchItems, deleteItem } from "../fetches";

const LibraryItems = () => {
  const dispatch = useDispatch();
  const items = useSelector(getAllItems);
  const message = useSelector(getMessage);
  const history = useHistory();
  const [sortTerm, setSortTerm] = useState("categoryName");

  useEffect(() => {
    dispatch(fetchItems());
    //dispatch(setMessage(""));
  }, [dispatch, items]);

  const getAcronym = (title) => {
    const acronym = title
      .toUpperCase()
      .split(" ")
      .map((elem) => elem[0])
      .join("");

    return acronym;
  };

  const deleteConfirm = ({ title, id }) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Do you want to delete ${title}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteItem(id)),
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
        <h1 className="text-center mb-3">Library Items</h1>
        <Form.Group>
          <Form.Label>Sort by:</Form.Label>
          <Form.Select
            onChange={(e) => setSortTerm(e.target.value)}
            aria-label="Choose sorting type"
            className="m-3"
          >
            <option value="categoryName">Category name</option>
            <option value="type">Type</option>
          </Form.Select>
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Category</th>
            </tr>
          </thead>
          {sortBy(items, [sortTerm]).map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>
                  {item.title} ({getAcronym(item.title)})
                </td>
                <td>{item.type}</td>
                <td>{item.category.categoryName}</td>

                {item.isBorrowable && (
                  <td>
                    {item.type !== "Reference Book" && (
                      <Button
                        variant="primary"
                        onClick={() => {
                          history.push(`/borrow-book/${item.id}`);
                        }}
                      >
                        Borrow
                      </Button>
                    )}
                  </td>
                )}
                {!item.isBorrowable && (
                  <td>
                    {item.type !== "Reference Book" && (
                      <Button
                        variant="info"
                        onClick={() => {
                          history.push(`/borrow-book/${item.id}`);
                        }}
                      >
                        Return
                      </Button>
                    )}
                  </td>
                )}
                <td>
                  <span
                    role="button"
                    className="text-danger font-bold"
                    onClick={() => {
                      deleteConfirm({ ...item });
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
                      history.push(`/edit-item/${item.id}`);
                    }}
                  >
                    Edit
                    <Edit className="icon" />
                  </span>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        {message && <p className="mt-3">{`${message}`}</p>}
        <Button
          className="font-bold m-3"
          onClick={() => {
            history.push("/add-item");
          }}
        >
          Add new library item
          <Add className="icon" />
        </Button>
      </TableWrapper>
    </>
  );
};

export default LibraryItems;
