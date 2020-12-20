import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditRoute from "../../components/dialogs/PopUpEditRoute";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { positionStaffController, routeController } from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Route } from "../../submodules/base-ticket-team/base-carOwner/Route";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
// import Page from 'src/components/Page';
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";

export default function RouteContainer() {
	const globalStyle = useGlobalStyles();
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
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

	function onDelete() {
		positionStaffController.delete(selected.id || "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onConfirm(item: Route) {
		setSelected(item);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
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
			value.push(moment(item.startAt).format("HH Giờ MM"));
			value.push(`${item.sumTimeRun} tiếng`);
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));

			return value;
		});

		const getTable: IBaseTable<Route> = {
			header: [
				{ id: "localStart", label: "Địa điểm xuất phát" },
				{ id: "localEnd", label: "Địa điêm đích" },
				{ id: "startAt", label: "Giờ khởi hành" },
				{ id: "sumTimeRun", label: "Tổng thời gian chạy dự kiến" },
				{ id: "", label: "Hanh dong" },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		// <Page className={classes.root} title="Customers">
		<Grid xs={12}>
			<Grid>
				<Typography variant={"h1"}>Chức vụ</Typography>
			</Grid>
			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

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
		</Grid>
		// </Page>
	);
}
