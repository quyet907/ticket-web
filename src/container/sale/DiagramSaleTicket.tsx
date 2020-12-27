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

	function checkCustomerUnique(selected: Ticket[]):boolean {
		if(selected.length==1){
			return  true
		}
		for (let i = 0; i < selected.length; i++) {
			if(selected[i].customerId !== selected[0].customerId ){
				return false
			}
		}
		return true
	}
	function selectedAllTicket(){
		var getSelected = [...selected];
		diagram.dataListChair?.map(floor=>{
			floor.map(row=>{
				row.map(ticket=>{
					if(getSelected[0].customerId=== ticket.customerId){
						getSelected.push(ticket)
					}
				})
			})
		})
		var newSelecdted:Ticket[] = []
		for (let i = 0; i < getSelected.length; i++) {
			var getIndex = getSelected.findIndex(item=> item.id === getSelected[i].id)
			if((getIndex ===i)){
				newSelecdted.push(getSelected[i])
			}
		}
		setSelected(newSelecdted)
	}
	function CheckExistAll():boolean {
		if(!checkCustomerUnique(selected)){
			return false 
		}
		const getDiagram = diagram?.dataListChair ||[]
		for (let i = 0; i < getDiagram.length ||0 ; i++) {
			const floor = getDiagram[i]
			for (let indexFloor = 0; indexFloor < floor.length; indexFloor++) {
				const row = floor[indexFloor];
				for (let indexRow = 0; indexRow < row.length; indexRow++) {
					const ticket = row[indexRow];
					if(ticket?.customerId === selected[0]?.customerId && ticket.id !== selected[0]?.id ){
						return true
					}
				}
			}
		}
		return false ;
	}

	return (
		<Grid container>
			<Grid item xs>
				<Header
					title="Sơ đồ ghế "
					breadcrumbs={
						<Breadcrumbs aria-label="breadcrumb">
							<Link color="secondary" href="/ticket" onClick={() => { }}>
								<Typography variant="caption" color="primary">
									Bán vé
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

								{(CheckExistAll()) && (
									<Box mr={2}>
										<Grow in={true} timeout={500}>
											<Button
											color="secondary"
												variant="contained"
												onClick={(e) => selectedAllTicket()}
											>
												Tất cả của khách
											</Button>
										</Grow>
									</Box>
								)}

								{selected.length === 1 && selected[0].id && (
									<Box mr={2}>
										<Grow in={true}>
											<Button color="primary" variant="contained" onClick={handlePrint}>
												in vé
											</Button>
										</Grow>
									</Box>
								)}

								{((selected.length === 1 && selected[0].id) ||(checkCustomerUnique(selected))) && (
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
																		onDeleted={onConfirm}
																		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
																		onPrint={() => { handlePrint }}
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

