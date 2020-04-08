// import { convertNumberToType } from "../../../../js/Helper";
// import moment from "moment";
import React from "react";

// let count = 0;

export const EmployeeColumn = [
  {
    title: "k/ma",
    dataIndex: "_id",
    key: "1",
    width: 100,
    className: "gujarati-font-input-table",
    render: (text, record) => <p>{}</p>
  },
  {
    title: "k-macaarI naao pa`kar",
    dataIndex: "type",
    key: "name",
    width: 200,
    render: text => <p>{text}</p>,
    className: "gujarati-font-input-table"
  },
  {
    title: "naama",
    dataIndex: "name",
    key: "age",
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "phone",
    width: 200,
    className: "gujarati-font-input-table",
  },
  {
    title: "sarnaamau",
    dataIndex: "address",
    key: "address",
    className: "gujarati-font-input-table"
  }
];
