// import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const CreaditAnimalColumn = [
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
    key: "4",
    width: 100,
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
        title: "kula",
        dataIndex: "total",
        key: "total",
        className: "gujarati-font-input-table"
      }
    ]
  },
  {
    title: "paSau mauknaar nau naama",
    dataIndex: "name",
    key: "name",
    width: 150,
    className: "gujarati-font-input-table",
    render: text => <p>{text}</p>
  },
  {
    title: "sarnaamau",
    dataIndex: "address",
    key: "address",
    width: 150,
    className: "add-name-field-print gujarati-font-input-table"
  },
  {
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "mono",
    className: "gujarati-font-input-table"
  },
  //--------------------Change name --------------------
  {
    title: "paSau mauknaar naI sahI",
    dataIndex: "signPerson",
    key: "personSign",
    width: 150,
    className: "gujarati-font-input-table"
  },
  {
    title: "gaaoSaaLaa T/sT vataI",
    dataIndex: "trusty",
    key: "trusty",
    width: 200,
    className: "gujarati-font-input-table"
  }
];
