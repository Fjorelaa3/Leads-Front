import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Select } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

function InspectionsPage() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(ArcElement);

  const labels = ["Inspected", "Draft", "Failed", "Passed", "Dispatched"];

  const data1 = {
    labels,
    datasets: [
      {
        data: labels.map(() => ({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const data2 = {
    datasets: [
      {
        data: [12, 7, 3, 5, 2],
        backgroundColor: [
          "rgba(27, 188, 0, 0.8)",
          "rgba(255, 202, 61, 0.8)",
          "rgba(233, 46, 33, 0.8)",
          "rgba(4, 125, 6, 0.8)",
          "rgba(20, 119, 235, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
    labels,
  };

  return (
    <div className="all-boards">
      <div className="first-row">
        <div className="calendar">
          <Bar data={data1} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
        <div className="chart">
          <Doughnut data={data2} />
        </div>
      </div>
      <div className="second-row">
        <div className="horizontal">
          <div className="tittle">Inspection'Statuses</div>
        </div>
        <div className="horizontal">
          <div className="tittle">Inspection'Statuses</div>
        </div>
        <div className="complete">
          <div className="tittle">
            <h7>Inspection'Statuses</h7>
            <Select
              showSearch
              placeholder="Choose the field"
              suffixIcon={<CaretDownOutlined />}
              options={[
                {
                  value: "inspected",
                  label: "Inspected",
                },
                {
                  value: "draft",
                  label: "Draft",
                },
                {
                  value: "failed",
                  label: "Failed",
                },
                {
                  value: "passed",
                  label: "Passed",
                },
                {
                  value: "dispatched",
                  label: "Dispatched",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectionsPage;
