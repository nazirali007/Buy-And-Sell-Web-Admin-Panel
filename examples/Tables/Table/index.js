import { useMemo, useState, useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable, TableCell, TablePagination } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";

// Gurash Dahboard MUI base styles
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({
  columns,
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  noOfPages,
  noOfUsers,
}) {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  // console.log("row====>", rows, "column====>", columns);

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <ArgonBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
      >
        {name.toUpperCase()}
      </ArgonBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <ArgonBox
            key={uuidv4()}
            component="td"
            p={1}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <ArgonBox display="flex" alignItems="center" py={0.5} px={1}>
              <ArgonBox mr={2}>
                <ArgonAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </ArgonBox>
              <ArgonTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        );
      } else {
        template = (
          <ArgonBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            // verticalAlign={"center"}
            lineHeight={0.65}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </ArgonTypography>
          </ArgonBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });
  useEffect(() => {}, [rowsPerPage, page]);

  return useMemo(
    () => (
      <>
        <TableContainer>
          <MuiTable>
            <ArgonBox component="thead">
              <TableRow>{renderColumns}</TableRow>
            </ArgonBox>
            <TableBody>{renderRows}</TableBody>

            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
              component="td"
              count={noOfUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                style: {
                  minWidth: "60px",
                  maxWidth: "60px",
                  textAlign: "center",
                  outline: "none",
                  border: "none",
                },
              }}
              // page={1}
              // sx={{
              //   "& .css-1ckbrvj-MuiInputBase-root-MuiTablePagination-select": {
              //     minWidth: "60px !important",
              //     maxWidth: "60px !important",
              //     textAlign: "center",
              //     outline: "none",
              //     border: "none",
              //   },
              // }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </MuiTable>
        </TableContainer>
      </>
    ),
    [columns, rows, rowsPerPage, page]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
