import React from "react";
import { Menu } from "antd";
import {
  Dashboard,
  Sales,
  Contacts,
  ProjectManagement,
  Clients,
  Subcontractors,
  Inspections,
  Documentation,
  Reports,
  Tasks,
  Notes,
  FleetManagement,
  Accounting,
  Incidents,
  Claim,
  Safety,
} from "../utils/index";
import DashboardPage from "./pages/Dashboard";
import { PlusIcon, LeftArrow } from "../utils";
import CoreLogo from "../images/CoreLogo.png";
import MainLayout from "./MainLayout";
import InspectionsPage from "./pages/Inspections";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const pages = {
  Dashboard: <DashboardPage />,
  Inspections: <InspectionsPage />,
};

const items = [
  getItem("Dashboard", "Dashboard", <Dashboard />),
  getItem("Sales", "Sales", <Sales />, [
    getItem("Leads"),
    getItem("DOB"),
    getItem("Opportunities"),
    getItem("Estimations"),
  ]),
  getItem("Contacts", "Contacts", <Contacts />),
  getItem("Project Management", "Project Management", <ProjectManagement />, [
    getItem("Projects"),
    getItem("Projects overview"),
    getItem("Scheduling"),
    getItem("Permit drawings"),
  ]),
  getItem("Clients", "Clients", <Clients />),
  getItem("Subcontractors", "Subcontractors", <Subcontractors />),
  getItem("Inspections", "Inspections", <Inspections />),
  getItem("Documentation", "Documentation", <Documentation />),
  getItem("Reports", "Reports", <Reports />),
  getItem("Approvals", "Approvals", <Contacts />),
  getItem("Tasks", "Tasks", <Tasks />),
  getItem("Notes", "Notes", <Notes />),
  getItem("Fleet Management", "Fleet Management", <FleetManagement />, [
    getItem("Fleets"),
    getItem("Fleets Inspections"),
    getItem("Fleet Maintenance"),
    getItem("Fleets Inventory"),
  ]),
  getItem("Accounting", "Accounting", <Accounting />),
  getItem("Incidents", "Incidents", <Incidents />),
  getItem("Claim", "Claim", <Claim />, [
    getItem("Claims"),
    getItem("Hearings"),
  ]),
  getItem("Safety", "Safety", <Safety />),
];

const Side = ({ setRenderedComponent = () => {} }) => {
  const onClick = (e) => {
    if (!pages[e.key]) {
      setRenderedComponent(<MainLayout />);
    } else {
      setRenderedComponent(pages[e.key]);
    }
  };

  return (
    <div className="sidebar">
      <div className="img-sidebar">
        <img src={CoreLogo} alt="" style={{ maxWidth: "180px" }} />
      </div>
      <div className="btn-sidebar">
        <button>
          Create New
          <div className="name" />
          <div className="divider" />
          <PlusIcon />
        </button>
      </div>
      <div>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            backgroundColor: "#002140",
            color: "white",
            marginTop: 13,
            fontSize: 15,
          }}
          mode="vertical"
          items={items}
        />
      </div>
      <div className="left-arrow">
        <button>
          <LeftArrow />
        </button>
      </div>
    </div>
  );
};
export default Side;
