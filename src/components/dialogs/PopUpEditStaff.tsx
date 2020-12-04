import {
	Dialog,
	DialogContent,
	Grid,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Staff } from "../../submodules/base-ticket-team/base-carOwner/Staff";
import { BaseDialogActions, BaseDialogTitle } from "./BaseDialogs";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface Props {
	titlePopup?: string;
	obj: Staff;
	onSave(item: Staff): void;
	isDisplay: boolean;
	onCancel(): void;
}

export default function PopUpEditStaff(props: Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<Staff>({} as Staff);

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
							label={"Ho ten"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"So dien thoai"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"CMND"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Dia chi"}
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
						/>
					</Grid>
					<Grid className={globalStyles.mb3} item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngay sinh"}
							type="date"
							value={data.name}
							onChange={(e) => setData({ ...data, name: e.target.value })}
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>

					<Grid className={globalStyles.mb3} item xs={12}>
						<Autocomplete
							fullWidth
							options={[
								{ title: "The Shawshank Redemption", year: 1994 },
								{ title: "The Godfather", year: 1972 },
							]}
							getOptionLabel={(option) => option.title}
							renderInput={(params) => (
								<TextField {...params} label="Chuc vu" variant="outlined" />
							)}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<BaseDialogActions onCancel={onCancel} onSave={() => onSave(data)} />
		</Dialog>
	);
}
