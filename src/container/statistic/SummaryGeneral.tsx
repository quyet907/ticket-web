import { Avatar, Box, Grid, Paper, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from '@material-ui/icons/People';
import React from "react";

type Props = {
	title: string;
	value: number;
	icon: any;
	isMoney?: boolean;
};

export default function SummaryGeneral(props: Props) {
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
							{/* <props.icon fontSize="large" color="primary"/> */}
							{props.icon}
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
							<Typography variant="h6" color="textSecondary" style={{ textTransform: "uppercase" }}>
								{props.title}
							</Typography>
						</Box>
						<Box>
							<Typography variant="h2">
								{/* {getFormatNumber(Math.round(Math.random() * 10000))} */}
								{props.isMoney ?
									Intl.NumberFormat("de-DE", {
										style: "currency",
										currency: "VND",
									}).format(Number(props.value))
									: Intl.NumberFormat().format(props.value)}
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
