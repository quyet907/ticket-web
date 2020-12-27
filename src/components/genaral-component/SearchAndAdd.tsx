import {
	Box,
	Button,
	CardContent,
	InputBase,
	makeStyles,
	Paper,
	TextField,
	withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import _ from "lodash";
import React, { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.common.white,
		background: "none",
		borderRadius: 5,
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
}));

const TextFieldCustom = withStyles((theme) => ({
	root: {
		background: theme.palette.background.default,
		"&:focus": {
			border: "1px solid",
			borderColor: theme.palette.primary.main,
		},
	},
}))(InputBase);

type Props<T> = {
	className?: string;
	onCreate(object: T): void;
	onSearch(search: string): void;
};

function SearchAndAdd<T>(props: Props<T>) {
	const classes = useStyles();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onSearch = useCallback(
		_.debounce((search: string) => {
			props.onSearch(search);
		}, 300),
		[]
	);

	return (
		<Paper className={clsx(classes.root)}>
			<Box display="flex" padding={2} justifyContent="space-between">
				<Box flexBasis={400}>
					<TextField
						fullWidth
						label="Tìm kiếm"
						// placeholder="Search"
						onChange={(e) => {
							onSearch(e.target.value);
						}}
						variant="outlined"
						size="small"
					/>
				</Box>
				<Box display="flex" justifyContent="flex-end">
					{/* <Button className={classes.importButton}>Import</Button> */}
					{/* <Button className={classes.exportButton}>Export</Button> */}
					<Button
						color="primary"
						variant="contained"
						onClick={() => props.onCreate({} as T)}
					>
						Thêm mới
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}

export default SearchAndAdd;
