import { Button, Grid, Paper } from "@material-ui/core";
import { AttachMoney, Commute, Loyalty, People } from "@material-ui/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { statisticController } from "../../service";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import { Summary } from "../../submodules/base-ticket-team/controller.ts/Statistical";
import SummaryGeneral from "./SummaryGeneral";

let iconCustomer = <People fontSize="large" color="primary" />;
let iconTicket = <Loyalty fontSize="large" color="primary" />;
let iconTrip = <Commute fontSize="large" color="primary" />;
let iconRevenue = <AttachMoney fontSize="large" color="primary" />;

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
   const [startDate, setStartDate] = useState<Date | undefined>(dayAgo(6))
   const [endDate, setEndDate] = useState<Date | undefined>(new Date())
   const [titleChart, setTitleChart] = useState<string>("7 ngày")
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

   const all=()=>{
      setStartDate(undefined)
      setEndDate(undefined)
      setTitleChart("Tất cả")
   }

   const dataSevenDayAgo = () => {
      setStartDate(dayAgo(6))
      setEndDate(new Date())
      setTitleChart("7 ngày")
   }

   const dataThirtyDayAgo = () => {
      setStartDate(dayAgo(29))
      setEndDate(new Date())
      setTitleChart("30 ngày")
   }

   const dataThisWeek = () => {
      setStartDate(dayAgo(new Date().getDay() - 1))
      setEndDate(nextDay(7 - new Date().getDay()))
      setTitleChart("Tuần này")
   }

   const dataThisMonth = () => {
      let date = new Date()
      let firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      let lastDayOfThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      setStartDate(firstDayOfThisMonth)
      setEndDate(lastDayOfThisMonth)
      setTitleChart("Tháng này")
   }

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
               dateDataTempt.push(
                  element.day ? moment(element.day).format("DD-MM") : ""
               );
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
               dateDataTempt.push(
                  element.day ? moment(element.day).format("DD-MM") : ""
               );
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
         .statisticalSummary({from: startDate,
            to: endDate,
            interval: "day"})
         .then((res) => {
            setSummary(res);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [startDate, endDate]);


   console.count("Rendering");
   return (
      <Grid xs={12} container spacing={3}>
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

         <Grid item xs={12} lg={9}>
            <Paper elevation={3}>
               <Button variant="contained" color="primary" onClick={() => all()}>
                  Tất cả
               </Button>
               <Button variant="contained" color="primary" onClick={() => dataSevenDayAgo()}>
                  07 ngày
               </Button>
               <Button variant="contained" color="primary" onClick={() => dataThisWeek()}>
                  Tuần này
               </Button>
               <Button variant="contained" color="primary" onClick={() => dataThirtyDayAgo()} >
                  30 ngày
               </Button>
               <Button variant="contained" color="primary" onClick={() => dataThisMonth()}>
                  Tháng này
               </Button>
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
                     maintainAspectRatio: true,
                  }}
               // height={100}
               />
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
