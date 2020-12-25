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

function Statistic() {
   const globalStyle = useGlobalStyles();
   const [dataTicket, setDataTicket] = useState<any>({
      labels: [""],
      datasets: [
         {
            type: "line",
            label: "",
            data: [""],
            fill: false,
            backgroundColor: "rgba(66, 135, 245,1)",
            borderColor: "rgba(66, 135, 245,1)",
         },
      ],
   });

   useEffect(() => { 
      statisticController
         .statisticalIntervalTicket({
            from: new Date("2020/12/24"),
            to: new Date("2020/12/31"),
            interval: "day",
         })
         .then((res) => {
            console.log(res);

            var countDataTempt: number[] = [];
            var dateDataTempt: string[] = [];

            res.forEach((element) => {
               countDataTempt.push(element.data || 0);
               dateDataTempt.push(
                  element.day ? moment(element.day).format("DD-MM") : ""
               );
            });

            setDataTicket({
               ...dataTicket,
               labels: dateDataTempt,
               datasets: [
                  ...dataTicket.datasets,
                  {
                     ...dataTicket.datasets[0],
                     data: countDataTempt,
                  },
               ],
            });
         })
         .catch((err) => console.log(err));
   }, []);

   

   const [dataRevenue, setdataRevenue] = useState<any>({
      labels: [9, 2, 3, 4, 4, 0, 6, 6, 7],
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

   const [summary, setSummary] = useState<Summary>({});

   useEffect(() => {
      statisticController
         .statisticalSummary()
         .then((res) => {
            setSummary(res);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

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
               {/* <Button variant='contained' color="primary">
                  Xem theo tuần
               </Button>
               <Button variant='contained' color="primary">
                  Xem theo tháng
               </Button>
               <Button variant='contained' color="primary">
                  Xem theo năm
               </Button> */}
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
