import { Box, Chip, Container, Grid, IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { Add, Edit, Loop } from "@material-ui/icons";
import React from "react";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";

type Props = {
	ticketInfo: Ticket;
	onCreateOrEdit: (ticket: Ticket) => void;
};

export default function DetailInfoTicket(props: Props) {
	function statusUnset(): React.ReactElement {
		return (
			<Box height="100%" p={1} boxSizing="border-box">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5">A1</Typography>
					<Tooltip title="Doi ghe" enterDelay={0} leaveDelay={0} placement="top">
						<IconButton size="small">
							<Loop fontSize="small" color="secondary" />
						</IconButton>
					</Tooltip>
				</Box>
				
			
			</Box>
		);
	}

	function statusBooked(ticketInfo: Ticket): React.ReactElement {
		return (
			<Box height="100%" p={1} boxSizing="border-box">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5">A1</Typography>
					<Tooltip title="Doi ghe" enterDelay={0} leaveDelay={0} placement="top">
						<IconButton size="small">
							<Loop fontSize="small" color="secondary" />
						</IconButton>
					</Tooltip>
				</Box>
				<Box mt={1}>
					<Typography variant="h6">{ticketInfo?.customer?.phoneNumber}</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
					<Typography variant="caption">{ticketInfo?.customer?.name}</Typography>
					<Chip
						style={{ borderRadius: 5 }}
						size="small"
						label={"Đã trả tiền"}
						color={"secondary"}
					/>
				</Box>
			</Box>
		);
	}

	return (
		<Paper
			style={{
				borderRadius: 0,
				padding: 5,
				cursor: "pointer",
				position: "relative",
				height: "100%",
			}}
		>
			<Grid
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					top: 0,
					left: 0,
					outline: "none",
					background: "none",
				}}
				onClick={(e) => {
					props.onCreateOrEdit(props.ticketInfo);
				}}
			></Grid>
			<Box height="100%">
				{props.ticketInfo.id ? statusBooked(props.ticketInfo) : statusUnset()}
			</Box>
		</Paper>
	);
}
