import React from "react";
import { MyResponsiveLine } from "./nivoLineGraph";

const LineChart = ({ data }) => (
  <div className="line-grph-div">
    <h3 className="dashbrd-label">Aavak taqaa Javak ga`aF</h3>
    <div className="grph">
      <MyResponsiveLine
        data={[
          {
            id: "Expense",
            color: "rgb(255, 77, 79)",
            data: data.income
          },
          {
            id: "Income",
            // color: 'hsl(157, 70%, 50%)',
            color: "#36B971",
            data: data.expense
          }
        ]}
      />
    </div>
  </div>
);

// export default connect(null, { getLinearChart })(LineChart);
export default LineChart;
