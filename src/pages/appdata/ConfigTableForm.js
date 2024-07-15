import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  app_name: yup.string().required("Required"),
  http_method: yup.string().required(),
  // email: Yup.string().email('Invalid email').required('Required'),
});

export default function ConfigTableForm({
  open,
  handleCLose,
  objConfig,
  handleSubmit,
}) {
  const formik = useFormik({
    initialValues: {
      app_name: objConfig?.app_name || "",
      http_method: objConfig?.http_method || "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      handleSubmit(values);
    },
    validationSchema: SignupSchema,
  });

  return (
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
        <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.app_name}
                onChange={formik.handleChange}
                error={!!formik.errors.app_name}
                helperText={formik.errors.app_name}
              />
            </Grid>
            {/* 
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

        */}
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
                  value={formik.values.http_method}
                  onChange={formik.handleChange}
                  error={!!formik.errors.http_method}
                  labelId="demo-simple-select-label"
                  id="http_method"
                  name="http_method"
                  label="httpMethod"
                  fullWidth
                >
                  <MenuItem value={"GET"}>GET</MenuItem>
                  <MenuItem value={"POST"}>POST</MenuItem>
                  <MenuItem value={"PUT"}>PUT</MenuItem>
                  <MenuItem value={"DELETE"}>DELETE</MenuItem>
                  <MenuItem value={"HEAD"}>HEAD</MenuItem>
                  <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                </Select>
                {formik.errors.http_method && (
                  <FormHelperText error={!!formik.errors.http_method}>
                    {formik.errors.http_method}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/*
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
          </Grid> */}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCLose}>Cancel</Button>
        <Button type="button" onClick={formik.handleSubmit}>
          {objConfig ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
