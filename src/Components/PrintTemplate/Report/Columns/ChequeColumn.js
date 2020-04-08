// import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const ChequeColumn = [
  {
    title: "k/ma",
    dataIndex: "_id",
    key: "1",
    className: "gujarati-font-input-table",
    render: (text, record) => <p>{}</p>
  },
  {
    title: "taarIKa",
    dataIndex: "date",
    key: "date",
    width: 100,
    className: "date-print english-font-input-table",
    render: (text, record) => (
      <div className="">
        {moment(text).format("YYYY-MM-DD")}
      </div>
    )
  },
  {
    title: "naama",
    dataIndex: "name",
    key: "name",
    className: "add-name-field-print gujarati-font-input-table",
    render: text => <p>{text}</p>
  },
  {
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "mobile",
    className: "gujarati-font-input-table"
  },
  {
    title: "caok naMbar",
    dataIndex: "no",
    key: "cheque",
    className: "gujarati-font-input-table"
  },
  {
    title: "rkma",
    dataIndex: "amount",
    key: "amount",
    className: "gujarati-font-input-table"
  },
  {
    title: "baoMnk",
    dataIndex: "bank",
    key: "bankname",
    className: "gujarati-font-input-table"
  }
];
