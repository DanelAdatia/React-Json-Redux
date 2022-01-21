import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUser, updateUser } from "../redux/actions";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > :not(style)": { margin: theme.spacing(1), width: "45ch" },
  },
}));

const EditUser = () => {
  let Navigate = useNavigate();
  let dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  let { id } = useParams();
  const { user } = useSelector((state) => state.data);
  const { name, email, address, contact } = state;

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    if (!name || !address || !email || !contact) {
      setError("Please fill all the input fields");
    } else {
      dispatch(updateUser(state, id));
      Navigate("/");
      setError("");
    }
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    dispatch(editUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);
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
      <h2>Edit User</h2>
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
          value={name || ""}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          value={email || ""}
          type="text"
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Contact"
          value={contact || ""}
          name="contact"
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          name="address"
          value={address || ""}
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
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
