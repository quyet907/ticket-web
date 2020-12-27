import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core";
import React from "react";
import { Permission as PermissionModel } from "../../submodules/base-ticket-team/base-carOwner/Permission";

type Props = {
    title : string;
    onPermissions:(item : any)=> void;
    permissions: PermissionModel[]
}
export default function Permission(props : Props) {
    
	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{props.title}</FormLabel>
			<FormGroup>
				<FormControlLabel
					control={<Checkbox name="post" />}
					label="Thêm và sửa dữ liệu"
				/>
				<FormControlLabel
					control={<Checkbox name="get" />}
					label="Xem dữ liệu"
				/>
				<FormControlLabel
					control={<Checkbox name="delete" />}
					label="Xóa dữ liệu"
				/>
			</FormGroup>
			<FormHelperText>Be careful</FormHelperText>
		</FormControl>
	);
}
