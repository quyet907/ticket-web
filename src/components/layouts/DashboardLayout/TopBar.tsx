import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "../../../theme/Logo";
// import Logo from "src/components/Logo";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor : "#00ee33"
  },
  avatar: {
    width: 60,
    height: 60,
  },
}));

type Props = {
  className?: string;
  onMobileNavOpen?(): void;
  // ...rest?: any
};

const TopBar: FC<Props> = (props) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root, props.className)} elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
          {/* <Typography>Logo</Typography> */}
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={props.onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
