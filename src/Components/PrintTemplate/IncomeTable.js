import React from "react";
import { Table } from "antd";
import converter from "number-to-words";
import "./index.scss";

const columns = [
  {
    title: "vaIgata",
    dataIndex: "type",
    width: "60%",
    key: "age"
  },
  {
    title: "rkma",
    width: "40%",
    dataIndex: "amount",
    key: "address"
  }
];

const IncomeTable = props => {
  return (
    <>
      <Table
        className="table-boder income-expense-table"

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
            {converter.toWords(props.total)}/-
          </span>
        </h4>

        <h4 className="gujarati-font text-center ">
          {props.total}
          <span className="english-font-input font-size-20">/-</span>
        </h4>
      </div>
    </>
  );
};

export default IncomeTable;
