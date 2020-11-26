import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import data from "../customer/CustomerListView/data";
import Results from "../customer/CustomerListView/Results";
import Toolbar from "./Toolbar";
// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.dark,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const Cutstomer = () => {
	const classes = useStyles();
	const [customers] = useState(data);

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			<Toolbar />
			<Box mt={3}>
				<Results customers={customers} />
			</Box>
		</Container>
		// </Page>
	);
};

export default Cutstomer;
