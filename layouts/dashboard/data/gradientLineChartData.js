import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [payment, setPayment] = useState([]);

  const filteredStrings = payment?.month?.filter((str) => {
    // Split the string into an array of words
    // const words = str.split(" ");

    return str.slice(0, 3);
  });

  const state = {
    series: [
      // {
      //   name: "Provider",
      // data: chartData?.map(function (value) {
      //   return value?.totalProvider;
      // }),
      // },

      {
        name: "Revenue",
        // data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 35, 71],
        data: payment?.map(function (value) {
          return value?.percentageAmount;
        }),
      },
      {
        name: "User",
        // data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 15, 81],
        data: chartData?.map(function (value) {
          return value?.percentageOfUser;
        }),
      },
    ],
    options: {
      title: {
        text: "Monthly User / Revenue",
      },
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: payment?.map(function (value) {
          return `${value?.month.substring(0, 3)} ${value?.month.substring(0, -5)}`;
        }),
      },
      // xaxis: {
      //   categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      // },
      yaxis: {
        title: {
          text: "% of User/ Revenue",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " %";
          },
        },
      },
    },
  };

  const getdataUser = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/get/monthwise/user/data`);
      // console.log("moths wize data", res?.data);
      setChartData(res?.data?.monthWiseData);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const getdataPayment = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/get/monthwise/payment/data`);
      // console.log("moths wize data", res?.data);
      setPayment(res?.data?.percentPaymentByMonth);
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    getdataUser();
    getdataPayment();
  }, []);

  return (
    <div
    // style={{
    //   width: "100%",
    //   marginTop: "1rem",
    //   backgroundColor: "white",
    //   boxShadow: "#635d5d -4px 6px 20px -10px",
    //   borderRadius: "0.5rem",
    //   padding: "0.4rem",
    // }}
    >
      <div>
        {/* <h3 style={{ padding: "1rem" }}>Booking Overview</h3> */}
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
          style={{
            fill: {
              colors: ["#d1d119", "#E91E63"],
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarGraph;
