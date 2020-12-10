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
import { ErrorValidate, ValidateHelper } from "../../helper/ValidateHelper";

interface Props {
	titlePopup?: string;
	obj: any;
	onSave(item: PositionStaff): void;
	isDisplay: boolean;
	onCancel(): void;
}

export default function PopUpEditPositionStaff(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<PositionStaff>({} as PositionStaff);
	const [err, setErr] = useState<ErrorValidate<PositionStaff>[]>([]);
	useEffect(() => {
		setErr([])
		setData(props.obj);
	}, [props.obj]);

	function onSave(item: PositionStaff){
		var getErr = ValidateHelper.validateTechnicians<PositionStaff>(PositionStaff, item);
		console.log(getErr)
		if(getErr && getErr.length > 0){
			setErr(getErr);
		}
		else{
			props.onSave(item)
		}
	}

	return (
		<Dialog open={props.isDisplay} fullWidth maxWidth="xs">
			<BaseDialogTitle title={props.titlePopup || "Them"} onCancel={props.onCancel} />
			<DialogContent>
				<Grid container xs={12} direction="column" className={globalStyles.mt1}>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Chức vụ"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
							helperText = {ValidateHelper.getMessenger<PositionStaff>("name", err)}
							error = {ValidateHelper.isError<PositionStaff>("name", err)}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Mô tả"}
							value={data.description}
							onChange={(e) => setData({ ...data, description: e.target.value })}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={props.onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}



