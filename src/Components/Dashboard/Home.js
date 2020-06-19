import React, { Component } from "react";
import _ from "lodash";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import LineChart from "./LineChart";
import { getLinearChart, getAnimalChart } from "../../Actions/ChartActions";
import { connect } from "react-redux";
import AnimalChart from "./AnimalChart";
// import LoaderAnimation from "../../Static/Widgets/LoaderAnimation";
import { arrangeDate } from "./arrangeDate";
import { BarChart } from "./barChart";

import "./Home.scss";
import { withRouter } from "react-router";

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
        const arrangedIncomeDate = arrangeDate(res.income);
        const arrangedExpenseDate = arrangeDate(res.expense);

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
                <h1 className=" text-align">krMT baolaonsa kolkulaoSana</h1>
              </div>

              <div className="padding-row year-stick-chart">
                <div className="row" style={{ height: 250 }}>
                  <div className="column-50" style={{ padding: "0px" }}>
                    <BarChart
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
                    />
                  </div>

                  <div
                    className="column-50 blance-content"
                    style={{ padding: "0px" }}
                  >
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
  connect(mapStateToProps, { getAnimalChart, getLinearChart })(Home)
);
