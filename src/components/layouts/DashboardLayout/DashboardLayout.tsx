import { Box, colors, Container, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import CarContainer from "../../../container/manager/CarContainer";
import Customers from "../../../container/manager/Customer";
import PositionStaffContainer from "../../../container/manager/PositionStaffContainer";
import RouteContainer from "../../../container/manager/Route";
import StaffView from "../../../container/manager/Staff";
import TripContainer from "../../../container/manager/TripContainer";
import DiagramSaleTicket from "../../../container/sale/DiagramSaleTicket";
import HomeSaleTicket from "../../../container/sale/HomeSaleTicket";
import Statistic from "../../../container/statistic/Statistic";
import { accountController } from "../../../service";
import { useGlobalStyles } from "../../../styles/GlobalStyle";
import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		// backgroundColor: theme.palette.common.white,
		display: "flex",
		height: "100%",
		overflow: "hidden",
		width: "100%",
	},
	wrapper: {
		display: "flex",
		flex: "1 1 auto",
		overflow: "hidden",
		// paddingTop: 64,
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
		// height: "100vh",
		overflow: "auto",
		padding: theme.spacing(6),
		paddingTop: theme.spacing(12),
		backgroundColor: "rgb(247, 249, 252)",
		borderLeft: "1px solid",
		borderColor: colors.grey[300],
		
	},
}));

function DashboardLayout() {
	const classes = useStyles();
	const [isMobileNavOpen, setMobileNavOpen] = useState(false);
	const globalStyles = useGlobalStyles();

	return (
		<div className={classes.root}>
			<TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					<div className={classes.content}>
						<Switch>
							<Route exact path={`/dashboard`} component={Statistic} />
							<Route exact path={`/customer`} component={Customers} />
							<Route exact path={`/position`} component={PositionStaffContainer} />
							<Route exact path={`/staff`} component={StaffView} />
							<Route exact path={`/trip/:id`} component={TripContainer} />
							<Route exact path={`/route`} component={RouteContainer} />
							<Route exact path={`/ticket`} component={HomeSaleTicket} />
							<Route exact path={`/car`} component={CarContainer} />
							<Route exact path={`/sale/:id`} component={DiagramSaleTicket} />
							<Redirect exact from="*" to={"dashboard"} />

						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
