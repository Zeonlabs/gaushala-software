import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Modal, Icon } from "antd";
import { getEmployeeDocs } from "../../Actions/Employee";
import "../Cheques/SideDrawer.scss";
import { employeeList } from "../../js/apiList";
import ReactToPrint from "react-to-print";
import DocumentPrint from "../PrintTemplate/DocumentPrint";

const baseUrl = "http://localhost:8081";

class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDocs: ""
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.visible !== this.props.visible)
      this.props.getEmployeeDocs(this.props.data._id).then(res => {
        this.setState({
          userDocs: res
        });
      });
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal
        centered
        // maskClosable={false}
        visible={visible}
        footer={null}
        // onOk={this.handelData}
        onCancel={onClose}
      >
        <div className="income-model-wrapper">
          <Row>
            <h2 className="form-titel ">caok fIlTr</h2>
          </Row>
        </div>
        <ReactToPrint
          trigger={() => (
            <Button
              shape="squre"
              size="large"
              type="primary"
              // onClick={this.handelResetFilter}
              style={{
                backgroundColor: "#505D6F",
                marginRight: 10,
                color: "#ffffff",
                float: "right"
              }}
            >
              <Icon
                type="printer"
                theme="filled"
                // onClick={this.handelResetFilter}
              />
              ipa`nT
            </Button>
          )}
          content={() => this.componentRef}
        />
        <DocumentPrint
          ref={el => (this.componentRef = el)}
          //---------------------------------------Change title of report from here----------------------------------------------------
          name="Aavak rIpaaoT"
          className="profile-view-image"
          src={`${baseUrl}${employeeList.employeeGetDocs.url}/${this.props.data._id}`}
        />
      </Modal>
    );
  }
}

export default connect(null, { getEmployeeDocs })(ProfileView);
