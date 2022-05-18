import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteForever, Add } from "@material-ui/icons";
import { Table, Form, Button } from "react-bootstrap";
import { TableWrapper } from "../Styling";
import { fetchItems, getAllItems } from "../redux/librarySlice";

const LibraryItems = () => {
  const dispatch = useDispatch();  
  const items = useSelector(getAllItems);

  useEffect(() => {
    dispatch(fetchItems());
    //DELETE
    seeItems();
  }, [dispatch]);

  //DELETE
  const seeItems = () => {
    console.log("items:", items);
  };
  return (
    <>
      <TableWrapper>
        <h1 className="text-center mb-3">Library Items</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
            </tr>
          </thead>
          {items.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.title}</td>
                <td>{item.type}</td>
                {item.isBorrowable && (
                  <td>
                    <Button variant="primary">Borrow</Button>
                  </td>
                )}
                {!item.isBorrowable && (
                  <td>
                    <Button variant="info">Return</Button>
                  </td>
                )}
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
          Add new library item
          <Add className="icon" />
        </span>
      </TableWrapper>
    </>
  );
};

export default LibraryItems;
