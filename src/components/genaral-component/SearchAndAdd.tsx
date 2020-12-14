import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
	Box,
	Button,
	Card,
	CardContent,
	TextField,
	InputAdornment,
	SvgIcon,
	makeStyles,
	withStyles,
	InputBase,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: theme.spacing(2.5),
		// backgroundColor : theme.palette.background.default
		background : "none",
		borderRadius: 10
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
}));

const TextFieldCustom = withStyles(theme=>({
	root : {
		borderRadius : 20,
		background : theme.palette.background.default,
		paddingLeft : 50,
		padding : 10,
		"&:focus": {
			border : "1px solid",
			borderColor : theme.palette.primary.main,
		}
	}
}))(InputBase)

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
		<div >
			<Box mt={3}>
				<Card className={clsx(classes.root)}>
					<CardContent style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
						<Box flexBasis={500}>
							<TextFieldCustom

								fullWidth
								// InputProps={{
								// 	startAdornment: (
								// 		<InputAdornment position="start">
								// 			<SvgIcon fontSize="small" color="action">
								// 				<SearchIcon />
								// 			</SvgIcon>
								// 		</InputAdornment>
								// 	),
								// }}
								placeholder="Search"
								onChange={(e) => {
									onSearch(e.target.value);
								}}
							/>
						</Box>
						<Box  display="flex" justifyContent="flex-end">
							<Button className={classes.importButton}>Import</Button>
							<Button className={classes.exportButton}>Export</Button>
							<Button
								color="primary"
								variant="contained"
								onClick={() => props.onCreate({} as T)}
							>
								Thêm mới
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</div>
	);
}

export default SearchAndAdd;