import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailabilityPercent } from "../../store/action";
import { makeAvailabilitySummary } from "../../store/action/availabilityPercentage";
//import AvailibilityDetailDialog from "./AvailibilityDetailDialog";
import { useNavigate } from "react-router-dom";
import AvalibilityPieChart from "./AvalibilityPieChart";

function Dashboard() {
  const dispatch = useDispatch();
  const [selectedEnv, setSelectedEnv] = useState("");

  const navigate = useNavigate();
  //  const [currentRow, setCurrentRow] = useState(undefined);

  const availabilityPercentList = useSelector((state) =>
    makeAvailabilitySummary(
      state.availabilityPercentage.availabilityPercentages
    )
  );

  const onChangeEnv = (event) => {
    const value = event.target.value;
    setSelectedEnv(value);
    console.log(value);
    dispatch(getAvailabilityPercent(value));
  };

  const handleRowClick = (params) => {
    console.log(`"${params.row.app_id}" clicked`);
    navigate(`/dashboard/applicationdetails?app_id=${params.row.app_id}`);
  };

  const columns = [
    {
      field: "app",
      headerName: "App Name",
      flex: 1,
      // renderCell: (params) => {
      //   return (
      //     <div
      //       onClick={() => {
      //         // Open dialog here

      //         setCurrentRow(params.row);
      //       }}
      //     >
      //       {params.value}
      //     </div>
      //   );
      // },
    },
    { field: "env", headerName: "Env", width: 100 },
    // { field: "month", headerName: "Month", flex: 1 },
    {
      field: "availability_percentage",
      headerName: "Availability",
      flex: 1,
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12} className="flex-v-center">
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
        {selectedEnv && (
          <>
            <Grid item xs={12} md={8}>
              <Box sx={{ width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row.app_id + row.month}
                  rows={availabilityPercentList || []}
                  columns={columns}
                  onRowClick={handleRowClick}
                  autoHeight
                  slots={{
                    toolbar: CustomToolBar,
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 15, 20, 25]}
                  disableRowSelectionOnClick
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <AvalibilityPieChart avalibalityList={availabilityPercentList} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default Dashboard;

export function CustomToolBar() {
  return (
    <GridToolbarContainer style={{ display: "flex", justifyContent: "end" }}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
