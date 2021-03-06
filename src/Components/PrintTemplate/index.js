import React from "react";
// import ReactToPrint from "react-to-print";
import src from "./HeaderImage/headerImg.svg";
import "./index.scss";
import IncomeTable from "./IncomeTable";
// import {Table} from 'antd'

class IncomePrintSlip extends React.Component {
  render() {
    console.warn("this is  a printing component ->", this.props);
    return (
      <div>
        <div className="slip-print">
          <div className="slip-header">
            <img className="img-header" src={src} alt="boohoo"></img>
            <hr className="first-hr"></hr>
          </div>

          {/* -------------------------------------------------------------------------------------------
          --------------------------------------INCOME SLIP---------------------------------------------
          -------------------------------------------------------------------------------------------- */}

          <div className="row">
            <div className="column-1">
              <h2 className="font-size-20">pahaoMca naM. : &nbsp;</h2>
              {/* --------------------------Slip Num --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.voucher || 0}</h2>
            </div>

            <div className="column-2">
              <h2 className="font-size-20">taarIKa : &nbsp;</h2>
              {/* --------------------------Slip Date --------------------------- */}
              <h2 className="Date  english-font">{this.props.date}</h2>
            </div>
          </div>

          <div className="row">
            <div className="column-1 padding-top-0">
              <h2 className="font-size-20">dataa EaI : &nbsp;</h2>
              {/* --------------------------Slip Address --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.name}</h2>
            </div>

            <div className="column-2 padding-top-0">
              <h2 className="font-size-20">gaama : &nbsp;</h2>
              {/* --------------------------Slip Name --------------------------- */}
              <h2 className="Date font-size-20">{this.props.address}</h2>
            </div>
          </div>

          {/* ----------------------------------------------table------------------------------ */}
          <div className="table padding-row">
            <IncomeTable data={this.props.table} total={this.props.amount} />
          </div>

          {/* -----------------------------------------------Content-------------------------------- */}
          <div className="row padding-row">
            <h3>
              AaJ raoJ AapaEaI tarF qaI gaaOSaaLaa naa laaBaaqao- danapaoTo ₹
              &nbsp;
              <span className="amount-in-digit">{this.props.amount} </span>
              paura{" "}
              {this.props.cheque_no ? (
                <span className="if-amount-is-payed-by-chqeue">
                  caok naMbar &nbsp;
                  <span className="cheque-num">{this.props.cheque_no}</span>
                  &nbsp;qaI{" "}
                </span>
              ) : (
                ""
              )}
              &nbsp;pa`apta qayaola Co. AapaEaI naa sahkar badla Kauba Kauba
              AaBaar.
            </h3>
          </div>

          <div className="row sign-row">
            <div className="column-3">
              {/* <hr className="hr-left-sign"></hr> */}
              {/* --------------------------Slip sign --------------------------- */}
              <h2 className="slip-sign-text">
                
              </h2>
            </div>

            <div className="column-4">
              <hr className="hr-right-sign"></hr>
              {/* --------------------------Slip sign --------------------------- */}
              <h2 className="slip-sign-text">saItaarama gaaOSaaLaa T/sT vataI</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// class IncomePrintSlip extends React.Component {
//   render() {
//     return (
//       <div>

//         {/* <ReactToPrint
//           trigger={() => <a href="#">Print this out!</a>}
//           content={() => this.componentRef}
//         /> */}
//       </div>
//     );
//   }
// }

export default IncomePrintSlip;
