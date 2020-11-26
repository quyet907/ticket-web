import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { Button, ListItem, makeStyles } from "@material-ui/core";
import { IconProps } from "react-feather";

const useStyles = makeStyles((theme) => ({
	item: {
		display: "flex",
		paddingTop: 0,
		paddingBottom: 0,
	},
	button: {
		color: theme.palette.text.secondary,
		fontWeight: theme.typography.fontWeightMedium,
		justifyContent: "flex-start",
		letterSpacing: 0,
		padding: "10px 8px",
		textTransform: "none",
		width: "100%",
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	title: {
		marginRight: "auto",
	},
	active: {
		color: theme.palette.primary.main,
		"& $title": {
			fontWeight: theme.typography.fontWeightMedium,
		},
		"& $icon": {
			color: theme.palette.primary.main,
		},
	},
}));

const NavItem = (props: Props) => {
	const classes = useStyles();

	return (
		<ListItem className={clsx(classes.item, props.className)} disableGutters>
			<Button
				activeClassName={classes.active}
				className={classes.button}
				component={RouterLink}
				to={props.href}
			>
				{/* {props.icon &&  <Icon className={classes.icon} size="20" />} */}
				{props.icon && <props.icon className={classes.icon} size="20" />}
				<span className={classes.title}>{props.title}</span>
			</Button>
		</ListItem>
	);
};

type Props = {
	className?: string;
	href: string;
	icon: React.FC<IconProps>;
	title: string;
};

export default NavItem;
