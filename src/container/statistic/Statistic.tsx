import { Grid, Typography } from "@material-ui/core";
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

	useEffect(() => {
		
	}, [])
	return (
		<Grid
			container
			direction="column"
			className={clsx(globalStyle.pp5, globalStyle.container)}
		>
			<Grid xs={12} container>
				<Grid xs={6} container>
					<Grid container direction="row" xs={12}>
						<SummaryGeneral></SummaryGeneral>
						<SummaryGeneral></SummaryGeneral>
					</Grid>

					<Grid container direction="row" className = {clsx(globalStyle.mt3)}>
						<SummaryGeneral></SummaryGeneral>
						<SummaryGeneral></SummaryGeneral>
					</Grid>
				</Grid>

				<Grid xs={6} className={clsx(globalStyle.border)}>
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
					/>
				</Grid>
			</Grid>

			<Grid className={clsx(globalStyle.pt3, globalStyle.pr2)}>
				<Grid
					container
					direction="row"
					xs={12}
					className={clsx(globalStyle.border)}
				>
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
						height={100}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Statistic;
