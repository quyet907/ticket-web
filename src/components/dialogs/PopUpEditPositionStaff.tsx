import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";

interface Props {
	titlePopup?: string;
	obj: any;
	onSave(item: PositionStaff): void;
	isDisplay: boolean;
	onCancel(): void;
}

export default function PopUpEditPositionStaff(props: Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup, obj } = props;
	const [data, setData] = useState<PositionStaff>({} as PositionStaff);

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
							label={"Chuc vu"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Mo ta"}
							value={data.description}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}



