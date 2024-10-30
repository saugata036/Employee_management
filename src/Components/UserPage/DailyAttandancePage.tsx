import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";

interface RowData {
  Worker_ID: string;
  Worker_Name: string | null;
  Worker_Email: string;
  STATUS?: string;
}

const DailyAttendancePage = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [updatedData, setUpdatedData] = useState<RowData[]>([]);
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: string]: { present: boolean; absent: boolean };
  }>({});
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const fetchAttendanceData = async (selectedDate: Dayjs | null) => {
    if (!selectedDate) return;
    try {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const response = await axios.get(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance",
        {
          params: { DATE: formattedDate },
        }
      );
      const workerList = response.data.WORKER_DATA.WORKER_LIST.map(
        (worker) => ({
          ...worker,
          STATUS: worker.STATUS || "",
        })
      );
      setRows(workerList);
      setUpdatedData(workerList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusChange = (workerId: string, newStatus: string) => {
    const updatedWorkers = updatedData.map((worker) =>
      worker.Worker_ID === workerId ? { ...worker, STATUS: newStatus } : worker
    );
    setUpdatedData(updatedWorkers);

    setDisabledButtons((prev) => ({
      ...prev,
      [workerId]: {
        present: newStatus === "PRESENT",
        absent: newStatus === "ABSENT",
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://attendance-management-backend-249196266216.us-central1.run.app/workers/attendance",
        {
          DATE: date?.format("YYYY-MM-DD"),
          WORKER_LIST: updatedData,
        }
      );
      alert("Data successfully submitted!");
      setSubmitDisabled(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };

  useEffect(() => {
    fetchAttendanceData(date);
  }, [date]);

  const columns: GridColDef[] = [
    // {
    //   field: "Worker_ID",
    //   headerName: "Worker ID",
    //   width: 200,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "Worker_Name",
      headerName: "Worker Name",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Worker_Email",
      headerName: "Worker Email",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "STATUS",
      headerName: "Status",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "A",
      headerName: "",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridCellParams<any>) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStatusChange(params.row.Worker_ID, "PRESENT")}
          disabled={
            disabledButtons[params.row.Worker_ID]?.present || isSubmitDisabled
          }
        >
          PRESENT
        </Button>
      ),
    },
    {
      field: "B",
      headerName: "",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridCellParams<any>) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleStatusChange(params.row.Worker_ID, "ABSENT")}
          disabled={
            disabledButtons[params.row.Worker_ID]?.absent || isSubmitDisabled
          }
        >
          ABSENT
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center outletOverflow p-8 w-full gap-y-3 pt-2">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <Typography variant="h4" gutterBottom>
          Daily Attendance Maintenance Sheet
        </Typography>

        <div className="w-full mt-5 flex justify-between ">
          <Typography variant="h6" gutterBottom>
            Daily Attendance Table
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              format="YYYY-MM-DD"
            />
          </LocalizationProvider>
        </div>

        <div className="mt-3">
          <div style={{ height: 500, width: "calc(100vw - 600px)" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.Worker_ID}
              // slots={{ toolbar: GridToolbar }}
              hideFooter
              rowHeight={50}
            />
          </div>
        </div>

        <div className="w-full mt-2 flex justify-end">
          <Button
            variant="contained"
            style={{
              height: "50px",
              cursor: "pointer",
              width: "14rem",
            }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyAttendancePage;
