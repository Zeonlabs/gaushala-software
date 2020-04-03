import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Drawer,
  Select,
  DatePicker,
  Modal
} from "antd";
import { getEmployeeDocs } from "../../Actions/Employee";
import "../Cheques/SideDrawer.scss";
import { employeeList } from "../../js/apiList";

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
        console.log(
          "ProfileView -> componentDidMount -> getEmployeeDocs",
          getEmployeeDocs
        );
        console.log("this is  a log in a get documents", res);
        this.setState({
          userDocs: res
        });
      });
  };

  render() {
    const { visible, onClose, data } = this.props;
    console.log("ProfileView -> render -> data", data);
    console.log(
      "ProfileView -> render -> {`${baseUrl}/${employeeList.employeeGetDocs.url}/${this.props.data._id}`}",
      `${baseUrl}${employeeList.employeeGetDocs.url}/${this.props.data._id}`
    );
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
        <img
          className="profile-view-image"
          src={`${baseUrl}${employeeList.employeeGetDocs.url}/${this.props.data._id}`}
          alt="userDoc"
        />
        {/* <p className="employee-name">{data.name}</p>
        <p>{data.phone}</p>
        <p>{data.address}</p>
        <p>{data.type}</p> */}
        {/* <img src={"data:image/jpeg;base64," + btoa(this.state.userDocs)} /> */}
      </Modal>
    );
  }
}

export default connect(null, { getEmployeeDocs })(ProfileView);
