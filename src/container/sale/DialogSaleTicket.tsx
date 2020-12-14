import classes from "*.module.css";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormControlLabel,
	DialogActions,
	Button,
	Grid,
	makeStyles,
	Typography,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Box,
	Chip,
	TextareaAutosize,
} from "@material-ui/core";
import React, { useState } from "react";
import { Switch } from "react-router";
import theme from "../../theme/MuiTheme";
import clsx from "clsx";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Ticket } from "../../submodules/base-ticket-team/base-carOwner/Ticket";
import { useFormik } from "formik";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import * as Yup from "yup";
import { DetailLuggage } from "../../submodules/base-ticket-team/base-carOwner/DetailLuggage";
import { v4 as uuidv4 } from "uuid";

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
	console.log(props.ticket);

	function addLuggage(nameDetailLuggage: string) {
		var newItem: DetailLuggage = {
			nameLuggage: nameDetailLuggage,
			_id: uuidv4().toString(),
			luggageId: "", // TODO : change here
		};
		setListLuggage([...listLuggage, newItem]);
	}
	function removeLuggage(item: DetailLuggage) {
		var getListLuggage = [...listLuggage];
		var getIndex = getListLuggage.findIndex(
			(luggage) => luggage._id == item._id
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
			console.log("on submit");
		},
	});

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
												<Grid style = {{padding : 10}}><Chip
												label={luggage.nameLuggage}
												style={{ padding: 10 }}
											/></Grid>
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
				<Button onClick={() => props.onCancel()} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
