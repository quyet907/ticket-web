import { Box, Breadcrumbs, Divider, Grid, Link, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import theme from "../../theme/MuiTheme";

type Props = {
	title: string;
	breadcrumbs?: React.ReactNode;
	action?: React.ReactNode;
};

export default function Header(props: Props) {
	const globalStyles = useGlobalStyles()
	return (
		<Grid
			item
			container
			alignItems="center"
			direction="row"
			style={{ marginBottom: theme.spacing(3) }}
		>
			<Typography variant={"h3"}>
				<b>{props.title}</b>
			</Typography>
			<Typography variant="h3">&nbsp;|&nbsp;</Typography>
			<Box mb={-0.7}>
				<Breadcrumbs separator="›" aria-label="breadcrumb">
					<Link
						color="inherit"
						href="/dashboard"
						// onClick={() => {history.push}}
					>
						<Home color="disabled" className={globalStyles.logoHome} />
					</Link>
					<Link
						color="inherit"
						href="#"
						// onClick={() => {history.push}}
					>
						<Typography
							variant="h6"
							color="primary"
						>
							{props.title}
						</Typography>
					</Link>
				</Breadcrumbs>
			</Box>
		</Grid>
	);
}
