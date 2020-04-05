import React from "react";
import { Table } from "antd";

const ReportTable = props => {
  return (
    <>
      <Table
        className="table-boder income-expense-table"
        bordered
        dataSource={props.data}
        columns={props.column}
        pagination={false}
      />
    </>
  );
};

export default ReportTable;
