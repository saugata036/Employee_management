import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAndSidebar from "../NavbarAndSidebar";
import DailyAttendancePage from "../UserPage/DailyAttandancePage";
import DashBoard from "../UserPage/DashBoard";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dailyattendancepage" replace />}
      />
      <Route path="/" element={<NavbarAndSidebar />}>
        <Route path="attendancetracker" element={<DashBoard />} />
        <Route path="dailyattendancepage" element={<DailyAttendancePage />} />
      </Route>
    </Routes>
  );
}

export default Router;
