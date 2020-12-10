import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import SearchAndAdd from "./SearchAndAdd";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import { routeController, positionStaffController, staffController } from "../service";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import BaseDialogs from "./dialogs/BaseDialogs";
import { Route } from "../submodules/base-ticket-team/base-carOwner/Route";
import PopUpEditStaff from "./dialogs/PopUpEditStaff";
import PopUpEditRoute from "./dialogs/PopUpEditRoute";
import moment from "moment";
// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function RouteContainer() {
	const [object, setObject] = useState<Paging<Route>>({
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
	const [selected, setSelected] = useState<Route>({} as Route);
	const [showForm, setShowForm] = useState<boolean>(false);

	function onCreateOrUpdate(staff: Route) {
		setSelected(staff);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(Route: Route) {
		routeController.create(Route).then((res) => {
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
		routeController.list(query).then((res: Paging<Route>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Route[]): IBaseTable<Route> {
		const createValue = data.map((item: Route) => {
			var value: any[] = [];
			value.push(item.localStart);
			value.push(item.localEnd);
			value.push(moment(item.startAt).format("l"));
			value.push(item.sumTimeRun);
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onDelete));

			return value;
		});

		const getTable: IBaseTable<Route> = {
			header: [
				{ id: "localStart", label: "Xuat phat" },
				{ id: "localEnd", label: "Diem den" },
				{ id: "startAt", label: "Gio khoi hanh" },
				{ id: "sumTimeRun", label: "Tong thoi gian du kien" },
				{ id: "", label: "Hanh dong" },
		
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

			<PopUpEditRoute
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditRoute>

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
