import { createMuiTheme, colors } from "@material-ui/core";
import { shadows } from "./shadows";

const theme = createMuiTheme({
	palette: {
		background: {
			default: "rgba(0,0,0,0.05)",
			paper: "#faf9f9",
		},
		primary: {
			main: colors.blue[400],
			contrastText: '#fff',
		},
		secondary: {
			main: colors.green[400],
			contrastText: '#fff',
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
	overrides: {
		MuiButton: {
			containedSizeLarge: {
				padding: "12px 24px",
			},
		},
		MuiDialog: {
			paper: {
				padding: "16px",
			},
		},
		MuiDialogTitle: {
			root: {
				padding: "24px 24px",
				minHeight: "24px"
			},
		},
		MuiDialogContent: {
			root: {
				padding: "0px 24px",
			},
		},
		MuiDialogActions: {
			root: {
				padding: "8px 24px 24px 24px",
			},
		},
		MuiPaper: {
			root: {
				boxSizing: "border-box",
				backgroundColor: colors.common.white
			},
			rounded: {
				borderRadius: "5px"
			}
		}
	},
});

export default theme;
