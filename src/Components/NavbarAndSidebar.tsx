// import * as React from "react";
// // import Box from "@mui/material/Box";
// // import Typography from "@mui/material/Typography";
// import { createTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import Diversity3Icon from "@mui/icons-material/Diversity3";
// // import BarChartIcon from "@mui/icons-material/BarChart";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { NavLink, Outlet } from "react-router-dom";

// const NAVIGATION = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     segment: "attendancetracker",
//     title: "Attendance Tracker",
//     icon: <DashboardIcon />,
//     path: "/attendancetracker",
//   },
//   {
//     kind: "divider",
//   },
//   {
//     kind: "header",
//     title: "Attendance_System",
//   },
//   {
//     segment: "dailyattendancepage",
//     title: "Daily Attendance",
//     icon: <Diversity3Icon />,
//     path: "/dailyattendancepage",
//   },
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// const NavbarAndSidebar: React.FC = () => {
//   return (
//     <AppProvider
//       //@ts-ignore
//       navigation={NAVIGATION}
//       theme={demoTheme}
//       branding={{
//         logo: "",
//         title: "Attendance",
//       }}
//     >
//       <div className="flex flex-col items-center justify-center outletOverflow  w-full ">
//         <DashboardLayout>
//           <Outlet />
//         </DashboardLayout>
//       </div>
//     </AppProvider>
//   );
// };

// export default NavbarAndSidebar;

//================================================

import React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { NavLink, Outlet } from "react-router-dom";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "attendancetracker",
    title: "Attendance Tracker",
    icon: <DashboardIcon />,
    path: "/attendancetracker",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Attendance_System",
  },
  {
    segment: "dailyattendancepage",
    title: "Daily Attendance",
    icon: <Diversity3Icon />,
    path: "/dailyattendancepage",
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NavbarAndSidebar: React.FC = () => {
  return (
    <AppProvider
      //@ts-ignore
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        logo: "",
        title: "Attendance",
      }}
    >
      <div className="flex flex-col items-center justify-center outletOverflow w-full p-4">
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </div>
    </AppProvider>
  );
};

export default NavbarAndSidebar;
