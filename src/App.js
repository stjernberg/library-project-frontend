import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LibraryItems from "./components/LibraryItems";
import ItemForm from "./components/ItemForm";
import Categories from "./components/Categories";
import CategoryForm from "./components/CategoryForm";
import Header from "./components/Header";
import Borrow from "./components/Borrow";
import { PageWrapper } from "./Styling";

const App = () => {
  return (
    <>
      <BrowserRouter forceRefresh>
        <Header />
        <Switch>
          <PageWrapper>
            <Route path="/" exact component={LibraryItems} />
            <Route path={["/add-item", "/edit-item/:id"]}>
              <ItemForm />
            </Route>
            <Route path="/categories" component={Categories} />
            <Route path={["/add-category", "/edit-category/:id"]}>
              <CategoryForm />
            </Route>
            <Route path="/borrow-book/:id" component={Borrow} />
          </PageWrapper>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
