import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditPositionStaff from "../../components/dialogs/PopUpEditPositionStaff";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { positionStaffController } from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { getHighlightedText } from "../../helper/getHighlightedText";

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
	const globalStyle = useGlobalStyles();
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
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

	function onDelete() {
		positionStaffController.delete(selected.id || "").then((res) => {
			setQuery({ ...query });
			setShowConfirm(false);
		});
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onConfirm(item: PositionStaff) {
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
		positionStaffController.list(query).then((res: Paging<PositionStaff>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: PositionStaff[]): IBaseTable<PositionStaff> {
		const createValue = data.map((item: PositionStaff) => {
			var value: any[] = [];
			value.push(getHighlightedText(item.name || "", query.search));
			value.push(getHighlightedText(item.description || "", query.search));
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));
			return value;
		});

		const getTable: IBaseTable<PositionStaff> = {
			header: [
				{ id: "name", label: "Tên chức vụ", sort : true },
				{ id: "description", label: "Mô tả" , sort : true},
				{ id: "", label: "Hành động", sort : false },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		// <Page className={classes.root} title="Customers">
		<Grid>
			<Grid>
				<Typography variant={"h1"}>Chức vụ</Typography>
			</Grid>
			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

			<PopUpEditPositionStaff
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditPositionStaff>

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
