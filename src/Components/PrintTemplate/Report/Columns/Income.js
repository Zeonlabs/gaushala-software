import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";
import "../index.scss";

export const IncomeColumn = [
  {
    title: "taarIKa",
    dataIndex: "date",
    key: "1",
    width: 100,
    className: "date-print english-font-input-table",
    // fixed: "left",
    render: (text, record) => {
      return (
        <div className="">
          {moment(text).format("YYYY-MM-DD")}
        </div>
      );
    }
    // className: "income-table-td-height table-font-english english-font-input"
  },
  {
    title: "pahaoMca naM.",
    dataIndex: "slip_no",
    key: "2",
    className: "gujarati-font-input-table"
  },
  {
    title: "naama",
    dataIndex: "name",
    key: "3",
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    title: "sarnaamau",
    dataIndex: "address",
    key: "address",
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    title: "rkma",
    dataIndex: "money.amount",
    key: "4",
    className: "gujarati-font-input-table"
  },
  {
    title: "maaobaa[la naMbar ",
    dataIndex: "phone",
    key: "5",
    className: "gujarati-font-input-table"
  },
  {
    title: "Aavak naao pa`kar",
    dataIndex: "type",
    key: "6",
    className: "gujarati-font-input-table",
    render: (text, record) => convertNumberToType(text, "income")
  },
  {
    title: "dana svaIkar",
    dataIndex: "money",
    key: "7",
    className: "gujarati-font-input-table",
    render: (text, record) =>
      text.type === "cheque" ? <p>{text.cheque_no}</p> : <p>raokD</p>
  },
  {
    title: "hstak naama",
    dataIndex: "ref_name",
    key: "8",
    className: "add-name-field-print gujarati-font-input-table"
  }
];
