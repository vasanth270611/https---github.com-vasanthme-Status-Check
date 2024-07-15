import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TablePagination,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Add, Delete, Edit, Update } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addRecipient,
  getRecipient,
  deleteRecipient,
  updateRecipient,
} from "../../store/action";

function RecipientTable() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState("");
  const [inputValues, setInputValues] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    slack_username: "",
  });
  // const [dialogType, setDialogType] = useState('');
  const [recipient, setRecipient] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    slack_username: "",
  });

  const recipientList = useSelector((state) => state.recipient.recipients);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    //setDialogType('Add');
    setOpen(true);
    setInputValues({
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      slack_username: "",
    });
  };

  const handleCLose = () => {
    setOpen(false);
  };

  const handleClickEditOpen = (row) => {
    //setDialogType('Edit');
    setEditOpen(true);
    setInputValues({
      id: row.id,
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      phone: row.phone,
      slack_username: row.slack_username,
    });
  };

  const handleEditCLose = () => {
    setEditOpen(false);
  };

  //const handleClickDelete = () => {
  //  setDialogType('Delete');
  //  setOpen(true);
  // };

  //To handleSubmit/insert
  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, firstname, lastname, email, phone, slack_username } = recipient;
    dispatch(
      addRecipient(selectedEnv, {
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        slack_username: slack_username,
      })
    );
    handleCLose();
  };

  // const handleChange = (fieldName, value) => {
  //  setRecipient({ ...recipient, [fieldName]: value});
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipient({ ...recipient, [name]: value });
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteRecipient(selectedEnv, id));
  };

  //Handle update
  const handleUpdate = (event) => {
    event.preventDefault();
    //const { id, firstname, lastname, email, phone, slack_username } = recipient;
    dispatch(
      addRecipient(selectedEnv, {
        id: inputValues.id,
        firstname: inputValues.firstname,
        lastname: inputValues.lastname,
        email: inputValues.email,
        phone: inputValues.phone,
        slack_username: inputValues.slack_username,
      })
    );
    handleEditCLose();
  };

  const onChangeEnv = (event) => {
    const value = event.target.value;
    setSelectedEnv(value);
    dispatch(getRecipient(value));
  };

  const columns = [
    { field: "id", headerName: " Id", width: 150 },
    { field: "firstname", headerName: "First Name", width: 250 },
    { field: "lastname", headerName: "Last Name", width: 250 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 250 },
    { field: "slack_username", headerName: "Slack Username", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton
              aria-label="edit"
              onClick={() => handleClickEditOpen(params.row)}
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6">Recipient List</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleClickOpen}>
            <Add />
            Recipient
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography variant="body1">
              Please select the environment
            </Typography>
          </div>

          <div className="environment list">
            <select
              className="form select"
              value={selectedEnv}
              onChange={onChangeEnv}
            >
              <option value="">select</option>
              <option value="dev">DEV</option>
              <option value="sit">SIT</option>
              <option value="qa">QA</option>
            </select>
          </div>
        </Grid>
        <Box sx={{ height: 360, width: "100%" }}>
          <DataGrid
            rows={recipientList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 20, 25]}
            //checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
      <Dialog
        open={open}
        onClose={handleCLose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": { width: "100%", maxWidth: "900px" },
          },
        }}
      >
        <DialogTitle>Add Recipient</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="id"
                name="id"
                label="Id"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="slack_username"
                name="slack_username"
                label="Slack Username"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCLose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={handleEditCLose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": { width: "100%", maxWidth: "900px" },
          },
        }}
      >
        <DialogTitle>Update Recipient</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="id"
                name="id"
                label=" Id"
                type="text"
                defaultValue={inputValues.id}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({ ...inputValues, id: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                defaultValue={inputValues.firstname}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({ ...inputValues, firstname: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                defaultValue={inputValues.lastname}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({ ...inputValues, lastname: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                defaultValue={inputValues.email}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    email: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone"
                type="text"
                defaultValue={inputValues.phone}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="slack_username"
                name="slack_username"
                label="Slack Username"
                type="text"
                defaultValue={inputValues.slack_username}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    slack_username: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCLose}>Cancel</Button>
          <Button type="update" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RecipientTable;
