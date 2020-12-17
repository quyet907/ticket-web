import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import clsx from "clsx";
import PersonIcon from "@material-ui/icons/Person";

type Props = {
	title: string;
	value: string;
	icon: any;
};
export default function SummaryGeneral() {
	const globalStyle = useGlobalStyles();
	return (
		<Grid xs={6} container className={clsx(globalStyle.pr3)}>
			<Grid
				container
				direction="row"
                justify="center"
                alignItems = {"stretch"}
				className={clsx(globalStyle.border)}
			>
				<Grid style = {{height : "100%"}} item xs= {3}  >
					<Grid container direction="column" justify="center" alignItems="center" style = {{
                        height : "100%",
                        width : "100%",
                    }}>
                    <PersonIcon  style = {{fontSize : 50}}></PersonIcon>
                    </Grid>
				</Grid>
				<Grid item xs= {9} >
					<Grid
                    style = {{height : "100%"}}
						container
						direction="column"
						justify={"space-evenly"}
						alignItems={"center"}
					>
						<Grid>
							<Typography variant="h4">
								Tổng khách hàng
							</Typography>
						</Grid>
						<Grid>
							<Typography variant="h1">25.0000</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
