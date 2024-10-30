import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface RowData {
  DATE: string;
  PRESENT: number;
  ABSENT: number;
}

const DashBoard = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);
  const [date, setDate] = useState<Dayjs | null>(null);

  const fetchWorkerData = async () => {
    try {
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/all"
      );

      const listEntry = Object.entries(response.data)
        .map(([date, data]) => ({
          DATE: date,
          PRESENT: (data as { PRESENT?: number }).PRESENT || 0,
          ABSENT: (data as { ABSENT?: number }).ABSENT || 0,
        }))
        .filter((entry) => dayjs(entry.DATE, "YYYY-MM-DD", true).isValid());

      setRows(listEntry);
      setFilteredRows(listEntry);
    } catch (error) {
      console.error("Error fetching worker data:", error);
    }
  };

  const downloadCSV = async (date: string) => {
    try {
      const response = await axios.get(
        `https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance/report`,
        {
          params: {
            DATE: date,
          },
        }
      );
      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance_report_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download the report.");
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
    if (newDate) {
      const selectedDate = newDate.format("YYYY-MM-DD");
      setFilteredRows(rows.filter((row) => row.DATE === selectedDate));
    } else {
      setFilteredRows(rows);
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "DATE",
      headerName: "Date",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PRESENT",
      headerName: "Present",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ABSENT",
      headerName: "Absent",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "download",
      headerName: "Download CSV",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => downloadCSV(params.row.DATE)}
        >
          Click Here To Download
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center outletOverflow p-8 w-full h-full gap-y-3 pt-2">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <Typography variant="h4" gutterBottom>
          Present And Absent Tracker Table
        </Typography>
      </div>
      <div className="w-full mt-5 flex justify-end">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>
      </div>

      <div>
        <div style={{ height: 500, width: "calc(100vw - 700px)" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.DATE}
            // slots={{ toolbar: GridToolbar }}
            hideFooter
            rowHeight={50}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
