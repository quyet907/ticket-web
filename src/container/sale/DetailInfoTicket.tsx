import {
	Box,
	Chip,
	Container,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Tooltip,
	Typography,
	useTheme,
} from "@material-ui/core";
import { Add, Close, Edit, Loop, Print } from "@material-ui/icons";
import React from "react";
import { StatusTicket, Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import clsx from "clsx";
import PhoneIcon from '@material-ui/icons/Phone';
type Props = {
	ticketInfo: Ticket;
	onClick: (ticket: Ticket) => void;
	selected: boolean;
	onPrint :()=> void;
	onDeleted: (ticket : Ticket) => void;

};

const useStyles = makeStyles((theme) => ({
	iconButtonAlert: {
		color: `${theme.palette.grey[400]} !important`,
		borderColor: theme.palette.grey[400],
		border: "1px solid",
		"&:hover": {
			color: `${theme.palette.common.white} !important`,
			backgroundColor: `${theme.palette.error.main} !important`,
			borderColor: theme.palette.error.main,
			border: "1px solid",
		},
	},
	iconButtonDefault: {
		color: `${theme.palette.primary.main} !important`,
		borderColor: theme.palette.primary.main,
		border: "1px solid",
		"&:hover": {
			color: `${theme.palette.common.white} !important`,
			backgroundColor: `${theme.palette.primary.main} !important`,
			borderColor: theme.palette.primary.main,
			border: "1px solid",
		},
	},
	root: {
		cursor: "pointer",
		transition: "ease-in-out 0.3s",
		display: "flex",
		flexDirection: "column",
		boxShadow: "none",
		border: "1px solid #ddd",
		"&:hover": {
			boxShadow: "0px 0px 10px 1px rgba(2,0,0,0.1)",
			// borderColor: "white",
		},
	},
	active: {
		background: theme.palette.primary.main,
	},
	activeText: {
		color: theme.palette.common.white,
	},
	activeButton: {
		color: `${theme.palette.common.white} !important`,
		borderColor: theme.palette.common.white,
		backgroundColor: `${theme.palette.primary.main} !important`,
		border: "1px solid",
		"&:hover": {
			color: `${theme.palette.primary.main} !important`,
			backgroundColor: `${theme.palette.common.white} !important`,
			borderColor: theme.palette.common.white,
			border: "1px solid",
		},
	},
	label: {
		display: "-webkit-box",
		WebkitLineClamp: 1,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	desc: {
		display: "-webkit-box",
		WebkitLineClamp: 3,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
		wordWrap: "break-word",
		lineHeight: "1.5rem !important",
	},
}));

export default function DetailInfoTicket(props: Props) {
	const classes = useStyles();
	const materialTheme = useTheme();

	function colorStatus ():"primary" | "default" | "secondary"{
		if(props.ticketInfo.statusTicket=== StatusTicket.order){
			return "secondary"
		}
		if(props.ticketInfo.statusTicket=== StatusTicket.payed){
			return "primary"
		}
		return "default"
	}

	function getStatus() {
		if(props.ticketInfo.statusTicket=== StatusTicket.order){
			return "Đặt trước"
		}
		if(props.ticketInfo.statusTicket=== StatusTicket.payed){
			return "Đã trả tiền"
		}

		if(props.ticketInfo.statusTicket === StatusTicket.welcomed){
			return "Đã đón"
		}

		return "Khác"
		
	}

	function statusUnset(): React.ReactElement {
		return (
			<Box
				height="100%"
				p={1}
				boxSizing="border-box"
				style={{ background: props.selected ? materialTheme.palette.primary.main : "none" }}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5">{props.ticketInfo.chair_car?.name}</Typography>
					<Tooltip title="Doi ghe" enterDelay={0} leaveDelay={0} placement="top">
						<IconButton size="small" >
							{/* <Loop fontSize="small" color="secondary" /> */}
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
		);
	}

	function statusBooked(ticketInfo: Ticket): React.ReactElement {
		return (
			<Box
				height="100%"
				p={1}
				boxSizing="border-box"
				style={{ background: props.selected ? materialTheme.palette.primary.main : "none" }}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h5">{props.ticketInfo.chair_car?.name}</Typography>
					<Box>
						<Tooltip title="Gọi điện" enterDelay={0} leaveDelay={0} placement="top">
							<IconButton size="small" onClick = {(e)=> props.onPrint()}>
								<PhoneIcon fontSize="small" color="secondary" onClick ={()=>{
									window.location.href = `tel:${ticketInfo?.customer?.phoneNumber}`
								}} />
								{/* <a href="tel:1-847-555-5555">Call</a> */}
							</IconButton>
						</Tooltip>
						<Tooltip title="Xóa vé" enterDelay={0} leaveDelay={0} placement="top">
							<IconButton size="small" onClick = {(e)=> props.onDeleted(props.ticketInfo)}>
								<Close fontSize="small" style={{ color: "red" }} />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
				<Box mt={1}>
					<Typography
						variant="h6"
						className={clsx(
							classes.label,
							classes.desc,
							props.selected ? classes.activeText : ""
						)}
					>
						

						{ticketInfo?.customer?.phoneNumber}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
					<Typography
						variant="caption"
						className={clsx(
							classes.label,
							classes.desc,
							props.selected ? classes.activeText : ""
						)}
					>
						{ticketInfo?.customer?.name}
					</Typography>
					<Chip size="small" label={getStatus()} color={colorStatus()} />
				</Box>
			</Box>
		);
	}

	return (
		<Paper
			style={{
				borderRadius: 5,
				cursor: "pointer",
				position: "relative",
				height: "100%",
			}}
			className={clsx(classes.root, props.selected ? classes.active : "")}
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
					props.onClick(props.ticketInfo);
				}}
			></Grid>
			<Box height="100%">
				{props.ticketInfo.id ? statusBooked(props.ticketInfo) : statusUnset()}
			</Box>
		</Paper>
	);
}
