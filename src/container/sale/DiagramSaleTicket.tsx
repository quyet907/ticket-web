import { Box, Grid, Grow, makeStyles, Typography } from "@material-ui/core";
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
export default function DiagramSaleTicket() {
	const params = useParams<{ id: string }>();
	const listChairDiagram = JSON.parse(dataFake);
	const globalStyle = useGlobalStyles();
	const classes = useStyles();
	const [diagram, setDiagram] = useState<DiagramChairOfTrip>({});

	const [query, setQuery] = useState<IList>({
		page: 1,
		pageSize: 5,
		search: "",
	});
	const [selected, setSelected] = useState<Ticket>({} as Ticket);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [trip, setTrip] = useState<Trip>({});

	function onCreateOrUpdate(ticket: Ticket) {
		setSelected(ticket);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(ticket: Ticket) {
		ticketController.create(ticket).then((res) => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onSelected(ticket: Ticket) {}

	useEffect(() => {
		tripController.getChairByTrip({ id: params.id }).then((res) => {
			setDiagram(res);
		});
		tripController.getById(params.id).then((res) => {
			setTrip(res);
		});
	}, [query]);

	return (
		<Grid style={{ padding: 30, boxSizing: "border-box" }}>
			{/* <Menu
				keepMounted
				open={true}
				onClose={() => {}}
				anchorReference="anchorPosition"
				anchorPosition={{ left: 500, top: 500 }}
			>
				<MenuItem onClick={(e) => {}}>Copy</MenuItem>
				<MenuItem onClick={(e) => {}}>Print</MenuItem>
				<MenuItem onClick={(e) => {}}>Highlight</MenuItem>
				<MenuItem onClick={(e) => {}}>Email</MenuItem>
			</Menu> */}
			<Grid>
				<DialogSaleTicket
					open={showForm}
					onCancel={onCloseForm}
					onSave={onSave}
					ticket={selected}
					trip={trip}
				></DialogSaleTicket>
			</Grid>

			<Grid container direction="row" justify="center">
				<Typography variant="h1">Sơ đồ ghế</Typography>
			</Grid>
			<Grid container>
				<Grid xs={12} container direction="row" justify="space-evenly">
					{diagram?.dataListChair?.map((floor: any[], indexFloor: any) => {
						return (
							<Grid
								xs={12}
								item
								className={clsx(classes.marginDefault)}
								style={{ backgroundColor: "#fff" }}
							>
								<Grid>
									{floor.map((row, indexRow) => {
										return (
											<Box
												display="flex"
												justifyContent="space-between"
												mb={1}
											>
												{row.map((ticket: Ticket) => {
													return Object.entries(ticket).length !== 0 ? (
														<Grow in={true} timeout={1000}>
															<Box flex={1} overflow="hidden" p={1}>
																<DetailInfoTicket
																	ticketInfo={ticket}
																	onCreateOrEdit={
																		onCreateOrUpdate
																	}
																/>
															</Box>
														</Grow>
													) : (
														<Box flex={1} overflow="hidden" p={1}>
															<DetailInfoTicket
																ticketInfo={{}}
																onCreateOrEdit={onCreateOrUpdate}
															/>
														</Box>
													);
												})}
											</Box>
										);
									})}
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Grid>
	);
}

const dataFake = `{"dataListChar":[[[{"id":"7f582691-b448-41b7-bc22-5b70d58de9f0","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":1,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.373Z","updatedAt":"2020-12-12T09:31:52.373Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"8e778f7f-5fe0-49a3-a2d3-e72c382d1d5a","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":2,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":1,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"dfc56ff2-c740-4dda-add6-3f2fba551184","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":4,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"f90db65f-e0d0-4325-86f7-74439bd452fc","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":5,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"60753e68-aaa1-472a-a3a3-551a17e077cf","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":1,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"a6d3dfe2-28c2-43d1-9796-dc8de04410a8","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":2,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":2,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"06ddd9e3-51ad-4441-b697-e8d981daf19d","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":4,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"a22cf297-8e69-4c29-8339-e10b227bf5ad","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":5,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"a3011682-f007-4a8b-9f57-76d4a824595a","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":1,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"cbb8a959-69a9-4c01-b964-e35ee7c86ae5","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":2,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":3,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"04c42e4a-6709-4ed6-8f2c-f4228e29496b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":4,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"83017deb-fb59-448e-92d5-7588eca875a2","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":5,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}]],[[{"id":"ae6be1cd-c370-4372-8ad4-659ad73c4369","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":1,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"9f14e1f5-6eee-47f0-a88a-d73322e463cf","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":2,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":1,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"870c3721-118c-4470-b15b-e6c9601cf252","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":4,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"54f16100-3732-4584-be95-06f3a4333f79","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":5,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"15d71258-4cd3-47d5-bacb-d578084e8a66","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":1,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"730d6951-1a4d-4912-9925-1a03cd38c6b3","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":2,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":2,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"5ee3ab62-df8a-45e3-a0dd-1dbbe2e19fec","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":4,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"818d5be6-c294-4e29-817b-0f971593152c","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":5,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"0be94abc-d0b6-448b-9316-a3c1f4f6ab0b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":1,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"caf99ae7-d8c7-4884-adb8-8bd8336aaca8","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":2,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":3,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"a39b7079-095b-43dc-97b0-2e9c45b51c19","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":4,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"e07c05c7-9c55-48cc-a767-7ab04ce6b76b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":5,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}]]]}`;
