import { Button, Grid, makeStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
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
	listChairDiagram: ListChairCar;
	onAddRows: (floor: number) => void;
	onEdit : (item :ChairCar)=> void
};

const ButtonAddRow = withStyles((theme) => ({
	root: {
		width: "100%",
		// textColor: "none",
		// padding: -10,
		// height: 2,
		// fontSize: 0,
		// "&:hover": {
		// 	fontSize: "1rem",
		// },
	},
}))(Button);

export default function DiagramChair(props: Props) {
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
				{props.listChairDiagram?.dataListChar?.map(
					(floor, indexFloor) => {
						return (
							<Grid
								item
								className={clsx(
									classes.borderRadius,
									classes.marginDefault
								)}
							>
								<Grid>
									{floor.map((row, indexRow) => {
										return (
											<Grid
												container
												style={{ padding: 10 }}
											>
												{row.map((chair) => {
													return (
														<ChairItem
															chair={chair}
															onClick={() => {
																props.onEdit(chair)
															}}
														/>
													);
												})}
											</Grid>
										);
									})}
									<Grid>
										<ButtonAddRow
											onClick={() => {
												props.onAddRows(
													indexFloor
												);
											}}
										>
											Thêm hàng
										</ButtonAddRow>
									</Grid>
								</Grid>
							</Grid>
						);
					}
				)}
			</Grid>
		</Grid>
	);
}
