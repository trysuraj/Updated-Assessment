import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuth } from "../../context/auth";

const EditBook = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { author, title, genre, publicationYear } = useAuth();
  console.log({ author, title, genre, publicationYear });
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookPublicationYear, setBookPublicationYear] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = new FormData();
      bookData.append("author", author);
      bookData.append("title", title);
      bookData.append("genre", genre);
      bookData.append("publicationYear", publicationYear);

      const { data } = await axios.put(`/Book/${params.bookId}`, bookData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.tittle} added successfully`);
        navigate("/");
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
        value={author}
        onChange={(e) => setBookAuthor(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Write a title"
        value={title}
        onChange={(e) => setBookTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a genre"
        className="input"
        value={genre}
        onChange={(e) => setBookGenre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a publication year"
        className="input"
        value={publicationYear}
        onChange={(e) => setBookPublicationYear(e.target.value)}
      />

      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default EditBook;
