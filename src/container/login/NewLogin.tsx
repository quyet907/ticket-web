import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	makeStyles,
	Slide,
	Snackbar,
	TextField,
	Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
// import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import Facebook from "../../icons/Facebook";
import Google from "../../icons/Google";
import { useRematchDispatch } from "../../rematch";
import { dispatch, Dispatch } from "../../rematch/store";
import { accountController } from "../../service";

const useStyles = makeStyles((theme) => ({
	root: {
		// backgroundColor: "#F4F6F8",
		backgroundColor: theme.palette.background.default,
		height: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	formLogin: {
		background: "rgba(255,255,255,0.9)",
		padding: 50,
		borderRadius: 10,
		boxShadow: "14px 8px 15px -4px rgba(0,0,0,0.29)",
		WebkitBoxShadow: "13px 7px 15px -4px rgba(0,0,0,0.29)",
		border: "1px solid rgba(0, 0, 0, 0.05)",
	},
}));

type LoginProps = {
	username?: string;
	password?: string;
};
export default function NewLogin() {
	const classes = useStyles();
	const authenticationDispatch = useRematchDispatch(
		(dispatch: Dispatch) => dispatch.authentication
	);
	// const history = useHistory();
	const formik = useFormik<LoginProps>({
		initialValues: {},
		initialErrors: {},
		validationSchema: Yup.object<LoginProps>({
			password: Yup.string()
				.required("Vui lòng nhập mật khẩu")
				.trim()
				.max(30, "Không được quá 30 kí tự"),
			username: Yup.string()
				.required("Vui lòng nhập địa chỉ Email")
				.trim()
				.max(30, "Không được quá 30 kí tự")
				.email(),
		}),

		onSubmit: () => {
			accountController
				.login(formik.values.username || "", formik.values.password || "")
				.then((res) => {
					if (res) {
						authenticationDispatch.login(res);
					}
				});
		},
	});

	useEffect(() => {
		formik.resetForm();
		formik.setErrors({});
		formik.setTouched({});
		formik.setValues({});
	}, []);

	function onSubmitCustom() {
		formik.handleSubmit();

		formik.setTouched({
			password: true,
			username: true,
		});
	}

	return (
		// <Page className={clsx(classes.root)} title="Login">
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
			style={{ backgroundImage: 'url("https://picsum.photos/2000")' }}
			// alignItems="center"
		>
			<Container maxWidth="sm" className={classes.formLogin}>
				<Box mb={3}>
					<Typography color="textPrimary" variant="h2">
						{`Đăng nhập`}
					</Typography>
					<Typography color="textSecondary" gutterBottom variant="body2">
						{`Đăng nhập bằng tài khoản`}
					</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Button
							color="primary"
							fullWidth
							startIcon={Facebook}
							type="submit"
							size="large"
							variant="contained"
						>
							Facebook
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							fullWidth
							startIcon={Google}
							type="submit"
							size="large"
							variant="contained"
						>
							Google
						</Button>
					</Grid>
				</Grid>
				<Box mt={3} mb={1}>
					<Typography align="center" color="textSecondary" variant="body1">
						{`Hoặc đăng nhập bằng địa chỉ Email`}
					</Typography>
				</Box>
				<TextField
					error={Boolean(formik.touched.username && formik.errors.username)}
					fullWidth
					helperText={formik.touched.username && formik.errors.username}
					label="Địa chỉ Email"
					margin="normal"
					name="username"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					// type="email"
					value={formik.values.username}
					variant="outlined"
				/>
				<TextField
					error={Boolean(formik.touched.password && formik.errors.password)}
					fullWidth
					helperText={formik.touched.password && formik.errors.password}
					label="Mật khẩu"
					margin="normal"
					name="password"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					type="password"
					value={formik.values.password}
					variant="outlined"
				/>
				<Box my={2}>
					<Button
						color="primary"
						onClick={() => onSubmitCustom()}
						fullWidth
						size="large"
						type="submit"
						variant="contained"
					>
						{`Đăng nhập`}
					</Button>
				</Box>
				<Typography color="textSecondary" variant="body1">
					{`Chưa có tài khoản?`}
				</Typography>
			</Container>
		</Box>
		// </Page>
	);
}
