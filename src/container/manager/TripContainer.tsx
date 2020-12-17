
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
import {useParams } from "react-router-dom"
import PopUpEditTrip from "../../components/dialogs/PopUpEditTrip";
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

export default function TripContainer() {
	const param: any = useParams<{id : string}>();
	const id = param.id;
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
		tripController.create({...trip, carId : id}).then((res) => {
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
		setShowConfirm(true)
	}

	function onCancelConfirm(){
		setShowConfirm(false)
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	useEffect(() => {
		tripController.getListByCarId(query, id).then((res: Paging<Trip>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Trip[]): IBaseTable<Trip> {
		const createValue = data.map((item: Trip) => {
			var value: any[] = [];
			value.push(`${item.metaMapping?.route?.localStart}- ${item.metaMapping?.route?.localEnd}` || "");
			value.push(item.price || "");
			value.push(moment(item.timeStart).format("DD-MM-YYYY"));
			value.push(item.metaMapping?.drive?.name)
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));

			return value;
		});

		const getTable: IBaseTable<Trip> = {
			header: [
				{ id: "route" as any, label: "Tuyến đường" },
				{ id: "price", label: "Giá" },
				{ id: "timeStart", label: "Giờ khởi hành" },
				{ id: "drive", label: "Người lái xe" },
				{ id: "", label: "Hành động" },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		<Container maxWidth={false} className={clsx(globalStyle.container)}>
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

			<PopUpEditTrip
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditTrip>

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
