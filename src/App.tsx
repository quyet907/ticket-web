import React, {  useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Home } from "react-feather";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import Statistic from "./container/statistic/Statistic";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/MuiTheme";
import GlobalStyles from "./theme/GlobalStyles";
import LoginView from "./components/auth/Login";
import RegisterView from "./components/auth/Register";
import { accountController } from "./service";
import { Staff } from "./submodules/base-ticket-team/base-carOwner/Staff";
import { useSelector } from "react-redux";
import { AppState, Dispatch } from "./rematch/Store";
import { useRematchDispatch } from "./rematch";

const App = () => {
	const [isAuthen, setAuthen] = useState<boolean>(false)
	const staffDispatch = useRematchDispatch((dispatch: Dispatch) =>dispatch.authen)
	let authen: any = useSelector((state: AppState) => state.authen)
	useEffect(() => {
		accountController.getMe().then(res=>{
			console.log(res)
			if(res.id != authen.id || !isAuthen){
				staffDispatch.login({account : res})
				setAuthen(true)
			}
		})
	}, [])

	return (
		<Router>
			<Redirect exact from="*" to={isAuthen ? "/dashboard" : "/login"} />
			<Switch>
				<Route exact path="*" component={isAuthen ? DashboardLayout : LoginView} />
				<Route exact path="/login" component={LoginView} />
				<Route exact path="/register" component={RegisterView} />
			</Switch>
		</Router>
	);
};

export default App;
