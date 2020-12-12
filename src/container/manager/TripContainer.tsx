
import { makeStyles, Container, Box, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import BaseDialogs from "../../components/dialogs/BaseDialogs";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { tripController } from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import clsx from "clsx"
import { useGlobalStyles } from "../../styles/GlobalStyle";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function TripContainer() {
	const globalStyle = useGlobalStyles();
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
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

	function onDelete() {
		tripController.delete(selected._id || "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false)
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onConfirm(item : Trip){
		setSelected(item)
	}

	function onCancelConfirm(){
		setShowConfirm(false)
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
		setShowConfirm(true)
	}

	useEffect(() => {
		tripController.list(query).then((res: Paging<Trip>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Trip[]): IBaseTable<Trip> {
		const createValue = data.map((item: Trip) => {
			var value: any[] = [];
			value.push(item.price || "");
			value.push(item.timeStart);
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));

			return value;
		});

		const getTable: IBaseTable<Trip> = {
			header: [
				{ id: "price", label: "Gia" },
				{ id: "timeStart", label: "Gio khoi hanh" },
				{ id: "", label: "Hanh dong" },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false} className={clsx(globalStyle.pp5, globalStyle.container)}>
			<Grid style = {{
				paddingLeft : 30
			}}>
				<Typography
					variant = {"h1"}
				>
					Chuyến đi
				</Typography>
			</Grid>
			<PopUpConfirm
			isDisplay = {showConfirm}
			onCancel ={onCancelConfirm}
			onDelete = {onDelete}
			/>

			<BaseDialogs
				dialogContent = {""}
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
