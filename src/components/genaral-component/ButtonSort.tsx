import { Fab, makeStyles, withStyles } from "@material-ui/core";
import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

type Props = {
	direction: "desc" | "asc" | "none";
	active: boolean;
	onClick: () => void;
};
const usesStyle = makeStyles((theme) => ({
	root: {
		color: "white",
		// padding: 10,
		"&:hover": {
			color: "white",
		},
	},
}));
const Sort = withStyles((theme) => ({
	root: {
		background: "none",
		boxShadow: "none",
		padding: 0,
		minHeight: 10,
	},
}))(Fab);
export default function ButtonSort(props: Props) {
	const classes = usesStyle();
	return (
		<Sort
			size={"small"}
			onClick={(e) => {
				props.onClick();
			}}
		>
			{
                (props.active)? (props.direction === "asc") ? (
                    <ArrowUpwardIcon className={classes.root} />
                ) : (
                    <ArrowDownwardIcon className={classes.root} />
                ) : <ImportExportIcon className={classes.root}/>
            }
		</Sort>
	);
}
