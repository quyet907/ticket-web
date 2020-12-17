import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	colors,
	Container,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx"
import { useGlobalStyles } from "../../styles/GlobalStyle";

// import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: "100%",
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

export default function TicketContainer() {
	const globalStyle = useGlobalStyles();
	const top100Films = [
		{ title: "The Shawshank Redemption", year: 1994 },
		{ title: "The Godfather", year: 1972 },
	];
	return (
		// <Page className={classes.root} title="Customers">
		<Grid item xs={12}>
			<Paper>
				<Autocomplete
					id="highlights-demo"
					style={{ width: 300 }}
					options={top100Films}
					getOptionLabel={(option) => option.title}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Diem den"
							variant="outlined"
							margin="normal"
						/>
					)}
					renderOption={(option, { inputValue }) => {
						const matches = match(option.title, inputValue);
						const parts = parse(option.title, matches);
						console.log(parts);
						

						return (
							<div>
								{parts.map((part: any, index: number) => (
									<span
										key={index}
										style={{
											fontWeight: part.highlight ? 700 : 400,
											background: part.highlight
												? colors.yellow[600]
												: "none",
										}}
									>
										{part.text}
									</span>
								))}
							</div>
						);
					}}
				/>
			</Paper>
		</Grid>
		// </Page>
	);
}
