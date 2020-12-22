import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { Button, Grid, Icon, ListItem, makeStyles } from "@material-ui/core";
import { IconProps } from "react-feather";

const useStyles = makeStyles((theme) => ({
	item: {
		display: "flex",
		paddingTop: 0,
		paddingBottom: 0,
	},
	button: {
		color: "black",
		fontSize: "1rem",
		fontWeight: theme.typography.fontWeightMedium,
		justifyContent: "flex-start",
		letterSpacing: 0,
		padding: "10px 8px",
		textTransform: "none",
		width: "100%",
		"&:hover": {
			background: theme.palette.primary.main,
			color: "white"
		}
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	title: {
		marginRight: "auto",
	},
	active: {
		color: "white",
		backgroundColor: theme.palette.primary.main,
		"& $title": {
			fontWeight: theme.typography.fontWeightMedium,
		},
		"& $icon": {
			color: "white",
		},
	},
}));

const NavItem = (props: Props) => {
	const classes = useStyles();

	return (
		<ListItem
			className={clsx(classes.item, props.className)}
			disableGutters
		>
			<Grid container direction="row" justify="center">
				<Grid style={{ padding: 4 }}>
					<Button
						style={{ width: 150 }}
						activeClassName={classes.active}
						className={classes.button}
						component={RouterLink}
						to={props.href}
						onClick={props.onClick}
					>
						{props.icon && (
							<props.icon className={classes.icon} size="20" />
						)}
						<span className={classes.title}>{props.title}</span>
					</Button>
				</Grid>
			</Grid>
		</ListItem>
	);
};

type Props = {
	className?: string;
	href: string;
	icon: React.FC<IconProps>;
	title: string;
	onClick :()=> void
};

export default NavItem;
