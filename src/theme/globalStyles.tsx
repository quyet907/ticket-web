import { makeStyles } from "@material-ui/core/styles";
export  const useGlobalStyles = makeStyles((theme) => ({
	container: {
		marginTop: theme.spacing(15),
		marginBottom: theme.spacing(12),
	},
	highlightSearchText: {
		background: "yellow",
	},
	content: {
		minHeight: "100vh",
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
	borderLeft: {
		borderLeft: "1px solid",
		borderColor: theme.palette.grey[100],
	},

	contentItem: {
		padding: theme.spacing(3),
		border: theme.spacing(1),
		borderWidth: "1px",
		borderColor: theme.palette.grey[100],
		borderStyle: "solid",
		borderRadius: theme.spacing(1),
	},

	buttonAlert: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.error.main,
		borderColor: theme.palette.error.main,
		"&:hover": {
			backgroundColor: theme.palette.error.dark,
			borderColor: theme.palette.error.dark,
		},
	},
	buttonAlert2: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.primary.main,
		borderColor: theme.palette.primary.main,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
			borderColor: theme.palette.primary.dark,
		},
	},
	buttonAlertSuccess: {
		color: theme.palette.common.white,
		backgroundColor: theme.palette.secondary.main,
		borderColor: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			borderColor: theme.palette.secondary.dark,
		},
	},
	iconButtonAlert: {
		color: theme.palette.error.main,
		// "&:hover": {
		//     color: theme.palette.error.dark,
		// }
		"&:hover": {
			color: "white",
			backgroundColor: theme.palette.error.main,
			borderColor: theme.palette.error.main,
			border: "1px solid",
		},
	},
}));

