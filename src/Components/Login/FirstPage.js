import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../Actions/SetUpUser";
import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import NumericInput from "../Common/Forms/InputNumber";
import "./loginpage.scss";

class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addUser(values).then((res) => {
          this.props.change();
          localStorage.setItem("addUser", "yes");
          localStorage.setItem("phone", values.phone);
        });
      }
    });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="row-center-first-page">

        <div className="content-row">

          <div>
            <h1 className="text-center">gaaOSaaLaa T/sT</h1>
            <h2 className="text-center">rPsTr nyau Aka]nT</h2>
          </div>

          <div className="ant-row-center">
            <Form className="form-income" onSubmit={this.handleSubmit}>

                 {/* ------------------------------Name-------------------------------- */}
                 <Form.Item className="" label="naama">
                  {getFieldDecorator("name", {
                    rules: [{ required: true }],
                    // initialValue: type && data.name
                  })(<Input placeholder="naama" />)}
                </Form.Item>

                {/* ------------------------------Mobile no.--------------------------------- */}

                <Form.Item className="" label="maaobaa[la naMbar.:">
                  {getFieldDecorator("phone", {
                    rules: [{ required: true, len: 10 }],
                  })(
                    <NumericInput
                      value={this.state.value}
                      onChange={this.onChange}
                    />
                  )}
                </Form.Item>

                {/* ------------------------------Pin number-------------------------------- */}
                <Form.Item  label="paIna:">
                  {getFieldDecorator("pin", {
                    rules: [{ required: true }],
                    // initialValue: type && data.address
                  })(
                    <InputNumber
                    type="number"
                      style={{
                        width: "100%",
                      }}
                      placeholder="0    .    0    .    0    .    0"
                    />
                  )}
                </Form.Item>

                {/* ------------------------------Save Button--------------------------------- */}
              <Form.Item>
                <Button
                  className="btn-login"
                  size="default"
                  type="primary"
                  htmlType="submit"
                >
                  saova
                </Button>
              </Form.Item>

              <div
                className="english-font-input footer-login-page"
              >
                Official product of zeonlabs © 2018
              </div>

            </Form>
          </div>


          
        </div>
      </div>
    );
  }
}

const FirstPages = Form.create({ name: "Income" })(FirstPage);

export default connect(null, { addUser })(FirstPages);
