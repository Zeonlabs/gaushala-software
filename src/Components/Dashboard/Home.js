import React, { Component } from "react";
// import MenuBar from "../Common/MenuBar";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import LineChart from "./LineChart";
import { getLinearChart, getAnimalChart } from "../../Actions/ChartActions";
import { connect } from "react-redux";
import AnimalChart from "./AnimalChart";
import AnimatedNumber from "animated-number-react";
// import LoaderAnimation from "../../Static/Widgets/LoaderAnimation";

import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linearDataIncome: { x: 0, y: 0 },
      linearDataExpence: {},
      capital: 0
    };
  }

  // componentDidMount() {
  //   this.props.getAnimalChart().then(res => {
  //     this.setState({
  //       capital: res.stats.capital
  //     });
  //   });
  // }

  componentDidUpdate = prevProps => {
    if (prevProps.totalAnimalCount !== this.props.totalAnimalCount) {
      this.setState({
        capital: this.props.totalAnimalCount.capital
      });
    }
  };
  formatValue = value => value.toFixed(0);
  render() {
    return (
      <PageWrapper>
        <div className="dashboard">
          <LineChart
          // income={this.state.linearDataIncome}
          // expence={this.state.linearDataExpence}
          />

          <div className="btml-grph">
            <div className="piechrt-div">
              <h3 className="dashbrd-label">paSauAao</h3>
              <AnimalChart />
            </div>
            <div className="balance-div">
              <div className="padding-row-15">
                <h1 className=" text-align">krMT baolaonsa kolkulaoSana</h1>
              </div>

              <div className="padding-row">
                <div className="row">
                  <div className="column-50 color-green">
                    <h3 className="green">Aavak</h3>
                    <h2>
                      <AnimatedNumber
                        className="text-center"
                        value={this.state.capital}
                        duration={1800}
                        formatValue={this.formatValue}
                      />
                    </h2>
                  </div>
                  <div className="column-50 color-red">
                  <h3 className="red">Javak</h3>
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
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Test
  // ...state.Animals
});

export default connect(mapStateToProps, { getAnimalChart, getLinearChart })(
  Home
);
