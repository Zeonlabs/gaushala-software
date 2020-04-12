import React, { Component } from "react";
import { Modal, Form, Row, Col, Button, InputNumber } from "antd";
import OtpScreen from "./OtpScreen";

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          title="pIn se3"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          maskClosable={false}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.props.handleCancel}
          footer={null}
        >
          <Row>
            <h1 className="form-titel">saoT nyau paIna naMbar</h1>
          </Row>

          <div className="form-income">
            <div
              className={
                this.props.visibleModal
                  ? "display-pin-change"
                  : "display-none-pin-change"
              }
            >
              {/* =============================otp pin set========================== */}

              <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
                nvo pIn n>br se3 kro
              </h2>
              <Row gutter={[16, 16]}>
                <Col span={8}></Col>
                <Col span={8}>
                  <Form.Item label="paIna naMbar ]maorao ">
                    <InputNumber onChange={this.props.handelFirstPin} />
                  </Form.Item>
                  <Form.Item label=" FrI paIna naMbar ]maorao">
                    <InputNumber onChange={this.props.handelSecondPin} />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8} style={{ padding: 0 }}>
                  {/* ------------------------------Submit button--------------------------- */}
                  <Form.Item>
                    <Button
                      size="default"
                      htmlType="submit"
                      icon="safety-certificate"
                      type="primary"
                      style={{ float: "right" }}
                      onClick={this.props.handelResetPin}
                    >
                      sabamaIT
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div
            className={
              !this.props.visibleModal
                ? "display-pin-change"
                : "display-none-pin-change"
            }
          >
            <OtpScreen
              className="otp-verification-page"
              // handelShows={this.handelChange}
              mobile={this.props.mobilenumber}
              newPinSetup={this.props.handelNewPinSetup}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default ForgotPasswordModal;
