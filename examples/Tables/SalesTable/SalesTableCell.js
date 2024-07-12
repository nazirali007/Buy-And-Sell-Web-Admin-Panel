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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";

// Gurash Dahboard MUI components
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <ArgonBox display="flex" alignItems="center" width="max-content">
          <ArgonBox
            component="img"
            src={image}
            alt={content}
            width="2rem"
            height="auto"
            sx={{ borderRadious: "5px" }}
          />{" "}
          <ArgonBox display="flex" flexDirection="column" ml={3}>
            <ArgonTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </ArgonTypography>
            <ArgonTypography variant="button" fontWeight="medium" fontSize="12px">
              {content}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="left" sx={{ border: noBorder && 0 }}>
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
            fontSize="12px"
          >
            {title}:
          </ArgonTypography>
          <ArgonTypography variant="button" fontWeight="medium" fontSize="12px">
            {content}
          </ArgonTypography>
        </ArgonBox>
      </TableCell>
    );
  }

  return template;
}

// Setting default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default SalesTableCell;
