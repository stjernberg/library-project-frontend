import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LibraryItems from "./components/LibraryItems";
import ItemForm from "./components/ItemForm";
import Categories from "./components/Categories";
import CategoryForm from "./components/CategoryForm";
import Header from "./components/Header";
import Home from "./components/Home";
import { PageWrapper } from "./Styling";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <PageWrapper>
            <Route path="/" exact component={Home} />
            <Route path="/library-items" component={LibraryItems} />
            <Route path="/item-form" component={ItemForm} />
            <Route path="/categories" component={Categories} />
            <Route path={["/add-category", "/edit-category/:id"]}>
              <CategoryForm />
            </Route>
          </PageWrapper>
        </Switch>

        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default App;
