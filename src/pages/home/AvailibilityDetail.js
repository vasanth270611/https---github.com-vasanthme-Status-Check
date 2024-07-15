import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { CustomToolBar } from "./Dashboard";

export default function AvailibilityDetail({ app_id }) {
  const availabilityPercentList = useSelector((state) =>
    state.availabilityPercentage.availabilityPercentages?.filter(
      (item) => item.app_id === app_id
    )
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        columns={[
          {
            field: "app",
            headerName: "App Name",
            flex: 1,
          },
          { field: "env", headerName: "Env", width: 100 },
          {
            field: "month",
            headerName: "Month",
            flex: 1,
            valueFormatter: (value) =>
              new Date(value).toLocaleDateString("en-En", {
                year: "numeric",
                month: "long",
              }),
          },
          {
            field: "availability_percentage",
            headerName: "Availability",
            flex: 1,
          },
        ]}
        getRowId={(row) => row.app_id + row.month}
        rows={availabilityPercentList || []}
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
        //disableRowSelectionOnClick
      />
    </Box>
  );
}
