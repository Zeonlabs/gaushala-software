// import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const TotalReportColumn = [
  {
    title: "k/ma",
    dataIndex: "_id",
    key: "1",
    width: 150,
    className: "gujarati-font-input-table",
    render: (text, record) => <p>{}</p>,
  },
  {
    title: "taarIKa",
    dataIndex: "date",
    key: "4",
    width: 200,
    className: "date-print english-font-input-table",
    render: (text, record) => (
      <div className="">{moment(text).format("DD-MM-YYYY")}</div>
    ),
  },
  {
    title: "paSau naI Aavak",
    dataIndex: "added",
    key: "income",
    className: "gujarati-font-input-table",
    // render: text => <p>{text}</p>
  },
  {
    title: "paSau naI Javak",
    dataIndex: "given",
    key: "debit",
    render: (text) => <p>{text}</p>,
    className: "gujarati-font-input-table",
  },
  {
    title: "maRtyau paamaola paSauAao",
    dataIndex: "dead",
    key: "dead",
    className: "gujarati-font-input-table",
  },
  {
    title: "hala paSau saMKyaa",
    children: [
      {
        title: "naanaa",
        dataIndex: "small",
        key: "nana",
        render: (text) => <p>{text}</p>,
        className: "gujarati-font-input-table",
      },
      {
        title: "maaoTa",
        dataIndex: "big",
        key: "mota",
        className: "gujarati-font-input-table",
      },
      {
        title: "Anya",
        dataIndex: "other",
        key: "mota",
        className: "table-font-english td-total-animal-table",
      },
      {
        title: "kula",
        dataIndex: "other",
        key: "total",
        className: "gujarati-font-input-table",
        render: (text, record) => (
          <p>{record.small + record.big + record.other}</p>
        ),
      },
    ],
  },
  //--------------------Change name --------------------

  {
    title: "gaaoSaaLaa T/sT vataI",
    dataIndex: "trusty",
    key: "trusty",
    width: 200,
    className: "gujarati-font-input-table",
  },
];
