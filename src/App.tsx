import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginView from "./components/auth/Login";
import RegisterView from "./components/auth/Register";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import { AppState } from "./rematch/Store";
import { accountController } from "./service";

const App = () => {
	const [isAuthentication, setAuthentication] = useState<boolean>(false)

	const auThen: string = useSelector((state: AppState) => {
		return state.authentication
	})

	useEffect(() => {
		accountController
			.getMe()
			.then(() => setAuthentication(true))
			.catch(() => setAuthentication(false))
	}, [auThen])


	return (
		<Router>
			<Redirect exact from="*" to={isAuthentication ? "/dashboard" : "/login"} />
			<Switch>
				<Route exact path="*" component={isAuthentication ? DashboardLayout : LoginView} />
				<Route exact path="/register" component={RegisterView} />
				<Route exact path="/login" component={LoginView} />
			</Switch>

		</Router>
	);
};

export default App;
