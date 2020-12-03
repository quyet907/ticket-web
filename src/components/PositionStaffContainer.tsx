import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import Results from "./Results";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "../components/dialogs/AddOrEditDialog";
import { positionStaffController } from "../service";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import BaseDialogs from "../components/dialogs/PopUpEditPositionStaff";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
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

export default function PositionStaffContainer() {
	const [object, setObject] = useState<Paging<PositionStaff>>({
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
	const [selected, setSelected] = useState<PositionStaff>({} as PositionStaff);
	const [showForm, setShowForm] = useState<boolean>(false);

	function onCreateOrUpdate(position: PositionStaff) {
		setSelected(position);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(position: PositionStaff) {
		positionStaffController.create(position).then((res) => {
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
		positionStaffController.list(query).then((res: Paging<PositionStaff>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: PositionStaff[]): IBaseTable<PositionStaff> {
		const createValue = data.map((item: PositionStaff) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(item.description || "");
			value.push(ActionHelper.getActionDelete(item, onDelete));
			value.push(ActionHelper.getActionUpdate(item, onCreateOrUpdate));
			return value;
		});

		const getTable: IBaseTable<PositionStaff> = {
			header: [
				{ id: "name", label: "Name" },
				{ id: "description", label: "Description" },
				{ id: "", label: "Delete" },
				{ id: "", label: "Edit" },
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
		
					obj={selected}
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
