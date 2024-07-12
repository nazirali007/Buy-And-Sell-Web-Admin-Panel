import { Box, Button, CardContent, Grid } from "@mui/material";
import React, { useState } from "react";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ArgonInput from "components/ArgonInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  padding: 4,
};
const ProfileEditModal = ({ handleOpen, open }) => {
  const actionDispatcher = useDispatch();
  // const [subCategory, setSubCategory] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  //   // ************************** SHandle Submit Add category here  *******************************

  const handleFormSubmit = async (event) => {
    actionDispatcher(isLoading(true));
    event.preventDefault();

    try {
      const response = await axios.put("/api/v1/admin/Update/admin", { name, email, phone });
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(response?.data?.message, "success"));
      handleOpen();
      window.location.reload();
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.error("Error uploading image:", error);
    }
  };
  //   // **************************************************************************************

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container px={"1.5rem"}>
            <Grid item xs={6} sm={6}>
              <Typography variant="h5">Edit Profile</Typography>
            </Grid>
            <Grid item xs={6} sm={6} textAlign={"end"}>
              <CloseIcon
                sx={{
                  border: "1px solid grey",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              />
            </Grid>
          </Grid>
          <CardContent display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Name</Typography>
                  <ArgonInput
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography variant="h6"> Email</Typography>
                  <ArgonInput
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Contact-No</Typography>
                  <ArgonInput
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    placeholder="Enter Your Number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12} textAlign={"end"}>
                  <Button
                    type="submit"
                    variant="contained"
                    bgcolor="#4bcfde"
                    sx={{ color: "white !important" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Box>
      </Modal>
    </Box>
  );
};
ProfileEditModal.propTypes = {
  //   title: PropTypes.string.isRequired,
  handleOpen: PropTypes.func,
  setOpen: PropTypes.bool,
  open: PropTypes.bool,
};

export default ProfileEditModal;
