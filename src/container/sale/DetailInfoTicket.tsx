import { Chip, Container, Grid } from "@material-ui/core";
import React from "react";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";

type Props = {
	ticketInfo: Ticket;
	onCreateOrEdit : (ticket : Ticket) => void;
};

export default function DetailInfoTicket(props: Props) {
	function statusUnset(): React.ReactElement {
		return (
			<Grid style={{ padding: 3 }}>
				<Chip
					label={"Ghế trống"}
					color={"primary"}
				/>
			</Grid>
		);
	}

	function statusBooked(ticketInfo:Ticket) : React.ReactElement{
		return(
			<Grid>
				<Grid style={{ padding: 3 }}>
						<Chip
							label={
								ticketInfo?.metaMapping?.customer?.name
							}
							color={"primary"}
						/>
					</Grid>
					<Grid style={{ padding: 3 }}>
						<Chip
							label={
								ticketInfo?.metaMapping?.customer
									?.phoneNumber
							}
							color={"default"}
						/>
					</Grid>
					<Grid style={{ padding: 3 }}>
						<Chip label={"Đã trả tiền"} color={"primary"} />
					</Grid>
			</Grid>
		)
	}

	return (
		<Grid item style={{ padding: 5 }}>
			<Grid
				container
				direction={"column"}
				style={{
					border: "1px solid #ccc",
					borderRadius: 10,
					padding: 5,
					cursor: "pointer",
					position : "relative"
				}}
				alignItems="center"
				justify="center"
			>
				<Grid
					style = {{
						position : "absolute",
						height : "100%",
						width  : "100%",
						top : 0,
						left : 0,
						borderRadius : 20,
						outline: "none",
						background: "none"
					}}
					onClick= {(e=>{
						props.onCreateOrEdit(props.ticketInfo)
					})}
				>
				</Grid>
				<Grid>
					{(props.ticketInfo.id) ? (statusBooked(props.ticketInfo)): (statusUnset())}
				</Grid>
			</Grid>
		</Grid>
	);
}
