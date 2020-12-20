import {
	Button,
	Dialog,
	DialogContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Sex } from "../../submodules/base-ticket-team/base-carOwner/Sex";
import { Autocomplete } from "@material-ui/lab";
import { PositionStaffService } from "../../service/PositionStaffService";
import {
	positionStaffController,
	routeController,
	staffController,
} from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { Trip } from "../../submodules/base-ticket-team/base-carOwner/Trip";
import { Staff } from "../../submodules/base-ticket-team/base-carOwner/Staff";
import { Route } from "../../submodules/base-ticket-team/base-carOwner/Route";

interface Props {
	titlePopup?: string;
	obj: Trip;
	onSave(item: Trip): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<Trip>({});

export default function PopUpEditTrip(props: Props) {
	const globalStyles = useGlobalStyles();
	const [listStaff, setListStaff] = useState<Staff[]>([]);
	const [listRoute, setListRoute] = useState<Route[]>([]);

	const formik = useFormik<Trip>({
		initialValues: {},
		initialErrors: {},
		onSubmit: (value) => {
			console.log("on submit");
			props.onSave(value);
		},
		validationSchema: validate,
	});

	function customSubmit() {
		formik.handleSubmit();
		formik.setTouched({});
	}

	useEffect(() => {
		staffController.find().then((res) => {
			setListStaff(res);
		});
		routeController.find().then((res) => {
			setListRoute(res);
		});
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues({
			...props.obj,
		});
	}, [props]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Dialog open={props.isDisplay} fullWidth maxWidth="xs">
				<BaseDialogTitle
					title={props.obj.id ? "Sửa" : "Thêm"}
					onCancel={props.onCancel}
				/>
				<DialogContent>
					<Grid
						container
						xs={12}
						direction="column"
						className={globalStyles.mt1}
					>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Giá vé"}
								name="price"
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.price && formik.errors.price
								}
								error={
									formik.touched.price &&
									Boolean(formik.errors.price)
								}
							/>
						</Grid>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Thời gian bắt đầu"}
								name="timeStart"
								type = {"date"}
								value={moment(new Date(formik.values.timeStart || new Date())).format("YYYY-MM-DD")}
								onChange={(e=>{
									console.log()
									formik.setValues({...formik.values,timeStart :new Date(e.target.value)})
								})}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.timeStart &&
									formik.errors.timeStart
								}
								error={
									formik.touched.timeStart &&
									Boolean(formik.errors.timeStart)
								}
							/>
						</Grid>

						<Grid>
							<Autocomplete
								className={globalStyles.mb3}
								options={listStaff}
								getOptionLabel={(option) => option?.name || ""}
								fullWidth
								value={listStaff.find(
									(item) => item.id === formik.values.driveId
								)}
								onChange={(e, v) => {
									formik.setValues({
										...formik.values,
										driveId: v?.id,
									});
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Người lái xe"
										variant="outlined"
									/>
								)}
							/>
						</Grid>

						<Grid>
							<Autocomplete
								className={globalStyles.mb3}
								options={listRoute}
								getOptionLabel={(option) => (`${option?.localStart}- ${option?.localEnd}`) || ""}
								fullWidth
								value={listRoute.find(
									(item) => item.id === formik.values.routeId
								)}
								onChange={(e, v) => {
									formik.setValues({
										...formik.values,
										routeId: v?.id,
									});
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Người lái xe"
										variant="outlined"
									/>
								)}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<BaseDialogActions
					onCancel={props.onCancel}
					onSave={() => {
						customSubmit();
					}}
				/>
			</Dialog>
		</form>
	);
}
