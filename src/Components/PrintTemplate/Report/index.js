import React from "react";
// import ReactToPrint from "react-to-print";
import src from "../../../Components/PrintTemplate/HeaderImage/headerImg.png";
import "./index.scss";
import ReportTable from "./ReportTable";
import { TypeCost, ExpenseTypeCost } from "./Columns/TypeReport";

class ReportPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      typeData: "",
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      if (this.props.type === "Expense") {
        const sortedActivities = this.props.data
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        // console.log(
        //   "ReportPrint -> componentDidMount -> sortedActivities",
        //   sortedActivities
        // );
        var result = [];
        this.props.data.reduce(function (res, value) {
          if (!res[value.type]) {
            res[value.type] = { Id: value.type, amount: 0 };
            result.push(res[value.type]);
          }
          res[value.type].amount += value.money.amount;
          return res;
        }, {});

        this.setState({
          data: sortedActivities,
          typeData: result,
        });
        // result.map((value, id) => {
        //   console.log("ReportPrint -> componentDidUpdate -> value", value.id);
        //   // ArraySum(value)
        //   // console.log(
        //   //   "ReportPrint -> componentDidUpdate -> ArraySum(value)",
        //   //   ArraySum(value.id)
        //   // );
        // });

        // console.log("ReportPrint -> componentDidUpdate -> result", result);
      } else {
        this.setState({
          data: this.props.data,
        });
      }
    }
  };
  render() {
    // console.log("this dshfihasdjhfhsdahfu ->", this.props);
    return (
      <div>
        <div className="slip-print-report">
          <div className="slip-header">
            <img className="img-header" src={src} alt="boohoo"></img>
            <hr className="first-hr"></hr>
            <hr className="first-hr margin-top-5"></hr>
          </div>

          <div>
            {/* ---------------------------------------Report Name--------------------------------- */}
            <h1 className="slip-sign-text gujarati-font">
              {" "}
              : &nbsp;
              <span className="report-name gujarati-font">
                {this.props.name}
              </span>
              &nbsp; :{" "}
              {this.props.type === "Expense" ? (
                <span className="total-text-print gujarati-font">
                  TaoTla :{this.props.total}
                </span>
              ) : (
                ""
              )}
            </h1>
          </div>

          {/* -------------------------------------------------------------------------------------------
          --------------------------------------Report slip---------------------------------------------
          -------------------------------------------------------------------------------------------- */}

          <div className="report-table padding-row">
            <ReportTable
              data={this.state.data}
              type={this.props.type}
              column={this.props.column}
            />
          </div>
          <h2 className="aavak-report-title gujarati-font">
            {this.props.name === "Aavak rIpaaoT"
              ? "Aavak pa`kar naao rIpaaoT"
              : "javak pa`kar naao rIpaaoT"}
          </h2>
          <div className="report-table padding-row">
            {this.props.name === "Aavak rIpaaoT" ? (
              <ReportTable data={this.state.typeData} column={TypeCost} />
            ) : (
              <ReportTable
                data={this.state.typeData}
                column={ExpenseTypeCost}
              />
            )}
          </div>
          <span className="total-text-print gujarati-font">
            TaoTla :{this.props.total}
          </span>
        </div>
      </div>
    );
  }
}

export default ReportPrint;
