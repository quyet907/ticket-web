import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "./dialogs/AddOrEditDialog";
import {
	carController,
	positionStaffController,
	staffController,
	tripController,
} from "../service";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import BaseDialogs from "./dialogs/PopUpEditPositionStaff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { Car } from "../submodules/base-ticket-team/base-carOwner/Car";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function CarContainer() {
	const [object, setObject] = useState<Paging<Car>>({
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
	const [selected, setSelected] = useState<Car>({} as Car);
	const [showForm, setShowForm] = useState<boolean>(false);

	function onCreateOrUpdate(car: Car) {
		setSelected(car);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(car: Car) {
		carController.create(car).then((res) => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onDelete(id: string) {
		carController.delete(id).then((res) => {
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
		carController.list(query).then((res: Paging<Car>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Car[]): IBaseTable<Car> {
		const createValue = data.map((item: Car) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(item.status);
			value.push(ActionHelper.getActionUpdate(item, onCreateOrUpdate));
			value.push(ActionHelper.getActionDelete(item, onDelete));
			return value;
		});

		const getTable: IBaseTable<Car> = {
			header: [
				{ id: "name", label: "Ten xe" },
				{ id: "status", label: "Trang thai" },
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
			<BaseDialogs
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></BaseDialogs>

			<SearchAndAdd<Car> onCreate={onCreateOrUpdate} onSearch={onSearch} />

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
