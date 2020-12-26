/* eslint-disable jsx-a11y/alt-text */
import { Box, Chip, makeStyles, Paper, Typography, useTheme } from "@material-ui/core";
import {
	AccessTimeRounded,
	EventSeatRounded,
	LocationOnOutlined,
	MyLocationOutlined,
	NavigateNextOutlined,
} from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import { TimeHelper } from "../../helper/TimeHelper";
import { TripShowHome } from "../../submodules/base-ticket-team/controller.ts/TripController";
const useStyles = makeStyles((theme) => ({
	information: {
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
		height: 180,
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

	const isRemain = (props?.trip?.totalChair || 0) - (props?.trip?.totalChairRemain || 0) > 0;

	return (
		<Paper
			elevation={2}
			className={classes.root}
			onClick={() => history.push(`/sale/${props.trip.id}`)}
		>
			<Box display="flex" height="100%" flex={1}>
				<Box
					height="100%"
					width={150}
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
				<Box
					flex={1}
					ml={3}
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
				>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box display="flex" alignItems="center">
							<Typography variant="h3">{props.trip?.car?.name}</Typography>
							<Box ml={2}></Box>
							{isRemain ? (
								<Chip size="small" label={"Còn ghế"} color={"secondary"} />
							) : (
								<Chip size="small" label={"Hết ghế"} color={"default"} />
							)}
						</Box>
						<Box display="flex">
							<Typography variant="h4">
								{props.trip.price?.toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})}
							</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center">
						<Box display="flex" alignItems="center">
							<Box mr={1}>
								<AccessTimeRounded />
							</Box>
							<Typography variant="h5">{moment(props.trip.timeStart).format("DD-MM-YYYY")}</Typography>
						</Box>

						<Box display="flex" alignItems="center" ml={3}>
							<Box mr={1}>
								<EventSeatRounded />
							</Box>
							<Typography variant="h6">{`${props.trip.totalChairRemain || 0}/${
								props.trip.totalChair || 0
							} Ghế`}</Typography>
						</Box>
					</Box>

					<Box display="flex">
						<Box display="flex">
							<Box mr={1}>
								<MyLocationOutlined />
							</Box>
							<Box>
								<Typography variant="h4">{`${moment(
									props.trip.route?.startAt
								).format("HH:MM")}`}</Typography>
								<Typography variant="h6" color="textSecondary">
									{props.trip?.route?.localStart}
								</Typography>
							</Box>
						</Box>
						<Box mx={3}>
							<NavigateNextOutlined />
						</Box>
						<Box display="flex">
							<Box mr={1}>
								<LocationOnOutlined />
							</Box>
							<Box>
								<Typography variant="h4">{`${moment(
									TimeHelper.HoursPlus(
										new Date(props.trip.route?.startAt || new Date()),
										props?.trip?.route?.sumTimeRun || 0
									)
								).format("HH:mm")}`}</Typography>
								<Typography variant="h6" color="textSecondary">
									{props.trip?.route?.localEnd}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			
		</Paper>
	);
}
