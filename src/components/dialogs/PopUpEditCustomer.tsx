import {
	Dialog,
	DialogContent,
	FormControl,
	FormHelperText,
	Grid,
	Icon,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import { Customer } from "../../submodules/base-ticket-team/base-carOwner/Customer";
import { Visibility } from "@material-ui/icons";
import FaceIcon from "@material-ui/icons/Face";
import { Sex } from "../../submodules/base-ticket-team/base-carOwner/Sex";

interface Props {
	titlePopup?: string;
	obj: Customer;
	onSave(item: Customer): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<Customer>({
	name: Yup.string().trim().required("Không được để trống tên"),
	phoneNumber: Yup.string()
		.trim()
		.required("Không được để trống tên")
		.max(11, "Số điện thoại không được lớn hơn 11 kí tự")
		.min(10, "Số điện thoại không được nhỏ hơn 10 kí tự"),
});

export default function PopUpEditCustomer(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<Customer>({} as Customer);

	const formik = useFormik<Customer>({
		initialValues: {},
		initialErrors: {},
		onSubmit: (value) => {
			props.onSave(formik.values);
		},
		validationSchema: validate,
	});

	useEffect(() => {
		formik.resetForm({});
		formik.setStatus({});
		formik.setErrors({});
		formik.setValues({ ...props.obj,
			birthAt: props.obj.birthAt ||new Date(),
			sex : props.obj.sex || Sex.female
		});
	}, [props]);

	function customOnSubmit() {
		formik.handleSubmit();
		formik.setTouched({
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
		<Dialog open={props.isDisplay} fullWidth maxWidth="xs">
			<BaseDialogTitle
				title={props.obj._id ? "Sửa" : "Thêm"}
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
							label={"Tên xe"}
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.name && formik.errors.name
							}
							error={formik.touched.name && !!formik.errors.name}
						/>
					</Grid>

					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Số điện thoại"}
							name="phoneNumber"
							value={formik.values.phoneNumber}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							helperText={
								formik.touched.phoneNumber &&
								formik.errors.phoneNumber
							}
							error={
								formik.touched.phoneNumber &&
								!!formik.errors.phoneNumber
							}
						/>
					</Grid>

					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Mô tả"}
							name="description"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.description &&
								formik.errors.description
							}
							error={
								formik.touched.description &&
								!!formik.errors.description
							}
						/>
					</Grid>

					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Email"}
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.email && formik.errors.email
							}
							error={
								formik.touched.email && !!formik.errors.email
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

					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngày sinh"}
							name="birthAt"
							type={"date"}
							value={moment(formik.values.birthAt).format(
								"YYYY-MM-DD"
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							helperText={
								formik.touched.birthAt && formik.errors.birthAt
							}
							error={
								formik.touched.birthAt &&
								!!formik.errors.birthAt
							}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions
				onCancel={props.onCancel}
				onSave={() => customOnSubmit()}
			/>
		</Dialog>
	);
}
