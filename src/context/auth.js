import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [id, setId] = useState("");
  const handleEdit = (book, index) => {
    setAuthor(book.author);
    setTitle(book.author);
    setGenre(book.author);
    setPublicationYear(book.p);
  };
  const loadBook = async () => {
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/Book`);

      setAuth({ ...auth, user: res.data });
      return res.data;
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };
  const handleDelete = async (index) => {
    try {
      let answer = window.confirm("Are you sure you want to delete this book?");
      if (!answer) return;
      const res = await axios.delete(`${axios.defaults.baseURL}/Book/${index}`);

      if (res.status === 204) {
        toast.success(`Book successfuly deleted`);
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };
  const addBook = async (bookData) => {
    try {
      const { data } = await axios.post("/Book", bookData);
      console.log("this is submit", data);
      toast.success(`${data.tittle} added successfully`);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      toast.error("Book creation failed");
    }
  };
  //const handleEdit = async (index) => {
  // try {
  //   let answer = window.confirm("Are you sure you want to delete this book?");
  //   if (!answer) return;
  //   const res = await axios.put(`${axios.defaults.baseURL}/Book/${index}`);
  //   toast.success(`"${res.tittle}" is deleted`);
  //   navigate("/");
  // } catch (err) {
  //   console.log(err);
  //   toast.error("Delete failed. Try again.");
  // }
  //};

  // useEffect(() => {
  //   loadBook();
  // }, []);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.user, token: parsed.token });
    }
  }, []);
  axios.defaults.baseURL = process.env.REACT_APP_API;

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API;

    axios.defaults.headers.common["Authorization"] = auth.token;
  }, [auth.token]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loadBook,
        handleDelete,
        handleEdit,
        addBook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
