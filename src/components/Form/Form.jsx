import { Button } from "../";
const Form = ({ title, values, handleSubmit, handleInputChange }) => {
  return (
    <div style={{ paddingTop: "30px" }}>
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>{title}</h2>

        <input
          name="title"
          placeholder="Enter book title"
          type="text"
          required={true}
          className="input"
          value={values.title}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          name="author"
          placeholder="Enter name of Author"
          type="text"
          required={true}
          className="input"
          value={values.author}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          name="genre"
          placeholder="Enter book genre"
          type="text"
          className="input"
          value={values.genre}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <input
          className="input"
          name="publicationYear"
          placeholder="Enter year of  publication"
          type="text"
          value={values.publicationYear}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />

        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
};

export default Form;
