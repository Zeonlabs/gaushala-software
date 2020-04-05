// import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const ChequeColumn = [
  {
    title: "k/ma",
    dataIndex: "_id",
    key: "1",
    width: 100,
    className: "",
    render: (text, record) => <p>{}</p>
  },
  {
    title: "taarIKa",
    dataIndex: "date",
    key: "date",
    className: "income-table-td-height table-font-english",
    width: 130,
    render: (text, record) => (
      <div className="  english-font-input">
        {moment(text).format("YYYY-MM-DD")}
      </div>
    )
  },
  {
    title: "naama",
    dataIndex: "name",
    key: "name",
    className: "",
    width: 300,
    render: text => <p>{text}</p>
  },
  {
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "mobile",
    width: 180,
    className: "table-font-english"
  },
  {
    title: "caok naMbar",
    dataIndex: "no",
    key: "cheque",
    width: 150,
    className: "table-font-english"
  },
  {
    title: "rkma",
    dataIndex: "amount",
    key: "amount",
    width: 200,
    className: "table-font-english"
  },
  {
    title: "baoMnk",
    dataIndex: "bank",
    key: "bankname",
    width: 250,
    className: ""
  }
];
