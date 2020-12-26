/* eslint-disable jsx-a11y/alt-text */
import { Box, makeStyles, Paper, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { TripShowHome } from "../../submodules/base-ticket-team/controller.ts/TripController";
const useStyles = makeStyles((theme) => ({
	infomation: {
		width: 1000,
		paddingLeft: 20,
	},
	infoDetail: {
		background: "rgba(158,13,158, 0.3)",
		padding: 10,
		borderRadius: 10,
	},
	root: {
		padding: theme.spacing(2),
		height: 150,
		"&:hover": {
			boxShadow: "14px 8px 15px -4px rgba(0,0,0,0.29)",
			WebkitBoxShadow: "13px 7px 15px -4px rgba(0,0,0,0.29)",
			cursor: "pointer",
		},
	},
}));

type Props = {
	trip: TripShowHome;
};

export default function TripItem(props: Props) {
	const classes = useStyles();
	const history = useHistory();
	const muiTheme = useTheme();
	return (
		<Paper
			elevation={2}
			className={classes.root}
			onClick={() => history.push(`/sale/${props.trip.id}`)}
		>
			<Box display="flex" height="100%" flex={1}>
				<Box
					height="100%"
					width={120}
					borderRadius={5}
					style={{ background: muiTheme.palette.grey[300] }}
				>
					<img
						src="https://picsum.photos/1000"
						alt="car-img"
						style={{
							height: "100%",
							width: "100%",
							objectFit: "cover",
							borderRadius: 5,
						}}
					/>
				</Box>
				<Box ml={3}>
					<Box>
						<Typography variant="h3">{props.trip?.car?.name}</Typography>
					</Box>
				</Box>
			</Box>
			{/* <Box display="flex" flex={1}>
				<Grid
					style={{
						overflow: "hidden",
						height: "auto-fit",
						borderRadius: 5,
						width: 300,
					}}
				>
					<img
						style={{
							width: "100%",
						}}
						src="https://picsum.photos/1000"
					/>
				</Grid>

				<Grid
					container
					direction={"column"}
					justify={"flex-start"}
					alignItems={"flex-start"}
					className={clsx(classes.infomation)}
				>
					<Grid>
						<Link to={`/sale/${props.trip.id}`}>
							<Typography variant="h2">{props.trip?.car?.name}</Typography>
						</Link>
					</Grid>
					<Grid>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="flex-start"
							className={clsx(globalStyle.pt1)}
						>
							<Grid>
								<Chip
									label={`${moment(props.trip.route?.startAt).format(
										"HH:MM"
									)}-${moment(props.trip.timeStart).format("DD/MM/YYYY")}`}
									color={"primary"}
								/>
							</Grid>
							<Grid>
								<Grid
									item
									container
									direction="row"
									justify="center"
									alignItems="center"
									className={clsx(globalStyle.pt2, globalStyle.pb2)}
								>
									<Grid>
										<ArrowDownwardIcon />
									</Grid>
									<Grid>{`${props.trip.route?.sumTimeRun} Giờ`}</Grid>
								</Grid>
							</Grid>
							<Grid>
								<Chip
									label={`${moment(
										TimeHelper.HoursPlus(
											new Date(props.trip.route?.startAt || new Date()),
											props?.trip?.route?.sumTimeRun || 0
										)
									).format("HH:mm")}- ${moment(
										TimeHelper.TimeEndTrip(
											props.trip.timeStart || new Date(),
											props.trip.route?.startAt || new Date(),
											props.trip.route?.sumTimeRun || 0
										)
									).format("DD-MM-YYYY")}`}
									color={"primary"}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid
					className={clsx(classes.infomation)}
					container
					direction="column"
					justify="space-evenly"
					style={{}}
				>
					<Grid
						className={clsx(classes.infoDetail)}
						container
						direction="row"
						justify="space-around"
					>
						<Grid>Giá vé</Grid>
						<Grid>
							<Typography>{props.trip.price}</Typography>
						</Grid>
					</Grid>

					<Grid
						className={clsx(classes.infoDetail)}
						container
						direction="row"
						justify="space-around"
						style={{
							background: "rgba(123,215,40, 0.7)",
						}}
					>
						<Grid>Tổng số ghế</Grid>
						<Grid>
							<Typography>{`${props.trip.totalChair || 0} Ghế`}</Typography>
						</Grid>
					</Grid>

					<Grid
						className={clsx(classes.infoDetail)}
						container
						direction="row"
						justify="space-around"
					>
						<Grid>Đã đặt</Grid>
						<Grid>
							<Typography>{`${props.trip.totalChairRemain || 0}/${
								props.trip.totalChair || 0
							} Ghế`}</Typography>
						</Grid>
					</Grid>
				</Grid>

				<Grid container direction={"column"} justify={"center"} alignItems={"center"}>
					<Grid
						container
						direction="column"
						justify="flex-start"
						alignItems="center"
						className={clsx(globalStyle.pt1)}
					>
						<Grid>
							<Chip
								label={
									<Grid
										container
										direction={"row"}
										justify="center"
										alignItems={"center"}
										className={clsx(globalStyle.pr2)}
									>
										<Radio
											checked={true}
											name="radio-button-demo"
											inputProps={{ "aria-label": "B" }}
										/>
										<Typography>{props.trip?.route?.localStart}</Typography>
									</Grid>
								}
							/>
						</Grid>
						<Grid>
							<Grid
								item
								container
								direction="row"
								justify="center"
								alignItems="center"
								className={clsx(globalStyle.pt2, globalStyle.pb2)}
							>
								<Grid>
									<ArrowDownwardIcon />
								</Grid>
								<Grid>Đến</Grid>
							</Grid>
						</Grid>
						<Grid>
							<Chip
								label={
									<Grid
										container
										direction={"row"}
										justify="center"
										alignItems={"center"}
										className={clsx(globalStyle.pr2)}
									>
										<Radio
											checked={true}
											name="radio-button-demo"
											inputProps={{ "aria-label": "B" }}
										/>
										<Typography>{props.trip.route?.localEnd}</Typography>
									</Grid>
								}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Box> */}
		</Paper>
	);
}
