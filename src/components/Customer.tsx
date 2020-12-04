import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import SearchAndAdd from "./SearchAndAdd";
import { customerController } from "../service";
import BaseTable, { IBaseTable } from "./BaseTable";
import { ActionHelper } from "../comon/ActionHelper";
import BaseDialogs from "./dialogs/PopUpEditPositionStaff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";
import { Customer } from "../submodules/base-ticket-team/base-carOwner/Customer";

// import Page from 'src/components/Page';


export default function Customers() {
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

	function onDelete(id: string) {
		customerController.delete(id).then(() => {
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
		customerController.list(query).then((res: Paging<Customer>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(data: Customer[]): IBaseTable<Customer> {
		const createValue = data.map((item: Customer) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(item.description || "");
			value.push(ActionHelper.getActionUpdateAndDelete(item, onCreateOrUpdate, onDelete));
			return value;
		});

		const getTable: IBaseTable<Customer> = {
			header: [
				{ id: "name", label: "Name" },
				{ id: "description", label: "Description" },
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

				<BaseDialogs
		
					obj={selected}
					onSave={onSave}
					onCancel={onCloseForm}
					isDisplay={showForm}
				></BaseDialogs>

				<SearchAndAdd<Customer> onCreate={onCreateOrUpdate} onSearch={onSearch} />

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
