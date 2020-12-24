/* eslint-disable jsx-a11y/alt-text */
import {
	Avatar,
	Chip,
	Grid,
	makeStyles,
	Menu,
	MenuItem,
	Radio,
	Typography,
} from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import clsx from "clsx";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import moment from "moment";
import { TimeHelper } from "../../helper/TimeHelper";
import { Link } from "react-router-dom";
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
}));

type Props = {
	trip: TripShowHome;
};

export default function TripItem(props: Props) {
	const classes = useStyles();
	const globalStyle = useGlobalStyles();
	return (
		<Grid
			container
			className={clsx(
				globalStyle.border,
				globalStyle.mt3,
				globalStyle.pp1
			)}
			direction="row"
			justify="space-between"
			style={{
				flexWrap: "nowrap",
			}}
		>


	  
			<Grid
				style={{
					overflow: "hidden",
					height: "auto-fit",
					borderRadius: 20,
					width: 300,
				}}
			>
				<img
					style={{
						width: "100%",
					}}
					src="https://i.pinimg.com/474x/66/bb/b7/66bbb75c21dd28720e9de7f6448ab381.jpg"
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
						<Typography variant="h2">
							{props.trip?.car?.name}
						</Typography>
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
								label={`${moment(
									props.trip.route?.startAt
								).format("HH:MM")}-${moment(
									props.trip.timeStart
								).format("DD/MM/YYYY")}`}
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
								className={clsx(
									globalStyle.pt2,
									globalStyle.pb2
								)}
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
										new Date(
											props.trip.route?.startAt ||
												new Date()
										),
										props?.trip?.route?.sumTimeRun || 0
									)
								).format("HH:mm")}- ${moment(TimeHelper.TimeEndTrip(
									props.trip.timeStart || new Date(),
									props.trip.route?.startAt || new Date(),
									props.trip.route?.sumTimeRun || 0
								)).format("DD-MM-YYYY")}`}

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
						<Typography>{`${
							props.trip.totalChair || 0
						} Ghế`}</Typography>
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

			<Grid
				container
				direction={"column"}
				justify={"center"}
				alignItems={"center"}
				className={clsx(classes.infomation)}
			>
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
									<Typography>
										{props.trip?.route?.localStart}
									</Typography>
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
									<Typography>
										{props.trip.route?.localEnd}
									</Typography>
								</Grid>
							}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
