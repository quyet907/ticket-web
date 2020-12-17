import { Avatar, Box, Grid, Paper, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";

type Props = {
	title: string;
	value: string;
	icon: any;
};
export default function SummaryGeneral() {
	return (
		<Grid item xs={12}>
			<Paper elevation={3}>
				<Box display="flex" flexDirection="row">
					<Box>
						<Avatar
							style={{
								backgroundColor: "#fff",
								border: "1px solid grey",
								width: 56,
								height: 56,
							}}
						>
							<PersonIcon fontSize="large" color="primary"></PersonIcon>
						</Avatar>
					</Box>
					<Box
						flex={1}
						pl={3}
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
					>
						<Box>
							<Typography variant="h6" color="textSecondary" style={{textTransform: "uppercase"}}>
								Tổng khách hàng
							</Typography>
						</Box>
						<Box>
							<Typography variant="h2">
								{getFormatNumber(Math.round(Math.random() * 10000))}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
}

export function getFormatNumber(number: number) {
	return new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(number);
}
