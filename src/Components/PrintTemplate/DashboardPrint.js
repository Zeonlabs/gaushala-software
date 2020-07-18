import React, { useEffect, useState } from "react";
import src from "../../Components/PrintTemplate/HeaderImage/headerImg.png";
import { convertNumberToType } from "../../js/Helper";

const convert_positive = (a) => {
  if (a < 0) {
    a = a * -1;
  }
  return a;
};

const DashboardPrint = (props) => {
  const [srcImage, setsrcImage] = useState("");
  useEffect(() => {
    setsrcImage(src);
  }, []);
  // console.log("DashboardPrint -> props", props);
  return (
    <>
      <div className="slip-print-report">
        <div className="slip-header">
          <img className="img-header" src={src} alt="boohoo"></img>
          <hr className="first-hr"></hr>
          <hr className="first-hr margin-top-5"></hr>
        </div>
        <h1 className="slip-sign-text">
          {/* {" "}
          : &nbsp; */}
          <span className="report-name english-font">
            {props.monthName.month}-{props.monthName.year}
          </span>
        </h1>
        {/* <p
          style={{ textAlign: "center", marginTop: "5%" }}
          className="english-font"
        >
          {props.monthName.month}-{props.monthName.year}
        </p> */}
        <table
          style={{ marginTop: "2%" }}
          className="dashboard-table gujarati-font"
        >
          <thead>
            <tr>
              <th>Aavak naao pa`kar</th>
              <th>rkma</th>
              <th>javak naao pa`kar</th>
              <th>rkma</th>
            </tr>
          </thead>
          {props.balance.data.map((value, id) => (
            <tbody>
              <tr>
                <td key={id}>
                  {convertNumberToType(value.incomeType, "income")}
                </td>
                <td key={`1${id}`}>{value.incomeAmount}</td>
                <td key={`2${id}`}>
                  {convertNumberToType(value.expenseType, "expense")}
                </td>
                <td key={`3${id}`}>{value.expenseAmount}</td>
              </tr>
            </tbody>
          ))}
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
            <td>
              {props.balance.balance >= 0 ? (
                props.balance.balance
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="english-font"
                    style={{ marginBottom: "5px" }}
                  >
                    -
                  </span>
                  {convert_positive(props.balance.balance)}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default DashboardPrint;
