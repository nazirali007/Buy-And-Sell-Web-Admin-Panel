import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Gurash Dahboard MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Gurash Dahboard MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import "./ProfilePicture.css"; // Import your CSS file
import { Box, Button, Icon, Stack } from "@mui/material";
import axios from "axios";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import { useDispatch } from "react-redux";

function Header() {
  const actionDispatcher = useDispatch();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const [tabValue, setTabValue] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");
  const [data, setData] = useState("");
  const [profile, setProfile] = useState(""); // Initial picture source

  // ***********************  Stored Value inside state  ***********************************

  const handleChange = (e) => {
    setProfile(e.target.files[0]);
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };
  // *********************************************************

  //   // ************************** Handle Submit Add category here  *******************************

  const handleFormSubmit = async (event) => {
    // console.log("profilePic", profile);
    actionDispatcher(isLoading(true));
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", profile);
      // console.log("profilePicture", profile);

      const response = await axios.put("/api/v1/admin/Update/profile/pic", formData);
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(response?.data?.message, "success"));
      console.log("Category updated successfully:", response.data);
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.error("Error uploading image:", error);
    }
  };
  //   // **************************************************************************************

  // ****************************Get AdminDetails Section*********************************
  const getProfileDetails = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/profile`);
      // console.log("DetailsAdmin==>", res?.data?.adminData);
      setData(res?.data?.adminData);
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.log("error===>", error);
    }
  };
  // ****************************************************************************************

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    getProfileDetails();
    setProfilePicture(data?.image?.imageUrl);

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  // const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <ArgonBox position="relative">
      <DashboardNavbar absolute light />
      <ArgonBox height="220px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid container spacing={3} alignItems="center" className="containerProfile">
          <Grid
            item
            className="background-imageProfile"
            sx={{ width: "10rem", height: "10rem", marginBottom: "2.5rem" }}
          >
            <Stack variant="body2" color="secondary" className="icon">
              <Box id="EditPenContainer" component={"label"} htmlFor="maibhihun">
                <Icon>edit</Icon>
                <input
                  type="file"
                  name="kuchto"
                  placeholder="hey how are you"
                  id="maibhihun"
                  style={{ display: "none" }}
                  onChange={handleChange}
                // onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))}
                />
              </Box>
            </Stack>
            <ArgonAvatar
              className="avatarProfile"
              src={profile ? profilePicture : data?.image?.imageUrl} // Use the current profile picture from state
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                {data?.name}
              </ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                {data?.role}
              </ArgonTypography>
            </ArgonBox>
          </Grid>
          <Grid item>
            {profilePicture && (
              <Button
                variant="contained"
                sx={{ color: "white !important", size: "small" }}
                onClick={(e) => handleFormSubmit(e)}
              >
                Update
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </ArgonBox>
  );
}

export default Header;

// 1:Privacy and policy section  added with ck editor functionality
// 2:Terms and conditions added ck editor
// 3:Ck editor add image functionality
// 4:Edit admin profile section
