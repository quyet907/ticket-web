import React, { useEffect, useState } from "react";
import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import SearchAndAdd from "../../components/genaral-component/SearchAndAdd";
import { customerController } from "../../service";
import { ActionHelper } from "../../comon/ActionHelper";
import BaseDialogs from "../../components/dialogs/PopUpEditPositionStaff";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import moment from "moment";
import BaseTable, { IBaseTable } from "../../components/genaral-component/BaseTable";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import PopUpEditCustomer from "../../components/dialogs/PopUpEditCustomer";
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { getHighlightedText } from "../../helper/getHighlightedText";
// import Page from 'src/components/Page';

export default function Customers() {
	const globalStyle = useGlobalStyles();
	const [object, setObject] = useState<Paging<Customer>>({
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
	const [selected, setSelected] = useState<Customer>({} as Customer);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	function onCreateOrUpdate(position: Customer) {
		setSelected(position);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(customer: Customer) {
		customerController.create(customer).then(() => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onDelete() {
		customerController.delete(selected.id || "").then(() => {
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

	function onConfirm(item: Customer) {
		setSelected(item);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
	}

	useEffect(() => {
		customerController.list(query).then((res: Paging<Customer>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Customer[]): IBaseTable<Customer> {
		const createValue = data.map((item: Customer) => {
			var value: any[] = [];
			value.push(getHighlightedText(item.name || "", query.search) );
			value.push(getHighlightedText(item.CMND || "", query.search));
			value.push(moment(item.birthAt).format("DD-MM-YYYY"));
			value.push(getHighlightedText(item.email || "", query.search));
			value.push(getHighlightedText( item.phoneNumber || "", query.search));
			value.push(getHighlightedText(item.sex || ""));
			value.push( getHighlightedText(item.description || "", query.search));  
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onConfirm));
			return value;
		});

		const getTable: IBaseTable<Customer> = {
			header: [
				{ id: "name", label: "Họ tên", sort : true },
				{ id: "CMND", label: "CMND" , sort : true},
				{ id: "birthAt", label: "Ngày sinh" , sort : true},
				{ id: "email", label: "Email", sort : true },
				{ id: "phoneNumber", label: "Số điện thoại", sort : true },
				{ id: "sex", label: "Giới tính", sort : true },
				{ id: "description", label: "Mô tả", sort : true },
				{ id: "", label: "Hành động" ,sort : false},
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}

	return (
		<Grid>
			<Grid>
				<Typography variant={"h1"}>Khách hàng</Typography>
			</Grid>

			<PopUpEditCustomer
				obj={selected}
				onSave={onSave}
				onCancel={onCloseForm}
				isDisplay={showForm}
			></PopUpEditCustomer>
			<PopUpConfirm isDisplay={showConfirm} onCancel={onCancelConfirm} onDelete={onDelete} />

			<SearchAndAdd<Customer> onCreate={onCreateOrUpdate} onSearch={onSearch} />

			<Box mt={3}>
				<BaseTable
					data={object}
					query={query}
					onQuery={onQuery}
					iTable={convertDataToTable}
				></BaseTable>
			</Box>
		</Grid>
	);
}
