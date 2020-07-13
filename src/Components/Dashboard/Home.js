import React, { Component } from "react";
import _ from "lodash";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import LineChart from "./LineChart";
import { getLinearChart, getAnimalChart } from "../../Actions/ChartActions";
import { getAmountReport } from "../../Actions/SetUpUser";
import { connect } from "react-redux";
import AnimalChart from "./AnimalChart";
import YearPicker from "react-year-picker";
// import LoaderAnimation from "../../Static/Widgets/LoaderAnimation";
// import { arrangeDate } from "./arrangeDate";
// import { BarChart } from "./barChart";
import "./Home.scss";
import { withRouter } from "react-router";
import { DatePicker, Switch, Icon } from "antd";
import { printComponent } from "react-print-tool";
import DashboardPrint from "../PrintTemplate/DashboardPrint";
import { convertNumberToMonth } from "../../js/Helper";
import YearReportPrint from "../PrintTemplate/YearReport";
const { MonthPicker } = DatePicker;
// const { Option } = Select;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linearDataIncome: { x: 0, y: 0 },
      linearDataExpence: {},
      capital: 0,
      incomeData: [{ x: 0, y: 0 }],
      expenceData: [{ x: 0, y: 0 }],
      totalIncome: 0,
      totalExpense: 0,
      animal_total: 0,
      switch: "yes",
      balance: { income: 0, expense: 0, capital: 0 },
      month: { income: 0, expense: 0, capital: 0 },
      monthName: "",
    };
  }

  componentDidMount = () => {
    const getDate = (year, month) =>
      `${month < 10 ? "0" + month : month}-${year}`;
    if (
      this.props.location.state
        ? this.props.location.state.status === 205
        : localStorage.getItem("reversePin") === "205"
    ) {
    } else {
      this.props.getLinearChart().then((res) => {
        // const arrangedIncomeDate = arrangeDate(res.income);
        // const arrangedExpenseDate = arrangeDate(res.expense);
        const arrangedIncomeDate = res.income;
        const arrangedExpenseDate = res.expense;

        const incomeData = arrangedIncomeDate.map((val) => ({
          x: getDate(val.year, val.month),
          y: val.amount,
        }));

        const expenseData = arrangedExpenseDate.map((val) => ({
          x: getDate(val.year, val.month),
          y: val.amount,
        }));

        this.setState({
          incomeData: incomeData,
          expenceData: expenseData,
          totalIncome: _.sumBy(res.income, "amount"),
          totalExpense: _.sumBy(res.expense, "amount"),
        });
      });
    }
  };

  handelSwitchChange = (checke) => {
    if (checke) {
      this.setState({
        switch: "yes",
      });
    } else {
      this.setState({
        switch: "no",
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalAnimalCount !== this.props.totalAnimalCount) {
      this.setState({
        capital: this.props.totalAnimalCount.capital,
      });
      if (this.props.totalAnimalCount === null) {
        this.props.getAnimalChart().then((res) => {
          const total = res.stats.animal;
          delete total.big;
          delete total.small;
          const total_count = this.sumValuses(total);
          this.setState({
            animal_total: total_count,
          });
        });
      } else {
        this.setState({
          animal_total: this.props.totalAnimalCount.animal_total,
        });
      }
    }
  };
  formatValue = (value) => value.toFixed(0);

  handleSizeChange = (date, dateString) => {
    console.log("Home -> handleSizeChange -> dateString", dateString);
    if (dateString === "") {
      this.setState({
        balance: { income: 0, expense: 0, capital: 0 },
        month: { income: 0, expense: 0, capital: 0 },
      });
    } else {
      const years = dateString.split("-");
      console.log("Home -> handleSizeChange -> years", years);

      // console.log("Home -> handleSizeChange -> years", years);
      this.props.getAmountReport(years[0]).then((res) => {
        this.setState({
          balance: res,
          monthName: { month: convertNumberToMonth(years[1]), year: years[0] },
        });
        const monthData = res.months.find(
          (value) => parseInt(years[1], 10) === value.month
        );
        console.log("Home -> handleSizeChange -> monthData", monthData);
        this.setState({
          month: monthData,
        });
      });
    }
  };

  handleChange = (date) => {
    // console.log("Home -> handleSizeChange -> dateString", date);
    if (date === "") {
      this.setState({
        balance: { income: 0, expense: 0, capital: 0 },
        month: { income: 0, expense: 0, capital: 0 },
      });
    } else {
      this.props.getAmountReport(date).then((res) => {
        this.setState({
          balance: res,
          monthName: { year: date },
        });
      });
    }
  };

  handelPrintReport = async () => {
    if (this.state.switch === "yes") {
      await printComponent(
        <DashboardPrint
          switch={this.state.switch}
          month={this.state.month}
          balance={this.state.balance}
          monthName={this.state.monthName}
        />
      );
    } else {
      await printComponent(
        <YearReportPrint
          switch={this.state.switch}
          month={this.state.month}
          balance={this.state.balance}
          monthName={this.state.monthName}
        />
      );
    }
  };

  handelCancel = (e) => {
    console.log("Home -> handelCancel -> e", e);
  };

  render() {
    return (
      <PageWrapper>
        <div className="dashboard">
          <LineChart
            // income={this.state.linearDataIncome}
            // expence={this.state.linearDataExpence}
            // statusCode={this.props.location.state.status}
            data={{
              income: this.state.incomeData,
              expense: this.state.expenceData,
            }}
          />

          <div className="btml-grph">
            <div className="piechrt-div">
              <div className="row">
                <h3 className="dashbrd-label ">kula paSauAao : &nbsp;</h3>
                {/* <==================TOTAL Animal=======================> */}
                <h3 className="dashbrd-label row animal-total-dis">
                  {this.state.animal_total}
                </h3>
              </div>
              <AnimalChart
                statusCode={
                  this.props.location.state
                    ? this.props.location.state.status
                    : parseInt(localStorage.getItem("reversePin"), 10)
                }
              />
            </div>
            <div className="balance-div">
              <div className="padding-row-15">
                <h1 className="current-balance-title text-align">
                  <Switch
                    checkedChildren="mahInaao"
                    unCheckedChildren="vaYa-"
                    defaultChecked
                    onChange={this.handelSwitchChange}
                  />
                  krMT baolaonsa kolkulaoSana
                </h1>
              </div>

              <div className="padding-row year-stick-chart">
                <div className="row" style={{ height: 250 }}>
                  <div
                    className="column-50"
                    style={{ padding: "0px", display: "initial" }}
                  >
                    {/* <BarChart
                      data={[
                        {
                          type: "Aavak",
                          income: this.state.totalIncome,
                        },
                        {
                          type: "Javak",
                          expense: this.state.totalExpense,
                        },
                      ]}
                    /> */}
                    {/* {this.state.switch ? ( */}
                    <div className="month-picker-input">
                      {this.state.switch === "yes" ? (
                        <MonthPicker
                          onChange={this.handleSizeChange}
                          placeholder="Select month"
                          className="english-font-input"
                        />
                      ) : (
                        <YearPicker
                          onChange={this.handleChange}
                          onCancel={this.handelCancel}
                        />
                      )}
                    </div>
                    {/* // ) : (
                    //   <Select
                    //     defaultValue="a1"
                    //     onChange={this.handleChange}
                    //     style={{ width: 200 }}
                    //   >
                    //     <Option value="jack">Jack</Option>
                    //     <Option value="lucy">Lucy</Option>
                    //     <Option value="disabled" disabled>
                    //       {" "}
                    //     </Option>
                    //   </Select>
                    // )} */}
                    <table className="dashboard-table gujarati-font">
                      <tr>
                        <th>ivagata</th>
                        <th>rkma</th>
                      </tr>
                      <tr>
                        <td>kula Aavak</td>
                        <td>
                          {this.state.switch === "yes"
                            ? this.state.month.income
                            : this.state.balance.income}
                        </td>
                      </tr>
                      <tr>
                        <td>kula javak</td>
                        <td>
                          {this.state.switch === "yes"
                            ? this.state.month.expense
                            : this.state.balance.expense}
                        </td>
                      </tr>
                      <tr>
                        <td>baolaonsa</td>
                        <td>
                          {this.state.switch === "yes"
                            ? this.state.month.capital
                            : this.state.balance.capital}
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div
                    className="column-50 blance-content"
                    style={{
                      padding: "0px",
                      display: "initial",
                      marginLeft: "6%",
                    }}
                  >
                    <Icon type="printer" onClick={this.handelPrintReport} />
                    <div className="color-yellow">
                      <h3 className="yellow current-balance">baolaonsa</h3>
                      <h1 className="text-center">
                        ₹&nbsp;
                        <span>{this.state.capital}</span>
                        {/* <AnimatedNumber
                          className="text-center"
                          value={this.state.capital}
                          duration={1800}
                          formatValue={this.formatValue}
                        /> */}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.Test,
  // ...state.Animals
});

export default withRouter(
  connect(mapStateToProps, { getAnimalChart, getLinearChart, getAmountReport })(
    Home
  )
);
