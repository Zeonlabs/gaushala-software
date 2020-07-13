import React from "react";

const DashboardPrint = (props) => {
  // console.log("DashboardPrint -> props", props);
  return (
    <>
      <p style={{ textAlign: "center", marginTop: "5%" }}>
        {props.monthName.month}-{props.monthName.year}
      </p>
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
          <td>
            {props.switch === "yes" ? props.month.income : props.balance.income}
          </td>
        </tr>
        <tr>
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
        </tr>
      </table>
    </>
  );
};

export default DashboardPrint;
