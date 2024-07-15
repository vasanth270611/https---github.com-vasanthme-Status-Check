import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";

const HealthStatus = ({ data, enableDisable }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <b>Application Name</b>
            </TableCell>
            <TableCell align="left">
              <b>Host Name</b>
            </TableCell>
            <TableCell align="left">
              <b>Environment</b>
            </TableCell>
            <TableCell align="left">
              <b>Current Status</b>
            </TableCell>
            <TableCell align="left">
              <b>Current Status TS</b>
            </TableCell>
            <TableCell align="left">
              <b>Previous Status</b>
            </TableCell>
            <TableCell align="left">
              <b>Previous Status TS</b>
            </TableCell>
            <TableCell>
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow
                key={row?.appname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row?.appname}
                </TableCell>
                <TableCell align="center">{row?.hostname} </TableCell>

                <TableCell align="center">{row?.env} </TableCell>
                <TableCell align="center">{row?.curstatus} </TableCell>
                <TableCell align="center">{row?.curtime} </TableCell>
                <TableCell align="center">{row?.prevstatus} </TableCell>
                <TableCell align="center">{row?.prevtime} </TableCell>
                <TableCell align="left">
                  <Button
                    value="enable"
                    variant="contained"
                    disabled={row?.healthcheckstatus === "Yes"}
                    onClick={() => enableDisable(row?.appname, row?.env, "Yes")}
                  >
                    {" "}
                    Enable{" "}
                  </Button>
                  <Button
                    value="disable"
                    variant="contained"
                    disabled={row?.healthcheckstatus === "No"}
                    onClick={() => enableDisable(row?.appname, row?.env, "No")}
                  >
                    {" "}
                    Disable{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data?.length ? (
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[0, 5, 10, 20, 40, 60, 80, 100]}
        />
      ) : (
        <div>No Data Available</div>
      )}
    </TableContainer>
  );
};

export default HealthStatus;
