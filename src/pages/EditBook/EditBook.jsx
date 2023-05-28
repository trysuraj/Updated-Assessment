import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuth } from "../../context/auth";

const EditBook = () => {
  const navigate = useNavigate();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const genre = queryParams.get("g");
  const publication = queryParams.get("pub");
  const title = queryParams.get("tit");
  const author = queryParams.get("aut");

  const [bookTitle, setBookTitle] = useState(title);
  const [bookAuthor, setBookAuthor] = useState(author);
  const [bookGenre, setBookGenre] = useState(genre);
  const [bookPublicationYear, setBookPublicationYear] = useState(publication);
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        tittle: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        publication: bookPublicationYear,
        id: params.bookId,
      };
      console.log(bookData);

      const data = await axios.put(`/Book/${params.bookId}`, bookData);
      console.log("data is", data);
      if (data.status === 204) {
        toast.success(`${bookData.tittle} added successfully`);
        navigate("/");
        setTimeout(() => {}, 2000);
      }
    } catch (err) {
      console.log(err);
      toast.error("Book creation failed");
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder="Write an author"
        value={bookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Write a title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a genre"
        className="input"
        value={bookGenre}
        onChange={(e) => setBookGenre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a publication year"
        className="input"
        value={bookPublicationYear}
        onChange={(e) => setBookPublicationYear(e.target.value)}
      />

      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default EditBook;
