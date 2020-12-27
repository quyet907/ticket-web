import {
	Box,

	colors,
	Grid,
	Paper,

	Typography,
	withStyles
} from "@material-ui/core";
import {
	RepeatRounded
} from "@material-ui/icons";
import React from "react";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import theme from "../../theme/MuiTheme";

const TypoCustom = withStyles((theme) => ({
	root: {
		color: colors.blue[900],
	},
}))(Typography);

export class PrintTicket extends React.PureComponent<Props, State> {
	render() {
		return (
			<Paper
				elevation={2}
				// style={{ width: 300 }}
				// className={classes.root}
			>
				<Grid container xs={8} style={{ padding: theme.spacing(1) }}>
					<Grid item xs={12} container direction="row">
						<Grid item xs={8}>
							<Typography variant="h4" style={{ fontWeight: "bold", color: colors.red[900] }}>
								Cong ty trach nhiem huu han ABC
							</Typography>
							<TypoCustom variant="h5">
								D/c: 25 Phan Chu Trinh, P. Thang Loi, TP. BMT
							</TypoCustom>
							<TypoCustom variant="h5">MST: 3000 416 620</TypoCustom>
							<TypoCustom variant="h5">DD: 0909.999.888 - 0908.774.999</TypoCustom>
						</Grid>
						<Grid item xs={4}>
							<TypoCustom variant="h5">Ma so: 01 VEDB3/001</TypoCustom>
							<TypoCustom variant="h5">Ky hieu: QT/16P</TypoCustom>
							<TypoCustom variant="h5" display="inline">
								No:{" "}
								<Typography
									variant="h3"
									display="inline"
									style={{ color: colors.red[900], fontWeight: "bold"  }}
								>
									141494
								</Typography>{" "}
							</TypoCustom>
						</Grid>
					</Grid>
					<Grid
						container
						xs={12}
						justify="center"
						style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
					>
						<TypoCustom variant="h1" style={{ color: colors.red[900] , fontWeight: "bold" }}>
							Vé xe khách
						</TypoCustom>
					</Grid>

					<Grid container spacing={1} direction="column">
						<Box display="flex" height={30}>
							<TypoCustom variant="h4">Tuyen duong:</TypoCustom>
							<Typography
								variant="h3"
								style={{
									marginLeft: "1em",
									fontWeight: "bold",
									color: colors.red[900],
								}}
							>
								Ho Chi Minh
							</Typography>
							<RepeatRounded
								fontSize="small"
								style={{
									marginLeft: "0.5em",
									marginRight: "0.5em",
									color: colors.red[900],
								}}
							/>
							<Typography
								variant="h3"
								style={{ fontWeight: "bold", color: colors.red[900] }}
							>
								Ha Noi{" "}
							</Typography>
						</Box>

						<Box display="flex" height={30}>
							<TypoCustom variant="h4">So ghe:</TypoCustom>
							<TypoCustom variant="h4" style={{ marginLeft: "1em", fontWeight: "bold" }}>
								L1A
							</TypoCustom>
						</Box>

						<Box display="flex" height={30}>
							<TypoCustom variant="h4">Thoi gian khoi hanh:</TypoCustom>
							<TypoCustom
								variant="h3"
								style={{ marginLeft: "1em", fontWeight: "bold" }}
							>
								19
							</TypoCustom>
							<TypoCustom style={{ marginLeft: "1em" }}>gio</TypoCustom>
							<TypoCustom
								variant="h3"
								style={{ marginLeft: "1em", fontWeight: "bold" }}
							>
								00
							</TypoCustom>
							<TypoCustom style={{ marginLeft: "1em" }}>phut</TypoCustom>
						</Box>

						<Box display="flex" height={30}>
							<TypoCustom variant="h4">Gia ve:</TypoCustom>
							<Typography
								variant="h2"
								style={{
									marginLeft: "2em",
									fontWeight: "bold",
									color: colors.red[900],
								}}
							>
								{250000}
							</Typography>
						</Box>

						<Box>
							<TypoCustom
								variant="caption"
								style={{
									marginLeft: "1em",
									fontWeight: "bold",
									fontStyle: "italic",
								}}
							>
								(Gia da bao gom thue GTGT va bao hiem hanh khach)
							</TypoCustom>
						</Box>

						<Box display="flex" justifyContent="flex-end">
							<TypoCustom
								variant="caption"
								style={{
									marginRight: "1em",
									fontWeight: "bold",
									fontStyle: "italic",
								}}
							>
								Ngay {new Date().getDate()} thang {new Date().getMonth() + 1} nam{" "}
								{new Date().getFullYear()}
							</TypoCustom>
						</Box>
						<Box display="flex" justifyContent="flex-end" mr={6}>
							<TypoCustom
								variant="caption"
								style={{
									fontWeight: "bold",
									fontStyle: "italic",
								}}
							>
								Nguoi ban ve
							</TypoCustom>
						</Box>

						<Box display="flex" justifyContent="flex-end" height={50}></Box>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}

type Props = {
	trip: Trip;
	ticket: Ticket;
};

type State = {};
