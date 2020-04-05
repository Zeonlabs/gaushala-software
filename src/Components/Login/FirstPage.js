import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../Actions/SetUpUser";
import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import NumericInput from "../Common/Forms/InputNumber";

class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUser(values).then(res => {
          this.props.change();
          localStorage.setItem("addUser", "yes");
          localStorage.setItem("phone", values.phone);
        });
      }
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="form-income" onSubmit={this.handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              {/* ------------------------------Animal Giver Name-------------------------------- */}
              <Form.Item className="" label="naama">
                {getFieldDecorator("name", {
                  rules: [{ required: true }]
                  // initialValue: type && data.name
                })(<Input placeholder="naama" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              {/* ------------------------------Mobile no.--------------------------------- */}

              <Form.Item className="" label="maaobaa[la naM.:">
                {getFieldDecorator("phone", {
                  rules: [{ required: true, len: 10 }]
                })(
                  <NumericInput
                    value={this.state.value}
                    onChange={this.onChange}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={16}>
              {/* ------------------------------Address-------------------------------- */}
              <Form.Item className="ant-col-24" label="paIna:">
                {getFieldDecorator("pin", {
                  rules: [{ required: true }]
                  // initialValue: type && data.address
                })(
                  <InputNumber
                    style={{
                      width: "100%"
                    }}
                    placeholder="pin"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <div className="m-btn-gru">
            {/* ------------------------------Save Button--------------------------------- */}
            <Form.Item>
              <Button
                icon="save"
                size="default"
                type="primary"
                htmlType="submit"
              >
                saova
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

const FirstPages = Form.create({ name: "Income" })(FirstPage);

export default connect(null, { addUser })(FirstPages);
