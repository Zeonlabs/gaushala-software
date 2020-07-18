import React, { useEffect, useState } from "react";
import src from "../PrintTemplate/HeaderImage/headerImg.png";
import { convertStringToMonth } from "../../js/Helper";

const convert_positive = (a) => {
  if (a < 0) {
    a = a * -1;
  }
  return a;
};

const YearReportPrint = (props) => {
  const [srcImage, setsrcImage] = useState("");
  useEffect(() => {
    setsrcImage(src);
  }, []);
  // console.log("YearReportPrint -> props", props);
  const data = props.balance.months;
  return (
    <>
      <div className="slip-print-report">
        <div className="slip-header">
          <img className="img-header" src={src} alt="boohoo"></img>
          <hr className="first-hr"></hr>
          <hr className="first-hr margin-top-5"></hr>
        </div>
        <h1 className="slip-sign-text" style={{ marginBottom: "0px" }}>
          {/* {" "}
          : &nbsp; */}
          <span className="report-name gujarati-font">
            vaYa- <span className="english-font">{props.balance.year}</span>{" "}
            naao rIpaaoT-
          </span>
        </h1>
        {/* <p style={{ textAlign: "center", marginTop: "2%" }}>
          vaYa- <span className="english-font">{props.balance.year}</span> naao
          rIpaaoT-
        </p> */}
        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   flexWrap: "wrap",
        // }}
        >
          <table className="dashboard-table gujarati-font">
            <tr>
              <th>mahInaa</th>
              <th colSpan="2">ivagata</th>
            </tr>
            {data.map((value) => (
              <>
                <tr>
                  <td rowspan="4">
                    {convertStringToMonth(value.month)} : {value.year}
                  </td>
                </tr>
                <tr>
                  <td height="45.5px">Aavak </td>{" "}
                  <td height="45.5px" className="year-report-td">
                    {value.income}
                  </td>
                </tr>
                <tr>
                  <td height="45.5px">Javak </td>
                  <td height="45.5px" className="year-report-td">
                    {value.expense}
                  </td>
                </tr>
                <tr>
                  <td height="45.5px">baolaonsa </td>
                  <td height="45.5px" className="year-report-td">
                    {value.capital >= 0 ? (
                      value.capital
                    ) : (
                      <>
                        <span
                          className="english-font"
                          style={{ marginBottom: "5px", marginLeft: "5px" }}
                        >
                          -
                        </span>
                        {convert_positive(value.capital)}
                      </>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </table>
        </div>
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
            <td>{props.balance.income}</td>
          </tr>
          <tr>
            <td>kula javak</td>
            <td>{props.balance.expense}</td>
          </tr>
          <tr>
            <td>baolaonsa</td>
            <td>
              {props.balance.capital >= 0 ? (
                props.balance.capital
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
                  {convert_positive(props.balance.capital)}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default YearReportPrint;
