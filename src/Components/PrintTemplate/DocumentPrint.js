import React from "react";
import "./index.scss";

class DocumentPrint extends React.Component {
  render() {
    return (
      <div className={this.props.className}>

        <img
          src={this.props.src}
          alt="User Docs"
        ></img>
      </div>
    );
  }
}
export default DocumentPrint;
