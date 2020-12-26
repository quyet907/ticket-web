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
			<Typography variant={"h3"}>
				<b>{props.title}</b>
			</Typography>
			<Box mt={1} mb={2} display="flex" justifyContent="space-between">
				<Box>{props.breadcrumbs}</Box>
				<Box>{props.action}</Box>
			</Box>
			<Divider />
		</Grid>
	);
}
