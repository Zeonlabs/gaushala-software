import { totalOfArray } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const DeadAnimalColumn = [
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
    key: "2",
    width: 150,
    className: "date-print english-font-input-table",
    render: (text, record) => (
      <div className="">
        {moment(text).format("DD-MM-YYYY")}
      </div>
    )
  },
  {
    title: "paSau",
    children: [
      {
        title: "gaaya",
        dataIndex: "animal[0].count",
        key: "gay",
        className: "gujarati-font-input-table",
        render: text => <p>{text}</p>
      },
      {
        title: "baLad",
        dataIndex: "animal[1].count",
        key: "balad",
        className: "gujarati-font-input-table"
      },
      {
        title: "vaaCrDa",
        dataIndex: "animal[2].count",
        key: "vacharda",
        className: "gujarati-font-input-table"
      },
      {
        title: "vaaCrDI",
        dataIndex: "animal[3].count",
        key: "vachardi",
        className: "gujarati-font-input-table"
      },
      {
        title: "Anya",
        dataIndex: "animal[4].count",
        key: "anny",
        className: "gujarati-font-input-table"
      },
      {
        title: "kula paSauAao",
        dataIndex: "animal",
        key: "total",
        className: "gujarati-font-input-table",
        render: (text, record) => {
          const total = text.map(val => parseInt(val.count, 10));
          const finalTotal = totalOfArray(total);
          return <div>{finalTotal}</div>;
        }
      }
    ]
  },
  {
    title: "naaOMGa",
    dataIndex: "note",
    key: "namenote",
    width: 200,
    className: "gujarati-font-input-table",
    render: text => <p>{text}</p>
  },
  //--------------------Change name --------------------
  {
    title: "gaaoSaaLaa T/sT vataI",
    dataIndex: "trusty",
    key: "trusty",
    width: 200,
    className: "gujarati-font-input-table"
  }
];
