import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Grow,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import { DetailLuggage } from "../../submodules/base-ticket-team/base-carOwner/DetailLuggage";
import {
	StatusTicket,
	Ticket,
} from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import theme from "../../theme/MuiTheme";

const useStyle = makeStyles((theme) => ({
	box: {
		borderRadius: 20,
		padding: 20,
		background: theme.palette.background.default,
	},
	textarea: {
		width: "100%",
		resize: "vertical",
	},
}));
type Props = {
	ticket: Ticket;
	open: boolean;
	onCancel: () => void;
	onSave: (item: Ticket) => void;
	trip: Trip;
};
const validate = Yup.object().shape<Customer>({
	name: Yup.string().trim().required("Không được để trống tên"),
	phoneNumber: Yup.string()
		.trim()
		.required("Không được để trống tên")
		.max(11, "Số điện thoại không được lớn hơn 11 kí tự")
		.min(10, "Số điện thoại không được nhỏ hơn 10 kí tự"),
});
export default function DialogSaleTicket(props: Props) {
	const classes = useStyle();
	const globalStyle = useGlobalStyles();
	const [listLuggage, setListLuggage] = useState<DetailLuggage[]>([]);
	const [ticket, setTicket] = useState<Ticket>({} as Ticket);
	const [localOption, setLocalOption] = useState<{
		localStart?: string;
		localEnd?: string;
	}>({});

	function addLuggage(nameDetailLuggage: string) {
		var newItem: DetailLuggage = {
			nameLuggage: nameDetailLuggage,
			id: uuidv4(),
			luggageId: "", // TODO : change here
		};
		setListLuggage([...listLuggage, newItem]);
	}
	function removeLuggage(item: DetailLuggage) {
		var getListLuggage = [...listLuggage];
		var getIndex = getListLuggage.findIndex(
			(luggage) => luggage.id == item.id
		);
		if (getIndex >= 0) {
			getListLuggage.splice(getIndex, 1);
			setListLuggage([...getListLuggage]);
		}
	}

	const formikForCustomer = useFormik<Customer>({
		initialValues: {},
		validationSchema: validate,
		initialErrors: {},
		onSubmit: () => {
			props.onSave({
				...ticket,
				customer: formikForCustomer.values,
			});
		},
	});

	useEffect(() => {
		if (props.ticket) {
			setTicket({
				...props.ticket,
				localPickup:
					props?.ticket?.localPickup ||
					props?.trip?.route?.localStart,
				localDrop:
					props?.ticket?.localDrop || props?.trip?.route?.localEnd,
				statusTicket: props.ticket.statusTicket || StatusTicket.payed,
			});
			if (props.ticket.localPickup !== props.trip.route?.localStart) {
				setLocalOption({
					...localOption,
					localStart: props.ticket.localPickup,
				});
			} else {
				setLocalOption({
					...localOption,
					localStart: "",
				});
			}

			if (props.ticket.localDrop !== props.trip.route?.localEnd) {
				setLocalOption({
					...localOption,
					localEnd: props.ticket.localDrop,
				});
			} else {
				setLocalOption({
					...localOption,
					localEnd: "",
				});
			}
		}

		formikForCustomer.resetForm();
		formikForCustomer.setErrors({});
		formikForCustomer.setValues({ ...props?.ticket?.customer } || {});
	}, [props]);

	function onSave(item: Ticket) {
		setTicket(item)
		formikForCustomer.handleSubmit();
		formikForCustomer.setTouched({
			name: true,
			phoneNumber: true,
			birthAt: true,
			description: true,
			sex: true,
			email: true,
			CMND: true,
		});
	}

	return (
		<Dialog
			fullWidth
			maxWidth={"lg"}
			open={props.open}
			onClose={() => {}}
			aria-labelledby="max-width-dialog-title"
		>
			<DialogContent>
				<Grid
					container
					direction="row"
					justify="space-around"
					style={{
						display: "flex",
						flexWrap: "nowrap",
					}}
				>
					<Grid style={{ width: 1000, padding: 20 }}>
						<Grid className={clsx(classes.box)}>
							<Grid container>
								<Grid container justify="center">
									<Typography variant="h1">
										Lựa chọn
									</Typography>
								</Grid>
							</Grid>
							<Grid>
								<FormControl>
									<FormLabel>
										<Typography variant={"h4"}>
											Nơi đón {ticket.localPickup}
										</Typography>
									</FormLabel>
									<RadioGroup
										aria-label="gender"
										name="gender1"
										value={ticket.localPickup}
										onChange={(e) => {
											setTicket({
												...ticket,
												localPickup: e.target.value,
											});
										}}
									>
										<FormControlLabel
											value={props.trip.route?.localStart}
											control={<Radio />}
											label={props.trip.route?.localStart}
										/>
										<FormControlLabel
											value={localOption.localStart}
											control={<Radio />}
											label={
												<TextField
													value={
														localOption.localStart
													}
													onChange={(e) => {
														if (
															ticket.localPickup ===
															localOption.localStart
														) {
															setTicket({
																...ticket,
																localPickup:
																	e.target
																		.value,
															});
														}
														setLocalOption({
															...localOption,
															localStart:
																e.target.value,
														});
													}}
												/>
											}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>

							<Grid>
								<FormControl>
									<FormLabel>
										<Typography variant={"h4"}>
											Nơi trả {ticket.localDrop}
										</Typography>
									</FormLabel>
									<RadioGroup
										aria-label="gender"
										name={ticket.localDrop}
										value={ticket.localDrop}
										onChange={(e) => {
											setTicket({
												...ticket,
												localDrop: e.target.value,
											});
										}}
									>
										<FormControlLabel
											value={props.trip.route?.localEnd}
											control={<Radio />}
											label={props.trip.route?.localEnd}
										/>
										<FormControlLabel
											value={localOption.localEnd}
											control={<Radio />}
											label={
												<TextField
													value={localOption.localEnd}
													onChange={(e) => {
														if (
															ticket.localDrop ===
															localOption.localEnd
														) {
															setTicket({
																...ticket,
																localDrop:
																	e.target
																		.value,
															});
														}
														setLocalOption({
															...localOption,
															localEnd:
																e.target.value,
														});
													}}
												/>
											}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
					<Grid style={{ width: 1000, padding: 20 }}>
						<Grid className={clsx(classes.box)}>
							<Grid container justify="center">
								<Typography variant="h1">
									Thông tin mua vé
								</Typography>
							</Grid>
							<Grid
								container
								direction="column"
								justify="space-evenly"
								style={{ padding: 20 }}
							>
								<Grid className={clsx(globalStyle.mt3)}>
									<TextField
										fullWidth
										variant="outlined"
										label="Tên khách hàng"
										name="name"
										value={formikForCustomer.values.name}
										onChange={
											formikForCustomer.handleChange
										}
										error={
											formikForCustomer.touched.name &&
											!!formikForCustomer.errors.name
										}
										helperText={
											formikForCustomer.touched.name &&
											formikForCustomer.errors.name
										}
									/>
								</Grid>

								<Grid className={clsx(globalStyle.mt3)}>
									<TextField
										fullWidth
										variant="outlined"
										label="Số điện thoại"
										name={"phoneNumber"}
										value={
											formikForCustomer.values.phoneNumber
										}
										onChange={
											formikForCustomer.handleChange
										}
										error={
											formikForCustomer.touched
												.phoneNumber &&
											!!formikForCustomer.errors
												.phoneNumber
										}
										helperText={
											formikForCustomer.touched
												.phoneNumber &&
											formikForCustomer.errors.phoneNumber
										}
									/>
								</Grid>

								<Grid className={clsx(globalStyle.mt3)}>
									<FormControl variant="outlined" fullWidth>
										<InputLabel>
											{"Trang thái vé"}
										</InputLabel>
										<Select
											name={"statusTicket"}
											value={ticket.statusTicket}
											labelWidth={80}
											onChange={(e) => {
												const getTicket = { ...ticket };
												getTicket.statusTicket = e
													.target
													.value as StatusTicket;
												setTicket(getTicket);
											}}
										>
											<MenuItem
												value={StatusTicket.payed}
											>
												Đã đã tiền
											</MenuItem>
											<MenuItem
												value={StatusTicket.order}
											>
												Đặt trước
											</MenuItem>
											<MenuItem
												value={StatusTicket.welcomed}
											>
												Đã đón
											</MenuItem>
											<MenuItem
												value={StatusTicket.cancel}
											>
												Không đón được
											</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								{/* <Grid className={clsx(globalStyle.mt3)}>
									<Grid
										container
										direction="row"
										justify="center"
										style={{
											borderRadius: 20,
											border: "1px solid #ccc",
										}}
									>
										{listLuggage.map((luggage) => {
											return (
												<Grid style={{ padding: 10 }}>
													<Chip
														label={
															luggage.nameLuggage
														}
														onDelete={() => {
															removeLuggage(
																luggage
															);
														}}
														style={{ padding: 10 }}
													/>
												</Grid>
											);
										})}
									</Grid>
								</Grid>

								<Grid className={clsx(globalStyle.mt3)}>
									<TextField
										fullWidth
										variant="outlined"
										label="Hành lí đi kèm"
										onKeyPress={(e) => {
											if (e.charCode == 13) {
												var getString: any = e.target;
												addLuggage(
													getString.value as any
												);
											}
										}}
									/>
								</Grid> */}

								<Grid className={clsx(globalStyle.mt3)}>
									<TextField
										id="outlined-textarea"
										label="Ghi chú thêm"
										multiline
										fullWidth={true}
										variant="outlined"
										value={ticket.description}
										onChange={(e) => {
											setTicket({
												...ticket,
												description: e.target.value,
											});
										}}
										inputProps={{
											className: classes.textarea,
										}}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{/* <Button onClick={() => props.onCancel()} color="default">
					Close
				</Button>

				<Button
					type={"submit"}
					onClick={() => onSave(props.ticket)}
					color="primary"
				>
					Đặt
				</Button> */}

				<Box>
					<Grid
						style={{
							backgroundColor: theme.palette.common.white,
							padding: theme.spacing(1.5),
							display: "flex",
							width: "fit-content",
							boxSizing: "border-box",
							marginRight: theme.spacing(1),
						}}
					>
						<Box mr={2}>
							<Grow in={true} timeout={500}>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => onSave(props.ticket)}
									// onClick={(e) => onCreateOrUpdate()}
								>
									Lưu thông tin 
								</Button>
							</Grow>
						</Box>

						{
							new Date(props.trip.timeStart|| 0).getTime() > new Date().getTime() &&<>
							<Box mr={2}>
								<Grow in={true} timeout={500}>
									<Button
										color="secondary"
										variant="contained"
										onClick={() => onSave({...props.ticket,statusTicket: StatusTicket.payed})}
										// onClick={(e) => selectedAllTicket()}
									>
										Thanh toán
									</Button>
								</Grow>
							</Box>

						<Box mr={2}>
							<Grow in={true} timeout={500}>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => onSave({...props.ticket,statusTicket: StatusTicket.order})}
								>
									Đặt trước
								</Button>
							</Grow>
						</Box>
						</>
						}

						{
							new Date(props.trip.timeStart|| 0).getTime() < new Date().getTime() &&<>
								<Box mr={2}>
							<Grow in={true} timeout={500}>
								<Button
									variant="contained"
									onClick={() => onSave({...props.ticket,statusTicket: StatusTicket.welcomed})}
									// onClick={(e) => onCreateOrUpdate()}
								>
									Đã đón
								</Button>
							</Grow>
						</Box>

						<Box mr={2}>
							<Grow in={true} timeout={500}>
								<Button
									color={"secondary"}
									variant="contained"
									// onClick={(e) => changeChair(selected)}
									onClick={() => onSave({...props.ticket,statusTicket: StatusTicket.cancel})}
								>
									Không đón được
								</Button>
							</Grow>
						</Box>
							</>
						}

						<Box mr={2}>
							<Grow in={true} timeout={500}>
								<Button
									// className={globalStyles.buttonAlert}
									variant="contained"
									onClick={(e) => {
										props.onCancel()
									}}
								>
									Đóng
								</Button>
							</Grow>
						</Box>

					</Grid>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
