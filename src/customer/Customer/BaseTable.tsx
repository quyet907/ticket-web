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
	IconButton,
	Button,
	Chip,
} from "@material-ui/core";
// import getInitials from "src/utils/getInitials";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteIcon from "@material-ui/icons/Delete";
import { IList } from "../../base-ticket-team/query/IList";
import { PositionStaff } from "../../base-ticket-team/base-carOwner/PositionStaff";
import { Paging } from "../../base-ticket-team/query/Paging";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useTheme } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const classes = useStyles();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

const BaseTable = (props: Props) => {
	const classes = useStyles();
	const [selectedCustomerIds, setSelectedCustomerIds] = useState<any[]>([]);

	const handleLimitChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		props.onQuery({ ...props.query, pageSize: parseInt(event.target.value) });
	};

	const handlePageChange = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		page: number
	) => {
		props.onQuery({ ...props.query, page: page + 1 });
	};

	const labelsFake: string[] = ["Ten", "Mo ta", "Mac dinh", "Hanh dong", "Hanh dong"];
	const values: string[] = ["Ten", "Mo ta", "Mac dinh", "Hanh dong"];

	return (
		<Card className={clsx(classes.root, props.className)}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Tên chức vụ</TableCell>
								<TableCell
									key={"dfjjk"}
									align={"left"}
									padding={"default"}
									sortDirection={false}
								>
									<TableSortLabel
										active={true}
										direction={ "asc"}
										// onClick={createSortHandler(headCell.id)}
									>
										{/* {headCell.label} */}
										{/* {orderBy === headCell.id ? ( */}
										{/* <span className={classes.visuallyHidden}> */}
										{/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
										{/* </span> */}
										{/* ) : null} */}
										Mô tả
									</TableSortLabel>
								</TableCell>
								<TableCell>Mặc định</TableCell>
								<TableCell>Edit</TableCell>
								<TableCell>Remove</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{props.position.rows.map((position) => (
								<TableRow
									hover
									key={position._id}
									selected={selectedCustomerIds.indexOf(position._id) !== -1}
								>
									<TableCell>
										<Box alignItems="center" display="flex">
											<Avatar className={classes.avatar} src={""}></Avatar>
											<Typography color="textPrimary" variant="body1">
												{position.name}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{position.description} </TableCell>
									<TableCell>{"TRUE"}</TableCell>
									<TableCell>
										<Button
											color="primary"
											size="small"
											variant="contained"
											onClick={() => props.onCreateOrUpdate(position)}
										>
											{/* <DeleteIcon /> */}
											<Typography variant="h6">Sửa</Typography>
										</Button>
									</TableCell>
									<TableCell>
										<Button
											color="inherit"
											size="small"
											variant="contained"
											onClick={() => props.onDelete(position._id || "")}
										>
											{/* <DeleteIcon /> */}
											<Typography variant="h6">Xóa</Typography>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component="div"
				colSpan={3}
				count={props.position.total}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={props.query.page - 1 || 0}
				rowsPerPage={props.query.pageSize || 5}
				rowsPerPageOptions={[5, 10, 25, { label: "ALL", value: -1 }]}
				ActionsComponent={TablePaginationActions}
			/>
		</Card>
	);
};

export default BaseTable;

interface HeadCell {
	// disablePadding: boolean;
	// id: string;
	// label: string;
	// numeric: boolean;
	id: string;
	label: string;
	
}

type Props = {
	className?: string;
	position: Paging<PositionStaff>;
	query: IList;
	onQuery(query: IList): void;
	onCreateOrUpdate(position: PositionStaff): void;
	onDelete(id: string): void;
	tableHead?: HeadCell[];
	values?: any[];
};
