import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Home } from "react-feather";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import Statistic from "./container/statistic/Statistic";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/MuiTheme";
import GlobalStyles from "./theme/GlobalStyles";
import LoginView from "./components/auth/Login";
import RegisterView from "./components/auth/Register";
import { accountController } from "./service";

const App = () => {
	const [isAuThen, setIsAuThen] = useState<boolean>(false)

	useEffect(() => {
		accountController.getMe().then(res => {
			setIsAuThen(true)
			console.log(res)
			
		}).catch(err => {
			setIsAuThen(false)
			console.log(err)
		})
	}, [])
	
	// 1 goij get Me ra
			// neu cos du lieuj thif da sang trang chu 
			// neu loi 401 thi da sang trang dang nhap
	return (
			<Router>
				<Switch>
					<Route exact path="*" component={isAuThen ? DashboardLayout :LoginView } />
					<Route exact path="/login" component={LoginView} />
					<Route exact path="/register" component={RegisterView} />
				</Switch>
			</Router>
	);
};

export default App;
