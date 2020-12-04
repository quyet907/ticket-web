import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Route } from "../../submodules/base-ticket-team/base-carOwner/Route";

interface Props {
	titlePopup?: string;
	obj: Route;
	onSave(item: Route): void;
	isDisplay: boolean;
	onCancel(): void;
}

export default function PopUpEditRoute(props: Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<Route>({} as Route);

	useEffect(() => {
		setData(props.obj);
	}, [props.obj]);

	return (
		<Dialog open={isDisplay} fullWidth maxWidth="xs">
			<BaseDialogTitle title={titlePopup || "Them"} onCancel={onCancel} />
			<DialogContent>
				<Grid container xs={12} direction="column" className={globalStyles.mt1}>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Diem khoi hanh"}
							value={data.localStart}
							onChange={(e) => setData({ ...data, localStart: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Diem den"}
							value={data.localEnd}
							onChange={(e) => setData({ ...data, localEnd: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Gio khoi hanh"}
							value={data.startAt}
							onChange={(e) => setData({ ...data, startAt: new Date() })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Gio ket thuc du kien"}
							value={data.sumTimeRun}
							onChange={(e) =>
								setData({ ...data, sumTimeRun: parseInt(e.target.value) })
							}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}
