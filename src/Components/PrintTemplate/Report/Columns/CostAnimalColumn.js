// import { convertNumberToType } from "../../../../js/Helper";
import moment from "moment";
import React from "react";

// let count = 0;

export const CostAnimalColumn = [
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
    title: "kula paSauAao",
    dataIndex: "total_animal",
    key: "total",
    className: "gujarati-font-input-table"
  },
  {
    title: "Gaasa",
    dataIndex: "item.ghas",
    key: "ghas",
    className: "gujarati-font-input-table"
  },
  {
    title: "caarao",
    dataIndex: "item.charo",
    key: "charo",
    className: "gujarati-font-input-table"
  },
  {
    title: "daNa",
    dataIndex: "item.dan",
    key: "dana",
    className: "gujarati-font-input-table"
  },
  {
    title: "majurI",
    dataIndex: "item.majuri",
    key: "majuri",
    className: "gujarati-font-input-table"
  },
  {
    title: "Dao. e dvaa",
    dataIndex: "item.doctor",
    key: "doctor",
    className: "gujarati-font-input-table"
  },
  {
    title: "Anya Ka-ca",
    dataIndex: "item.other",
    key: "extracost",
    className: "gujarati-font-input-table"
  },
  {
    title: "kula Ka-ca",
    dataIndex: "total",
    key: "totalcost",
    className: "gujarati-font-input-table"
  },
  //--------------------Change name --------------------

  {
    title: "gaaoSaaLaa T/sT vataI",
    dataIndex: "trusty",
    key: "trusty",
    width: 200,
    className: ""
  }
];
