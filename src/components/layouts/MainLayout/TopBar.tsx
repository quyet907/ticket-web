import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
// import Logo from 'src/components/Logo';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

type Props = {
  className?: string;
//   ...rest?: any
};

const TopBar = (props: Props) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, props.className)}
      elevation={0}
    //   {...props.rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          {/* <Logo /> */}
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};



export default TopBar;
