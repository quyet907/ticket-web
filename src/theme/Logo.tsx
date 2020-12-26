import React from "react";

const Logo = (
	props: JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLImageElement> &
		React.ImgHTMLAttributes<HTMLImageElement>
) => {
	return <img height = {60} alt="Logo" src="/static/images/logo.jpg" {...props} />;
};

export default Logo;
