import React from "react";
// import ReactToPrint from "react-to-print";
import src from "../PrintTemplate/HeaderImage/headerImg.png";
import "./index.scss";
import IncomeTable from "./IncomeTable";
import moment from "moment";
// import {Table} from 'antd'

class IncomePrintSlip extends React.Component {
  render() {
    // localStorage.getItem("value");
    // const data = localStorage.getItem("value");
    const { slip_no, date, name, address, item, money } = this.props.data;

    // console.log(
    //   "IncomePrintSlip -> render -> this.props.data",
    //   this.props.data
    // );
    return (
      <div id={this.props.cId}>
        <div className="slip-print-income">
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
              <h2 className="slip-num font-size-20">{slip_no || 0}</h2>
            </div>

            <div className="column-2">
              <h2 className="font-size-20">taarIKa : &nbsp;</h2>
              {/* --------------------------Slip Date --------------------------- */}
              <h2 className="date  english-font">
                {moment(date).format("DD-MM-YYYY")}
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="column-1 padding-top-0">
              <h2 className="font-size-20">dataa EaI : &nbsp;</h2>
              {/* --------------------------Slip Address --------------------------- */}
              <h2 className="font-size-20">{name}</h2>
            </div>

            <div className="column-2 padding-top-0">
              <h2 className="font-size-20">gaama: &nbsp;</h2>
              {/* --------------------------Slip Name --------------------------- */}
              <h2 className="font-size-20">{address}</h2>
            </div>
          </div>

          {/* ----------------------------------------------table------------------------------ */}
          <div className="table padding-row">
            <IncomeTable data={item} total={money ? money.amount : 0} />
          </div>

          {/* -----------------------------------------------Content-------------------------------- */}
          <div className="row padding-row">
            <h3>
              AaJ raoJ AapaEaI tarF qaI gaaOSaaLaa naa laaBaaqao- danapaoTo ₹
              &nbsp;
              <span className="amount-in-digit">
                {money ? money.amount : 0}{" "}
              </span>
              paura{" "}
              {money ? (
                money.cheque_no ? (
                  <span className="if-amount-is-payed-by-chqeue">
                    caok naMbar &nbsp;
                    <span className="cheque-num">{money.cheque_no}</span>
                    &nbsp;qaI{" "}
                  </span>
                ) : (
                  ""
                )
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
              {/* <h2 className="slip-sign-text"></h2> */}
            </div>

            <div className="column-4">
              <hr className="hr-right-sign"></hr>
              {/* --------------------------Slip sign --------------------------- */}
              <h2 className="slip-sign-text">
                saItaarama gaaOSaaLaa T/sT vataI
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IncomePrintSlip;
