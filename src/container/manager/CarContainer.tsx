

// import Page from 'src/components/Page';

import { Box, Container, makeStyles } from "@material-ui/core";
import { functions } from "lodash";
import React, { useState, useEffect } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import DialogChair from "../../components/chair/DialogChair";
import BaseDialogs from "../../components/dialogs/BaseDialogs";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { carController } from "../../service";
import { Car } from "../../submodules/base-ticket-team/base-carOwner/Car";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";

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
		carController.delete(selected._id|| "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false)
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	function onConfirm(item : Car){
		setSelected(item)
		setShowConfirm(true)
	}

	function onCancelConfirm(){
		setShowConfirm(false)
	}

	function onCloseDialogDiagramChar(){
		setShowDialogChair(false)
		setQuery({...query})
	}

	function onDialogDiagramChar(item : Car){
		setShowDialogChair(true)
		setSelected(item);
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
			value.push(ActionHelper.getAllActionForCar(item, onCreateOrUpdate, onConfirm, onDialogDiagramChar));
			return value;
		});

		const getTable: IBaseTable<Car> = {
			header: [
				{ id: "name", label: "Ten xe" },
				{ id: "status", label: "Trang thai" },
				{ id: "", label: "Hành động" },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			
			<PopUpConfirm
			isDisplay = {showConfirm}
			onCancel ={onCancelConfirm}
			onDelete = {onDelete}
			/>

			<DialogChair
			Car = {selected}
			onClose = {onCloseDialogDiagramChar}
			open = {showDialogChair}
			/>

			<BaseDialogs
				dialogContent = {""}
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
