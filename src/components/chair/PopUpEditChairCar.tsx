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
	Theme,
	Typography,
	withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { useFormik } from "formik";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { PositionStaff } from "../../submodules/base-ticket-team/base-carOwner/PositionStaff";
import { ErrorValidate, ValidateHelper } from "../../helper/ValidateHelper";
import { BaseDialogActions, BaseDialogTitle } from "../dialogs/BaseDialogs";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";

interface Props {
	titlePopup?: string;
	obj: any;
	onSave(item: PositionStaff): void;
	isDisplay: boolean;
	onCancel(): void;
	onDelete(item : ChairCar):void;
}

const ButtonDelete = withStyles((theme: Theme) => ({
	root: {
		// margin : 10,
		background: theme.palette.error.main,
		color : "white",
		padding : 12,
		border: "none",
		boxShadow: "none",
		"&:hover": {background: theme.palette.error.main},
	},
}))(Button);

export default function PopUpEditChairCar(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<ChairCar>({} as ChairCar);
	useEffect(() => {
		setData(props.obj);
	}, [props.obj]);

	function onSave(item: ChairCar){
		props.onSave(item)
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
							label={"Tên ghế"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
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
					{props.obj.id ? <Grid className={globalStyles.mb3} item xs={12}>
						<ButtonDelete fullWidth  
							onClick = {()=> props.onDelete(props.obj)}
						>Xóa</ButtonDelete>
					</Grid> : <></>}
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={props.onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}



