import {
	Box,
	Breadcrumbs,
	Divider,
	FormControl,
	Grid,
	Link,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";
import _ from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/genaral-component/Header";
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
		pageSize: 6,
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
		<Grid>
			<Header
				title="Bán vé "
				breadcrumbs={
					<Breadcrumbs aria-label="breadcrumb">
						<Link color="secondary" href="/ticket" onClick={() => {}}>
							<Typography variant="caption" color="primary">
								Bán vé
							</Typography>
						</Link>
					</Breadcrumbs>
				}
			/>
			<Paper>
				<Box p={2}>
					<Grid>
						<Grid container direction="row" spacing={6}>
							<Grid item>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label={"Tìm theo địa điểm"}
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										onSearch(e.target.value);
									}}
									style={{ width: 300 }}
								/>
							</Grid>
							<Grid item>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label={"Ngày khởi hành"}
									type={"date"}
									value={moment(query.from).format("YYYY-MM-DD")}
									onChange={(e) => {
										setQuery({
											...query,
											from: new Date(e.target.value),
										});
									}}
									style={{ width: 300 }}
								/>
							</Grid>

							<Grid item>
								<TextField
									fullWidth
									variant="outlined"
									size="small"
									label={"Ngày kết thúc"}
									type={"date"}
									value={moment(query.to).format("YYYY-MM-DD")}
									onChange={(e) => {
										setQuery({
											...query,
											to: new Date(e.target.value),
										});
									}}
									style={{ width: 300 }}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Paper>

			<Grid container direction="row" spacing={3} className={globalStyle.mt3}>
				{tripHome?.rows?.map((item) => (
					<Grid item xs={12} lg={6}>
						<TripItem trip={item}></TripItem>
					</Grid>
				))}
			</Grid>

			<Grid container direction="row" justify="center">
				<Grid className={clsx(globalStyle.pp3)}>
					<Grid container direction="row" justify="center">
						<Grid item xs>
							<Box>
								<FormControl variant="outlined" size="small">
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
										<MenuItem value={6}>6</MenuItem>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={15}>15</MenuItem>
									</Select>
								</FormControl>
							</Box>
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
