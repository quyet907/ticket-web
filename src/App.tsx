import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginView from "./components/auth/Login";
import RegisterView from "./components/auth/Register";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import { AppState } from "./rematch/Store";
import { accountController } from "./service";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { Button, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { NotificationModel } from "./rematch/Notification";

const App = () => {
	const [isAuthentication, setAuthentication] = useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();

	const notification: NotificationModel = useSelector((state: AppState) => state.notification);

	useEffect(() => {
		const { message, variant } = notification;
		enqueueSnackbar("message", { variant });
	}, [notification]);

	const auThen: string = useSelector((state: AppState) => {
		return state.authentication;
	});

	useEffect(() => {
		accountController
			.getMe()
			.then(() => setAuthentication(true))
			.catch(() => setAuthentication(false));
	}, [auThen]);

	const handleClick = () => {
		enqueueSnackbar("I love snacks.");
	};

	const handleClickVariant = (variant: VariantType) => () => {
		// variant could be success, error, warning, info, or default
		enqueueSnackbar("This is a success message!", { variant });
	};

	return (
		<Router>
			<Redirect exact from="*" to={isAuthentication ? "/dashboard" : "/login"} />
			<Switch>
				<Route exact path="*" component={isAuthentication ? DashboardLayout : LoginView} />
				<Route exact path="/register" component={RegisterView} />
				<Route exact path="/login" component={LoginView} />
			</Switch>
		</Router>
		// <>
		// 	<Button onClick={handleClick}>Show snackbar</Button>
		// 	<Button onClick={handleClickVariant("success")}>Show success snackbar</Button>
		// </>
	);
};

export default function AppWithSnackBar() {
	return (
		<div>
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
		</div>
	);
}
