import React, { useEffect, useState } from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, TextField } from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "react-router-dom";
import { PositionStaff } from "../../base-ticket-team/base-carOwner/PositionStaff";
// import { PositionStaff } from "../../base-ticket-team/base-carOwner/PositionStaff";

const styles = (theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			padding: theme.spacing(2),
		},
		closeButton: {
			position: "absolute",
			right: theme.spacing(1),
			top: theme.spacing(1),
			color: theme.palette.grey[500],
		},
	});

export interface DialogTitleProps extends WithStyles<typeof styles> {
	children: React.ReactNode;
	onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

type Props = {
	data: PositionStaff;
	isDisplay: boolean;
	onClose(): void;
	onSave(position: PositionStaff): void;
};

export default function AddOrEditDialog(props: Props) {
	const [data, setData] = useState<PositionStaff>({} as PositionStaff);

	useEffect(() => {
		setData(props.data);
	}, [props.data]);

	return (
		<Dialog fullWidth maxWidth="sm" onClose={props.onClose} open={props.isDisplay}>
			<DialogTitle onClose={props.onClose}>Sua chức vụ</DialogTitle>
			<DialogContent dividers>
				<TextField
					fullWidth
					label="Email Address"
					margin="normal"
					name="Tên chức vụ"
					type="text"
					variant="outlined"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				<TextField
					fullWidth
					label="Password"
					margin="normal"
					name="Mô tả"
					type="text"
					variant="outlined"
					value={data.description}
					onChange={(e) => setData({ ...data, description: e.target.value })}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => props.onSave(data)}
					type="submit"
					variant="contained"
					color="primary"
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
