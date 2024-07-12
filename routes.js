/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Gurash Dahboard MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PolicyIcon from "@mui/icons-material/Policy";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CampaignIcon from "@mui/icons-material/Campaign";
import CategoryIcon from "@mui/icons-material/Category";
import BugReportIcon from "@mui/icons-material/BugReport";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FiberNewIcon from "@mui/icons-material/FiberNew";

// Gurash Dahboard MUI components
import ArgonBox from "components/ArgonBox";
import HomeProductSection from "./components/AdminSection/Product/HomeProductSection";
import PrivacyAndPolicy from "./components/AdminSection/ManualSection/PrivacyAndPolicy";
import TermsAndCondition from "./components/AdminSection/ManualSection/TermsAndCondition";
import TransactionMainTable from "components/AdminSection/TransactionManagement/TransactionMainTable";
import AdvertisementHeroTable from "components/AdminSection/Advertisement/AdvertisementHeroTable";
import SellingMyItem from "components/AdminSection/Product/SellingMyItem";
import ReportBugsMain from "components/AdminSection/ReportAndBugs/ReportBugsMain";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BusinessIcon from "@mui/icons-material/Business";
import FaqHero from "components/AdminSection/FAQ.js/FaqHero";
import NoticeHero from "components/AdminSection/Notice/NoticeHero";
import CkEditorComponent from "components/AdminSection/GurashSaving/CkEditorComponent";
import WhatsNew from "components/AdminSection/WhatsNew/WhatsNew";
import BusinessTableMain from "components/AdminSection/UserDetails/BusinessProfile/BusinessTableMain";
import UpdateCategoryHero from "components/AdminSection/Product/UpdateCategory/UpdateCategoryHero";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "User Details",
    key: "UserDetails",
    route: "/UserDetails",
    icon: (
      // <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
      <PersonOutlineIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <Tables />,
  },
  {
    type: "route",
    name: "Business User",
    key: "BusinessUser",
    route: "/BusinessUser",
    icon: (
      // <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
      <BusinessIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <BusinessTableMain />,
  },

  // {
  //   type: "route",
  //   name: "Category/List Management",
  //   key: "updateCategory",
  //   route: "/updateCategory",

  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-app" />,
  //   component: <UpdateCategoryHero />,
  // },
  {
    type: "route",
    name: "Product",
    key: "product",
    route: "/product",

    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-app" />,
    // component: <Billing />,
    component: <HomeProductSection />,
  },
  {
    type: "route",
    name: "Selling My Item",
    key: "sellingMyItem",
    route: "/sellingMyItem",

    // icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-app" />,
    icon: <CategoryIcon sx={{ color: "#39c5db", fontSize: "large" }} />,
    component: <SellingMyItem />,
  },
  {
    type: "route",
    name: "Advertisement",
    key: "AdvertisementTable",
    route: "/AdvertisementTable",
    icon: <CampaignIcon sx={{ color: "#39c5db", fontSize: "large" }} />,
    component: <AdvertisementHeroTable />,
  },

  // {
  //   type: "route",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-world-2" />,
  //   component: <RTL />,
  // },
  // <Route path="/manual" element={<PrivacyAndPolicyMain />}></Route>
  // {
  //   type: "route",
  // name: "Privacy And Policy",
  // key: "PrivacyAndPolicy",
  // route: "/PrivacyAndPolicy",
  //   // icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-world-2" />,
  //   icon: <PolicyIcon />,
  //   component: <PrivacyAndPolicy sx={{ color: "red" }} />,
  // },
  {
    type: "route",
    name: "Privacy And Policy",
    key: "PrivacyAndPolicy",
    route: "/PrivacyAndPolicy",
    icon: (
      // <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
      <PolicyIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <PrivacyAndPolicy />,
  },

  {
    type: "route",
    name: "Terms And Condition",
    key: "TermsAndCondition",

    icon: (
      <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),

    childrens: [
      {
        type: "route",
        name: "Application",
        key: "application",
        route: "/application",
        icon: (
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
        ),
        component: <TermsAndCondition />,
      },
      {
        type: "route",
        name: "Advertisement",
        key: "advertisement",
        route: "/advertisement",
        icon: (
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
        ),
        component: <TermsAndCondition />,
      },
      {
        type: "route",
        name: "Part Time",
        key: "partTime",
        route: "/partTime",
        icon: (
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
        ),
        component: <TermsAndCondition />,
      },
      {
        type: "route",
        name: "Biz Profile ",
        key: "bizProfile",
        route: "/bizProfile",
        icon: (
          <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
        ),
        component: <TermsAndCondition />,
      },
    ],
  },
  {
    type: "route",
    name: "Transaction Management",
    key: "TransactionManagement",
    route: "/TransactionManagement",
    icon: <CurrencyExchangeIcon sx={{ color: "#39c5db", fontSize: "large" }} />,
    component: <TransactionMainTable />,
  },
  {
    type: "route",
    name: "Report Bugs",
    key: "reportAndBugs",
    route: "/reportAndBugs",
    icon: (
      // <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
      <BugReportIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <ReportBugsMain />,
  },
  {
    type: "route",
    name: "FAQ",
    key: "faq",
    route: "/faq",
    icon: (
      // <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
      <LiveHelpIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <FaqHero />,
  },
  {
    type: "route",
    name: "Notice",
    key: "notice",
    route: "/notice",
    icon: (
      // <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
      <EventNoteIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <NoticeHero />,
  },

  {
    type: "route",
    name: "GurashSaving",
    key: "gurashSaving",
    route: "/gurashSaving",
    icon: (
      // <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
      <BorderColorIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <CkEditorComponent />,
  },
  {
    type: "route",
    name: "WhatsNew",
    key: "whatsNew",
    route: "/whatsNew",
    icon: (
      // <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-calendar-grid-58" />
      <FiberNewIcon sx={{ color: "#39c5db", fontSize: "large" }} />
    ),
    component: <WhatsNew />,
  },

  // {
  //   type: "route",
  //   name: "List Management",
  //   key: "ListManagement",
  //   route: "/ListManagement",
  //   icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-world-2" />,
  //   component: <MainListManagement />,
  // },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-single-02" />,
    component: <Profile />,
  },

  // {
  //   type: "route",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
  //   ),
  //   component: <SignIn />,
  // },
  // {
  //   type: "route",
  //   name: "Forget Password",
  //   key: "forget-password",
  //   route: "/authentication/forget-password/:id",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
  //   ),
  //   component: <ForgetPassword />,
  // },
  // {
  //   type: "route",
  //   name: "Reset Password",
  //   key: "reset-password",
  //   route: "/authentication/reset-password",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
  //   ),
  //   component: <ResetPassword />,
  // },
  // {
  //   type: "route",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
  //   component: <SignUp />,
  // },
];

export default routes;
