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
  const backgroundColor = [
    "rgba(27, 188, 0, 0.8)",
    "rgba(255, 202, 61, 0.8)",
    "rgba(233, 46, 33, 0.8)",
    "rgba(4, 125, 6, 0.8)",
    "rgba(20, 119, 235, 0.8)",
  ];
  const data = [3, 5, 2, 1, 6];

  const data1 = {
    labels,
    datasets: [
      {
        label: "Column Data",
        data,
        backgroundColor,
      },
    ],
  };

  const data2 = {
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
      },
    ],
    labels,
  };

  const data3 = {
    datasets: [
      {
        data: [33.3],
        backgroundColor,
        display: true,
        borderColor: "#D1D6DC",
      },
    ],
  };

  return (
    <div className="all-boards">
      <div className="first-row">
        <div className="p1">
          <div className="tittle">
            <div className="sub">
              <div className="emri"> Period Filter</div>
              <Select
                showSearch
                placeholder="All Time"
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "Today",
                  },
                  {
                    label: "Yesterday",
                  },
                  {
                    label: "This Week",
                  },
                ]}
              />
            </div>
            <div className="sub">
              <div className="emri"> Inspection Type Filter</div>
              <Select
                showSearch
                placeholder="All "
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "Pre-Installation Inspection",
                  },
                  {
                    label: "Installation Inspection",
                  },
                  {
                    label: "6-months Installation Inspection",
                  },
                ]}
              />
            </div>
            <div className="sub">
              <div className="emri"> Inspected By</div>
              <Select
                showSearch
                placeholder="All"
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "All",
                  },
                ]}
              />
            </div>
            <div className="sub">
              <div className="emri"> Filter by Service</div>
              <Select
                showSearch
                placeholder="All"
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "Sidewalk Shed",
                  },
                  {
                    label: "Walking Platform",
                  },
                  {
                    label: "System Scaffold",
                  },
                ]}
              />
            </div>
          </div>
          <div className="p2>">
            <div className="calendar">
              <Bar data={data1} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="chart">
          <Doughnut data={data2} />
        </div>
      </div>
      <div className="second-row">
        <div className="horizontal1">
          <div className="tittle">
            <div className="emri">Inspection'Statuses</div>
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
          <div></div>
        </div>
        <div className="horizontal2">
          <div className="tittle">
            <div className="sub">
              <div className="emri"> Period Filter</div>
              <Select
                showSearch
                placeholder="All Time"
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "Today",
                  },
                  {
                    label: "Yesterday",
                  },
                  {
                    label: "This Week",
                  },
                ]}
              />
            </div>
            <div className="sub">
              <div className="emri"> Inspected</div>
              <Select
                showSearch
                placeholder="All"
                suffixIcon={<CaretDownOutlined />}
                options={[
                  {
                    label: "All",
                  },
                ]}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div className="complete">
          <div className="tittle">
            <div className="emri">Inspection'Statuses</div>
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
          <div className="halfD">
            <div className="ff">
              <Doughnut
                data={data3}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                  },
                  rotation: -90,
                  circumference: 180,
                  cutout: "60%",
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectionsPage;
