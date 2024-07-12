import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
// import ArgonTypography from "components/ArgonTypography";

// Gurash Dahboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import axios from "axios";
import { isLoading, openSnackbar } from "../../redux/action/defaultActions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {
  const actionDispatcher = useDispatch();
  const [data, setData] = useState({});
  // ****************************Get AdminDetails Section*********************************
  const getProfileDetails = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/profile`);
      setData(res?.data?.adminData);
      // console.log("DetailsAdmin==>", res?.data?.adminData);
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.log("error===>", error);
    }
  };
  // ****************************************************************************************
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header />
      <ArgonBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="profile information"
              // description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: `${data.name}`,
                mobile: `${data?.phone}`,
                email: `${data?.email}`,
                Role: `${data?.role}`,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Overview;
