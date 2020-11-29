import { createMuiTheme, colors } from "@material-ui/core";
import { shadows } from "./shadows";

const theme = createMuiTheme({
	palette: {
		background: {
			default: colors.common.white,
			paper: colors.common.white,
		},
		primary: {
			main: colors.indigo[500],
		},
		secondary: {
			main: colors.indigo[500],
		},
		text: {
			primary: colors.blueGrey[900],
			secondary: colors.blueGrey[600],
		},
	},
	shadows,
	typography: {
		h1: {
			fontWeight: 500,
			fontSize: 35,
			letterSpacing: "-0.24px",
		},
		h2: {
			fontWeight: 500,
			fontSize: 29,
			letterSpacing: "-0.24px",
		},
		h3: {
			fontWeight: 500,
			fontSize: 24,
			letterSpacing: "-0.06px",
		},
		h4: {
			fontWeight: 500,
			fontSize: 20,
			letterSpacing: "-0.06px",
		},
		h5: {
			fontWeight: 500,
			fontSize: 16,
			letterSpacing: "-0.05px",
		},
		h6: {
			fontWeight: 500,
			fontSize: 14,
			letterSpacing: "-0.05px",
		},
		overline: {
			fontWeight: 500,
		},
	},
});

export default theme;
