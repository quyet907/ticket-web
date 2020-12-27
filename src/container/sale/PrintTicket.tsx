import { Box, Chip, Grid, Paper, Typography } from "@material-ui/core";
import {
	AccessTimeRounded,
	EventSeatRounded,
	MyLocationOutlined,
	NavigateNextOutlined,
	LocationOnOutlined,
} from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { TimeHelper } from "../../helper/TimeHelper";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";

export class PrintTicket extends React.PureComponent<Props, State> {
	render() {
		return (
			<Paper
				elevation={2}
				// style={{ width: 300 }}
				// className={classes.root}
			>
				<Box display="flex" height="100%" flex={1}>
					<Box
						flex={1}
						ml={3}
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="space-between"
					>
            <Box display="flex" alignItems="center">
							<Box mr={1}>
								{/* <AccessTimeRounded /> */}
							</Box>
							<Typography variant="h2">
								{"Vé xe"}
							</Typography>
						</Box>

            <Box display="flex" alignItems="center">
							<Box mr={1}>
								{/* <AccessTimeRounded /> */}
							</Box>
							<Typography variant="h2">
								{"Tên xe : Ale 1"}
							</Typography>
						</Box>

						<Box display="flex" alignItems="center">
							<Box mr={1}>
								{/* <AccessTimeRounded /> */}
							</Box>
							<Typography variant="h5">
								{"Tên khách hàng : Nguyễn Văn Lương"}
							</Typography>
						</Box>

						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Box display="flex">
								<Typography variant="h4">
									{/* {this.props.trip.price?.toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})} */}
									Giá vé: 3000VND
								</Typography>
							</Box>
						</Box>

						<Box display="flex" alignItems="center">
							<Box mr={1}>
								<AccessTimeRounded />
							</Box>
							<Typography variant="h5">
								{"Ngày khởi hành 20-11-2020"}
							</Typography>
						</Box>

						<Box display="flex" alignItems="center" ml={3}>
							<Box mr={1}>
								<EventSeatRounded />
							</Box>
							<Typography variant="h6">Ghế : L1A </Typography>
						</Box>

						<Box display="flex">
							<Box display="flex">
								<Box mr={1}>
									<MyLocationOutlined />
								</Box>
								<Box>
									<Typography variant="h4">
										{"12:23"}
									</Typography>
									<Typography
										variant="h6"
										color="textSecondary"
									>
										{"Hà nội"}
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
									{/* <Typography variant="h4">{`${moment(
									TimeHelper.HoursPlus(
										new Date(this.props.trip.route?.startAt || new Date()),
										this.props?.trip?.route?.sumTimeRun || 0
									)
								).format("HH:mm")}`}</Typography> */}
									<Typography variant="h4">5h</Typography>
									<Typography
										variant="h6"
										color="textSecondary"
									>
										{"Gia Lai"}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Paper>
		);
	}
}

type Props = {
	trip: Trip;
	ticket: Ticket;
};

type State = {};
