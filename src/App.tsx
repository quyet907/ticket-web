import { IconButton } from "@material-ui/core";
import { Close, TransferWithinAStationSharp } from "@material-ui/icons";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NetworkError from "./components/error/NetworkError";
import Notfound from "./components/error/Notfound";
import AppLoadingTop from "./components/genaral-component/LoaddingTop";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import NewLogin from "./container/login/NewLogin";
import RegisterView from "./container/login/Register";
import { useRematchDispatch } from "./rematch";
import { Authentication } from "./rematch/Authentication";
import { NotificationModel } from "./rematch/Notification";
import { AppState, Dispatch } from "./rematch/store";
import { accountController } from "./service";

const App = () => {
	const { enqueueSnackbar } = useSnackbar();
	const notification: NotificationModel = useSelector((state: AppState) => state.notification);
	const authen: Authentication = useSelector((state: AppState) => state.authentication);
	const authenticationDispatch = useRematchDispatch(
		(dispatch: Dispatch) => dispatch.authentication
	);

	console.log(authen);
	useEffect(() => {
		const { message, variant } = notification;
		if (message) {
			enqueueSnackbar(message, { variant });
		}
	}, [notification]);

	useEffect(() => {
		accountController.getMe().then((res) => {
			const token = localStorage.getItem("token");
			authenticationDispatch.login({ auth: res, token: token });
		});
	}, []);

	return (
		<>
			<AppLoadingTop></AppLoadingTop>
			<Router>
				{/* <Redirect exact from="*" to={isAuthentication ? "/dashboard" : "/login"} /> */}
				<Switch>
					{/* <Route exact path="/network-error" component={NetworkError} /> */}
					{/* <Route exact path="/not-found" component={Notfound} /> */}
					<Route
						exact
						path="*"
						component={authen.isAuthen ? DashboardLayout : NewLogin}
					/>
					<Route exact path="/login" component={NewLogin} />
					<Route exact path="/register" component={RegisterView} />
				</Switch>
			</Router>
		</>
	);
};

export default function AppWithSnackBar() {
	return (
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={3000}
			action={
				<React.Fragment>
					<IconButton aria-label="close" color="inherit" onClick={() => {}}>
						<Close />
					</IconButton>
				</React.Fragment>
			}
		>
			<App></App>
		</SnackbarProvider>
	);
}
