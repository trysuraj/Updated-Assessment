import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";

const AddBook = () => {
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const { addBook } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      tittle: title,
      author: author,
      genre: genre,
      publication: publicationYear,
    };
    addBook(bookData);
  };
  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder="Write an author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Write a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Write a genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Write a publication year"
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBook;
