import React from "react";

const YearReportPrint = (props) => {
  console.log("DashboardPrint -> props", props);
  return (
    <>
    <p style={{ textAlign: "center", marginTop: "10%" }}>
        Total Report of year-{props.monthName.year}
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
          <td>{props.balance.income}</td>
        </tr>
        <tr>
          <td>kula javak</td>
          <td>{props.balance.expense}</td>
        </tr>
        <tr>
          <td>baolaonsa</td>
          <td>{props.balance.capital}</td>
        </tr>
      </table> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {props.balance.months.map((value) => (
          <div style={{ width: "47%" }}>
            {" "}
            <p style={{ textAlign: "center", marginTop: "10%" }}>
              {value.month}-{props.monthName.year}
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
                <td>{value.income}</td>
              </tr>
              <tr>
                <td>kula javak</td>
                <td>{value.expense}</td>
              </tr>
              <tr>
                <td>baolaonsa</td>
                <td>{value.capital}</td>
              </tr>
            </table>{" "}
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", marginTop: "10%" }}>
        Total Report of year-{props.monthName.year}
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
          <td>{props.balance.income}</td>
        </tr>
        <tr>
          <td>kula javak</td>
          <td>{props.balance.expense}</td>
        </tr>
        <tr>
          <td>baolaonsa</td>
          <td>{props.balance.capital}</td>
        </tr>
      </table> */}
    </>
  );
};

export default YearReportPrint;
