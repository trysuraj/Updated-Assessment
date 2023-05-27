import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const EditBook = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      const { data } = await axios.get(`/Book/${params.bookId}`);
      setAuthor(data.author);
      setTitle(data.title);
      setGenre(data.genre);
      setPublicationYear(data.publicationYear);
      setId(data.id);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this book?");
      if (!answer) return;
      const { data } = await axios.delete(`/Book/${id}`);
      toast.success(`"${data.tittle}" is deleted`);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write an author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Write a publication year"
        value={publicationYear}
        onChange={(e) => publicationYear(e.target.value)}
      />

      <button onClick={handleSubmit}>Update</button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditBook;
