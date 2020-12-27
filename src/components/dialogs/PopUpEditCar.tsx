import { Button, Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Car } from "../../submodules/base-ticket-team/base-carOwner/Car";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";

interface Props {
	titlePopup?: string;
	obj: Car;
	onSave(item: Car): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<Car>({
	name: Yup.string().required("Không được để trống tên"),
	licensePlates: Yup.string().required("Không được để trống biển số xe"),
});

export default function PopUpEditCar(props: Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<Car>({} as Car);

	const formik = useFormik<Car>({
		initialValues: {},
		initialErrors: {},
		onSubmit: (value) => {
			console.log("on submit");
			props.onSave(value);
		},
		validationSchema: validate,
	});

	function customSubmit(){
		formik.handleSubmit()
		 formik.setTouched({
			 name : true,
			 licensePlates : true
		 })
	}
	useEffect(() => {
		formik.resetForm();
		formik.setTouched({})
		formik.setErrors({});
		formik.setValues({...props.obj, entryAt :props.obj.entryAt || new Date() });
	}, [props]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Dialog open={isDisplay} fullWidth maxWidth="xs">
				<BaseDialogTitle
					title={props.obj.id ? "Sửa" : "Thêm"}
					onCancel={onCancel}
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
								onBlur = {formik.handleBlur}
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
								label={"Biển số xe"}
								name="licensePlates"
								value={formik.values.licensePlates}
								onChange={formik.handleChange}
								onBlur = {formik.handleBlur}
								helperText={formik.touched.licensePlates &&formik.errors.licensePlates}
								error={formik.touched.licensePlates &&Boolean(formik.errors.licensePlates)}
							/>
						</Grid>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Ngày nhập"}
								type={"date"}
								value={moment(
									formik.values.entryAt || new Date()
								).format("YYYY-MM-DD")}
								name="entryAt"
								onChange={formik.handleChange}
								onBlur = {formik.handleBlur}
								helperText={formik.errors.entryAt}
								error={!!formik.errors.entryAt}
							/>
						</Grid>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Xúât xứ"}
								name={"origin"}
								value={formik.values.origin}
								onChange={formik.handleChange}
								onBlur = {formik.handleBlur}
								helperText={formik.errors.origin}
								error={!!formik.errors.origin}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<BaseDialogActions
					onCancel={onCancel}
					onSave={() =>{
						customSubmit()
					}}
				/>
			</Dialog>
		</form>
	);
}
