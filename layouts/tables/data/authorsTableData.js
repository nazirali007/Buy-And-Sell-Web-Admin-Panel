/* eslint-disable react/prop-types */
// Gurash Dahboard MUI components
import React, { useEffect } from "react";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

// Images

import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Box, Switch } from "@mui/material";
import SingleUserDetails from "../../../components/AdminSection/UserDetails/SingleUserDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUserModal from "components/AdminSection/UserDetails/DeleteUserModal";

function Author({ image, name, email, data }) {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
    setTransaction(!transaction);
  };
  return (
    <>
      <ArgonBox
        display="flex"
        alignItems="center"
        px={1}
        py={0.5}
        onClick={handleOpen}
        sx={{ cursor: "pointer" }}
      >
        <ArgonBox mr={2}>
          <ArgonAvatar src={image} alt={name} size="md" variant="rounded" bgColor={"light"} />
        </ArgonBox>
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="button" fontWeight="medium">
            {name}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary">
            {email}
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
      {open && (
        <SingleUserDetails
          open={open}
          handleOpen={handleOpen}
          userId={data?._id}
          transaction={transaction}
        />
      )}
    </>
  );
}

function Function({ job }) {
  return (
    <>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="caption" fontWeight="medium" color="text">
          {job}
        </ArgonTypography>
      </ArgonBox>
    </>
  );
}
// ****************************************************************************************
const Type = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      {data?.businessProfile === null ? (
        "---"
      ) : (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
          onClick={() => navigate(`/businessProfile/${data?._id}`)}
        >
          <ArgonBadge
            variant="gradient"
            badgeContent="Business"
            color="success"
            size="xs"
            container
            cursor="pointer"
          />
        </ArgonTypography>
      )}

      {/*  */}
    </>
  );
};

// ****************************All USER Details Section*********************************
const getUserData = async (page, rowsPerPage, search) => {
  try {
    const res = await axios.get(
      `/api/v1/admin/get/all/users?limitPerPage=${rowsPerPage}&pageNo=${page + 1}&search=${search}`
    );
    // console.log("allUsers===>", res?.data);
    return {
      data: res.data.allUsers,
      noOfUsers: res.data.noOfUsers,
      noOfPages: res.data.noOfPages,
    };
  } catch (error) {
    console.log("error===>", error);
  }
};
// ****************************************************************************************

const Action = ({ data }) => {
  // const [open, setOpen] = useState(false);
  // const anchorRef = React.useRef(null);
  const actionDispatcher = useDispatch();
  const [checked, setChecked] = useState(true);
  const [dleopen, setDleOpen] = React.useState(false);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // ****************************Block And Unblock Section*********************************
  const getUserDataWithStatus = async (block) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.put(`/api/v1/admin/block/user/${data?._id}`, { block });
      actionDispatcher(openSnackbar(res?.data?.message, "success"));
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      console.log("error===>", error);
    }
  };
  // ****************************************************************************************
  // ****************************Block UserSet state Details Section*********************************

  const handleChange = (event) => {
    setChecked(!event.target.checked);
    getUserDataWithStatus(!event.target.checked);
    // console.log("======changeDelete", event, "value===>", value);
  };
  const getStatusBlocked = (data) => {
    const isChecked = data?.blocked;
    setChecked(isChecked); // Toggle the checked state
  };
  // ****************************************************************************************

  // ****************************Block UserSet state Details Section*********************************
  const handleOpen = () => setDleOpen(!dleopen);
  // ****************************************************************************************

  useEffect(() => {
    getStatusBlocked(data);
  }, []);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box>
          <Switch
            checked={!checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: checked ? "#38e070 !important" : "#eb1e1e !important",
              },
            }}
          />
        </Box>
        <Box>
          <DeleteIcon
            cursor={"pointer"}
            color="error"
            fontSize="medium"
            onClick={() => {
              setDleOpen(true);
            }}
          />
          <DeleteUserModal dleModal={dleopen} handleDelete={handleOpen} id={data?._id} />
        </Box>
      </Box>
    </>
  );
};

const authorsTableData = async (page, rowsPerPage, search) => {
  const { data = {}, noOfUsers, noOfPages } = await getUserData(page, rowsPerPage, search);

  return {
    columns: [
      { name: "author", align: "left" },
      { name: "Unique Id", align: "left" },
      { name: "Contact", align: "left" },
      { name: "Created At", align: "center" },
      { name: "Business Profile", align: "center" },
      { name: "Status", align: "center" },
    ],
    rows: data?.map((v) => ({
      author: <Author image={v?.image?.imageUrl} name={v?.userName} email={v?.email} data={v} />,
      "Unique Id": (<ArgonTypography variant="caption" color="secondary" fontWeight="medium">
        {v?.
          uniqueId
        }
      </ArgonTypography>),
      Contact: (
        <Function
          job={v?.countryCode + v?.contactNo}
        //  org="Organization"
        />
      ),

      "Created At": (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {dayjs(v?.createdAt).format("DD/MM/YY")}
        </ArgonTypography>
      ),
      "Business Profile": <Type data={v} />,
      Status: <Action data={v} />,
    })),
    noOfPages: noOfPages,
    noOfUsers: noOfUsers,
  };
};

export default authorsTableData;
