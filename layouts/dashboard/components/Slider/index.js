import { useEffect, useRef, useState } from "react";

// SwiperJS
import SwiperCore, { Autoplay, Navigation } from "swiper";

// SwiperJS react components
import { Swiper, SwiperSlide } from "swiper/react";

// SwiperJS styles
import "swiper/swiper-bundle.min.css";

// @mui material components
import Card from "@mui/material/Card";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Images
import bg1 from "assets/images/img-2.jpg";
import bg2 from "assets/images/img-1.jpg";
import bg3 from "assets/images/img-3.jpg";
import axios from "axios";

function sliderImagesWithData(data) {
  const imageArray = data.map((item, index) => {
    return {
      key: index,
      title: `${item.title}`,
      imgUrl: item.images && item.images.length > 0 ? `${item.images[0].imageUrl}` : bg2,
      description: `${item.description}`,
    };
  });
  return imageArray;
}

function Slider() {
  // install SwiperJS modules
  SwiperCore.use([Autoplay, Navigation]);

  // SwiperJS navigation buttons ref
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [dataSlider, setDataSlider] = useState(null);

  //   // ****************************Transaction Single UsER Details Section*********************************
  const handleTransactionDetails = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/get/all/recently/added/products`);
      // console.log("dashboardProduct===>", res?.data);
      setDataSlider(res?.data?.recentlyAddedProducts);
      // return res.data.allUsers;
    } catch (error) {
      console.log("error===>", error);
    }
  };
  //   // ****************************************************************************************
  // console.log("======>", dataSlider);

  const sliderData = dataSlider && dataSlider.length > 0 ? sliderImagesWithData(dataSlider) : [];
  // console.log("====>", sliderData);

  useEffect(() => {
    handleTransactionDetails();
  }, []);

  return (
    <Card sx={{ position: "relative", display: "block", height: "100%", overflow: "hidden" }}>
      {sliderData && sliderData.length > 0 ? (
        <Swiper
          onInit={({ params, navigation }) => {
            const { navigation: nav } = params;
            nav.prevEl = navigationPrevRef.current;
            nav.nextEl = navigationNextRef.current;
            // console.log("nav==>", nav);
            navigation.init();
            navigation.update();
          }}
          autoplay={{ delay: 3000 }}
          speed={800}
          spaceBetween={0}
          slidesPerView={1}
          loop
          style={{ height: "100%" }}
        >
          <ArgonBox
            display="flex"
            alignItems="center"
            position="absolute"
            top={12}
            right={12}
            zIndex={5}
            // sx={{ border: "2px solid green" }}
          >
            <ArgonBox
              width="3.25rem"
              height="3.25rem"
              color="white"
              p={2}
              sx={{ cursor: "pointer" }}
              ref={navigationPrevRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </ArgonBox>
            <ArgonBox
              width="3.25rem"
              height="3.25rem"
              color="white"
              p={2}
              sx={{ cursor: "pointer" }}
              ref={navigationNextRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </ArgonBox>
          </ArgonBox>

          {sliderData?.map((value, index) => {
            return (
              <SwiperSlide key={index}>
                <ArgonBox
                  sx={{
                    position: "relative",
                    backgroundImage: `url(${value.imgUrl})`,

                    backgroundSize: "cover",
                    height: "100%",
                  }}
                >
                  <ArgonBox
                    position="absolute"
                    bottom={16}
                    ml={6}
                    py={2.5}
                    textAlign="left"
                    width="80%"
                    bgColor="rgba(0, 0, 0, 0.5)"
                    borderRadius="0.5rem"
                  >
                    <ArgonTypography variant="h5" color="white" mb={0.5} px={2}>
                      {value?.title}
                    </ArgonTypography>
                    <ArgonTypography variant="body2" color="white" px={2}>
                      {value?.description}
                    </ArgonTypography>
                  </ArgonBox>
                </ArgonBox>
              </SwiperSlide>
            );
          })}

          {/* <SwiperSlide>
          <ArgonBox
            sx={{
              position: "relative",
              backgroundImage: `url(${bg2})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <ArgonBox position="absolute" bottom={16} ml={6} py={2.5} textAlign="left" width="80%">
              <ArgonBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                bgColor="white"
                borderRadius="md"
                textAlign="center"
                mb={2}
              >
                <ArgonTypography variant="caption" lineHeight={0}>
                  <ArgonBox component="i" color="dark" className="ni ni-bulb-61" />
                </ArgonTypography>
              </ArgonBox>
              <ArgonTypography variant="h5" color="white" mb={0.5}>
                Faster way to create web pages
              </ArgonTypography>
              <ArgonTypography variant="body2" color="white">
                That&apos;s my skill. I&apos;m not really specifically talented at anything except
                for the ability to learn.
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </SwiperSlide>
        <SwiperSlide>
          <ArgonBox
            sx={{
              position: "relative",
              backgroundImage: `url(${bg3})`,
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <ArgonBox position="absolute" bottom={16} ml={6} py={2.5} textAlign="left" width="80%">
              <ArgonBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="32px"
                height="32px"
                bgColor="white"
                borderRadius="md"
                textAlign="center"
                mb={2}
              >
                <ArgonTypography variant="caption" color="dark" lineHeight={0}>
                  <ArgonBox component="i" color="dark" className="ni ni-trophy" />
                </ArgonTypography>
              </ArgonBox>
              <ArgonTypography variant="h5" color="white" mb={0.5}>
                Share with us your design tips!
              </ArgonTypography>
              <ArgonTypography variant="body2" color="white">
                Don&apos;t be afraid to be wrong because you can&apos;t learn anything from a
                compliment.
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </SwiperSlide> */}
        </Swiper>
      ) : (
        ""
      )}
    </Card>
  );
}

export default Slider;
