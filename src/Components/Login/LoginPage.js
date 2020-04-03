import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../Actions/SetUpUser";
import { Button, Row, Col, InputNumber, message } from "antd";
import { withRouter } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: ""
    };
  }

  handleSubmit = () => {
    if (this.state.pin !== "") {
      const pin = {
        pin: this.state.pin
      };
      this.props
        .loginUser(pin)
        .then(res => {
          console.log("Login -> handleSubmit -> res", res.ok);
          this.props.history.push("/dashboard");
        })
        .catch(e => message.error("invalid Pin !"));
    } else {
      message.error("please enter pin");
    }
  };

  handelPinChange = e => {
    this.setState({
      pin: e
    });
  };

  render() {
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <h5>paIna</h5>
            <InputNumber
              // style={{
              //   width: "100%"
              // }}
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
      </div>
    );
  }
}

// const Logins = Form.create({ name: "Income" })(Login);
export default withRouter(connect(null, { loginUser })(Login));
