import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActionHelper } from "../../comon/ActionHelper";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditTrip from "../../components/dialogs/PopUpEditTrip";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import Header from "../../components/genaral-component/Header";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { tripController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";

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
	const param: any = useParams<{ id: string }>();
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
		tripController.create({ ...trip, carId: id }).then((res) => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onDelete() {
		tripController.delete(selected.id || "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onConfirm(item: Trip) {
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
		tripController.getListByCarId(query, id).then((res: Paging<Trip>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Trip[]): IBaseTable<Trip> {
		const createValue = data.map((item: Trip) => {
			var value: any[] = [];
			value.push(`${item.route?.localStart}- ${item.route?.localEnd}` || "");
			value.push(
				item.price?.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				}) || ""
			);
			value.push(moment(item.timeStart).format("DD-MM-YYYY"));
			value.push(item.drive?.name);
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));

			return value;
		});

		const getTable: IBaseTable<Trip> = {
			header: [
				{ id: "route" as any, label: "Tuyến đường", sort: true },
				{ id: "price", label: "Giá", sort: true },
				{ id: "timeStart", label: "Giờ khởi hành", sort: true },
				{ id: "drive", label: "Người lái xe", sort: false },
				{ id: "", label: "Hành động", sort: false },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		<Grid item xs={12}>
			<Header title="Chuyến đi" />

			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

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
		</Grid>
		// </Page>
	);
}
