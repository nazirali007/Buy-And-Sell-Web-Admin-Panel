/**
=========================================================
* Gurash Dahboard MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);
  function isMongoId(str) {
    // Regular expression to match a MongoDB ObjectId
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    // Test the string against the pattern
    return objectIdPattern.test(str);
  }
  return (
    <ArgonBox
      mr={{ xs: 0, xl: 8 }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/dashboard">
          <ArgonTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon sx={{ marginRight: "1rem" }}>{icon}</Icon>
          </ArgonTypography>
        </Link>

        {/* {routes.map((el) => (
          // <Link to={`/${el}`} key={el}>
          <ArgonTypography
            key={el}
            component="span"
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            {el}
          </ArgonTypography>
          // </Link>
        ))} */}
        {/* <ArgonTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </ArgonTypography> */}
      </MuiBreadcrumbs>
      {/* {!isMongoId(title) && (
        <ArgonTypography
          fontWeight="bold"
          textTransform="capitalize"
          variant="h6"
          color={light ? "white" : "dark"}
          noWrap
        >
          {title.replace("-", " ")}
        </ArgonTypography>
      )} */}
    </ArgonBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
