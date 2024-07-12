import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ArgonButton from "components/ArgonButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadious: "2px",
  boxShadow: 24,
  p: 4,
};

export default function MenuBar({ setAnchorEl, anchorEl }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [openLog, setOpenLog] = useState(false);
  const open = Boolean(anchorEl);

  const handleNavigate = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // *******************************************************************************************************

  const handleOpenLog = () => setOpenLog(!openLog);

  // ****************************Admin Logout Section*********************************

  const handleLogout = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.post(`/api/v1/admin/logout`);
      if (res?.data?.success === true) {
        actionDispatcher(isLoading(false));
        localStorage.removeItem("admin")
        navigate("/authentication/sign-in", { replace: true });
        actionDispatcher(openSnackbar(res?.data?.message, "success"));
        handleOpenLog();
      }
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.log("error===>", error);
    }
  };

  // ****************************************************************************************

  return (
    <Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleNavigate}>
          <AccountCircleIcon /> &nbsp; Profile
        </MenuItem>
        <MenuItem onClick={handleOpenLog}>
          <LogoutIcon sx={{ fontSize: "large", color: "red" }} />
          &nbsp; Logout
        </MenuItem>
      </Menu>

      <Modal
        open={openLog}
        onClose={handleOpenLog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={2}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Logout
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: "" }}>
            Are you sure to want to logout ?
          </Typography>
          <Box display={"flex"} justifyContent={"center"} alignContent={"center"}>
            <ArgonButton
              variant="gradient"
              color="success"
              sx={{ margin: "1rem" }}
              onClick={handleLogout}
            >
              Yes
            </ArgonButton>
            <ArgonButton
              variant="gradient"
              color="success"
              sx={{ margin: "1rem" }}
              onClick={handleOpenLog}
            >
              No
            </ArgonButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
// Typechecking props for the DashboardNavbar
MenuBar.propTypes = {
  anchorEl: PropTypes.bool,
  setAnchorEl: PropTypes.any,
  handleLogout: PropTypes.func,
};
