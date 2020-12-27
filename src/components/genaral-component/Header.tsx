import { Box, Breadcrumbs, Divider, Grid, Link, Typography } from "@material-ui/core";
import React from "react";

type Props = {
	title: string;
	breadcrumbs: React.ReactNode;
	action?: React.ReactNode;
};

export default function Header(props: Props) {
	return (
		<Box mb={3}>
			<Box   display="flex" justifyContent="space-between" alignItems="center">
				<Box display="flex">
					<Typography variant={"h3"}>
						<b>{props.title}</b>
					</Typography>
					<Box>{props.breadcrumbs}</Box>
				</Box>
				{props.action}
			</Box>
		</Box>
	);
}
