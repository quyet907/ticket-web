/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Grid } from "@material-ui/core";
import { Image } from "@material-ui/icons";
import React from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import clsx from "clsx"
export default function TripItem() {
	const globalStyle = useGlobalStyles();
	return (
		<Grid
			container
			className = {clsx(globalStyle.border,globalStyle.mt3,globalStyle.pp4  )}
			direction="row"
			justify="space-between"
		>
			<Grid>
				<img
					style={{
						height: 100,
						borderRadius: 20,
					}}
					src="https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-girl-xinh-t%C3%B3c-ng%E1%BA%AFn-ng%E1%BA%A7u.jpg"
				/>
			</Grid>
			<Grid>Đây là thông tin cơ bản</Grid>

			<Grid>Đây là thông chi tiết chuyến đi</Grid>

			<Grid>Giá vé</Grid>
		</Grid>
	);
}
