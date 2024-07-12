/**
=========================================================
* Gurash Dashboard 2 MUI - v3.0.1
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, Grid, } from "@mui/material";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import axios from "axios";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImg from "../../../assets/images/Banner.png";
import bgLogo from "../../../assets/images/AppLogo.png";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Illustration() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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

  // ***********************  Api SignIn Section  ***********************************
  const authentication = async (e) => {
    actionDispatcher(isLoading(true));
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/admin/logIn`, { email, password });
      // console.log("catch me pahuncho===>", res);
      if (res?.data?.status === "success") {
        actionDispatcher(openSnackbar("logged in Successfully", "success"));
        localStorage.setItem("admin", JSON.stringify({ isLoggedIn: true, isAuthenticated: true }))
        navigate("/dashboard", { replace: true });
      }
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  // *********************************************************
  // ***********************Eye Section Password *****************************
  const togglePassword = () => {
    if (password === "password") {
      return setPassword("text")
    }
    setPassword("password");
  };
  // *************************************************************************

  // useEffect(() => {}, []);

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
          <img style={{ maxHeight: "4rem", maxWidth: "4rem" }} src={bgLogo} alt="logo" />
        </Box>

        <ArgonBox my={1} textAlign="center">
          {/* <ArgonTypography variant="h3" fontWeight="medium">
            Gurash
          </ArgonTypography> */}
          <ArgonTypography variant="h3" fontWeight="large" sx={{ color: "black" }}>
            Sign In
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox pt={2} pb={3}>
          <ArgonBox component="form" role="form" onSubmit={authentication}>
            <Grid container px={3}>
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

            <Grid container px={3}>
              <Grid item xs={12} sm={12} md={12}>
                <ArgonButton variant="gradient" color="success" fullWidth type="submit">
                  Submit
                </ArgonButton>
              </Grid>
            </Grid>

            <ArgonBox mt={2} textAlign="center">
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                <ArgonTypography
                  component={Link}
                  to="/authentication/reset-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                >
                  Forget Password ?
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>

            {/* <ArgonBox mt={2} display={"flex"} justifyContent={"center"}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign up
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox> */}
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Illustration;
