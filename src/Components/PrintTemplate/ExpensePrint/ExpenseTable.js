import React from "react";
import { Table } from "antd";
import converter from "number-to-words";

const columns = [
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   key: "name"
  // },
  {
    title: "vaIgata",
    dataIndex: "type",
    width: "60%",
    key: "age"
  },
  {
    title: "rkma",
    dataIndex: "amount",
    width: "40%",
    key: "address"
  }
];

const ExpenseTable = props => {
  console.log("props", props);

  return (
    <>
      <Table
        className="table-boder income-expense-table"
        // components={components}
        // rowClassName={() => "editable-row"}
        bordered
        dataSource={props.data}
        columns={columns}
        pagination={false}
      />
      <div className="totalamount">
        <h4 className="amount-in-words gujarati-font">
          kula rkma Sabdmaa :{" "}
          <span className="english-font-input">
            {" "}
            {converter.toWords(props.total)} /-
          </span>
        </h4>

        <h4 className="gujarati-font text-center">{props.total}<span className="english-font-input font-size-20">/-</span></h4>
      </div>
    </>
  );
};

export default ExpenseTable;
