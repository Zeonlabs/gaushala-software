import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

export const Expense = [
  {
    // Date
    title: "taarIKa",
    dataIndex: "date",
    key: "3",
    width: 100,
    className: "date-print english-font-input-table",
    render: (text, record) => {
      return (
        <div className="">
          {moment(text).format("YYYY-MM-DD")}
        </div>
      );
    },
  },
  {
    // Vauchr No
    title: "vaa]car naM.",
    width: 130,
    dataIndex: "slip_no",
    key: "name",
    className: "gujarati-font-input-table"
  },

  {
    // Name
    title: "naama",
    dataIndex: "name",
    key: "5",
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    title: "sarnaamau",
    dataIndex: "address",
    key: "address",
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    // Amount
    title: "rkma",
    dataIndex: "money.amount",
    key: "2",
    className: "gujarati-font-input-table"
  },
  {
    // Mobile.
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "4",
    width: 180,
    className: "gujarati-font-input-table"
  },
  {
    // Expenses Type
    title: "Javak naao pa`kar",
    dataIndex: "type",
    key: "1",
    className: "gujarati-font-input-table",
    render: (text, record) => convertNumberToType(text, "expense")
  },
  {
    title: "dana svaIkar",
    dataIndex: "money",
    key: "7",
    className: "gujarati-font-input-table",
    render: (text, record) =>
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
    className: "gujarati-font-input-table"
  }
  // {
  //   // Hastak Name
  //   title: "Trusty Sign",
  //   dataIndex: "",
  //   key: "9",
  //   width: 230
  // }
];
