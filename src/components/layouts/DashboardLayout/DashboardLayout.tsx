import React, { FC, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar";
import Statistic from "../../Statistic";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Cutstomer from "../../../customer/Customer/Cutstomer";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		display: "flex",
		height: "100%",
		overflow: "hidden",
		width: "100%",
	},
	wrapper: {
		display: "flex",
		flex: "1 1 auto",
		overflow: "hidden",
		paddingTop: 64,
		[theme.breakpoints.up("lg")]: {
			paddingLeft: 256,
		},
	},
	contentContainer: {
		display: "flex",
		flex: "1 1 auto",
		overflow: "hidden",
	},
	content: {
		flex: "1 1 auto",
		height: "100%",
		overflow: "auto",
	},
}));

function DashboardLayout() {
	const classes = useStyles();
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	const { path } = useRouteMatch();
	console.log(path);

	return (
		<div className={classes.root}>
			<TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					<div className={classes.content}>
						<Switch>
							<Route exact path={`/dashboard`} component={Statistic} />
							<Route exact path={`/positions`} component={Cutstomer} />
							<Route exact path={`/staffs`} component={Cutstomer} />
							<Route exact path={`/trips`} component={Cutstomer} />

							<Route path="*">
								<Redirect to="/dashboard" />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
