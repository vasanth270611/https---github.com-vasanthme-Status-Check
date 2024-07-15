import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import { Box, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ExpandMore } from "@mui/icons-material";

const Menu = () => {
  return (
    <Stack gap={1} className="menu">
      <CollapseContainer
        title={
          <Stack alignItems="center" direction="row" gap={0.5}>
            <HomeOutlinedIcon />
            <Typography variant="body1">Home</Typography>
          </Stack>
        }
      >
        <Link to="/dashboard">
          <Typography variant="body1" className="menu-sub-item">
            Dashboard
          </Typography>
        </Link>
      </CollapseContainer>

      <CollapseContainer
        title={
          <Stack alignItems="center" direction={"row"} flex gap={0.5}>
            <StorageOutlinedIcon />
            <Typography variant="body1">Environment Status</Typography>
          </Stack>
        }
      >
        <Link to="/dev">
          <Typography variant="body1" className="menu-sub-item">
            DEV
          </Typography>
        </Link>
        <Link to="/sit">
          <Typography variant="body1" className="menu-sub-item">
            SIT
          </Typography>
        </Link>
        <Link to="/qa">
          <Typography variant="body1" className="menu-sub-item">
            QA
          </Typography>
        </Link>
        <Link to="/prod">
          <Typography variant="body1" className="menu-sub-item">
            PROD
          </Typography>
        </Link>
      </CollapseContainer>

      <CollapseContainer
        title={
          <Stack alignItems="center" direction="row" gap={0.5}>
            <SettingsOutlinedIcon />
            <Typography variant="body1">Application Data</Typography>
          </Stack>
        }
      >
        <Link to="/config">
          <Typography variant="body1" className="menu-sub-item">
            Configuration
          </Typography>
        </Link>
        <Link to="/apptype">
          <Typography variant="body1" className="menu-sub-item">
            App Type
          </Typography>
        </Link>
        <Link to="/environment">
          <Typography variant="body1" className="menu-sub-item">
            Environment
          </Typography>
        </Link>
        <Link to="/host">
          <Typography variant="body1" className="menu-sub-item">
            host
          </Typography>
        </Link>
        <Link to="/recipient">
          <Typography variant="body1" className="menu-sub-item">
            Recipient
          </Typography>
        </Link>
      </CollapseContainer>
    </Stack>
  );
};

export default Menu;

function CollapseContainer({ title, children }) {
  let [open, setOpen] = useState(false);
  return (
    <div>
      <Box
        className="flex-v-center"
        style={{
          background: "#DDDDDD",
          border: "1px solid grey",
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          padding: 5,
          fontSize: 15,
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {title}
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Collapse in={open}>
        <Box>{children}</Box>
      </Collapse>
    </div>
  );
}
