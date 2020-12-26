import { Avatar, Box, Drawer, Hidden, List, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import {
	AlertCircle,
	BarChart,
	Bookmark,
	LogOut, Map,
	MapPin,
	Star,
	Truck,
	Users
} from "react-feather";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { useRematchDispatch } from "../../../../rematch";
import { Authentication } from "../../../../rematch/Authentication";
import { AppState, Dispatch } from "../../../../rematch/store";
import { useGlobalStyles } from "../../../../styles/GlobalStyle";
import NavItem from "./NavItem";

const user = {
	avatar: "https://picsum.photos/200",
	jobTitle: "Manager",
	name: uniqueNamesGenerator({
		dictionaries: [names],
	}),
};

const items = [
	{
		href: "/dashboard",
		icon: BarChart,
		title: "Thống kê",
	},
	{
		href: "/customer",
		icon: Users,
		title: "Khách hàng",
	},
	{
		href: "/position",
		icon: Star,
		title: "Chức vụ",
	},
	{
		href: "/staff",
		icon: Users,
		title: "Nhân viên",
	},
	{
		href: "/route",
		icon: Map,
		title: "Tuyến đường",
	},
	{
		href: "/car",
		icon: Truck,
		title: "Xe",
	},
	{
		href: "/ticket",
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
		border: "none",
		background: "none",
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
	const globalStyle = useGlobalStyles();
	const location = useLocation();


	const thisUser: Authentication = useSelector((state: AppState) => state.authentication)

	

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
					src={thisUser.auth.avt}
					to="/app/account"
				/>
				<Box mt={1} alignItems="center" display="flex" flexDirection="column">
					<Typography color="textPrimary" variant="h4">
						{thisUser.auth.name}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{thisUser.auth.position_staff?.name}
					</Typography>
				</Box>
			</Box>

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
