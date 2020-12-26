import { Avatar, Box, Grid, Paper, Typography, useTheme } from "@material-ui/core";
import React from "react";

type Props = {
	title: string;
	value: number;
	icon: any;
	isMoney?: boolean;
};

export default function SummaryGeneral(props: Props) {
	const muiTheme = useTheme()
	return (
		<Grid item xs={12}>
			<Paper elevation={3} style={{padding: muiTheme.spacing(2), height: 100}}>
				<Box display="flex" flexDirection="row">
					<Box>
						<Avatar
							style={{
								backgroundColor: muiTheme.palette.common.white,
								border: "1px solid grey",
								width: 56,
								height: 56,
							}}
						>
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
