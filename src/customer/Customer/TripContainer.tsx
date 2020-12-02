import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import Results from "./Results";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "../../components/dialogs/AddOrEditDialog";
import { positionStaffController, staffController, tripController } from "../../service";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../../comon/ActionHelper";
import { PositionStaff } from "../../base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../../base-ticket-team/query/IList";
import { Paging } from "../../base-ticket-team/query/Paging";
import BaseDialogs from "../../components/dialogs/BaseDialogs";
import { Staff } from "../../base-ticket-team/base-carOwner/Staff";
import { Trip } from "../../base-ticket-team/base-carOwner/Trip";
// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function TripContainer() {
	const [object, setObject] = useState<Paging<Trip>>({
		page: 1,
		pageSize: 5,
		rows: [],
		total: 0,
		totalPages: 0,
	});
	const [query, setQuery] = useState<IList>({
		page: 1,
		pageSize: 5,
		search: "",
		// sort : ["-createAt"]
	});
	const [selected, setSelected] = useState<Trip>({} as Trip);
	const [showForm, setShowForm] = useState<boolean>(false);

	function onCreateOrUpdate(staff: Trip) {
		setSelected(staff);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(trip: Trip) {
		tripController.create(trip).then((res) => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onDelete(id: string) {
		positionStaffController.delete(id).then((res) => {
			setQuery({ ...query });
		});
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	useEffect(() => {
		staffController.list(query).then((res: Paging<Trip>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Trip[]): IBaseTable<Trip> {
		const createValue = data.map((item: Trip) => {
			var value: any[] = [];
			value.push(item.price || "");
			value.push(item.timeStart);
			value.push(ActionHelper.getActionUpdate(item, onCreateOrUpdate));
			value.push(ActionHelper.getActionDelete(item, onDelete));
			return value;
		});

		const getTable: IBaseTable<Trip> = {
			header: [
				{ id: "price", label: "Gia" },
				{ id: "timeStart", label: "Gio khoi hanh" },
				{ id: "", label: "Edit" },
				{ id: "", label: "Delete" },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			{/* <AddOrEditDialog
				data={selected}
				onSave={onSave}
				onClose={onCloseForm}
				isDisplay={showForm}
			></AddOrEditDialog> */}

			<BaseDialogs
				data={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></BaseDialogs>

			<SearchAndAdd<PositionStaff> onCreate={onCreateOrUpdate} onSearch={onSearch} />

			<Box mt={3}>
				<BaseTable
					data={object}
					query={query}
					onQuery={onQuery}
					iTable={convertDataToTable}
				></BaseTable>
			</Box>
		</Container>
		// </Page>
	);
}
