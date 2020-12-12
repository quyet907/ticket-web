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
import { ErrorValidate, ValidateHelper } from "../../helper/ValidateHelper";
import { BaseDialogActions, BaseDialogTitle } from "../dialogs/BaseDialogs";
import { ChairCar } from "../../submodules/base-ticket-team/base-carOwner/ChairCar";
import { CreateChairCar } from "../../submodules/base-ticket-team/controller.ts/CreateChairCar";

interface Props {
	titlePopup?: string;
	onSave(item: CreateChairCar): void;
	isDisplay: boolean;
	onCancel(): void;
}

export default function PopUpAutoCreateChair(props: Props) {
	const globalStyles = useGlobalStyles();
	const [data, setData] = useState<CreateChairCar>({});
	useEffect(() => {
		setData({});
	}, [props]);

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
							label={"Số tầng"}
							type = "number"
							defaultValue = {1}
							value={data.floor}
							onChange={(e) => {
								let value:number =parseInt(e.target.value) 
								if(!isNaN(value)){
									if(value <=2 && value >=1 )
									setData({ ...data, floor: value })
								}
							}}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							type = "number"
							label={"Số hàng"}
							defaultValue = {1}
							value={data.row}
							onChange={(e) => {
								let value:number =parseInt(e.target.value) 
								if(!isNaN(value)){
									if(value <=15 && value >=1 )
									setData({ ...data, row: value })
								}
							}}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							type = "number"
							label={"Số cột"}
							defaultValue = {1}
							value={data.column}
							onChange={(e) => {
								let value:number =parseInt(e.target.value) 
								if(!isNaN(value)){
									if(value <=5 && value >=1 )
									setData({ ...data, column: value })
								}
							}}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={props.onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}



