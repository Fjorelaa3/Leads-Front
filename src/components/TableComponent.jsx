import React, { useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./table.css";

function TableComponent({
  tableData,
  onDeleteRow,
  onEditRow,
  setGridApi,
  externalFilter,
}) {
  const columnDefs = [
    {
      headerName: "Company",
      field: "company",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "First Name",
      field: "firstName",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "Phone",
      field: "phone",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "Email",
      field: "email",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "Address",
      field: "address",
      editable: true,
      width: 205,
      enableRowGroup: true,
    },
    {
      headerName: "Status",
      field: "status",
      editable: true,
      width: 205,
      enableRowGroup: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Actions",
      cellRenderer: ({ data }, index) => {
        return (
          <Space size="middle">
            <a onClick={() => onEditRow(data)}>
              <EditOutlined style={{ fontSize: "20px" }} />
            </a>
            <a onClick={() => onDeleteRow(index)}>
              <DeleteOutlined style={{ fontSize: "20px" }} />
            </a>
          </Space>
        );
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = useCallback((param) => {
    setGridApi(param.api);
  }, []);

  /*  const iseExternalFilterPresent = useCallback(() => {
    return !!externalFilter.status;
  }, [externalFilter]);

  const doesExternalFilterPass = useCallback(
    ({ data }) => {
      return data.status === externalFilter.status;
    },
    [externalFilter]
  );*/

  return (
    <div className="ag-theme-alpine" style={{ height: "550px" }}>
      <AgGridReact
        rowData={tableData}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        defaultColDef={defaultColDef}
        // iseExternalFilterPresent={iseExternalFilterPresent}
        // doesExternalFilterPass={doesExternalFilterPass}
        onGridReady={onGridReady}
        rowGroup={true}
        rowGroupPanelShow="always"
      />
    </div>
  );
}

export default TableComponent;
