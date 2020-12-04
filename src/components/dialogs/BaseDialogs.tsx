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

interface Props {
	titlePopup?: string;
	obj: any;
	onSave(item: PositionStaff): void;
	isDisplay: boolean;
	onCancel(): void;
	dialogContent: React.ReactNode
}

export default function BaseDialogs(props: Props) {
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
				{props.dialogContent}
			</DialogContent>
			<BaseDialogActions onCancel={onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}

type DialogTitleProps = {
	title?: string;
	onCancel(): void;
};

type DialogActionsProps = {
	onSave(): void;
	onCancel(): void;
};

export function BaseDialogTitle(props: DialogTitleProps) {
	return (
		<>
			<DialogTitle>
				<Grid item xs={12}>
					<Typography variant="h4" color={"primary"} align={"center"}>
						{props.title}
					</Typography>
				</Grid>
				<Box style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
					<IconButton aria-label="close" onClick={props.onCancel}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
		</>
	);
}

export function BaseDialogActions(props: DialogActionsProps) {
	const { onSave, onCancel } = props;
	return (
		<>
			<DialogActions>
				<Grid item container xs={12} justify={"space-between"}>
					<Grid item container xs={5} justify={"center"} alignItems={"center"}>
						<Button
							startIcon={<CloseIcon />}
							variant="contained"
							size="large"
							color="default"
							fullWidth
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item container xs={5} justify={"center"} alignItems={"center"}>
						<Button
							variant="contained"
							size="large"
							fullWidth
							startIcon={<SaveIcon />}
							type={"submit"}
							color="primary"
							onClick={onCancel}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
}
