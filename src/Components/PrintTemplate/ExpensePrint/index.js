import React from "react";
// import ReactToPrint from "react-to-print";
import src from "../../../Components/PrintTemplate/HeaderImage/headerImg.png";
import "./index.scss";
import ExpenseTable from "./ExpenseTable";

class ExpensePrintSlip extends React.Component {
  render() {
    return (
      <div> 
        <div className="slip-print-income">
          <div className="slip-header">
            <img className="img-header" src={src} alt="boohoo"></img>
            <hr className="first-hr"></hr>
            <hr className="first-hr margin-top-5"></hr>
          </div>

          <div>
            <h1 className="slip-sign-text">: vaa]car :</h1>
            {/* <hr className="first-hr"></hr> */}
          </div>

          {/* -------------------------------------------------------------------------------------------
          --------------------------------------INCOME SLIP---------------------------------------------
          -------------------------------------------------------------------------------------------- */}

          <div className="row">
            <div className="column-1">
              <h2 className="font-size-20">vaa]car naM.: &nbsp;</h2>
              {/* --------------------------vauchar num --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.voucher}</h2>
            </div>

            <div className="column-2">
              <h2 className="font-size-20">taarIKa : &nbsp;</h2>
              {/* -------------------------- Date --------------------------- */}
              <h2 className="Date  english-font ">{this.props.date}</h2>
            </div>
          </div>

          <div className="row">
            <div className="column-1 padding-top-0">
              <h2 className="font-size-20">
                naaNaa laonaar nau naama : &nbsp;
              </h2>
              {/* --------------------------Slip Address --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.name}</h2>
            </div>

            <div className="column-2 padding-top-0">
              <h2 className="font-size-20">gaama: &nbsp;</h2>
              {/* --------------------------Slip Name --------------------------- */}
              <h2 className="Date font-size-20">{this.props.address}</h2>
            </div>
          </div>

          <div className="row">
            <div className="column-1 padding-top-0">
              <h2 className="font-size-20">maaobaa[la naM. : &nbsp;</h2>
              {/* --------------------------Mobile Num --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.mobile}</h2>
            </div>
            {this.props.cheque_no ? (
              <div className="column-2 padding-top-0">
                <h2 className="font-size-20">caok naM. : &nbsp;</h2>
                {/* --------------------------Cheque Num --------------------------- */}
                <h2 className="Date font-size-20">{this.props.cheque_no}</h2>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="row">
            <div className="column-50 padding-top-0">
              <h2 className="font-size-20">hstak naama : &nbsp;</h2>
              {/* --------------------------Hastak name --------------------------- */}
              <h2 className="slip-num font-size-20">{this.props.refname}</h2>
            </div>

            <div className="column-50 padding-top-0">
            </div>
          </div>

          {/* ----------------------------------------------table------------------------------ */}
          <div className="table padding-row">
            <ExpenseTable data={this.props.table} total={this.props.amount} />
          </div>

          <div className="row sign-row-expenses">
            <div className="column-50-sign">
              <hr className="hr-left-sign"></hr>
              {/* --------------------------Slip sign --------------------------- */}
              <h2 className="slip-sign-text font-size-20">
                saItaarama gaaOSaaLaa T/sT vataI
              </h2>
            </div>

            <div className="column-50-sign">
              <hr className="hr-right-sign "></hr>
              {/* --------------------------Slip sign --------------------------- */}
              <h2 className="slip-sign-text font-size-20">
                naaNaa laonaar naI sahI
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpensePrintSlip;
