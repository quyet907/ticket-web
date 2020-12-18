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
import { Staff } from "../../submodules/base-ticket-team/base-carOwner/Staff";
import { Sex } from "../../submodules/base-ticket-team/base-carOwner/Sex";
import { Autocomplete } from "@material-ui/lab";
import { PositionStaffService } from "../../service/PositionStaffService";
import { positionStaffController } from "../../service";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";

interface Props {
	titlePopup?: string;
	obj: Staff;
	onSave(item: Staff): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<Staff>({
	name: Yup.string().trim().required("Không được để trống tên"),
	identityCard: Yup.string()
		.trim()
		.required("Không được để trống chứng minh nhân dân")
		.max(12, "Không được quá 12 số")
		.min(9, "Chứng minh nhân dân không dưới 9 số"),
	address: Yup.string().trim().required("Không được để trống địa chỉ"),
	phoneNumber: Yup.string()
		.required("Không được để trống số điện thoại")
		.max(11, "Không được quá 12 số")
		.min(10, "Chứng minh nhân dân không dưới 10 số"),
});

export default function PopUpEditStaff(props: Props) {
	const globalStyles = useGlobalStyles();
	const [listPostion , setListPostion] = useState<PositionStaff[]>([]);

	const formik = useFormik<Staff>({
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
		formik.setTouched({
			name: true,
			address: true,
			birthAt: true,
			identityCard: true,
			phoneNumber: true,
			positionId: true,
		});
	}

	useEffect(() => {
		positionStaffController.find().then(res=>{
			setListPostion(res)
		})
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues({
			...props.obj,
			sex: Sex.female,
		});
	}, [props]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Dialog open={props.isDisplay} fullWidth maxWidth="xs">
				<BaseDialogTitle
					title={props.obj.id ? "SỬa" : "Thêm"}
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
								label={"Tên nhân viên"}
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.name && formik.errors.name
								}
								error={
									formik.touched.name &&
									Boolean(formik.errors.name)
								}
							/>
						</Grid>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Chứng minh nhân dân"}
								name="identityCard"
								value={formik.values.identityCard}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.identityCard &&
									formik.errors.identityCard
								}
								error={
									formik.touched.identityCard &&
									Boolean(formik.errors.identityCard)
								}
							/>
						</Grid>

						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Địa chỉ"}
								name="address"
								value={formik.values.address}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.address &&
									formik.errors.address
								}
								error={
									formik.touched.address &&
									Boolean(formik.errors.address)
								}
							/>
						</Grid>

						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Số điện thoại"}
								name="phoneNumber"
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.phoneNumber &&
									formik.errors.phoneNumber
								}
								error={
									formik.touched.phoneNumber &&
									Boolean(formik.errors.phoneNumber)
								}
							/>
						</Grid>

						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Ngày sinh"}
								name="birthAt"

								value={moment(formik.values.birthAt).format("DD-MM-YYYY")}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.birthAt &&
									formik.errors.birthAt
								}
								error={
									formik.touched.birthAt &&
									Boolean(formik.errors.birthAt)
								}
							/>
						</Grid>

						<FormControl
							variant="outlined"
							className={globalStyles.mb3}
						>
							<InputLabel>Giới tính</InputLabel>
							<Select
								name={"sex"}
								value={formik.values.sex}
								labelWidth={80}
								onChange={formik.handleChange}
							>
								<MenuItem value={Sex.female}>Nữ Giới</MenuItem>
								<MenuItem value={Sex.male}>Nam Giới</MenuItem>
							</Select>
						</FormControl>

						<Autocomplete
						className={globalStyles.mb3}
							options={listPostion}
							getOptionLabel={(option) => option?.name ||""}
							fullWidth
							value = {listPostion.find(item=> item.id === formik.values.positionId)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Chức vụ"
									variant="outlined"
								/>
							)}
						/>
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
