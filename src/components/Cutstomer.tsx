import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Results from "./Results";
import SearchAndAdd from "./SearchAndAdd";
import AddOrEditDialog from "../components/dialogs/AddOrEditDialog";
import { positionStaffController } from "../service";
import { object } from "yup";
import { PositionStaff } from "../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { IList } from "../submodules/base-ticket-team/query/IList";
import { Paging } from "../submodules/base-ticket-team/query/Paging";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

// eslint-disable-next-line @typescript-eslint/no-redeclare
const PositionStaffContainer = () => {
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
	const [selected, setSelected] = useState<PositionStaff>({});
	const [showForm, setShowForm] = useState<boolean>(false);

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

	function onDelete(id: string) {
		positionStaffController.delete(id).then((res) => {
			setQuery({ ...query });
		});
	}

	function onQuery(query: IList) {
		setQuery({ ...query });
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	useEffect(() => {
		positionStaffController.list(query).then((res) => {
			setObject(res);
		});
	}, [query]);

	return (
		// <Page className={classes.root} title="Customers">
		<Container maxWidth={false}>
			<AddOrEditDialog
				data={selected}
				onSave={onSave}
				onClose={onCloseForm}
				isDisplay={showForm}
			></AddOrEditDialog>

			<SearchAndAdd<PositionStaff> onCreate={onCreateOrUpdate} onSearch={onSearch} />
			<Box mt={3}>
				<Results
					position={object}
					query={query}
					onCreateOrUpdate={onCreateOrUpdate}
					onDelete={onDelete}
					onQuery={onQuery}
				/>
			</Box>
		</Container>
		// </Page>
	);
};

export default PositionStaffContainer;
