import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

export const Expense = [
  {
    // Date
    title: "taarIKa",
    dataIndex: "date",
    key: "3",
    width: 130,
    render: (text, record) => {
      return (
        <div className="icon-group-table english-font-input">
          {moment(text).format("YYYY-MM-DD")}
        </div>
      );
    },
    // fixed: "left",
    className: "english-font-input"
  },
  {
    // Vauchr No
    title: "vaa]car naM.",
    width: 130,
    dataIndex: "slip_no",
    key: "name",
    className: "income-table-td-height table-font-english"
  },

  {
    // Name
    title: "naama",
    dataIndex: "name",
    key: "5",
    width: 380
  },
  {
    title: "sarnaamau",
    dataIndex: "address",
    key: "address",
    width: 300
  },
  {
    // Amount
    title: "rkma",
    dataIndex: "money.amount",
    key: "2",
    width: 180,
    className: "table-font-english"
  },
  {
    // Mobile.
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "4",
    width: 180,
    className: "table-font-english"
  },
  {
    // Expenses Type
    title: "Javak naao pa`kar",
    dataIndex: "type",
    key: "1",
    width: 250,
    render: (text, record) => convertNumberToType(text, "expense")
  },
  {
    title: "dana svaIkar",
    dataIndex: "money",
    key: "7",
    width: 130,
    render: (text, record) =>
      // console.log("Income -> constructor -> record", text, record)
      text.type === "cheque" ? <p>{text.cheque_no}</p> : <p>raokD</p>
  },
  // {
  //   // Expense in
  //   title: "cukv~aI",
  //   dataIndex: "ref_name",
  //   key: "5",
  //   width: 80
  // },
  {
    // Hastak Name
    title: "hstak naama",
    dataIndex: "ref_name",
    key: "8",
    width: 230
  }
  // {
  //   // Hastak Name
  //   title: "Trusty Sign",
  //   dataIndex: "",
  //   key: "9",
  //   width: 230
  // }
];
