import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBook, EditBook, Home } from "./pages";
import { Toaster } from "react-hot-toast";
//import DeleteBook from "./pages/DeleteBook/DeleteBook";
//import GetBooks from "./pages/GetBooks/GetBooks";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
