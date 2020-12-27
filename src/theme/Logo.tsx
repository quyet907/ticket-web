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
			style={{ background: "#fff", padding: theme.spacing(0.5), height: "80%" }}
			alt="logo"
			src="/static/images/logo.png"
		/>
	);
};

export default Logo;
