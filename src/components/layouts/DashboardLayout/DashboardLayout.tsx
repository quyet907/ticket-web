import React, { FC, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar";
import { useRouteMatch, Route, Redirect, Switch } from "react-router";
import Statistic from "../../../container/statistic/Statistic";
import PositionStaffContainer from "../../../container/manager/PositionStaffContainer";
import RouteContainer from "../../../container/manager/Route";
import Customers from "../../../container/manager/Customer";
import StaffView from "../../../container/manager/Staff";
import TicketContainer from "../../../container/manager/TicketContainer";
import TripContainer from "../../../container/manager/TripContainer";
import CarContainer from "../../../container/manager/CarContainer";
import DiagramChair from "../../chair/DiagramChair";
import DialogChair from "../../chair/DialogChair";
import HomeSaleTicket from "../../../container/sale/HomeSaleTicket";


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		// backgroundColor : "black",
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

	return (
		<div className={classes.root} >
			{/* <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} /> */}
			<NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					<div className={classes.content}>
						<Switch>
							<Route exact path={`/dashboard`} component={Statistic} />
							<Route exact path={`/customer`} component={Customers} />
							<Route exact path={`/position`} component={PositionStaffContainer} />
							<Route exact path={`/staff`} component={StaffView} />
							<Route exact path={`/trip`} component={TripContainer} />
							<Route exact path={`/route`} component={RouteContainer} />
							<Route exact path={`/ticket`} component={TicketContainer} />
							<Route exact path={`/car`} component={CarContainer}/>
							<Route exact path={`/sale`} component={HomeSaleTicket}/>
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
