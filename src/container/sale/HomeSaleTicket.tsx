import {
	FormControl,
	Grid,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { tripController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import {
	ListWithTripSale,
	TripShowHome,
} from "../../submodules/base-ticket-team/controller.ts/TripController";
import { Paging } from "../../submodules/base-ticket-team/query/Paging";
import TripItem from "./TripItem";

const useStyles = makeStyles((theme) => ({
	FormSearch: {
		background: "white",
		padding: 40,
		borderRadius: 20,
		position: "sticky",
		zIndex: 1,
	},
}));

export default function HomeSaleTicket() {
	const [tripHome, setTripHome] = useState<Paging<TripShowHome>>({});
	const classes = useStyles();
	const globalStyle = useGlobalStyles();
	const [search, setSearch] = useState<string>("");
	const [query, setQuery] = useState<ListWithTripSale>({
		from: new Date(),
		to: new Date(),
		page: 1,
		pageSize: 5,
		search: "",
	});
	useEffect(() => {
		tripController.getListByDate(query).then((res) => {
			console.log(res);
			setTripHome(res);
		});
	}, [query]);

	const onSearch = useCallback(
		_.debounce((search: string) => {
			setQuery({
				...query,
				search: search,
			});
		}, 300),
		[]
	);
	return (
		<Grid className={clsx(globalStyle.pp5, globalStyle.container)}>
			<Grid>
				<Typography variant={"h1"}>
					<b>Sale Ticket</b>
				</Typography>
			</Grid>
			<Grid className={clsx(globalStyle.pp5)}>
				<Grid
					container
					direction="row"
					justify="space-evenly"
					className={clsx(classes.FormSearch)}
				>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Tìm theo địa điểm"}
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								onSearch(e.target.value);
							}}
						/>
					</Grid>
					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngày bắt đầu"}
							type={"date"}
							value={moment(query.from).format("YYYY-MM-DD")}
							onChange={(e) => {
								setQuery({
									...query,
									from: new Date(e.target.value),
								});
							}}
						/>
					</Grid>

					<Grid>
						<TextField
							fullWidth
							variant="outlined"
							label={"Ngày kết thúc"}
							type={"date"}
							value={moment(query.to).format("YYYY-MM-DD")}
							onChange={(e) => {
								setQuery({
									...query,
									to: new Date(e.target.value),
								});
							}}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				style={{
					// border: "1px solid #ccc",
					padding: 30,
				}}
			>
				{tripHome?.rows?.map((item) => (
					<TripItem trip={item}></TripItem>
				))}
			</Grid>

			<Grid container direction="row" justify="center">
				<Grid className={clsx(globalStyle.pp3)}>
					<Grid container direction="row" justify="center">
						<Grid item className={clsx(globalStyle.mr5)}>
							<Grid>
								<FormControl variant="outlined">
									<Select
										value={query.pageSize}
										onChange={(e) => {
											var getValue: string = e.target.value as any;
											var getValueNumber: number = parseInt(getValue);
											setQuery({
												...query,
												pageSize: getValueNumber,
											});
										}}
									>
										<MenuItem value={5}>5</MenuItem>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={15}>15</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid item>
							<Grid
								container
								direction="column"
								justify="center"
								// alignContent="center"
								style={{
									height: "100%",
								}}
							>
								<Grid>
									<Pagination
										count={Math.ceil(
											(tripHome.total || 1) / (query.pageSize || 1)
										)}
										shape="rounded"
										showFirstButton
										showLastButton
										onChange={(e, value) => {
											setQuery({
												...query,
												page: value,
											});
										}}
										color="standard"
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
