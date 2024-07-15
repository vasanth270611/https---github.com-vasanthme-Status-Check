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
import { addHost, getHost, deleteHost, updateHost } from "../../store/action";

function HostTable() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState("");
  const [inputValues, setInputValues] = useState({
    id: "",
    name: "",
    url: "",
    description: "",
  });
  // const [dialogType, setDialogType] = useState('');
  const [host, setHost] = useState({
    id: "",
    name: "",
    url: "",
    description: "",
  });

  const hostList = useSelector((state) => state.host.hosts);

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
    setInputValues({ id: "", name: "", url: "", description: "" });
  };

  const handleCLose = () => {
    setOpen(false);
  };

  const handleClickEditOpen = (row) => {
    //setDialogType('Edit');
    setEditOpen(true);
    setInputValues({
      id: row.id,
      name: row.name,
      url: row.url,
      description: row.description,
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
    const { id, name, url, description } = host;
    dispatch(
      addHost(selectedEnv, {
        id: id,
        name: name,
        url: url,
        description: description,
      })
    );
    handleCLose();
  };

  // const handleChange = (fieldName, value) => {
  //  setHost({ ...host, [fieldName]: value});
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHost({ ...host, [name]: value });
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteHost(selectedEnv, id));
  };

  //Handle update
  const handleUpdate = (event) => {
    event.preventDefault();
    //const { id, name, url, description } = host;
    dispatch(
      updateHost(selectedEnv, {
        id: inputValues.id,
        name: inputValues.name,
        url: inputValues.url,
        description: inputValues.description,
      })
    );
    handleEditCLose();
  };

  const onChangeEnv = (event) => {
    const value = event.target.value;
    setSelectedEnv(value);
    dispatch(getHost(value));
  };

  const columns = [
    { field: "id", headerName: "Host Id", width: 150 },
    { field: "name", headerName: "Host Name", width: 250 },
    { field: "url", headerName: "Host URL", width: 250 },
    { field: "description", headerName: "Description", width: 250 },
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
          <Typography variant="h6">Host Details</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleClickOpen}>
            <Add />
            Host
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
            rows={hostList}
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
        <DialogTitle>Add Host</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="id"
                name="id"
                label="Host Id"
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
                id="name"
                name="name"
                label="Host Name"
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
                id="url"
                name="url"
                label="Host URL"
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
                id="description"
                name="description"
                label="Description"
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
        <DialogTitle>Update Host</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="id"
                name="id"
                label="Host Id"
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
                id="name"
                name="name"
                label="Host Name"
                type="text"
                defaultValue={inputValues.name}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({ ...inputValues, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="url"
                name="url"
                label="Host URL"
                type="text"
                defaultValue={inputValues.url}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({ ...inputValues, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                defaultValue={inputValues.description}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    description: e.target.value,
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

export default HostTable;