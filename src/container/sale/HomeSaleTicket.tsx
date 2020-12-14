import {
	Container,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import TripItem from "./TripItem";
import clsx from "clsx";
import { tripController } from "../../service";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";

const useStyles = makeStyles((theme) => ({
	FormSearch: {
		background: "white",
		padding: 40,
		borderRadius: 20,
		position: "sticky",
		zIndex: 1,
	},
}));

export default function HomeSaleTicket() {
	const [tripHome , setTripHome] = useState<Paging<Trip>>({})
	const classes = useStyles();
	const globalStyle = useGlobalStyles();
	useEffect(() => {
		tripController.getListByDate({from : new Date(), to : new Date()}).then(res=>{
			console.log(res)
			setTripHome(res)
		})
	}, [])
	return (
		<Grid className={clsx(globalStyle.pp5, globalStyle.container)}>
			<Grid>
				<Typography variant={"h1"}>
					<b>Sale Ticket</b>
				</Typography>
			</Grid>
			<Grid className={clsx(globalStyle.pp5)}>
				<Grid
					container
					direction="row"
					justify="space-evenly"
					className={clsx(classes.FormSearch)}
				>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Tìm theo địa điểm"}
						/>
					</Grid>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngày bắt đầu"}
						/>
					</Grid>

					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngày kết thúc"}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				style={{
					// border: "1px solid #ccc",
					padding: 30,
				}}
			>
				{tripHome?.rows?.map(item=>(
					<TripItem
						trip = {item}
					></TripItem>
				))}
			</Grid>
		</Grid>
	);
}
