// import { convertNumberToType } from "../../../../js/Helper";
// import moment from "moment";
import React from "react";

// let count = 0;

export const TrustyColumns = [
  {
    title: "k/ma",
    dataIndex: "_id",
    key: "1",
    width: 120,
    className: "gujarati-font-input-table",
    render: (text, record) => <p>{}</p>
  },
  {
    title: "haodao",
    dataIndex: "position",
    key: "2",
    width: 100,
    render: text => <p>{text}</p>,
    className: "gujarati-font-input-table"
  },
  {
    title: "naama",
    dataIndex: "name",
    key: "3",
    width: 300,
    className: "gujarati-font-input-table"
  },
  {
    title: "maaobaa[la naMbar",
    dataIndex: "phone",
    key: "4",
    width: 250,
    className: "gujarati-font-input-table"
  }
];
