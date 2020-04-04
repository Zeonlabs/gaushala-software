import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, getOtp, resetPin } from "../../Actions/SetUpUser";
import { Button, Row, Col, InputNumber, message } from "antd";
import { withRouter } from "react-router";
import FirstPage from "./FirstPage";
import ForgotPasswordModal from "../SettingPage/ForgotPasswordModal";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: "",
      firstPage: false,
      loginPage: true,
      visible: false,
      visibleModal: false,
      confirmLoading: false,
      mobilenumber: "",
      ModalText: "Content of the modal",
      firstPin: 0,
      secondPin: 0,
      otp: 0
    };
  }

  componentDidMount = () => {
    localStorage.getItem("addUser");
    console.log(
      "FirstPage -> componentDidMount -> localStorage.getItem()",
      localStorage.getItem("addUser")
    );
    if (localStorage.getItem("addUser") === null) {
      this.setState({
        firstPage: true
      });
    } else {
      this.setState({
        firstPage: false,
        mobilenumber: localStorage.getItem("phone")
      });
    }
  };

  handleSubmit = () => {
    if (this.state.pin !== "") {
      const pin = {
        pin: this.state.pin
      };
      axios
        .post("http://localhost:8081/auth", pin)
        .then(res => {
          console.log("Employees -> res", res);
          const location = {
            pathname: "/dashboard",
            state: { status: res.status }
          };
          this.props.history.push(location);
          localStorage.setItem("reversePin", res.status);
        })
        .catch(e => message.error("invalid Pin !"));
      // this.props
      //   .loginUser(pin)
      //   .then(res => {
      //     console.log("Login -> handleSubmit -> res", res.ok);
      //     this.props.history.push("/dashboard");
      //   })
      //   .catch(e => message.error("invalid Pin !"));
    } else {
      message.error("please enter pin");
    }
  };

  handelLoginPage = () => {
    this.setState({
      firstPage: false
    });
  };

  handelPinChange = e => {
    this.setState({
      pin: e
    });
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

  showModal = () => {
    this.setState({
      visible: true
    });
    this.props.getOtp();
  };

  handleCancel = () => {
    console.log("Clicked cancel button");

    this.setState({
      visible: false,
      visibleModal: false
    });
  };

  handelFirstPin = e => {
    console.log("SettingPage -> e", e);
    this.setState({
      firstPin: e
    });
  };

  handelSecondPin = e => {
    console.log("SettingPage -> e", e);
    this.setState({
      secondPin: e
    });
  };

  handelNewPinSetup = data => {
    this.setState({
      visibleModal: true,
      otp: data
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
      <div>
        {this.state.firstPage ? (
          <FirstPage change={this.handelLoginPage} />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <h5>paIna</h5>
                <InputNumber
                  // style={{
                  //   width: "100%"
                  // }}
                  type="number"
                  placeholder="pin"
                  onChange={this.handelPinChange}
                />
              </Col>
            </Row>
            <div className="m-btn-gru">
              {/* ------------------------------Save Button--------------------------------- */}

              <Button
                icon="save"
                size="default"
                type="primary"
                onClick={this.handleSubmit}
              >
                saova
              </Button>
            </div>

            <div className="m-btn-gru">
              {/* ------------------------------Save Button--------------------------------- */}

              <Button
                icon="save"
                size="default"
                type="primary"
                onClick={this.showModal}
              >
                rIsaoT
              </Button>
            </div>
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
          </>
        )}
      </div>
    );
  }
}

// const Logins = Form.create({ name: "Income" })(Login);
export default withRouter(
  connect(null, { loginUser, getOtp, resetPin })(Login)
);
