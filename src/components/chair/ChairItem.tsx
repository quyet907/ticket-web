import {
    Box,
	Button,
	Fab,
	Grid,
	Theme,
	Tooltip,
	withStyles,
} from "@material-ui/core";
import React from "react";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import AddIcon from "@material-ui/icons/Add";

type Props = {
	chair: ChairCar;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const ChairButton = withStyles((theme: Theme) => ({
	root: {
		// margin : 10,
		background: "none",
		border: "none",
		boxShadow: "none",
		"&:hover": {},
	},
}))(Fab);
export default function ChairItem(props: Props) {
	return (
		<Grid>
			<Tooltip
				title={
					true ? (
						<Grid
							style={{
								fontSize: "1rem",
                                backgroundColor: "black",
                                padding : 10
							}}
							container
                            direction={"column"}
                            alignItems = {"center"}
						>
                            <Box mt={1}/>
							<Grid>Hàng : {props.chair.localRow}</Grid>
                            <Box mt={1}/>
							<Grid>Luồng : {props.chair.localColumn}</Grid>
                            <Box mt={1}/>
							<Grid>Tầng : {props.chair.localFloor}</Grid>
                            <Box mt={1}/>
							<Grid>Tên ghế : {props.chair.name}</Grid>
                            <Box mt={1}/>
						</Grid>
					) : (
						<></>
					)
				}
				aria-label="add"
			>
				<ChairButton
					onClick={(e) => {
						props.onClick(e);
					}}
				>
					{props.chair._id ? <EventSeatIcon /> : <AddIcon />}
				</ChairButton>
			</Tooltip>
		</Grid>
	);
}
