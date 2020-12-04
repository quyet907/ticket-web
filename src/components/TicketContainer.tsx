import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "./dialogs/AddOrEditDialog";
import { positionStaffController, staffController, ticketController, tripController } from "../service";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import BaseDialogs from "./dialogs/PopUpEditPositionStaff";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Trip } from "../submodules/base-ticket-team/base-carOwner/Trip";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function TicketContainer() {
	

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			


			
		</Container>
		// </Page>
	);
}
