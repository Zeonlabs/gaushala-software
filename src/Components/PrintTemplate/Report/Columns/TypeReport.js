import { convertNumberToType } from "../../../../js/Helper";
import "../index.scss";

export const TypeCost = [
  {
    title: "Aavak naao pa`kar",
    dataIndex: "Id",
    key: "Id",
    width: "50%",
    className: "gujarati-font-input-table",
    render: (text, record) => convertNumberToType(text, "income"),
  },
  {
    title: "rkma",
    dataIndex: "amount",
    key: "2",
    className: "gujarati-font-input-table",
  },
];

export const ExpenseTypeCost = [
  {
    title: "Javak naao pa`kar",
    dataIndex: "Id",
    key: "Id",
    width: "50%",
    className: "gujarati-font-input-table",
    render: (text, record) => convertNumberToType(text, "expense"),
  },
  {
    title: "rkma",
    dataIndex: "amount",
    key: "2",
    className: "gujarati-font-input-table",
  },
];
