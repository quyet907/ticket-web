import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
	DialogActions,
	makeStyles,
	Theme,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";

export enum TypeConfirmPopUp {
	DELETE = "DEL",
	YESNO = "YESNO",
}

const useStyles = makeStyles((theme: Theme) => ({
	digActions: {
		marginTop: theme.spacing(1),
	},
	buttonAlert: {
		paddingRight: theme.spacing(5),
		paddingLeft: theme.spacing(5),
	},
}));

function PopUpConfirm(props: Props) {
	const classes = useStyles();
	return (
		<Dialog open={props.isDisplay} fullWidth={true} maxWidth={"sm"}>
			<DialogTitle id="customized-dialog-title">
				<Grid item xs={12}>
					<Typography variant="h4" color="error" align="center">
						Cảnh báo
					</Typography>
				</Grid>
				<Box
					style={{
						position: "absolute",
						top: "1.5rem",
						right: "1.5rem",
					}}
				>
					<IconButton
						aria-label="close"
						onClick={() => {
							props.onCancel();
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent>
				<Grid container direction="column">
					<Grid item xs={12}>
						<Typography
							variant="h6"
							align="center"
							color="textPrimary"
						>
							Bạn có chắc chắn xóa ??
						</Typography>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions>
				<Grid item xs={12} className={classes.digActions}>
					<Grid
						item
						container
						xs={12}
						direction="row"
						justify="space-evenly"
						alignItems="center"
					>
						<Button
							className={classes.buttonAlert}
							startIcon={<CloseIcon />}
							variant="contained"
							size="medium"
							color={"default"}
							onClick={() => {
								props.onCancel();
							}}
						>
							{"Hủy"}
						</Button>

						<Button
                            variant="contained"
							// size="small"
							startIcon={<DeleteIcon />}
							color="primary"
							onClick={() => {
								props.onDelete();
							}}
						>
							Chấp nhận
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	);
}

export default PopUpConfirm;

type Props = {
	isDisplay: boolean;
	onDelete: () => void;
	onCancel: () => void;
};

