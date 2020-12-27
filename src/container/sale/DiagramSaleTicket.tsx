import {
	Box,
	Breadcrumbs,
	Button,
	Grid,
	Grow,
	Link,
	makeStyles,


	Paper,
	Typography
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import PopUpConfirm from "../../components/dialogs/DialogConfirm";
import Header from "../../components/genaral-component/Header";
import { useRematchDispatch } from "../../rematch";
import { Dispatch } from "../../rematch/store";
import { ticketController, tripController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { DiagramChairOfTrip } from "../../submodules/base-ticket-team/controller.ts/DiagramChairOfTrip";
import { IList } from "../../submodules/base-ticket-team/query/IList";
import theme from "../../theme/MuiTheme";
import DetailInfoTicket from "./DetailInfoTicket";
import DialogSaleTicket from "./DialogSaleTicket";
import { PrintTicket } from "./PrintTicket";

const useStyles = makeStyles((theme) => ({
	root: {
		// paddingBottom: theme.spacing(3),
		// paddingTop: theme.spacing(3),
	},
	borderRadius: {
		borderRadius: 20,
		backgroundColor: "rgba(120, 120,120,0.1)",
		boxShadow: "0px 0px 2px 2px rgba(100, 100,100,0.2)",
	},
	content: {
		width: "100%",
		boxSizing: "border-box",
		padding: theme.spacing(3),
		marginTop: theme.spacing(3),
	},
	action: {
		// marginTop: theme.spacing(1),
	},
}));
export default function DiagramSaleTicket() {
	const notication = useRematchDispatch((dispatch: Dispatch) => dispatch.notification);
	const params = useParams<{ id: string }>();
	const globalStyles = useGlobalStyles()
	const classes = useStyles();
	const [diagram, setDiagram] = useState<DiagramChairOfTrip>({});

	const [query, setQuery] = useState<IList>({
		page: 1,
		pageSize: 5,
		search: "",
	});
	const [selected, setSelected] = useState<Ticket[]>([]);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [trip, setTrip] = useState<Trip>({});

	function onCreateOrUpdate() {
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(ticket: Ticket) {
		var getSelected = [...selected];
		getSelected.map((item) => {
			item.localDrop = ticket.localDrop;
			item.localPickup = ticket.localPickup;
			item.customer = ticket.customer;
			item.customerId = ticket.customerId;
			item.statusTicket = ticket.statusTicket
			return item;
		});
		ticketController.createMany(getSelected).then((res) => {
			setQuery({ ...query });
			setShowForm(false);
			setSelected([]);
		});
	}

	function onSelected(ticket: Ticket) {
		var getSelected = [...selected];
		const getIndex = getSelected.findIndex(
			(item) => (item?.chairCarId || "") === (ticket?.chairCarId || "")
		);
		if (getIndex >= 0) {
			getSelected.splice(getIndex, 1);
		} else getSelected.push(ticket);
		setSelected(getSelected);
	}

	useEffect(() => {
		tripController.getChairByTrip({ id: params.id }).then((res) => {
			setDiagram(res);
		});
		tripController.getById(params.id).then((res) => {
			setTrip(res);
		});
	}, [query]);

	function checkIdsExitAll(selected: Ticket[]): boolean {
		for (let i = 0; i < selected.length; i++) {
			if (selected[i].id) {
				return true;
			}
		}
		return false;
	}

	async function changeChair(selected: Ticket[]) {
		if (selected.length !== 2) {
			notication.error("Vui lòng chọn 2 đối tượng để thực hiện tính năng này");
		} else {
			ticketController.changeChair([...selected]).then((res) => {
				setQuery({ ...query });
				setSelected([]);
				setShowForm(false);
			});
		}
	}

	function onConfirm(item: Ticket) {
		setSelected([item]);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
	}

	function onDelete() {
		ticketController.delete(selected[0].id || "").then((res) => {
			setQuery({ ...query });
			setSelected([]);
		});
		setShowConfirm(false);
	}

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current as any,
	});

	return (
		<Grid container>
			<Grid item xs>
				<Header
					title="Sơ đồ ghế "
					breadcrumbs={
						<Breadcrumbs aria-label="breadcrumb">
							<Link color="secondary" href="/ticket" onClick={() => {}}>
								<Typography variant="caption" color="primary">
									Ban ve
								</Typography>
							</Link>
							<Typography color="textSecondary" variant="caption">
								Sơ đồ ghế
							</Typography>
						</Breadcrumbs>
					}
					action={
						<Box
							style={{
								position: "fixed",
								top: theme.spacing(12),
								right: theme.spacing(6),
								display: selected.length > 0 ? "block" : "none",
								alignSelf: "stretch",
								zIndex: 6,
							}}
						>
							<Paper
								style={{
									backgroundColor: theme.palette.common.white,
									padding: theme.spacing(1.5),
									display: "flex",
									width: "fit-content",
									boxSizing: "border-box",
									marginRight: theme.spacing(1),
									boxShadow: "14px 8px 15px -4px rgba(0,0,0,0.29)",
									WebkitBoxShadow: "13px 7px 15px -4px rgba(0,0,0,0.29)",
									border: "1px solid rgba(0, 0, 0, 0.05)"
								}}
							>
								{selected.length === 1 && selected[0].id && (
									<Box mr={2}>
										<Grow in={true}>
											<Button color="primary" variant="contained" onClick={handlePrint}>
												in vé
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length === 1 && selected[0].id && (
									<Box mr={2}>
										<Grow in={true} timeout={500}>
											<Button
											color="secondary"
												variant="contained"
												onClick={(e) => onCreateOrUpdate()}
											>
												Chỉnh sửa
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length >= 1 && !checkIdsExitAll(selected) && (
									<Box mr={2}>
										<Grow in={true} timeout={500}>
											<Button
												variant="contained"
												onClick={(e) => onCreateOrUpdate()}
											>
												Tạo vé
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length === 2 && checkIdsExitAll(selected) && (
									<Box mr={2}>
										<Grow in={true} timeout={500}>
											<Button
												color={"secondary"}
												variant="contained"
												onClick={(e) => changeChair(selected)}
											>
												Đổi ghế
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length === 1 && selected[0].id && (
									<Box mr={2}>
										<Grow in={true} timeout={500}>
											<Button
												className={globalStyles.buttonAlert}
												variant="contained"
												onClick={(e) => {
													onConfirm(selected[0]);
												}}
											>
												Hủy vé
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length >= 1 && (
									<Box>
										<Grow in={true} timeout={500}>
											<Button
												color={"default"}
												onClick={(e) => setSelected([])}
												variant="contained"
											>
												Hủy lựa chọn
											</Button>
										</Grow>
									</Box>
								)}
							</Paper>
						</Box>
					}
				/>
			</Grid>
			<Paper className={classes.content}>
				<div style={{ display: "none" }}>
					<PrintTicket ref={componentRef as any} ticket={selected[0]} trip={trip} />
				</div>

				<PopUpConfirm
					isDisplay={showConfirm}
					onCancel={onCancelConfirm}
					onDelete={onDelete}
				/>

				<Grid>
					<DialogSaleTicket
						open={showForm}
						onCancel={onCloseForm}
						onSave={onSave}
						ticket={selected[0]}
						trip={trip}
					></DialogSaleTicket>

					{/* <DialogChangeChair
					itemChange = {selected}
					diagrams={diagram as any}
					open={showChangeChair}
					onClose = {onCloseFormChangeChair}
					onSave = {onSaveChangeChair}
				></DialogChangeChair> */}
				</Grid>

				<Grid container>
					<Grid xs={12} container direction="row" justify="space-evenly">
						{diagram?.dataListChair?.map((floor: any[], indexFloor: any) => {
							return (
								<Grid xs={12} item style={{ backgroundColor: "#fff" }}>
									<Grid>
										{floor.map((row, indexRow) => {
											return (
												<Box
													display="flex"
													justifyContent="space-between"
													mb={1}
												>
													{row.map((ticket: Ticket) => {
														return Object.entries(ticket).length !==
															0 ? (
															<Box flex={1} overflow="hidden" p={1}>
																<DetailInfoTicket
																	ticketInfo={ticket}
																	onDeleted = {onConfirm}
																	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
																	onPrint = {()=>{ handlePrint}}
																	onClick={onSelected}
																	selected={
																		!!selected.find(
																			(item) =>
																				(item?.chairCarId ||
																					"") ===
																				(ticket?.chairCarId ||
																					"")
																		)
																	}
																/>
															</Box>
														) : (
															<Box flex={0.2} overflow="hidden" p={1}>
																{/* <DetailInfoTicket
																ticketInfo={{}}
																onCreateOrEdit={
																	onCreateOrUpdate
																}
															/> */}
															</Box>
															// <div></div>
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
			</Paper>
		</Grid>
	);
}

const dataFake = `{"dataListChar":[[[{"id":"7f582691-b448-41b7-bc22-5b70d58de9f0","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":1,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.373Z","updatedAt":"2020-12-12T09:31:52.373Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"8e778f7f-5fe0-49a3-a2d3-e72c382d1d5a","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":2,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":1,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"dfc56ff2-c740-4dda-add6-3f2fba551184","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":4,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"f90db65f-e0d0-4325-86f7-74439bd452fc","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 1D","localColumn":5,"localRow":1,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"60753e68-aaa1-472a-a3a3-551a17e077cf","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":1,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"a6d3dfe2-28c2-43d1-9796-dc8de04410a8","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":2,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":2,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"06ddd9e3-51ad-4441-b697-e8d981daf19d","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":4,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"a22cf297-8e69-4c29-8339-e10b227bf5ad","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 2D","localColumn":5,"localRow":2,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"a3011682-f007-4a8b-9f57-76d4a824595a","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":1,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"cbb8a959-69a9-4c01-b964-e35ee7c86ae5","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":2,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":1,"localColumn":3,"localRow":3,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"04c42e4a-6709-4ed6-8f2c-f4228e29496b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":4,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"83017deb-fb59-448e-92d5-7588eca875a2","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"L 3D","localColumn":5,"localRow":3,"localFloor":1,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}]],[[{"id":"ae6be1cd-c370-4372-8ad4-659ad73c4369","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":1,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"9f14e1f5-6eee-47f0-a88a-d73322e463cf","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":2,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":1,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"870c3721-118c-4470-b15b-e6c9601cf252","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":4,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"54f16100-3732-4584-be95-06f3a4333f79","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 1D","localColumn":5,"localRow":1,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"15d71258-4cd3-47d5-bacb-d578084e8a66","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":1,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"730d6951-1a4d-4912-9925-1a03cd38c6b3","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":2,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":2,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"5ee3ab62-df8a-45e3-a0dd-1dbbe2e19fec","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":4,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"818d5be6-c294-4e29-817b-0f971593152c","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 2D","localColumn":5,"localRow":2,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}],[{"id":"0be94abc-d0b6-448b-9316-a3c1f4f6ab0b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":1,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"caf99ae7-d8c7-4884-adb8-8bd8336aaca8","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":2,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"localFloor":2,"localColumn":3,"localRow":3,"carId":"d284cef7-3858-4432-aaca-e6cb6872cf35"},{"id":"a39b7079-095b-43dc-97b0-2e9c45b51c19","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":4,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"},{"id":"e07c05c7-9c55-48cc-a767-7ab04ce6b76b","carId":"d284cef7-3858-4432-aaca-e6cb6872cf35","codeChair":"D 3D","localColumn":5,"localRow":3,"localFloor":2,"createdAt":"2020-12-12T09:31:52.374Z","updatedAt":"2020-12-12T09:31:52.374Z","createdBy":null,"updatedBy":null,"status":"active"}]]]}`;
