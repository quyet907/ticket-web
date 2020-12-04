import React, { useEffect, useState } from "react";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import Results from "./Results";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "../components/dialogs/AddOrEditDialog";
import { positionStaffController, staffController } from "../service";
import { object } from "yup";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import BaseDialogs from "../components/dialogs/PopUpEditPositionStaff";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Staff } from "../submodules/base-ticket-team/base-carOwner/Staff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import PopUpEditPositionStaff from "../components/dialogs/PopUpEditPositionStaff";
import PopUpEditStaff from "../components/dialogs/PopUpEditStaff";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function StaffView() {
	const [object, setObject] = useState<Paging<Staff>>({
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
	const [selected, setSelected] = useState<Staff>({} as Staff);
	const [showForm, setShowForm] = useState<boolean>(false);

	function onCreateOrUpdate(staff: Staff) {
		setSelected(staff);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(position: Staff) {
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
		staffController.list(query).then((res: Paging<Staff>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Staff[]): IBaseTable<Staff> {
		const createValue = data.map((item: Staff) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(item.birthAt);
			value.push(item.address);
			value.push(item.phoneNumber);
			value.push(item.identityCard);
			value.push(item.metaMapping?.position?.name);
			// value.push(ActionHelper.getActionUpdate(item, onCreateOrUpdate));
			// value.push(ActionHelper.getActionDelete(item, onDelete));
			value.push(ActionHelper.getActionUpdateAndDelete(item , onCreateOrUpdate, onDelete))

			return value;
		});

		const getTable: IBaseTable<Staff> = {
			header: [
				{ id: "name", label: "Ho ten" },
				{ id: "birthAt", label: "Ngay sinh" },
				{ id: "address", label: "Dia chi" },
				{ id: "phoneNumber", label: "So dien thoai" },
				{ id: "identityCard", label: "CMND" },
				{ id: "positionId", label: "Chuc vu" },
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

			<PopUpEditStaff
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditStaff>

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
