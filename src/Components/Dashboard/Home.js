import React, { Component } from "react";
import _ from "lodash";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import LineChart from "./LineChart";
import { getLinearChart, getAnimalChart } from "../../Actions/ChartActions";
import { connect } from "react-redux";
import AnimalChart from "./AnimalChart";
import AnimatedNumber from "animated-number-react";
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
      totalExpense: 0
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
      this.props.getLinearChart().then(res => {
        const arrangedIncomeDate = arrangeDate(res.income);
        const arrangedExpenseDate = arrangeDate(res.expense);

        const incomeData = arrangedIncomeDate.map(val => ({
          x: getDate(val.year, val.month),
          y: val.amount
        }));

        const expenseData = arrangedExpenseDate.map(val => ({
          x: getDate(val.year, val.month),
          y: val.amount
        }));

        this.setState({
          incomeData: incomeData,
          expenceData: expenseData,
          totalIncome: _.sumBy(res.income, "amount"),
          totalExpense: _.sumBy(res.expense, "amount")
        });
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.totalAnimalCount !== this.props.totalAnimalCount) {
      this.setState({
        capital: this.props.totalAnimalCount.capital
      });
    }
  };
  formatValue = value => value.toFixed(0);

  render() {
    // console.log(
    //   ";;;;;;;;;;;[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]sddddddddddddd",
    //   this.props.totalAnimalCount
    // );
    return (
      <PageWrapper>
        <div className="dashboard">
          <LineChart
            // income={this.state.linearDataIncome}
            // expence={this.state.linearDataExpence}
            // statusCode={this.props.location.state.status}
            data={{
              income: this.state.incomeData,
              expense: this.state.expenceData
            }}
          />

          <div className="btml-grph">
            <div className="piechrt-div">
              <h3 className="dashbrd-label">paSauAao</h3>
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

              <div className="padding-row">
                <div className="row" style={{ height: 250 }}>
                  <div className="column-50">
                    <BarChart
                      data={[
                        {
                          type: "aavaka",
                          income: this.state.totalIncome
                        },
                        {
                          type: "javak",
                          expense: this.state.totalExpense
                        }
                      ]}
                    />
                  </div>

                  <div className="column-50">
                    <div className="row color-yellow margin-top-15">
                      <h3 className="yellow margin-top">baolaonsa</h3>
                      <h2>
                        <AnimatedNumber
                          className="text-center"
                          value={this.state.capital}
                          duration={1800}
                          formatValue={this.formatValue}
                        />
                      </h2>
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

const mapStateToProps = state => ({
  ...state.Test
  // ...state.Animals
});

export default withRouter(
  connect(mapStateToProps, { getAnimalChart, getLinearChart })(Home)
);
