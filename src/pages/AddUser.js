import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > :not(style)": { margin: theme.spacing(1), width: "45ch" },
  },
}));

const AddUser = () => {
  let Navigate = useNavigate();
  let dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const { name, email, address, contact } = state;

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    if (!name || !address || !email || !contact) {
      setError("Please fill all the input fields");
    } else {
      dispatch(addUser(state));
      Navigate("/");
      setError("");
    }
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const classes = useStyles();
  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => Navigate("/")}
      >
        Go Back
      </Button>
      <h2>Add User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          type="text"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Contact"
          value={contact}
          name="contact"
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          name="address"
          value={address}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
