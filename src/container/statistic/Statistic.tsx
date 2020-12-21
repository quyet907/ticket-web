import { Grid, Paper } from "@material-ui/core";
import { AttachMoney, Commute, Loyalty, People } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { statisticController } from "../../service";
import { StatisticalController } from "../../service/fake-data/StatisticalController";
import { StatisticalService } from "../../service/StatisticalService";
import { useGlobalStyles } from "../../styles/GlobalStyle";
import SummaryGeneral from "./SummaryGeneral";

function Statistic() {
   let fakeData: number[] = [9, 2, 3, 0, 4, 5, 1];
   let fakeDate: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

   const globalStyle = useGlobalStyles();

   const [state, setstate] = useState({
      data: fakeData,
      title: "",
   });

   const [dataTicket, setDataTicket] = useState<any>({
      labels: fakeDate,
      datasets: [
         {
            type: "line",
            label: "",
            data: fakeData,
            fill: false,
            backgroundColor: "rgba(66, 135, 245,1)",
            borderColor: "rgba(66, 135, 245,1)",
         },
      ],
   });

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

   const [totalCustomer, setTotalCustomer] = useState<number>(0);
   const [totalRevenue, setTotalRevenue] = useState<number>(0);
   const [totalTicket, setTotalTicket] = useState<number>(0);
   const [totalTrip, setTotalTrip] = useState<number>(0);

   useEffect(() => {
      statisticController.statisticalSummary().then((res) => {
         setTotalCustomer(res.totalCustomer || 0);
         setTotalRevenue(res.totalRevenue || 0);
         setTotalTicket(res.totalTicket || 0);
         setTotalTrip(res.totalTrip || 0);
      }).catch((err => {
         console.log(err)
      }));
   }, []);

   let iconCustomer = <People fontSize="large" color="primary" />;
   let iconTicket = <Loyalty fontSize="large" color="primary" />;
   let iconTrip = <Commute fontSize="large" color="primary" />;
   let iconRevenue = <AttachMoney fontSize="large" color="primary" />;

   return (
      <Grid xs={12} container spacing={3}>
         <Grid item xs={12} md={6} lg={3} xl={3}>
            <SummaryGeneral
               icon={iconCustomer}
               title="Tổng số khách hàng"
               value={totalCustomer}
            />
         </Grid>
         <Grid item xs={12} md={6} lg={3} xl={3}>
            <SummaryGeneral
               icon={iconTicket}
               title="Tổng số vé"
               value={totalTicket}
            />
         </Grid>
         <Grid item xs={12} md={6} lg={3} xl={3}>
            <SummaryGeneral
               icon={iconTrip}
               title="Tổng số chuyến đi"
               value={totalTrip}
            />
         </Grid>
         <Grid item xs={12} md={6} lg={3} xl={3}>
            <SummaryGeneral
               icon={iconRevenue}
               title="Tổng doanh thu"
               value={totalRevenue}
               isMoney={true}
            />
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
