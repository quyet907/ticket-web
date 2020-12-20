import React, { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
	makeStyles,
} from "@material-ui/core";
// import Page from 'src/components/Page';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Facebook from "../../icons/Facebook";
import Google from "../../icons/Google";
import {useFormik} from "formik"
import { accountController } from "../../service";

const useStyles = makeStyles((theme) => ({
	root: {
		// backgroundColor: "#F4F6F8",
		backgroundColor: theme.palette.background.default,
		height: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	formLogin : {
		background : "rgba(245,245,245,0.1)",
		boxShadow : "0px 0px 200px 0px rgba(100,100,100,0.1)",
		padding : 50,
		borderRadius : 40,
		border : "1px solid #ccc",
	}
}));

type LoginProps = {
	username?: string , password ?: string
}
const LoginView = () => {
	const classes = useStyles();
	const history = useHistory();
	const formik = useFormik<LoginProps>({
		initialValues : {},
		initialErrors : {},
		validationSchema : Yup.object<LoginProps>({
			password : Yup.string().required().trim("Khoong duoc de trong").max(30, "Khoong dudoj qua 30 ki tu"),
			username : Yup.string().required().trim('Khoong duoc de trong').max(30, "Khoong dudoj qua 30 ki tu").email(),
		}),
		onSubmit : ()=>{
			accountController.login(formik.values.username || '', formik.values.password || '').then(res => {
				localStorage.setItem("token", res.token)
				history.push('dashboard')
			}).catch(err => {
				console.log(err)
			})	
		}
	})
	useEffect(() => {
		formik.resetForm();
		formik.setErrors({})
		formik.setTouched({});
		formik.setValues({})
	}, [])

	function onSubmitCustom() {

		formik.handleSubmit();
		
		formik.setTouched({
			password : true ,
			username : true
		})
	}

	return (
		// <Page className={clsx(classes.root)} title="Login">
		<Box 
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
			// alignItems="center"
		>
			<Container maxWidth="sm"
			className= {classes.formLogin}
			>
				
							<Box mb={3}>
								<Typography color="textPrimary" variant="h2">
									Sign in
								</Typography>
								<Typography color="textSecondary" gutterBottom variant="body2">
									Sign in on the internal platform
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
									or login with email address
								</Typography>
							</Box>
							<TextField
								error={Boolean(formik.touched.username && formik.errors.username)}
								fullWidth
								helperText={formik.touched.username && formik.errors.username}
								label="Email Address"
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
								label="Password"
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
									onClick = {()=> onSubmitCustom()}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
								>
									Sign in now
								</Button>
							</Box>
							<Typography color="textSecondary" variant="body1">
								Don&apos;t have an account?
								<Link component={RouterLink} to="/register" variant="h6">
									Sign up
								</Link>
							</Typography>
			</Container>
		</Box>
		// </Page>
	);
};

export default LoginView;
