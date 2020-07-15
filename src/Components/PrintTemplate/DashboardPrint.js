import React from "react";
import src from "../PrintTemplate/HeaderImage/headerImg.png";
import { convertNumberToType } from "../../js/Helper";
const DashboardPrint = (props) => {
  console.log("DashboardPrint -> props", props);
  const income = props.balance.incomes;
  const expense = props.balance.expenses;
  // console.log("DashboardPrint -> income", income[0]);
  // props.balance.incomes.find((value) =>
  //   value.type === 1
  //     ? console.log(
  //         "DashboardPrint -> convertNumberToType(value.type)",
  //         convertNumberToType(value.type, "income")
  //       )
  //     : // console.log("DashboardPrint -> value.amount", value.amount)
  //       console.log("DashboardPrint -> value.amount", value.amount)
  // );
  return (
    <>
      <div className="slip-print-income">
        <div className="slip-header">
          <img className="img-header" src={src} alt="boohoo"></img>
          <hr className="first-hr"></hr>
          <hr className="first-hr margin-top-5"></hr>
        </div>
        <p style={{ textAlign: "center", marginTop: "5%" }}>
          {props.monthName.month}-{props.monthName.year}
        </p>
        <table
          style={{ marginTop: "2%" }}
          className="dashboard-table gujarati-font"
        >
          <tr>
            <th>Aavak naao pa`kar</th>
            <th>rkma</th>
            <th>javak naao pa`kar</th>
            <th>rkma</th>
          </tr>
          <tr></tr>
          {/* <tr>
          <td>kula javak</td>
          <td>
            {props.switch === "yes"
              ? props.month.expense
              : props.balance.expense}
          </td>
        </tr>
        <tr>
          <td>baolaonsa</td>
          <td>
            {props.switch === "yes"
              ? props.month.capital
              : props.balance.capital}
          </td>
        </tr> */}
        </table>
        <table
          style={{ marginTop: "2%" }}
          className="dashboard-table gujarati-font"
        >
          <tr>
            <th>ivagata</th>
            <th>rkma</th>
          </tr>
          <tr>
            <td>kula Aavak</td>
            <td>{props.balance.totalIncome}</td>
          </tr>
          <tr>
            <td>kula javak</td>
            <td> {props.balance.totalExpense}</td>
          </tr>
          <tr>
            <td>baolaonsa</td>
            <td>{props.balance.totalIncome - props.balance.totalExpense}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default DashboardPrint;
