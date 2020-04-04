import React from "react";
// import ReactToPrint from "react-to-print";
// import src from "../HeaderImage/headerImg.svg";
import "./index.scss";
// import ReportTable from "./ReportTable";

class DocumentPrint extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {/* <div className="slip-print">
          <div className="slip-header"> */}

        <img
          // className={this.props.className}
          src={this.props.src}
          alt="User Docs"
        ></img>
        {/* <hr className="first-hr"></hr>
            <hr className="first-hr margin-top-5"></hr> */}
        {/* </div>
        </div> */}
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

export default DocumentPrint;
