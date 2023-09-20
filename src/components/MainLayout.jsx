import React, { useState } from "react";
import {
  ChartIcon,
  PrintIcon,
  DownloadIcon,
  FullScreen,
  SaveIcon,
} from "../utils";
import NewLeadModal from "./NewLeadModal";
import TableComponent from "./TableComponent";
import { Select, Input } from "antd";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import PDFModal from "./PDFModal";
import downloadPDF from "./downloadPDF";

/*let externalFilter = {
  status: undefined,
};*/

function MainLayout() {
  const [tableData, setTableData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isModalVisible, setIsVisible] = useState(false);
  const [gridApi, setGridApi] = useState();

  function handleGeneratePDFDownload(savePdf) {
    return downloadPDF(tableData, savePdf);
  }

  function onSave(data) {
    if (dataToEdit) {
      const updatedTableData = tableData.map((item) => {
        if (item.id === dataToEdit.id) {
          return { ...item, ...data };
        } else {
          return item;
        }
      });
      setTableData(updatedTableData);
      setDataToEdit(null);
    } else {
      setTableData([...tableData, data]);
    }
  }

  const handleEditRow = (data) => {
    setDataToEdit(data);
  };

  function onDeleteRow(key) {
    let tmp = [...tableData];
    tmp.splice(key, 1);
    setTableData(tmp);
  }

  // function setFilter(status) {
  //   externalFilter.status = status;
  //   if (gridApi) {
  //     gridApi.onFilterChanged();
  //   }
  // }

  let statuses = {};
  tableData.forEach(({ status }) => {
    if (!statuses[status]) {
      statuses[status] = 1;
    } else {
      statuses[status] = statuses[status] + 1;
    }
  });

  return (
    <div className="dyshi">
      <div className="big-container">
        <div className="first">
          <div
            className="square"
            style={{ backgroundColor: "rgb(240, 79, 78)" }}
            // onClick={() => {
            //   setFilter("Unqualified");
            // }}
          >
            <div className="statusValue">{statuses?.Unqualified || 0}</div>
            <div className="statusName">Unqualified</div>
          </div>
          <div
            className="square"
            style={{ backgroundColor: "rgb(246, 134, 44)" }}
            // onClick={() => {
            //   setFilter("New");
            // }}
          >
            <div className="statusValue">{statuses?.New || 0}</div>
            <div className="statusName">New</div>
          </div>
          <div
            className="square"
            style={{ backgroundColor: "rgb(252, 201, 74)" }}
            // onClick={() => {
            //   setFilter("In Process");
            // }}
          >
            <div className="statusValue"> {statuses?.["In Process"] || 0}</div>
            <div className="statusName">In Process</div>
          </div>
          <div
            className="square"
            style={{ backgroundColor: "rgb(236, 222, 124)" }}
            // onClick={() => {
            //   setFilter("Needs Review");
            // }}
          >
            <div className="statusValue">{statuses?.["Needs Review"] || 0}</div>
            <div className="statusName">Needs Review</div>
          </div>
          <div
            className="square"
            style={{ backgroundColor: "rgb(188, 188, 188)" }}
            // onClick={() => {
            //   setFilter("Converted");
            // }}
          >
            <div className="statusValue">{statuses?.Converted || 0}</div>
            <div className="statusName">Converted</div>
          </div>
        </div>
        <div className="second">
          <div className="left">
            <div className="filter">
              <button>
                Open Filter
                <div className="name" />
                <div className="divider" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.923"
                  height="16"
                  viewBox="0 0 15.923 16"
                  fill="#fff"
                >
                  <path
                    id="Path_6692"
                    data-name="Path 6692"
                    d="M4.25,5.61C6.57,8.59,10,13,10,13v5a2.006,2.006,0,0,0,2,2h0a2.006,2.006,0,0,0,2-2V13s3.43-4.41,5.75-7.39A1,1,0,0,0,18.95,4H5.04A1,1,0,0,0,4.25,5.61Z"
                    transform="translate(-4.038 -4)"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="search-text">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                addonAfter={
                  <Select
                    showSearch
                    placeholder="Select Field to Edit"
                    suffixIcon={<CaretDownOutlined />}
                    options={[
                      {
                        value: "company",
                        label: "Company",
                      },
                      {
                        value: "firstName",
                        label: "First Name",
                      },
                      {
                        value: "lastName",
                        label: "Last Name",
                      },
                      {
                        value: "phone",
                        label: "Phone",
                      },
                      {
                        value: "email",
                        label: "Email",
                      },
                    ]}
                  />
                }
              />
            </div>
          </div>
          <div className="right">
            <div className="full-screen">
              <button>
                Full Screen
                <div className="name" />
                <div className="divider" />
                <FullScreen />
              </button>
            </div>
            <div className="save">
              <button>
                Save Filters
                <div className="name" />
                <div className="divider" />
                <SaveIcon />
              </button>
            </div>
            <div className="icons">
              <button className="icon">
                <ChartIcon />
              </button>
              <button className="icon" onClick={() => setIsVisible(true)}>
                <PrintIcon />
              </button>
              <button
                className="icon"
                onClick={() => handleGeneratePDFDownload(true)}
              >
                <DownloadIcon />
              </button>
            </div>
            <div className="new-lead">
              <NewLeadModal
                onSave={onSave}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ag-theme" style={{ width: "85%", marginLeft: "250px" }}>
        <TableComponent
          tableData={tableData}
          onEditRow={handleEditRow}
          onDeleteRow={onDeleteRow}
          setGridApi={setGridApi}
          //externalFilter={externalFilter}
        />
      </div>
      <PDFModal
        open={isModalVisible}
        setVisible={setIsVisible}
        pdfHandler={handleGeneratePDFDownload}
      />
    </div>
  );
}

export default MainLayout;
