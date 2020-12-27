import {
	Dialog,
	DialogContent,
	Grid,
	Typography,
	DialogActions,
	Button,
	makeStyles,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";

const useStyle = makeStyles((theme) => ({
	box: {
		borderRadius: 20,
		padding: 20,
		background: theme.palette.background.default,
	},
	textarea: {
		width: "100%",
		resize: "vertical",
	},
}));

export default function PopupAccount() {
	const classes = useStyle();
	const globalStyle = useGlobalStyles();
	return (
		<Dialog
			fullWidth
			maxWidth={"lg"}
			open={true}
			onClose={() => {}}
			aria-labelledby="max-width-dialog-title"
		>
			<DialogContent>
				<Grid
					container
					direction="row"
					justify="space-around"
					style={{
						display: "flex",
						flexWrap: "nowrap",
					}}
				>
					<Grid style={{ width: 1000, padding: 20 }}>
						<Grid>
							<Grid container justify="center">
								<Typography variant="h1">
									Tài khoản và phân quyền
								</Typography>
							</Grid>
							<Grid
								container
								direction="column"
								justify="space-evenly"
								style={{ padding: 20 }}
							>
								



								
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => {}} color="default">
					Close
				</Button>

				<Button type={"submit"} onClick={() => {}} color="primary">
					Đặt
				</Button>
			</DialogActions>
		</Dialog>
	);
}
