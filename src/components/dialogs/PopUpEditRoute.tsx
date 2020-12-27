import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { parseInt } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Route } from "../../submodules/base-ticket-team/base-carOwner/Route";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";

interface Props {
	titlePopup?: string;
	obj: Route;
	onSave(item: Route): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape<Route>({
	localEnd: Yup.string().trim().required("Không được để  địa điểm kết thúc"),
	localStart: Yup.string()
		.trim()
		.required("Không được để  địa điểm xuất phát"),
	sumTimeRun: Yup.number()
		.required("không được để trống tổng thời gian dự kiến")
		.min(0, "Thời gian chạy không được dưới 0")
		.max(1000, "Thời gian vượt mức cho phép"),
});

export default function PopUpEditRoute(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<Route>({} as Route);

	const formik = useFormik<Route>({
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
			localEnd: true,
			startAt: true,
			localStart: true,
			sumTimeRun: true,
		});
	}
	useEffect(() => {
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues({
			...props.obj,
			startAt : new Date()
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
								label={"Địa điểm xuất phát"}
								name="localStart"
								value={formik.values.localStart}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.localStart &&
									formik.errors.localStart
								}
								error={
									formik.touched.localStart &&
									Boolean(formik.errors.localStart)
								}
							/>
						</Grid>
						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Địa điểm đích"}
								name="localEnd"
								
								value={formik.values.localEnd}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.localEnd &&
									formik.errors.localEnd
								}
								error={
									formik.touched.localEnd &&
									Boolean(formik.errors.localEnd)
								}
							/>
						</Grid>

						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Thời gian xuất phát"}
								name="startAt"
								type={"time"}
								value={moment(formik.values.startAt).format(
									"hh:mm:ss"
								)}
								onChange={(e) => {
									// TODO : chỗ này hơi lỡm .. cần nghiên cứu chỉnh lại
									const getTime: string = e.target.value;
									const splitTime = getTime.split(":");
									var newDate = new Date();
									newDate.setHours(parseInt(splitTime[0]));
									newDate.setMinutes(parseInt(splitTime[1]));
									newDate.setSeconds(parseInt(splitTime[2]));
									console.log(newDate);
								}}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.startAt &&
									formik.errors.startAt
								}
								error={
									formik.touched.startAt &&
									Boolean(formik.errors.startAt)
								}
							/>
						</Grid>

						<Grid className={globalStyles.mb3} item xs={12}>
							<TextField
								fullWidth
								variant="outlined"
								label={"Thời gian hoành thành dự kiến"}
								name="sumTimeRun"
								type = {"number"}
								value={formik.values.sumTimeRun}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								helperText={
									formik.touched.sumTimeRun &&
									formik.errors.sumTimeRun
								}
								error={
									formik.touched.sumTimeRun &&
									Boolean(formik.errors.sumTimeRun)
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
