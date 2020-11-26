import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import data from "./data";
import Results from "./Results";
import Toolbar from "./Toolbar";
import AddOrEditDialog from "../../components/dialogs/AddOrEditDialog";
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
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			<AddOrEditDialog
				onSave={() => setIsOpenDialog(false)}
				onClose={() => setIsOpenDialog(false)}
				isDisplay={isOpenDialog}
			></AddOrEditDialog>
			<Toolbar
				onOpenDialog={() => {
					setIsOpenDialog(true);
				}}
			/>
			<Box mt={3}>
				<Results customers={customers} />
			</Box>
		</Container>
		// </Page>
	);
};

export default Cutstomer;
