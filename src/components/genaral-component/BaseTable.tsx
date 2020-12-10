import { Box, Card, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import PerfectScrollbar from "react-perfect-scrollbar";
import clsx from "clsx";


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
				{theme.direction === "rtl" ? <LastPageIcon/> : <FirstPageIcon/>}
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

export default function BaseTable<T>(props: Props<T>) {
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

	function checkActionSort(label: string): boolean {
		if (typeof props.query.sort == "string") {
			if (props.query.sort === `${label}` || props.query.sort === `-${label}`) {
				return true;
			}
			return false;
		}
		var check = props.query.sort?.find((sort) => sort === `${label}` || sort === `-${label}`);
		return check ? true : false;
	}

	function checkDirection(label: string): "desc" | "asc" | undefined {
		if (typeof props.query.sort == "string") {
			if (props.query.sort === `${label}` || props.query.sort === `-${label}`) {
				return "asc";
			}
			return "desc";
		}
		var check = props.query.sort?.find((sort) => sort === `${label}` || sort === `-${label}`);
		if (!check) return undefined;
		if (check === `${label}`) return "desc";
		return "asc";
	}

	function onSort(label: string) {
		var getSort: string[] = [];

		if (typeof props.query.sort == "string") {
			getSort.push(label);
		} else {
			getSort = props.query?.sort || [];
			var check = getSort?.findIndex((sort) => sort === `${label}` || sort === `-${label}`);
			if (check !== undefined && check < 0) {
				getSort.push(label);
			}
			if (check !== undefined && check >= 0) {
				if (getSort[check] === `${label}`) {
					getSort[check] = `-${label}`;
				} else if (getSort[check] === `-${label}`) {
					getSort.splice(check, 1);
				}
			}
		}

		props.onQuery({ ...props.query, sort: getSort });
	}

	return (
		<Card className={clsx(classes.root, props.className)}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								{props.iTable(props.data.rows || []).header.map((header: HeadCell<T>) => {
									return (
										<TableCell
											key={"dfjjk"}
											align={"left"}
											padding={"default"}
											// sortDirection={"asc"}
										>
											<TableSortLabel
												active={checkActionSort(header.id.toString())}
												direction={checkDirection(header.id.toString())}
												onClick={(e) => {
													onSort(header.id.toString());
												}}
											>
												{header.label}
											</TableSortLabel>
										</TableCell>
									);
								})}
							</TableRow>
						</TableHead>

						<TableBody>
							{props
								.iTable(props.data.rows || [])
								.value.map((valueTable: React.ReactNode[]) => (
									<TableRow
										hover
										key={""}
										selected={selectedCustomerIds.indexOf("") !== -1}
									>
										{valueTable.map((label: React.ReactNode) => (
											<TableCell >{label} </TableCell>
										))}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>

			<TablePagination
				component="div"
				colSpan={3}
				count={props.data.total || 0}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={(props.query?.page || 0 ) -1 }
				rowsPerPage={props.query.pageSize || 5}
				rowsPerPageOptions={[5, 10, 25, { label: "ALL", value: -1 }]}
				ActionsComponent={TablePaginationActions}
			/>
		</Card>
	);
}

export interface HeadCell<T> {
	// disablePadding: boolean;
	// numeric: boolean;
	id: keyof T | "";
	label: string;
}

export interface IBaseTable<T> {
	header: HeadCell<T>[];
	value: Array<T[]>;
	paging: Paging<T>;
}

type Props<T> = {
	className?: string;
	data: Paging<T>;
	query: IList;
	onQuery(query: IList): void;
	iTable: (data: T[]) => IBaseTable<T>;
};
