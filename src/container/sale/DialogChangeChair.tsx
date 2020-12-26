import {
	AppBar,
	Box,
	Button,
	Dialog,
	Grid,
	Grow,
	IconButton,
	makeStyles,
	Slide,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ticketController, tripController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { DiagramChairOfTrip } from "../../submodules/base-ticket-team/controller.ts/DiagramChairOfTrip";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import DetailInfoTicket from "./DetailInfoTicket";
import DialogSaleTicket from "./DialogSaleTicket";
import CloseIcon from "@material-ui/icons/Close";

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
	diagrams: DiagramChairOfTrip;
	onClose: () => void;
	open: boolean;
	onSave: (item: Ticket) => void;
	itemChange : Ticket
};

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogChangeChair(props: Props) {
	const classes = useStyles();
	const [query, setQuery] = useState<IList>({
		page: 1,
		pageSize: 5,
		search: "",
	});
	const [selected, setSelected] = useState<Ticket>({} as Ticket);

	function onSelect(item: Ticket){
		console.log(item)
	}

	useEffect(() => {
		console.log(props)
	}, [props])

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={props.onClose}
			TransitionComponent={Transition}
		>
			<AppBar>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={props.onClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography variant="h6">Vui lòng chọn ghế cần thay đổi</Typography>
					<Button autoFocus color="inherit" onClick={props.onClose}>
						save
					</Button>
				</Toolbar>
			</AppBar>
			<Grid style={{ padding: 30, boxSizing: "border-box" }}>
				<Grid container direction="row" justify="center">
					<Typography variant="h1">Sơ đồ ghế</Typography>
				</Grid>
				<Grid container>
					<Grid
						xs={12}
						container
						direction="row"
						justify="space-evenly"
					>
						{props.diagrams?.dataListChair?.map(
							(floor: any[], indexFloor: any) => {
								return (
									<Grid
										xs={12}
										item
										className={clsx(classes.marginDefault)}
										style={{ backgroundColor: "#fff" }}
									>
										<Grid>
											{floor.map((row, indexRow) => {
												console.log(row);

												return (
													<Box
														display="flex"
														justifyContent="space-between"
														mb={1}
													>
														{row.map(
															(
																ticket: Ticket
															) => {
																return Object.entries(
																	ticket
																).length !==
																	0 ? (
																	<Box
																		flex={1}
																		overflow="hidden"
																		p={1}
																	>
																		{/* {
																			<DetailInfoTicket
																			onChangeChair = {()=>{}}
																			ticketInfo={
																				ticket
																			}
																			onCreateOrEdit={
																				onSelect
																			}
																			disable = {!!ticket.id}
																		/>
																		} */}
																	</Box>
																) : (
																	<Box
																		flex={
																			0.2
																		}
																		overflow="hidden"
																		p={1}
																	>
																		
																	</Box>
																	// <div></div>
																);
															}
														)}
													</Box>
												);
											})}
										</Grid>
									</Grid>
								);
							}
						)}
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}
