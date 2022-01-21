import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 900,
    marginTop: 100,
  },
});

const ButtonStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const styledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Home() {
  const classes = useStyles();
  const buttonStyles = ButtonStyle();
  let dispatch = useDispatch();
  let Navigate = useNavigate();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are u sure u want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div>
      <div className={buttonStyles.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => Navigate("/addUser")}
        >
          Add User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.contact}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">
                    <div className={buttonStyles.root}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          onClick={() => handleDelete(user.id)}
                          style={{ marginRight: "5px" }}
                          color="secondary"
                        >
                          Delete
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => Navigate(`/editUser/${user.id}`)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Home;
