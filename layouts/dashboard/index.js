// @mui material components
import Grid from "@mui/material/Grid";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";

// Gurash Dahboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";

import dayjs from "dayjs";

// Gurash Dahboard MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarGraph from "./data/gradientLineChartData";
import DashboardCategoryList from "components/AdminSection/DashboardComponent/DashboardCategoryList";

function tableRows(params) {
  const tempArray = params?.map((item, index) => {
    return {
      user: [item?.image?.imageUrl, `${item.userName}`],
      email: item.email,
      mobile: `(${item.countryCode}) ${item.contactNo}`,
      createdAt: dayjs(`${item.createdAt}`).format("DD/MM/YY h:mm A"),
    };
  });
  return tempArray;
}

function Default() {
  const navigate = useNavigate();
  const { size } = typography;
  const [cardData, setCardData] = useState(" ");
  const [chartData, setChartData] = useState([]);

  //   // ****************************Card Section UsER get Data ************************************
  const getdataUser = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/get/recently/registered/users`);
      // console.log("moths===ser==>F", res?.data?.recentUsers);
      setChartData(res?.data?.recentUsers);
    } catch (error) {
      console.log(error?.message);
    }
  };

  // ***************************************************************************************************

  //   // ****************************Card Section UsER get Data ************************************
  const dashboardCard = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/get/dashboard/data`);
      // console.log("DashBoardData===>", res?.data);
      setCardData(res?.data?.dashboardData);
    } catch (error) {
      console.log("error===>", error);
    }
  };

  // ***************************************************************************************************
  useEffect(() => {
    dashboardCard();
    getdataUser();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Box
            // onClick={() => navigate("/TransactionManagement")}
            >
              <DetailedStatisticsCard
                title="Revenue"
                count={
                  cardData?.Revenue && cardData?.Revenue !== null ? ` रू${cardData?.Revenue}` : " "
                }
                icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
                // percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box
            // onClick={() => navigate("/UserDetails")}
            >
              <DetailedStatisticsCard
                title="Total Users"
                count={cardData?.Users}
                icon={{ color: "error", component: <i className="ni ni-world" /> }}
                percentage={{ color: "success", count: "+3%", text: "since last week" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box
            //  onClick={() => navigate("/BusinnessUserDetails")}
            >
              {/* <Route path="/BusinnessUserDetails" element={<BusinessTableMain />}></Route> */}
              <DetailedStatisticsCard
                title="Business Profile"
                count={cardData?.BusinessProfile}
                icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
                percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box>
              <DetailedStatisticsCard
                title="Sold Products"
                count={cardData?.SoldProducts}
                icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
                percentage={{ color: "success", count: "+5%", text: "than last month" }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <Card>
              <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#fafafa" }}>
                {/* <ArgonTypography variant="button" color="text" fontWeight="bold">
                  Monthly User / Revenue
                </ArgonTypography> */}
                <BarGraph />
              </Paper>
            </Card>
            {/* <GradientLineChart
              title="Sales Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={ApexChart}
            /> */}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sx={{ maxHeight: "31rem", overflow: "auto" }}>
            <SalesTable title="Latest User" rows={tableRows(chartData)} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ maxHeight: "31rem" }}>
            {/* <CategoriesList title="categories" categories={categoriesListData} /> */}
            <DashboardCategoryList />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
