import React from "react";
// import ReactToPrint from "react-to-print";
import src from "../../../Components/PrintTemplate/HeaderImage/headerImg.png";
import "./index.scss";
import ReportTable from "./ReportTable";

class ReportPrint extends React.Component {
  render() {
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
            <h1 className="slip-sign-text gujarati-font">{" "}: &nbsp;<span className="report-name gujarati-font">{this.props.name}</span>&nbsp; :{" "}
            </h1>
          </div>

          {/* -------------------------------------------------------------------------------------------
          --------------------------------------Report slip---------------------------------------------
          -------------------------------------------------------------------------------------------- */}

          <div className="report-table padding-row">
            <ReportTable
              data={this.props.data}
              type={this.props.type}
              column={this.props.column}
            />
          </div>
        </div>
      </div>
    );
  }
}

// class Example extends React.Component {
//   render() {
//     return (
//       <div>
//         <ComponentToPrint ref={el => (this.componentRef = el)} />
//         <ReactToPrint
//           trigger={() => <a href="#">Print this out!</a>}
//           content={() => this.componentRef}
//         />
//       </div>
//     );
//   }
// }

export default ReportPrint;
