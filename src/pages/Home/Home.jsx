import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Button } from "../../components";

import styles from "./home.module.scss";
import "./home.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
const Home = () => {
  const { loadBook, auth, handleDelete, handleEdit } = useAuth();

  useEffect(() => {
    loadBook();
  }, []);
  return (
    <div className={styles.home_layout}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <h1 className={styles["title"]}>Books</h1>
        <Link to="/add-book">
          <Button>
            Add Books <FiPlus style={{ margin: "0px", padding: "0px" }} />
          </Button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>TItle</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Publication year</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {auth.user !== null &&
            auth.user.map((book, index) => (
              <tr key={book.tittle}>
                <td>{book.tittle}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publication}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ position: "relative", marginRight: "8px" }}>
                      <span
                        onClick={() => {
                          console.log("this is not book", book);
                          handleEdit(book, book.id);
                        }}
                        className={styles["edit_link"]}
                      >
                        Edit
                      </span>
                    </div>

                    <MdDelete
                      color="#DC2626"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(book.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
