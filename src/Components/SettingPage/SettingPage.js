import React, { Component } from "react";
import { connect } from "react-redux";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import "./SettingPage.scss";
import {
  Form,
  Input,
  Row,
  Col,
  Icon,
  Divider,
  Button,
  Layout,
  InputNumber,
  message
} from "antd";
import { addUser, editUser, getOtp, resetPin } from "../../Actions/SetUpUser";
import { getAnimalChart } from "../../Actions/ChartActions";
import ForgotPasswordModal from "./ForgotPasswordModal";

const { Footer } = Layout;

export class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: "Content of the modal",
      visible: false,
      visibleModal: false,
      confirmLoading: false,
      loading: false,
      iconLoading: false,
      username: "",
      mobilenumber: "",
      pin: "",
      firstPin: 0,
      secondPin: 0,
      otp: 0
      // newPinStatus:false
    };
  }
  componentDidMount = () => {
    if (this.props.totalAnimalCount === null) {
      this.props.getAnimalChart().then(res => {
        this.setState({
          username: res.name,
          mobilenumber: res.phone
        });
      });
    } else {
      this.setState({
        username: this.props.totalAnimalCount.name,
        mobilenumber: this.props.totalAnimalCount.phone
      });
    }
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
    const { username, mobilenumber } = this.state;
    if (username !== "" && mobilenumber !== "") {
      const data = {
        name: username,
        phone: mobilenumber
        // pin
      };
      this.props.editUser(data).then(res => {
        message.success("Update data sucessfully !");
        localStorage.setItem("phone", data.phone);
        this.setState({
          iconLoading: false
          // username: "",
          // mobilenumber: "",
          // pin: ""
        });
      });
    } else {
      message.error("please fill all the field");
      this.setState({
        iconLoading: false
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
    this.props.getOtp();
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleModal: false
    });
  };

  handelNewPinSetup = data => {
    this.setState({
      visibleModal: true,
      otp: data
    });
  };

  // handelChange = () => {
  //   this.setState({
  //     visibleModal: !this.state.visibleModal
  //   });
  // };

  onChangeUserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  onChangeMobileNumber = e => {
    this.setState({
      mobilenumber: e
    });
  };

  onChangePin = e => {
    this.setState({
      pin: e
    });
  };

  handelFirstPin = e => {
    this.setState({
      firstPin: e
    });
  };

  handelSecondPin = e => {
    this.setState({
      secondPin: e
    });
  };

  handelResetPin = () => {
    if (this.state.firstPin === this.state.secondPin) {
      const data = {
        otp: this.state.otp,
        pin: this.state.secondPin
      };
      this.props.resetPin(data).then(res => {
        this.setState({
          visible: false,
          visibleModal: false
        });
      });
    } else {
      message.error("check the pin both pin has to be same !");
    }
  };

  render() {
    const { visible, confirmLoading, visibleModal, mobilenumber } = this.state;

    return (
      <PageWrapper title="saoiTMga">
        <div>
          <ForgotPasswordModal
            visible={visible}
            handleOk={this.handleOk}
            confirmLoading={confirmLoading}
            handleCancel={this.handleCancel}
            visibleModal={visibleModal}
            handelFirstPin={this.handelFirstPin}
            handelSecondPin={this.handelSecondPin}
            handelResetPin={this.handelResetPin}
            mobilenumber={mobilenumber}
            handelNewPinSetup={this.handelNewPinSetup}
          />
        </div>

        <h1>saaofTvaor saoiTMga</h1>
        <span className="warning">
          <Icon type="warning" /> naaoMGa: saaofTvaor maa qayaola kao[paNa
          sauGaara frI maoLavaI SakaSao nahI.
        </span>

        <Divider orientation="left" className="divider-color divider-label">
          yausar saoiTMga <Icon type="user" />
        </Divider>
        <Row className="row-margin">
          {/* -----------------------------Name of Member-------------------------------- */}
          <Col className="gutter-row margin-left" span={6}>
            <Form.Item className="ant-col " label="yausar naama">
              <Input
                placeholder="naama"
                value={this.state.username}
                onChange={this.onChangeUserName}
                defaultValue={this.state.username}
              />
            </Form.Item>
          </Col>

          {/* ------------------------------phone No--------------------------------- */}
          <Col span={4} offset={1}>
            <Form.Item label="maaobaa[la naMbar">
              <InputNumber
                maxLength={10}
                className=""
                value={this.state.mobilenumber}
                defaultValue={this.state.mobilenumber}
                onChange={this.onChangeMobileNumber}
                placeholder="0000000000"
              />
            </Form.Item>
          </Col>
          {/* <Col span={4} offset={1}>
            <Form.Item label="paIna naMbar">
              <InputNumber
                maxLength={4}
                value={this.state.pin}
                onChange={this.onChangePin}
                className=""
                placeholder="0000000000"
              />
            </Form.Item>
          </Col> */}
          {/* ------------------------------Save Button------------------------------ */}
          <Col className="button-group-print" span={3}>
            <Button
              type="primary"
              icon="save"
              loading={this.state.iconLoading}
              onClick={this.enterIconLoading}
            >
              saova
            </Button>
          </Col>
        </Row>

        <Divider orientation="left" className="divider-color divider-label">
          paIna laaok saoiTMga <Icon theme="filled" type="lock" />
        </Divider>

        <Row className="row-margin">
          <Col offset={1} className="pin-set margin-left">
            <label>paIna naMbar:</label>
            <Button
              className="tag-clock"
              onClick={this.showModal}
              type="danger"
            >
              saoT nyau paIna naMbar
            </Button>
          </Col>
        </Row>
        <Footer
          className="english-font-input"
          style={{ textAlign: "center", marginTop: "auto" }}
        >
          Official product of zeonlabs © 2018
        </Footer>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Test
});

// const mapDispatchToProps = {};

export default connect(mapStateToProps, {
  addUser,
  getAnimalChart,
  editUser,
  getOtp,
  resetPin
})(SettingPage);
