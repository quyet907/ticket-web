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

const useStyles = makeStyles((theme) => ({
	root: {},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

type Props = {
	className?: string;
	position: Paging<PositionStaff>;
	query : IList;
	onQuery(query : IList) :void ;
	onCreateOrUpdate(position: PositionStaff ): void;
	onDelete(id : string) :void;
};

const Results = (props: Props) => {
	const classes = useStyles();
	const [selectedCustomerIds, setSelectedCustomerIds] = useState<any[]>([]);

	const handleLimitChange = ((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		props.onQuery({...props.query,pageSize: parseInt(event.target.value)});
	});

	const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
		props.onQuery({...props.query,page : page+1})
	};

	return (
		<Card className={clsx(classes.root, props.className)}>
			<PerfectScrollbar>
				<Box minWidth={1050}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Tên chức vụ</TableCell>
								<TableCell>Mô tả</TableCell>
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
											<Avatar
												className={classes.avatar}
												src={""}
											>
												
											</Avatar>
											<Typography color="textPrimary" variant="body1">
												{position.name}
											</Typography>
										</Box>
									</TableCell>
									<TableCell> {position.description} </TableCell>
									<TableCell>
									{"TRUE"}
									</TableCell>
									<TableCell>
										<Button color="primary"
											size="small"
										 	variant="contained"
											 onClick = {()=>props.onCreateOrUpdate(position)}
											 >
											
											{/* <DeleteIcon /> */}
											<Typography variant="h6">Sửa</Typography>
										</Button>
									</TableCell>
									<TableCell>
										<Button color="inherit" 
											size="small" 
											variant="contained"
											onClick = {()=>props.onDelete(position._id||"")}
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
				count={props.position.total}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleLimitChange}
				page={props.query.page-1||0}
				rowsPerPage={props.query.pageSize|| 5}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

export default Results;
