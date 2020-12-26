import { Box, Breadcrumbs, Divider, Grid, Link, Typography } from "@material-ui/core";
import React from "react";

type Props = {
	title: string;
	breadcrumbs: React.ReactNode;
	action?: React.ReactNode;
};

export default function Header(props: Props) {
	return (
		<Grid>
			<Box
				mt={1}
				mb={1}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography variant={"h3"}>
					<b>{props.title}</b>
				</Typography>
				{props.action}
			</Box>

			<Box mb={2}>
				<Box>{props.breadcrumbs}</Box>
			</Box>
			<Divider />
		</Grid>
	);
}
