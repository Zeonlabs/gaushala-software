import React, { Component } from "react";
import { connect } from "react-redux";
import { getAnimalChart } from "../../Actions/ChartActions";
import "./Home.scss";

import { PieChart } from "./nivoPieChart";

class AnimalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalData: [{ id: "", label: "chart", value: 1, color: "#e6e6e6" }],
      expenceData: [{ x: 0, y: 0 }],
    };
  }

  componentDidMount = () => {
    this.props.getAnimalChart(this.props.statusCode).then((res) => {
      // console.log("AnimalChart -> componentDidMount -> res", res);
      const ArrayMap = Object.values(res.stats.animal);
      // console.log("AnimalChart -> componentDidMount -> ArrayMap", ArrayMap);

      const newData = [
        {
          id: "gaaya",
          label: "gaaya",
          value: ArrayMap[2],
          color: "#F9C501",
        },
        {
          id: "baLad",
          label: "baLad",
          value: ArrayMap[3],
          color: "#53D767",
        },
        {
          id: "vaaCrDa",
          label: "vaaCrDa",
          value: ArrayMap[0],
          color: "#021322",
        },
        {
          id: "vaaCrDI",
          label: "vaaCrDI",
          value: ArrayMap[1],
          color: "#40a9ff",
        },
        {
          id: "Anya",
          label: "Anya",
          value: ArrayMap[4],
          color: "#ff4d4f",
        },
      ];

      this.setState({
        animalData: newData,
      });
    });
  };

  render() {
    return (
      <div className="pie-chrt">
        <PieChart data={this.state.animalData} />
      </div>
    );
  }
}

export default connect(null, { getAnimalChart })(AnimalChart);
