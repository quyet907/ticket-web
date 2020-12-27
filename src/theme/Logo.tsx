import { Avatar } from "@material-ui/core";
import React from "react";
import theme from "./MuiTheme";

const Logo = (
	props: JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLImageElement> &
		React.ImgHTMLAttributes<HTMLImageElement>
) => {
	return (
		<Avatar
			style={{
				width: 35,
				height: 35,
				background: "#fff",
				padding: theme.spacing(0.5),
				boxShadow: "5px 8px 15px -4px rgba(0,0,0,0.29)",
				// WebkitBoxShadow: "13px 7px 15px -4px rgba(0,0,0,0.29)",
				border: "1px solid rgba(0, 0, 0, 0.05)",
			}}
			alt="logo"
			src="/static/images/logo.png"
		/>
	);
};

export default Logo;
