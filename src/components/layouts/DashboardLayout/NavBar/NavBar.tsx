import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	Hidden,
	List,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { AlertCircle, BarChart, Bookmark, Lock, Map, MapPin, Settings, Truck, UserPlus, Users } from "react-feather";
import NavItem from "./NavItem";

const user = {
	avatar: "/static/images/avatars/avatar_6.png",
	jobTitle: "Senior Developer",
	name: "Katarina Smith",
};

const items = [
	{
		href: "/dashboard",
		icon: BarChart,
		title: "Thống kê",
	},
	{
		href: "/positions",
		icon: Users,
		title: "Chức vụ",
	},
	{
		href: "/staffs",
		icon: Users,
		title: "Nhân viên",
	},
	{
		href: "/trips",
		icon: MapPin,
		title: "Chuyến đi",
	},
	{
		href: "/round",
		icon: Map,
		title: "Lộ trình",
	},
	{
		href: "/settings",
		icon: Truck,
		title: "Xe",
	},
	{
		href: "/login",
		icon: Lock,
		title: "Login",
	},
	{
		href: "/register",
		icon: Bookmark,
		title: "Bán vé",
	},
	{
		href: "/404",
		icon: AlertCircle,
		title: "Error",
	},
];

const useStyles = makeStyles(() => ({
	mobileDrawer: {
		width: 256,
	},
	desktopDrawer: {
		width: 256,
		top: 64,
		height: "calc(100% - 64px)",
	},
	avatar: {
		cursor: "pointer",
		width: 64,
		height: 64,
	},
}));

type Props = {
	onMobileClose(): void;
	openMobile: boolean;
};

const NavBar = (props: Props) => {
	const classes = useStyles();
	const location = useLocation();

	useEffect(() => {
		if (props.openMobile && props.onMobileClose()) {
			props.onMobileClose();
		}
	}, [location.pathname, props]);

	const content = (
		<Box height="100%" display="flex" flexDirection="column">
			<Box alignItems="center" display="flex" flexDirection="column" p={2}>
				<Avatar
					className={classes.avatar}
					component={RouterLink}
					src={user.avatar}
					to="/app/account"
				/>
				<Typography color="textPrimary" variant="h5">
					{user.name}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{user.jobTitle}
				</Typography>
			</Box>
			<Divider />
			<Box p={2}>
				<List>
					{items.map((item) => (
						<NavItem
							href={item.href}
							key={item.title}
							title={item.title}
							icon={item.icon}
						/>
					))}
				</List>
			</Box>
			<Box flexGrow={1} />
			<Box p={2} m={2} bgcolor="background.dark">
				<Box display="flex" justifyContent="center" mt={2}>
					<Button
						color="primary"
						component="a"
						href="https://react-material-kit.devias.io"
						variant="contained"
					>
						See PRO version
					</Button>
				</Box>
			</Box>
		</Box>
	);

	return (
		<>
			<Hidden lgUp>
				<Drawer
					anchor="left"
					classes={{ paper: classes.mobileDrawer }}
					onClose={props.onMobileClose}
					open={props.openMobile}
					variant="temporary"
				>
					{content}
				</Drawer>
			</Hidden>
			<Hidden mdDown>
				<Drawer
					anchor="left"
					classes={{ paper: classes.desktopDrawer }}
					open
					variant="persistent"
				>
					{content}
				</Drawer>
			</Hidden>
		</>
	);
};

export default NavBar;
