/**
=========================================================
* Gurash Dashboard 2 MUI - v3.0.1
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// @mui material components
import { Box, Card, Grid } from "@mui/material";
import Switch from "@mui/material/Switch";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Images
import bgImg from "../../../assets/images/Banner.png";
import bgLogo from "../../../assets/images/AppLogo.png";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";

function Illustration() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const actionDispatcher = useDispatch();
  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (type, e) => {
    if (type === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };
  // *********************************************************

  // *********************** match input BOX value  ***********************************

  const matchPassword = (e) => {
    e.preventDefault();
    console.log("====>matchpassword", password, confirmPassword, "diikat kr rhra thaaa", token);

    {
      password === confirmPassword
        ? authentication()
        : actionDispatcher(openSnackbar("Password does not match", "error"));
    }
  };
  // *********************************************************

  // ***********************  Api Forget  Section  ***********************************
  const authentication = async () => {
    actionDispatcher(isLoading(true));
    // console.log("====>password", password);
    try {
      const res = await axios.patch(`/api/v1/admin/reset/password/${token}`, {
        password,
      });
      if (res?.data?.success === true) {
        navigate("/authentication/sign-in");
      }
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(res?.data?.message, "success"));
    } catch (error) {
      dispatch(isLoading(false));
      console.log("error", error);
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  // *********************************************************

  return (
    <CoverLayout
      // title="Welcome!"
      // description="Use these awesome forms to login or create new account in your project for free."
      image={bgImg}
      // imgPosition="botttom"
    >
      <Card className="card">
        <Box
          sx={{
            minHeight: "1rem",
            minWidth: "1rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <img style={{ maxHeight: "4rem", maxWidth: "4rem" }} src={bgLogo} alt="" />
        </Box>

        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Forgot Password
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={matchPassword}>
            <Grid container px={3} py={2}>
              <Grid item xs={12} sm={12} md={12}>
                <ArgonInput
                  type={"password"}
                  placeholder="Password"
                  onChange={(event) => {
                    handleChange("password", event);
                  }}
                />
              </Grid>
            </Grid>
            <Grid container px={3} py={2}>
              <Grid item xs={12} sm={12} md={12}>
                <ArgonInput
                  type={"password"}
                  placeholder="Confirm Password"
                  onChange={(event) => {
                    handleChange("ConfirmPassword", event);
                  }}
                />
              </Grid>
            </Grid>

            <ArgonBox mt={1} mb={1}>
              <ArgonButton variant="gradient" color="success" fullWidth type="submit">
                Submit
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Illustration;
