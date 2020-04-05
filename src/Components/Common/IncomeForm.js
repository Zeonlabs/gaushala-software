import { Form, Input, Button, Col, Row, DatePicker, Radio, Select } from "antd";
import "../../css/Home/Income.css";
import { connect } from "react-redux";
// import "./Office.css";
import React, { Component } from "react";

const { Option } = Select;

class IncomeForm extends Component {
  constructor() {
    super();
    this.state = {
      mname: [],
      carat: [],
      id: "",
      pckCarat: [],
      singleSrno: [],
      unusedRough: "",
      srno: 0,
      roughId: "",
      value: "income",
      type: "Income",
      sawingSrno: ["Cheque income", "Animal Income"]
    };
  }
  componentDidMount = async () => {};

  handleCancel = () => {
    this.props.closeBox();
  };

  onChange = async (date, dateString) => {};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  onChangeSrno = (date, dateString) => {};

  onChangeType = e => {
    this.setState({
      type: e.target.value
    });
  };

  onChanges = value => {};

  onSearch = val => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { type } = this.state;
    // const { type } = this.props;
    return (
      <div className="income-form-wrapper">
        <Row gutter={18}>
          <Form onSubmit={this.handleSubmit}>
            {/* <h3 className="form-title">
            {this.props.type === "return" ? "Rough Return" : "Rough Issue"}
          </h3> */}
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("type", {
                  rules: [{ required: true }],
                  initialValue: "income"
                })(
                  <Radio.Group
                    // defaultValue="income"
                    onChange={this.onChangeType}
                    value={this.state.value}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="income">Income</Radio.Button>
                    <Radio.Button value="expense">Expense</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Voucher No.">
                {getFieldDecorator("vno")(
                  <Input type="number" placeholder="Voucher No." />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date">
                {getFieldDecorator("date", {
                  rules: [{ required: true, message: "Enter The Date!" }]
                })(<DatePicker onChange={this.onChange} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={`${type} Type`}>
                {getFieldDecorator(`${type} Type`, {
                  rules: [{ required: true }]
                })(
                  <Select
                    showSearch
                    placeholder={`Select ${type} type`}
                    optionFilterProp="children"
                    onSearch={this.onSearch}
                    onChange={this.onChangeSrno}
                    filterOption={true}
                  >
                    {this.state.sawingSrno.map((value, id) => {
                      return (
                        <Option value={value} key={value}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "Please input Name!" }]
                })(<Input placeholder="Ex. NIleshbhai" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mobile No.">
                {getFieldDecorator("mnumber", {
                  rules: [{ required: true }]
                })(<Input type="number" placeholder="Ex. 9825769931" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address">
                {getFieldDecorator("address", {
                  rules: [{ required: true }]
                })(<Input placeholder="Ex. Amreli" />)}
              </Form.Item>
            </Col>
            <Col className="cancel-button-class" span={4} offset={10}>
              <Form.Item>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </Form.Item>
            </Col>
            <Col className="submit-button-class" span={4} offset={1}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col className="print-button-class" span={4} offset={1}>
              <Form.Item>
                <Button onClick={this.handleCancel}>Print</Button>
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </div>
    );
  }
}

const IncomeForms = Form.create({ name: "Income" })(IncomeForm);

const mapStateToProps = state => ({ ...state.Packet });

export default connect(mapStateToProps, {})(IncomeForms);
