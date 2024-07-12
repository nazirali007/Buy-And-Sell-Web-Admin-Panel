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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";

// Custom styles for the sidenavItem
import { item, itemIcon, itemText, itemIconBox } from "examples/Sidenav/styles/sidenavItem";

// Gurash Dahboard MUI context
import { useArgonController } from "context";
import { List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function SidenavItem({ icon, name, active, childrens, parentPath, ...rest }) {
  const [controller] = useArgonController();
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(active);
  const [activeChild, setActiveChild] = useState(null);

  const url = window.location.href.split("/");
  const childRoute = url[url.length - 1];

  const handleClick = (e) => {
    setOpen(!open);
    setActiveChild(null); // Reset active child when opening the parent
  };

  const handleChildClick = (index) => {
    setIsActive(false); // Deactivate parent when a child is clicked
    setActiveChild(index);
  };
  const { miniSidenav, darkSidenav, sidenavColor } = controller;

  if (childrens && childrens.length > 0) {
    return (
      <>
        <ListItem component="li" onClick={handleClick} button={!parentPath}>
          <ArgonBox {...rest} sx={(theme) => item(theme, { active: isActive })}>
            <ListItemIcon sx={(theme) => itemIconBox(theme, { active: isActive })}>
              {typeof icon === "string" ? (
                <Icon sx={(theme) => itemIcon(theme, { active: isActive })}>{icon}</Icon>
              ) : (
                icon
              )}
            </ListItemIcon>

            <ListItemText
              primary={name}
              color="secondary !important"
              sx={(theme) => itemText(theme, { active: isActive })}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ArgonBox>
        </ListItem>
        {childrens?.map((child, index) => {
          return (
            <Collapse in={open} timeout="auto" unmountOnExit key={index}>
              <List component="div" sx={{ paddingX: "1rem" }}>
                <ListItemButton
                  onClick={() => handleChildClick(index)}
                  selected={childRoute === child.route.replace("/", "")}
                  component={Link}
                  to={`${name.replaceAll(" ", "")}${child?.route}`}
                  sx={{
                    bgcolor: childRoute === child.route ? "#636362" : "#ffffff",
                    color: "#636362",
                    pl: 4,
                  }}
                >
                  <ListItemIcon sx={{ pl: 4 }}>{child?.icon}</ListItemIcon>
                  <ListItemText
                    primary={child?.name}
                    sx={(theme) => itemText(theme, { miniSidenav, darkSidenav, active })}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <ListItem component="li" onClick={handleClick}>
          <ArgonBox sx={(theme) => item(theme, { active })}>
            <ListItemIcon sx={(theme) => itemIconBox(theme, { active })}>
              {typeof icon === "string" ? (
                <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
              ) : (
                icon
              )}
            </ListItemIcon>
            <ListItemText primary={name} sx={(theme) => itemText(theme, { active })} />
          </ArgonBox>
        </ListItem>
      </>
    );
  }
}

// Setting default values for the props of SidenavItem
SidenavItem.defaultProps = {
  color: "info",
  active: false,
  open: false,
};

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  childrens: PropTypes.any,
  parentPath: PropTypes.any,
};

export default SidenavItem;
