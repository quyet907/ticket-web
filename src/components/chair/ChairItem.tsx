import { Button, Fab, Grid, Theme, withStyles } from "@material-ui/core";
import React from "react";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import AddIcon from "@material-ui/icons/Add";

type Props = {
	chair: ChairCar;
	onClick: () => void;
};
const ChairButton = withStyles((theme: Theme)=>({
    root :{
        // margin : 10,
        background : "none",
        border : "none",
        boxShadow : "none",
        '&:hover' : {
            // borderRadius: 10,
            // backgroundColor: "#6d64e8",
        }
    }
}))(Fab)
export default function ChairItem(props: Props) {
	return (
		<Grid
		>
			<ChairButton
            >
                {props.chair._id ? <EventSeatIcon /> : <AddIcon />}
            </ChairButton>
		</Grid>
	);
}
