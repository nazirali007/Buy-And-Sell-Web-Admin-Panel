/**
=========================================================
* Gurash Dashboard 2 MUI - v3.0.1
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import { Box, Card, Grid, Input } from "@mui/material";
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

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (type, e) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  // *********************************************************

  // ***********************  Api Reset Section  ***********************************
  const authentication = async (e) => {
    actionDispatcher(isLoading(true));

    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/admin/forgot/password`, { email });
      // console.log("resReset====>", res);
      actionDispatcher(isLoading(false));
      if (res?.data?.success === true) {
        actionDispatcher(openSnackbar(res?.data?.message, "success"));
        setEmail("");
        // navigate("/authentication/sign-in");
      }
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
      // console.log("error", error?.response?.data?.message);
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  // *********************************************************

  return (
    <CoverLayout
      //   title="Welcome!"
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
          <ArgonTypography variant="h6" fontWeight="medium">
            Enter your email
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={authentication}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <ArgonInput
                  type="email"
                  placeholder="Email"
                  onChange={(event) => {
                    handleChange("email", event);
                  }}
                />
              </Grid>
            </Grid>

            <ArgonBox mt={2} mb={1}>
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
