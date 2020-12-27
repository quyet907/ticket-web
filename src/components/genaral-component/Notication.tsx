import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LinearProgress, makeStyles, Snackbar } from "@material-ui/core";
import { AppModel } from "../../rematch";
import { AppState } from "../../rematch/store";
import { Alert } from "@material-ui/lab";
import { NotificationModel } from "../../rematch/Notification";

const useStyles = makeStyles((theme) => ({
	load: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
	},
}));
export default function Notification() {
	const [notication, setNotication] = useState<NotificationModel>();
	const classes = useStyles();

	const notification: NotificationModel = useSelector(
		(state: AppState) => state.notification
	);

	useEffect(() => {
		const { message, variant } = notification;
		if (message) {
			setNotication(notification);
		}
	}, [notification]);
	return (
		<div style ={{display : !!notication?.message ? "block" : "none"}}>
			<Snackbar
				open={!!notication?.message}
				autoHideDuration={3000}
				onClose={(e) => setNotication({ message: "" })}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity={(notication?.variant as any) || "success"}>
					{notication?.message || ""}
				</Alert>
			</Snackbar>
		</div>
	);
}
