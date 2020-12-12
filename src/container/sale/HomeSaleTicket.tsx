import { Container, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import TripItem from "./TripItem";
import clsx from "clsx";

export default function HomeSaleTicket() {
	const globalStyle = useGlobalStyles();
	return (
		<Grid className={clsx(globalStyle.pp5, globalStyle.container)}>
			<Grid>
				<Typography variant={"h1"}>
					<b>Sale Ticket</b>
				</Typography>
			</Grid>
			<Grid>
				<Grid container direction="row" justify="space-evenly" className = {clsx(globalStyle.pp3)}>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Nơi đến"}
						/>
					</Grid>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Nơi đâu"}
						/>
					</Grid>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Từ ngày"}
						/>
					</Grid>

					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Tới ngày"}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid>
				<TripItem></TripItem>
				<TripItem></TripItem>
				<TripItem></TripItem>
				<TripItem></TripItem>
				<TripItem></TripItem>
			</Grid>
		</Grid>
	);
}
