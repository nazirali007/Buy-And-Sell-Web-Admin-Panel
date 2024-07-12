import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";

// Gurash Dahboard MUI example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Gurash Dahboard MUI themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Gurash Dahboard MUI routes
import routes from "routes";

// Gurash Dahboard MUI contexts
import { useArgonController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import brandDark from "assets/images/AppLogo.png";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import Loader from "./components/Loader/Loader";
import { Alert, List, ListItem, ListItemIcon, ListItemText, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/action/defaultActions";
import SingleProductData from "components/AdminSection/Product/SingleProductData";
import SignIn from "./layouts/authentication/sign-in";
import ForgetPassword from "./layouts/authentication/forget-password";
import ResetPassword from "./layouts/authentication/resetPassword";
import MainVerification from "./components/AdminSection/Verification/MainVerification";
import HomeProductSection from "./components/AdminSection/Product/HomeProductSection";
import MainListManagement from "./components/AdminSection/AddListManagement/MainListManagement";
import PrivacyAndPolicy from "./components/AdminSection/ManualSection/PrivacyAndPolicy";
import TermsAndCondition from "./components/AdminSection/ManualSection/TermsAndCondition";
import TransactionMainTable from "components/AdminSection/TransactionManagement/TransactionMainTable";
import BusinessModal from "components/AdminSection/UserDetails/BusinessModal";
import AdvertisementHeroTable from "components/AdminSection/Advertisement/AdvertisementHeroTable";
import SellingMyItem from "components/AdminSection/Product/SellingMyItem";
import ReportBugsMain from "components/AdminSection/ReportAndBugs/ReportBugsMain";
import FaqHero from "components/AdminSection/FAQ.js/FaqHero";
import NoticeHero from "components/AdminSection/Notice/NoticeHero";
import CkEditorComponent from "components/AdminSection/GurashSaving/CkEditorComponent";
import DisplayContent from "components/AdminSection/GurashSaving/DisplayContent";
import WhatsNew from "components/AdminSection/WhatsNew/WhatsNew";
import BusinessTableMain from "components/AdminSection/UserDetails/BusinessProfile/BusinessTableMain";


const App = () => {
  const { snackbar } = useSelector((state) => state);
  const actionDispatcher = useDispatch();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, darkSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl


  // INSIDE node module /scripts
  // "install:clean": "rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start"
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // close snackabar
  const handleClose = () => {
    actionDispatcher(closeSnackbar());
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const admin = JSON.parse(localStorage.getItem("admin"))

  return (
    <>
      <Loader />
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={darkSidenav || darkMode ? brand : brandDark}
              brandName="Gurash Admin Panel"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        {/* {layout === "vr" && <Configurator />} */}
        <Routes>
          {getRoutes(routes)}

          <Route path="/" element={admin && admin?.isLoggedIn && admin?.isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/authentication/sign-in" />} />
          <Route path="/product/singleProduct/:Id" element={<SingleProductData />} />
          {!admin && !admin?.isLoggedIn && !admin?.isAuthenticated ?
            <>
              <Route path="/authentication/sign-in" element={<SignIn />} />
              <Route path="/authentication/forget-password/:token" element={<ForgetPassword />} />
              <Route path="/authentication/reset-password" element={<ResetPassword />} />
            </>
            :
            <>
              {/* <Route path="/product/verification" element={<MainVerification />} /> */}
              <Route path="/product" element={<HomeProductSection />}>
                <Route path="/product/verification" element={<MainVerification />} />
              </Route>
              <Route path="/ListManagement" element={<MainListManagement />} />
              <Route path="/PrivacyAndPolicy" element={<PrivacyAndPolicy />} />
              <Route path="/TermsAndCondition" element={<TermsAndCondition />} />
              <Route path="/TermsAndCondition/application" element={<TermsAndCondition />} />
              <Route path="/TermsAndCondition/advertisement" element={<TermsAndCondition />} />
              <Route path="/TermsAndCondition/partTime" element={<TermsAndCondition />} />
              <Route path="/TermsAndCondition/bizProfile" element={<TermsAndCondition />} />
              <Route path="/TransactionManagement" element={<TransactionMainTable />}></Route>
              <Route path="/BusinessUser" element={<BusinessTableMain />}></Route>
              <Route path="/businessProfile/:id" element={<BusinessModal />}></Route>
              <Route path="/AdvertisementTable" element={<AdvertisementHeroTable />}></Route>
              <Route path="/sellingMyItem" element={<SellingMyItem />}></Route>
              <Route path="/reportAndBugs" element={<ReportBugsMain />}></Route>
              <Route path="/faq" element={<FaqHero />}></Route>
              <Route path="/notice" element={<NoticeHero />}></Route>
              <Route path="/gurashSaving" element={<CkEditorComponent />}></Route>
              <Route path="/gurashSavingDisplay" element={<DisplayContent />} />
              <Route path="/whatsNew" element={<WhatsNew />} />
            </>}


          {/* <Route path="/updateCategory" element={<UpdateCategoryHero />} /> */}
        </Routes>
      </ThemeProvider>
    </>
  );
}
export default App;
