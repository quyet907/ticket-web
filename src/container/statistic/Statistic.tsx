import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Bar, ChartComponentProps } from "react-chartjs-2";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import clsx from "clsx";
import SummaryGeneral from "./SummaryGeneral";

function Statistic() {
	const globalStyle = useGlobalStyles();
	const [dataTicket, setDataTicket] = useState<any>({
		labels: [1, 2, 3, 4, 4, 5, 6, 6, 7],
		datasets: [
			{
				type: "line",
				label: "",
				data: [1, 2, 3, 4, 4, 5, 6, 6, 7],
				fill: false,
				backgroundColor: "rgba(66, 135, 245,1)",
				borderColor: "rgba(66, 135, 245,1)",
			},
		],
	});

	const [dataRevenue, setdataRevenue] = useState<any>({
		labels: [1, 2, 3, 4, 4, 5, 6, 6, 7],
		datasets: [
			{
				type: "line",
				label: "",
				data: [1, 2, 3, 4, 4, 5, 6, 6, 7],
				fill: false,
				backgroundColor: "rgba(66, 135, 245,1)",
				borderColor: "rgba(66, 135, 245,1)",
			},
		],
	});

	useEffect(() => {}, []);
	return (
		<Grid xs={12} container spacing={3}>
			<Grid item xs={12} md={6} lg={3} xl={3}>
				<SummaryGeneral></SummaryGeneral>
			</Grid>
			<Grid item xs={12} md={6} lg={3} xl={3}>
				<SummaryGeneral></SummaryGeneral>
			</Grid>
			<Grid item xs={12} md={6} lg={3} xl={3}>
				<SummaryGeneral></SummaryGeneral>
			</Grid>
			<Grid item xs={12} md={6} lg={3} xl={3}>
				<SummaryGeneral></SummaryGeneral>
			</Grid>

			<Grid item xs={12} lg={9}>
				<Paper elevation={3}>
					<Bar
						data={dataTicket}
						options={{
							title: {
								display: true,
								text: "Vé được bán trong tuần qua",
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
							maintainAspectRatio: true,
						}}
						// height={100}
					/>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default Statistic;
