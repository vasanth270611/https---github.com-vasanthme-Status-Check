import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Select,
  InputLabel,
  MenuItem,
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
  addConfig,
  deleteConfig,
  updateConfig,
  getTableConfig,
} from "../../store/action";

function ConfigTable() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState("");
  const [inputValues, setInputValues] = useState({
    app_name: "",
    app_type_id: "",
    env_id: "",
    host_id: "",
    schedule: "",
    check_url: "",
    description: "",
    recipient_list: "",
    app_id: "",
    http_method: "",
    response_body_based: "",
    response_code_based: "",
    health_check_enabled: "",
  });
  // const [dialogType, setDialogType] = useState('');
  const [config, setConfig] = useState({
    app_name: "",
    app_type_id: "",
    env_id: "",
    host_id: "",
    schedule: "",
    check_url: "",
    description: "",
    recipient_list: "",
    app_id: "",
    http_method: "",
    response_body_based: "",
    response_code_based: "",
    health_check_enabled: "",
  });

  const configList = useSelector((state) => state.config.configs);

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
      app_name: "",
      app_type_id: "",
      env_id: "",
      host_id: "",
      schedule: "",
      check_url: "",
      description: "",
      recipient_list: "",
      app_id: "",
      http_method: "",
      response_body_based: "",
      response_code_based: "",
      health_check_enabled: "",
    });
  };

  const handleCLose = () => {
    setOpen(false);
  };

  const handleClickEditOpen = (row) => {
    //setDialogType('Edit');
    setEditOpen(true);
    setInputValues({
      app_name: row.app_name,
      app_type_id: row.app_type_id,
      env_id: row.env_id,
      host_id: row.env_id,
      schedule: row.schedule,
      check_url: row.schedule,
      description: row.description,
      recipient_list: row.recipient_list,
      app_id: row.app_id,
      http_method: row.http_method,
      response_body_based: row.response_body_based,
      response_code_based: row.response_code_based,
      health_check_enabled: row.health_check_enabled,
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
    const {
      app_id,
      app_name,
      app_type_id,
      description,
      health_check_enabled,
      env_id,
      check_url,
      host_id,
      http_method,
      recipient_list,
      response_body_based,
      response_code_based,
      schedule,
    } = config;
    dispatch(
      addConfig(selectedEnv, {
        app_name: app_name,
        app_type_id: app_type_id,
        env_id: env_id,
        host_id: host_id,
        schedule: schedule,
        check_url: check_url,
        description: description,
        recipient_list: recipient_list,
        app_id: app_id,
        http_method: http_method,
        response_body_based: response_body_based,
        response_code_based: response_code_based,
        health_check_enabled: health_check_enabled,
      })
    );
    handleCLose();
  };

  // const handleChange = (fieldName, value) => {
  //  setConfig({ ...config, [fieldName]: value});
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteConfig(selectedEnv, id));
  };

  //Handle update
  const handleUpdate = (event) => {
    event.preventDefault();
    // const {
    //     app_id,
    //     app_name,
    //     app_type_id,
    //     description,
    //     health_check_enabled,
    //     env_id,
    //     check_url,
    //     host_id,
    //     http_method,
    //     recipient_list,
    //     response_body_based,
    //     response_code_based,
    //     schedule,
    //   } = config;
    dispatch(
      updateConfig(selectedEnv, {
        appName: inputValues.app_name,
        appTypeId: inputValues.app_type_id,
        envId: inputValues.env_id,
        hostId: inputValues.env_id,
        schedule: inputValues.schedule,
        healthCheckURL: inputValues.schedule,
        description: inputValues.description,
        recipientList: inputValues.recipient_list,
        appId: inputValues.app_id,
        httpMethod: inputValues.http_method,
        responseBodyBased: inputValues.response_body_based,
        responseCodeBased: inputValues.response_code_based,
        enableHealthCheck: inputValues.health_check_enabled,
      })
    );
    handleEditCLose();
  };

  //get config
  useEffect(() => {
    dispatch(getTableConfig(selectedEnv));
  }, []);

  const onChangeEnv = (event) => {
    const value = event.target.value;
    setSelectedEnv(value);
    dispatch(getTableConfig(value));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6} style={{ textAlign: "right" }}></Grid>
        <Grid item xs={12}>
          <div className="flex-v-center">
            <Typography variant="h6"> Config Data</Typography>
            <Typography variant="body1">
              Please select the environment
            </Typography>

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
            <div style={{ flexGrow: 1 }}></div>
            <Button variant="contained" onClick={handleClickOpen}>
              <Add />
              Config
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, width: "100%", overflow: "auto" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <b>App Id</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>App Name</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>AppType Id</b>
                  </TableCell>

                  <TableCell align="left">
                    <b>Env Id</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Host Id</b>
                  </TableCell>
                  <TableCell align="left">
                    <b> Schedule</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Recipient List</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Http Method</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Is Response Body Based</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Is Response Code Based</b>
                  </TableCell>
                  <TableCell align="left">
                    <b> Health Check Enabled</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Health Check URL</b>
                  </TableCell>
                  <TableCell align="left">
                    <b>Description</b>
                  </TableCell>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {configList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row?.app_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {row?.app_id}
                      </TableCell>

                      <TableCell align="left">{row?.app_name} </TableCell>
                      <TableCell align="left">{row?.app_type_id} </TableCell>

                      <TableCell align="left">{row?.env_id} </TableCell>
                      <TableCell align="left">{row?.host_id} </TableCell>
                      <TableCell align="left">{row?.schedule} </TableCell>
                      <TableCell align="left">{row?.recipient_list} </TableCell>
                      <TableCell align="left">{row?.http_method} </TableCell>
                      <TableCell align="left">
                        {row?.response_body_based}{" "}
                      </TableCell>
                      <TableCell align="left">
                        {row?.response_code_based}{" "}
                      </TableCell>
                      <TableCell align="left">
                        {row?.health_check_enabled}{" "}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ wordBreak: "break-all", width: 200 }}>
                          {row?.check_url}{" "}
                        </div>
                      </TableCell>
                      <TableCell align="left">{row?.description} </TableCell>

                      <TableCell align="left">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleClickEditOpen(row)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(row.app_id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={configList.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[0, 5, 10, 20, 40, 60, 80, 100]}
            />
          </TableContainer>
        </Grid>
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
        <DialogTitle>Add Config</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="app_name"
                name="app_name"
                label="Application Name"
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
                id="app-type_id"
                name="app_type_id"
                label="Application Type Id"
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
                id="app_id"
                name="app_id"
                label="Application Id"
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
                id="env_id"
                name="env_id"
                label="Environment Id"
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
                id="host_id"
                name="host_id"
                label=" Host Id"
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
                id="check_url"
                name="check_url"
                label=" Health Check URL"
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
                id="schedule"
                name="schedule"
                label=" Schedule"
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
                id="recipient_list"
                name="recipient_list"
                label=" Recipient List"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Http Method
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="http_method"
                  name="http_method"
                  label="httpMethod"
                  onChange={handleChange}
                >
                  <MenuItem value={"GET"}>GET</MenuItem>
                  <MenuItem value={"POST"}>POST</MenuItem>
                  <MenuItem value={"PUT"}>PUT</MenuItem>
                  <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  <MenuItem value={"HEAD"}>HEAD</MenuItem>
                  <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Response Body Based
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="response_body_based"
                  name="response_body_based"
                  label="responseBodyBased"
                  onChange={handleChange}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Response Code Based
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="response_code_based"
                  name="response_code_based"
                  label="responseCodeBased"
                  onChange={handleChange}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Health Check Required
                </InputLabel>
                <Select
                  defaultValue=""
                  labelId="demo-simple-select-label"
                  id="health_check_enabled"
                  name="health_check_enabled"
                  label="healthCheckRequired"
                  onChange={handleChange}
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label=" Description"
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
        <DialogTitle>Update Config</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="app_name"
                name="app_name"
                label="Application Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.app_name}
                onChange={(e) =>
                  setInputValues({ ...inputValues, app_name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="app_type_id"
                name="app_type_id"
                label="Application Type Id"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.app_type_id}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    app_type_id: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="app_id"
                name="app_id"
                label="Application Id"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.app_id}
                onChange={(e) =>
                  setInputValues({ ...inputValues, app_id: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="env_id"
                name="env_id"
                label="Environment Id"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.env_id}
                onChange={(e) =>
                  setInputValues({ ...inputValues, env_id: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="host_id"
                name="host_id"
                label=" Host Id"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.host_id}
                onChange={(e) =>
                  setInputValues({ ...inputValues, host_id: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="check_url"
                name="check_url"
                label=" Health Check URL"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.check_url}
                onChange={(e) =>
                  setInputValues({ ...inputValues, check_url: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="schedule"
                name="schedule"
                label=" Schedule"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.schedule}
                onChange={(e) =>
                  setInputValues({ ...inputValues, schedule: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="recipient_list"
                name="recipient_list"
                label=" Recipient List"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.recipient_list}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    recipient_list: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Http Method
                </InputLabel>
                <Select
                  defaultValue={inputValues.http_method}
                  labelId="demo-simple-select-label"
                  id="http_method"
                  name="http_method"
                  label="httpMethod"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      http_method: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"GET"}>GET</MenuItem>
                  <MenuItem value={"POST"}>POST</MenuItem>
                  <MenuItem value={"PUT"}>PUT</MenuItem>
                  <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  <MenuItem value={"HEAD"}>HEAD</MenuItem>
                  <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Response Body Based
                </InputLabel>
                <Select
                  defaultValue={inputValues.response_body_based}
                  labelId="demo-simple-select-label"
                  id="response_body_based"
                  name="response_body_based"
                  label="responseBodyBased"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      response_body_based: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Response Code Based
                </InputLabel>
                <Select
                  defaultValue={inputValues.response_code_based}
                  labelId="demo-simple-select-label"
                  id="response_code_based"
                  name="response_code_based"
                  label="responseCodeBased"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      response_code_based: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullwidth
                variant="standard"
                style={{ margin: 7 }}
                required
              >
                <InputLabel id="demo-simple-select-label">
                  Health Check Required
                </InputLabel>
                <Select
                  defaultValue={inputValues.health_check_enabled}
                  labelId="demo-simple-select-label"
                  id="health_check_enabled"
                  name="health_check_enabled"
                  label="healthCheckRequired"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      health_check_enabled: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label=" Description"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={inputValues.description}
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

export default ConfigTable;
