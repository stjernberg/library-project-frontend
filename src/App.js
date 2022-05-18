import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibraryItems from "./components/LibraryItems";
import ItemForm from "./components/ItemForm";
import Categories from "./components/Categories";

const App = () => {
  return (
    <div>
      <Router>
        {/* <Header /> */}

        <Routes>
          <Route path="/library-items" element={<LibraryItems />} />
          <Route path="/item-form" element={<ItemForm />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
