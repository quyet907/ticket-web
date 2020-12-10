import {
	Container,
	Grid,
	makeStyles,
	Theme,
	withStyles,
} from "@material-ui/core";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import { chairCarController } from "../../service";
import { ListChairCar } from "../../submodules/base-ticket-team/controller.ts/ListChairCar";
import ChairItem from "./ChairItem";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	borderRadius: {
		borderRadius: 20,
		backgroundColor: "rgba(120, 120,120,0.1)",
		boxShadow: "0px 0px 2px 2px rgba(100, 100,100,0.2)",
	},
	marginDefault: {
		margin: 30,
	},
}));

type Props = {
	listChairDiagram : ListChairCar,
	IconRender:(item : ChairCar) => React.ReactElement, 
}

export default function DiagramChair(props : Props ) {
	const classes = useStyles();
	return (
		<Grid
			container
			alignItems="center"
			xs={12}
			style={{
				height: "100%",
			}}
		>
			<Grid xs={12} container direction="row" justify="space-evenly">
				{props.listChairDiagram?.dataListChar?.map((floor) => {
					return (
						<Grid
							item
							className={clsx(
								classes.borderRadius,
								classes.marginDefault
							)}
						>
							<Grid>
								{floor.map((row) => {
									return (
										<Grid container style={{ padding: 10 }}>
											{row.map((chair) => {
												return (
													<ChairItem
														chair={chair}
														onClick={() => {}}
													/>
												);
											})}
										</Grid>
									);
								})}
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);
}
