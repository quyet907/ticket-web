import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
	AppBar,
	Badge,
	Box,
	Hidden,
	IconButton,
	Toolbar,
	makeStyles,
	Typography,
	Menu,
	MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "../../../theme/Logo";
// import Logo from "src/components/Logo";

const useStyles = makeStyles((theme) => ({
	root: {
		// backgroundColor: theme.palette.primary.main,
		// height: 50
	},
	avatar: {
		width: 50,
		height: 50,
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

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
					<IconButton
						aria-controls="simple-menu"
						aria-haspopup="true"
						color="inherit"
						onClick={(e) => {
							props.onMobileNavOpen && props.onMobileNavOpen();
							handleClick(e);
						}}
					>
						<MenuIcon />
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
