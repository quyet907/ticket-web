import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Home } from "react-feather";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import Statistic from "./components/Statistic";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/MuiTheme";
import GlobalStyles from "./theme/GlobalStyles";
import LoginView from "./components/auth/Login";
import RegisterView from "./components/auth/Register";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles></GlobalStyles>
			<Router>
				<Switch>
					<Route exact path="/login" component={LoginView} />
					<Route exact path="/register" component={RegisterView} />
					<Route exact path="*" component={DashboardLayout} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
