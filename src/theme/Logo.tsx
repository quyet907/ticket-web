import React from "react";

const Logo = (
	props: JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLImageElement> &
		React.ImgHTMLAttributes<HTMLImageElement>
) => {
	return <img alt="Logo" src="/static/logo.svg" {...props} />;
};

export default Logo;
