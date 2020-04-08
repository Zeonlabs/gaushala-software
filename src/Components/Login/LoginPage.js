import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, getOtp, resetPin } from "../../Actions/SetUpUser";
import { Button, InputNumber, message } from "antd";
import { withRouter } from "react-router";
import FirstPage from "./FirstPage";
import ForgotPasswordModal from "../SettingPage/ForgotPasswordModal";
import axios from "axios";
import { baseUrl } from "../../js/Helper";

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
      otp: 0,
    };
  }

  componentDidMount = () => {
    localStorage.getItem("addUser");
    if (localStorage.getItem("addUser") === null) {
      this.setState({
        firstPage: true,
      });
    } else {
      this.setState({
        firstPage: false,
        mobilenumber: localStorage.getItem("phone"),
      });
    }
  };

  handleSubmit = () => {
    if (this.state.pin !== "") {
      const pin = {
        pin: this.state.pin,
      };
      axios
        .post(`${baseUrl}/auth`, pin)
        .then((res) => {
          const location = {
            pathname: "/dashboard",
            state: { status: res.status },
          };
          this.props.history.push(location);
          localStorage.setItem("reversePin", res.status);
        })
        .catch((e) => message.error("invalid Pin !"));
      // this.props
      //   .loginUser(pin)
      //   .then(res => {
      //     this.props.history.push("/dashboard");
      //   })
      //   .catch(e => message.error("invalid Pin !"));
    } else {
      message.error("please enter pin");
    }
  };

  handelLoginPage = () => {
    this.setState({
      firstPage: false,
    });
  };

  handelPinChange = (e) => {
    this.setState({
      pin: e,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    this.props.getOtp();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleModal: false,
    });
  };

  handelFirstPin = (e) => {
    this.setState({
      firstPin: e,
    });
  };

  handelSecondPin = (e) => {
    this.setState({
      secondPin: e,
    });
  };

  handelNewPinSetup = (data) => {
    this.setState({
      visibleModal: true,
      otp: data,
    });
  };

  handelResetPin = () => {
    if (this.state.firstPin === this.state.secondPin) {
      const data = {
        otp: this.state.otp,
        pin: this.state.secondPin,
      };
      this.props.resetPin(data).then((res) => {
        this.setState({
          visible: false,
          visibleModal: false,
        });
      });
    } else {
      message.error("check the pin both pin has to be same !");
    }
  };

  render() {
    const { visible, confirmLoading, visibleModal, mobilenumber } = this.state;
    return (
      <div className="page">
        <div>
          {this.state.firstPage ? (
            <FirstPage change={this.handelLoginPage} />
          ) : (
            <>
              <div className="row-center">
                <div className="content-row">
                  <div>
                    <h1 className="text-center">saItaarama gaaOSaaLaa T/sT</h1>
                    <h2 className="text-center">paIna naMbar ]maorao</h2>
                  </div>
                  <div className="ant-row-center">
                    <InputNumber
                      type="number"
                      placeholder="0    .    0    .    0    .    0"
                      onChange={this.handelPinChange}
                    />
                  </div>
                  <div className="row-resetpassword">
                    <h4 onClick={this.showModal}>paasava-D BaulaI gayaa.</h4>
                  </div>
                  <div className="ant-row-center">
                    {/* ------------------------------Save Button--------------------------------- */}

                    <Button
                      size="default"
                      type="primary"
                      className="btn-login"
                      onClick={this.handleSubmit}
                    >
                      AonTr
                    </Button>

                    <div className="english-font-input footer-login-page">
                      Official product of zeonlabs © 2018
                    </div>
                  </div>

                  {/* <div className="m-btn-gru"> */}
                  {/* ------------------------------Reset password Button--------------------------------- */}

                  {/*               
              <Button
                icon="save"
                size="default"
                type="primary"
                onClick={this.showModal}
              >
                
              </Button>

            </div> */}
                </div>
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
      </div>
    );
  }
}

// const Logins = Form.create({ name: "Income" })(Login);
export default withRouter(
  connect(null, { loginUser, getOtp, resetPin })(Login)
);
