import {
	Button,








	Chip, Dialog,








	DialogActions, DialogContent,

	FormControl,



	FormControlLabel,





	FormLabel, Grid,
	makeStyles,


	Radio,
	RadioGroup,
	TextField, Typography
} from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import { DetailLuggage } from "../../submodules/base-ticket-team/base-carOwner/DetailLuggage";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";

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
				metaMapping: {
					customer: formikForCustomer.values,
				},
			});
		},
	});

	useEffect(() => {
		setTicket(props.ticket);
		formikForCustomer.resetForm();
		formikForCustomer.setErrors({});
		formikForCustomer.setValues(props?.ticket?.metaMapping?.customer || {});
	}, [props]);

	function onSave(item: Ticket) {
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
											Nơi đón
										</Typography>
									</FormLabel>
									<RadioGroup
										aria-label="gender"
										name="gender1"
									>
										<FormControlLabel
											value={
												props.ticket.metaMapping?.trip
													?.metaMapping?.route
													?.localStart
											}
											control={<Radio />}
											label={
												props.ticket.metaMapping?.trip
													?.metaMapping?.route
													?.localStart
											}
										/>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label={<TextField />}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>

							<Grid>
								<FormControl>
									<FormLabel>
										<Typography variant={"h4"}>
											Nơi trả
										</Typography>
									</FormLabel>
									<RadioGroup
										aria-label="gender"
										name="gender1"
									>
										<FormControlLabel
											value="female"
											control={<Radio />}
											label={
												props.ticket.metaMapping?.trip
													?.metaMapping?.route
													?.localStart
											}
										/>
										<FormControlLabel
											value="male"
											control={<Radio />}
											label={<TextField />}
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
								</Grid>

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
				<Button onClick={() => props.onCancel()} color="default">
					Close
				</Button>

				<Button
					type={"submit"}
					onClick={() => onSave(props.ticket)}
					color="primary"
				>
					Đặt
				</Button>
			</DialogActions>
		</Dialog>
	);
}
