import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActionHelper } from "../../comon/ActionHelper";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditStaff from "../../components/dialogs/PopUpEditStaff";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { staffController } from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Staff } from "../../submodules/base-ticket-team/base-carOwner/Staff";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";

export default function StaffView() {
	const globalStyle = useGlobalStyles();
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
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	function onCreateOrUpdate(staff: Staff) {
		setSelected(staff);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(staff: Staff) {
		// var checkValidate = ValidateHelper.validateTechnicians(Staff, staff);
		// console.log("on save cpn parent")

		staffController.create(staff).then((res) => {
			setQuery({ ...query });
			console.log(res);

			setShowForm(false);
		});
	}

	function onDelete() {
		staffController.delete(selected._id || "").then((res) => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}

	function onQuery(query: IList) {
		setQuery(query);
	}

	function onConfirm(item: Staff) {
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
		staffController.list(query).then((res: Paging<Staff>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Staff[]): IBaseTable<Staff> {
		const createValue = data.map((item: Staff) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(moment(item.birthAt).format("DD-MM-YYYY"));
			value.push(item.address);
			value.push(item.phoneNumber);
			value.push(item.identityCard);
			value.push(item.metaMapping?.position?.name);
			// value.push(ActionHelper.getActionUpdate(item, onCreateOrUpdate));
			// value.push(ActionHelper.getActionDelete(item, onDelete));
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));

			return value;
		});

		const getTable: IBaseTable<Staff> = {
			header: [
				{ id: "name", label: "Họ và tên" },
				{ id: "birthAt", label: "Ngày sinh" },
				{ id: "address", label: "Địa chỉ" },
				{ id: "phoneNumber", label: "Số điện thoại" },
				{ id: "identityCard", label: "Chứng minh nhân dân" },
				{ id: "positionId", label: "Chức vụ" },
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
				<Typography variant={"h1"}>Nhân viên</Typography>
			</Grid>
			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

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
		</Grid>
		// </Page>
	);
}
