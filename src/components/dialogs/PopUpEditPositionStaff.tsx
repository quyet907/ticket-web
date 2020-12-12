import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";

interface Props {
	titlePopup?: string;
	obj: PositionStaff;
	onSave(item: PositionStaff): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<PositionStaff>({
	name: Yup.string().required("Không được để trống tên"),
	
});

export default function PopUpEditPositionStaff(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<PositionStaff>({} as PositionStaff);

	const formik = useFormik<PositionStaff>({
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
		});
	}
	useEffect(() => {
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues(props.obj);
	}, [props]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Dialog open={props.isDisplay} fullWidth maxWidth="xs">
				<BaseDialogTitle
					title={props.obj._id ? "SỬa" : "Thêm"}
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
								label={"Tên chức vụ"}
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
									Boolean(formik.errors.description)
								}
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
