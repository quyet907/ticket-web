import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppWithSnackBar from "./App";
import "./index.css";
import { store } from "./rematch/store";
import reportWebVitals from "./reportWebVitals";
// import GlobalStyles from "./theme/GlobalStyles";
import theme from "./theme/MuiTheme";

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			{/* <GlobalStyles></GlobalStyles> */}
			<AppWithSnackBar />
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
