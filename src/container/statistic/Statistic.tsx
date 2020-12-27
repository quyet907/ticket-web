import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	Link,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@material-ui/core";
import { AttachMoney, Commute, Home, Loyalty, People } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Header from "../../components/genaral-component/Header";
import { statisticController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Summary } from "../../submodules/base-ticket-team/controller.ts/Statistical";
import theme from "../../theme/MuiTheme";
import SummaryGeneral from "./SummaryGeneral";

let iconCustomer = <People fontSize="large" color="primary" />;
let iconTicket = <Loyalty fontSize="large" color="primary" />;
let iconTrip = <Commute fontSize="large" color="primary" />;
let iconRevenue = <AttachMoney fontSize="large" color="primary" />;

export enum Filter {
	_7DAYS = "7 days",
	_30DAYS = "30 days",
	WEEK = "This week",
	MONTH = "This month",
	ALL = "All",
}

const dayAgo = (number: number) => {
	let date = new Date();
	date.setDate(date.getDate() - number);
	return date;
};

const nextDay = (number: number) => {
	let date = new Date();
	date.setDate(date.getDate() + number);
	return date;
};

function Statistic() {
	const globalStyle = useGlobalStyles();
	const [startDate, setStartDate] = useState<Date | undefined>(dayAgo(6));
	const [endDate, setEndDate] = useState<Date | undefined>(new Date());
	const [filter, setFilter] = useState<Filter>(Filter._7DAYS);
	const [titleChart, setTitleChart] = useState<string>("7 ngày");
	const [summary, setSummary] = useState<Summary>({});

	const [dataTicket, setDataTicket] = useState<any>({
		labels: [],
		datasets: [
			{
				type: "bar",
				label: "",
				data: [],
				fill: false,
				backgroundColor: "rgba(66, 135, 245,1)",
				borderColor: "rgba(66, 135, 245,1)",
			},
		],
	});

	const [dataRevenue, setDataRevenue] = useState<any>({
		labels: [],
		datasets: [
			{
				type: "line",
				label: "",
				data: [],
				fill: false,
				backgroundColor: "rgba(66, 135, 245,1)",
				borderColor: "rgba(66, 135, 245,1)",
			},
		],
	});

	const all = () => {
		setStartDate(undefined);
		setEndDate(undefined);
		setTitleChart("Tất cả");
	};

	const dataSevenDayAgo = () => {
		setStartDate(dayAgo(6));
		setEndDate(new Date());
		setTitleChart("7 ngày");
	};

	const dataThirtyDayAgo = () => {
		setStartDate(dayAgo(29));
		setEndDate(new Date());
		setTitleChart("30 ngày");
	};
	const dataThisWeek = () => {
		let date = new Date();

		if (date.getDay() !== 0) {
			setStartDate(dayAgo(date.getDay() - 1));
			setEndDate(nextDay(7 - date.getDay()));
		} else {
			setStartDate(dayAgo(6));
			setEndDate(nextDay(0));
		}

		setTitleChart("Tuần này");
	};

	const dataThisMonth = () => {
		let date = new Date();
		let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		let lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		setStartDate(firstDayOfThisMonth);
		setEndDate(lastDayOfThisMonth);
		setTitleChart("Tháng này");
	};

	const onHandleChangeFilter = (filter: Filter) => {
		switch (filter) {
			case Filter.ALL:
				all();
				break;

			case Filter._7DAYS:
				dataSevenDayAgo();
				break;

			case Filter._30DAYS:
				dataThirtyDayAgo();
				break;

			case Filter.MONTH:
				dataThisMonth();
				break;
			default:
				dataThisWeek();
				break;
		}
	};

	useEffect(() => {
		statisticController
			.statisticalIntervalTicket({
				from: startDate,
				to: endDate,
				interval: "day",
			})
			.then((res) => {
				console.log(res);

				var valueDataTempt: number[] = [];
				var dateDataTempt: string[] = [];

				res.forEach((element) => {
					valueDataTempt.push(element.data || 0);
					dateDataTempt.push(element.day ? moment(element.day).format("DD-MM") : "");
				});

				setDataTicket({
					...dataTicket,
					labels: dateDataTempt,
					datasets: [
						// ...dataTicket.datasets,
						{
							...dataTicket.datasets[0],
							data: valueDataTempt,
						},
					],
				});
			})
			.catch((err) => console.log(err));
	}, [startDate, endDate]);

	useEffect(() => {
		statisticController
			.statisticalIntervalRevenueTicket({
				from: startDate,
				to: endDate,
				interval: "day",
			})
			.then((res) => {
				console.log(res);

				var valueDataTempt: number[] = [];
				var dateDataTempt: string[] = [];

				res.forEach((element) => {
					valueDataTempt.push(element.data || 0);
					dateDataTempt.push(element.day ? moment(element.day).format("DD-MM") : "");
				});

				setDataRevenue({
					...dataRevenue,
					labels: dateDataTempt,
					datasets: [
						// ...dataTicket.datasets,
						{
							...dataRevenue.datasets[0],
							data: valueDataTempt,
						},
					],
				});
			})
			.catch((err) => console.log(err));

		statisticController
			.statisticalSummary({ from: startDate, to: endDate, interval: "day" })
			.then((res) => {
				setSummary(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [startDate, endDate]);

	console.count("Rendering");
	return (
		<Grid container>
			<Grid item xs={8} container alignItems="center">
				<Typography variant={"h3"}>
					<b>Tổng quan</b>
				</Typography>
				<Typography variant="h3">&nbsp;|&nbsp;</Typography>
				<Link
					style={{ display: "flex", alignItems: "center" }}
					color="inherit"
					href="#"
					onClick={() => {}}
				>
					<Home color="primary" />
				</Link>
			</Grid>

			<Grid
				item
				xs={4}
				container
				alignItems="center"
				justify="flex-end"
				style={{ position: "sticky", top: 0 }}
			>
				<Box>
					<FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
						<InputLabel id="demo">Thời gian</InputLabel>
						<Select
							labelId="demo"
							id="demo-simple-select-outlined"
							value={filter}
							onChange={(e) => {
								onHandleChangeFilter(e.target.value as Filter);
								setFilter(e.target.value as Filter);
							}}
							label="Thời gian"
						>
							<MenuItem value={Filter._7DAYS}>07 ngày</MenuItem>
							<MenuItem value={Filter._30DAYS}>30 ngày</MenuItem>
							<MenuItem value={Filter.WEEK}>Tuần này</MenuItem>
							<MenuItem value={Filter.MONTH}>Tháng này</MenuItem>
							<MenuItem value={Filter.ALL}>Tất cả</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Grid>

			<Grid container spacing={3} style={{ marginTop: theme.spacing(1) }}>
				<Grid item xs={12} md={6} lg={3} xl={3}>
					<SummaryGeneral
						icon={iconCustomer}
						title="Tổng số khách hàng"
						value={summary?.totalCustomer || 0}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3} xl={3}>
					<SummaryGeneral
						icon={iconTicket}
						title="Tổng số vé"
						value={summary?.totalTicket || 0}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3} xl={3}>
					<SummaryGeneral
						icon={iconTrip}
						title="Tổng số chuyến đi"
						value={summary?.totalTrip || 0}
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3} xl={3}>
					<SummaryGeneral
						icon={iconRevenue}
						title="Tổng doanh thu"
						value={summary?.totalRevenue || 0}
						isMoney={true}
					/>
				</Grid>

				<Grid item xs={12}>
					<Paper elevation={3}>
						<Box p={3} height={400}>
							<Bar
								data={dataTicket}
								options={{
									title: {
										display: true,
										text: "Vé được bán trong " + titleChart,
										color: "white",
									},
									animation: {
										duration: 3000,
									},
									tooltips: {
										mode: "index",
										axis: "x",
									},
									responsive: true,
									maintainAspectRatio: false,
									scales: {
										yAxes: [
											{
												ticks: {
													// maxTicksLimit: props.data.values.length / 2,
													precision: 0,
													beginAtZero: true,
												},
											},
										],
										xAxes: [
											{
												barPercentage: 0.4,
											},
										],
									},
								}}
								// height={100}
							/>
						</Box>
					</Paper>
				</Grid>

				<Grid item xs={12}>
					<Paper elevation={3}>
						<Box p={3} height={400}>
							<Bar
								data={dataRevenue}
								options={{
									title: {
										display: true,
										text: "Doanh thu trong " + titleChart,
										color: "white",
									},
									animation: {
										duration: 3000,
									},
									tooltips: {
										mode: "index",
										axis: "x",
									},
									responsive: true,
									maintainAspectRatio: false,
									
								}}
								// height={100}
							/>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Statistic;
