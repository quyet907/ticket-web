// import Page from 'src/components/Page';

import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import DialogChair from "../../components/chair/DialogChair";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditCar from "../../components/dialogs/PopUpEditCar";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { carController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Car } from "../../submodules/base-ticket-team/base-carOwner/Car";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function CarContainer() {
	const history = useHistory();
	const globalStyle = useGlobalStyles();
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
	});
	const [selected, setSelected] = useState<Car>({} as Car);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [showDialogChair, setShowDialogChair] = useState<boolean>(false);

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

	function onDelete() {
		carController.delete(selected.id || "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	function onConfirm(item: Car) {
		setSelected(item);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
	}

	function onCloseDialogDiagramChar() {
		setShowDialogChair(false);
		setQuery({ ...query });
	}

	function onDialogDiagramChar(item: Car) {
		setShowDialogChair(true);
		setSelected(item);
	}

	function onNextPageTrip(item: Car) {
		history.push(`trip/${item.id}`);
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
			value.push(item.description);
			value.push(item.origin);
			value.push(moment(item.entryAt).format("YYYY-MM-DD"));
			value.push(item.licensePlates);
			value.push(item.totalChair as any);

			value.push(
				ActionHelper.getAllActionForCar(
					item,
					onCreateOrUpdate,
					onConfirm,
					onDialogDiagramChar,
					onNextPageTrip
				)
			);
			return value;
		});

		const getTable: IBaseTable<Car> = {
			header: [
				{ id: "name", label: "Ten xe" },
				{ id: "description", label: "Mô tả" },
				{ id: "origin", label: "Xuất xứ" },
				{ id: "entryAt", label: "Ngày nhập" },
				{ id: "licensePlates", label: "Biển số xe" },
				{ id: "", label: "Tổng số ghế" },
				{ id: "action" as any, label: "Hành động" },
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
				<Typography variant={"h1"}>Xe</Typography>
			</Grid>
			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

			<DialogChair Car={selected} onClose={onCloseDialogDiagramChar} open={showDialogChair} />

			<PopUpEditCar
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditCar>

			<SearchAndAdd<Car> onCreate={onCreateOrUpdate} onSearch={onSearch} />

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
