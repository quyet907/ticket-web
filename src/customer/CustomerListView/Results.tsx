import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
	Avatar,
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	makeStyles,
} from "@material-ui/core";
// import getInitials from "src/utils/getInitials";

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

type Props = {
	className?: string;
	customers: any[];
};

const Results = (props: Props) => {
	const classes = useStyles();
	const [selectedCustomerIds, setSelectedCustomerIds] = useState<any[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

	const handleSelectAll = (e: any) => {
		let newSelectedCustomerIds;

		if (e.target.checked) {
			newSelectedCustomerIds = props.customers.map((customer) => customer.id);
		} else {
			newSelectedCustomerIds = [];
		}

		setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleSelectOne = (e: any, id: string) => {
		// 		const selectedIndex = selectedCustomerIds.indexOf(id);
		// 		let newSelectedCustomerIds = [];
		//
		// 		if (selectedIndex === -1) {
		// 			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
		// 		} else if (selectedIndex === 0) {
		// 			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
		// 		} else if (selectedIndex === selectedCustomerIds.length - 1) {
		// 			newSelectedCustomerIds = newSelectedCustomerIds.concat(
		// 				selectedCustomerIds.slice(0, -1)
		// 			);
		// 		} else if (selectedIndex > 0) {
		// 			newSelectedCustomerIds = newSelectedCustomerIds.concat(
		// 				selectedCustomerIds.slice(0, selectedIndex),
		// 				selectedCustomerIds.slice(selectedIndex + 1)
		// 			);
		// 		}
		// setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleLimitChange = (event: any) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event: any, newPage: any) => {
		setPage(newPage);
	};

	return (
		<Card className={clsx(classes.root, props.className)}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedCustomerIds.length === props.customers.length}
										color="primary"
										indeterminate={
											selectedCustomerIds.length > 0 &&
											selectedCustomerIds.length < props.customers.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Location</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Registration date</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.customers.slice(0, limit).map((customer) => (
								<TableRow
									hover
									key={customer.id}
									selected={selectedCustomerIds.indexOf(customer.id) !== -1}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={
												selectedCustomerIds.indexOf(customer.id) !== -1
											}
											onChange={(event) =>
												handleSelectOne(event, customer.id)
											}
											value="true"
										/>
									</TableCell>
									<TableCell>
										<Box alignItems="center" display="flex">
											<Avatar
												className={classes.avatar}
												src={customer.avatarUrl}
											>
												{customer.name}
											</Avatar>
											<Typography color="textPrimary" variant="body1">
												{customer.name}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{customer.email}</TableCell>
									<TableCell>
										{`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
									</TableCell>
									<TableCell>{customer.phone}</TableCell>
									<TableCell>
										{moment(customer.createdAt).format("DD/MM/YYYY")}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				count={props.customers.length}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};


export default Results;
