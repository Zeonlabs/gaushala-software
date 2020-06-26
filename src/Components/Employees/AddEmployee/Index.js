import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Upload,
  Row,
  Col,
  Select,
  Modal,
  message,
} from "antd";
import NumericInput from "../../Common/Forms/InputNumber";
const { Option } = Select;

// const props = {
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   listType: 'picture',
//   // defaultFileList: [...fileList],
// };

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileData: {},
      fileList: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.type === "edit") {
          this.props.handelEditData(this.props.data._id, values);
        } else {
          const formData = new FormData();
          formData.append("doc", this.state.fileData);
          formData.append("name", values.name);
          formData.append("type", values.type);
          formData.append("phone", values.phone);
          formData.append("address", values.address);
          // const filedata = Object.assign({}, values, formData);
          this.props.submit(formData);
        }
        this.props.form.resetFields();
        this.setState({
          fileList: [],
        });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.handelEmployeePopup();
    this.setState({
      fileList: [],
    });
  };

  documentsUpload = (file) => {
    this.setState({
      fileData: file,
    });
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M && true;
    // return ;
    // const formData = new FormData();
    // formData["import_file"] = file;
  };

  handleChange = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    if (this.props.type === "edit") {
    } else {
    }
    const props2 = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      listType: "picture",
      // defaultFileList: [...fileList],

      className: "upload-list-inline",
      defaultFileList: [],
      onChange: this.handleChange,
    };
    const { getFieldDecorator } = this.props.form;
    const { type, data } = this.props;
    return (
      <div>
        <Modal
          centered
          maskClosable={false}
          visible={this.props.openPopup}
          footer={null}
          // onOk={this.handelData}
          onCancel={this.handleReset}
        >
          <div className="income-model-wrapper">
            <h2 className="form-titel">navaao k-macaarI ]maorao</h2>
            <Form className="form-income" onSubmit={this.handleSubmit}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item
                    className=""
                    label="k-macaarI naao pa`kar"
                    hasFeedback
                  >
                    {/* ------------------------------Post type--------------------------------- */}

                    {getFieldDecorator("type", {
                      rules: [{ required: true }],
                      // initialValue: type && data.type
                      initialValue: type === "edit" ? data.type : "",
                    })(
                      <Select
                        className="in-icon-arrow"
                        placeholder="k-macaarI naao pa`kar pasaMd"
                      >
                        <Option value="vaaDI naa majur">vaaDI naa majur</Option>
                        <Option value="gaaOSaaLaa naa majur">
                          gaaOSaaLaa naa majur
                        </Option>
                        <Option value="DaokTr">DaokTr</Option>
                        <Option value="maohtaaP">maohtaaP</Option>
                        <Option value="Anya">Anya</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={16}>
                  {/* -----------------------------Name of Employees-------------------------------- */}
                  <Form.Item className="ant-col" label="naama">
                    {getFieldDecorator("name", {
                      rules: [{ required: true, message: "Enter The Name" }],
                      // initialValue: type && data.name
                      initialValue: type === "edit" ? data.name : "",
                    })(<Input placeholder="naama" />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  {/* ------------------------------phone No--------------------------------- */}
                  <Form.Item label="maaobaa[la naMbar">
                    {getFieldDecorator("phone", {
                      rules: [
                        { required: true, message: "Enter The Mobile Number!" },
                      ],
                      // initialValue: type && data.phone
                      initialValue: type === "edit" ? data.phone : "",
                    })(
                      <NumericInput
                        className="gujarati-font"
                        value={this.state.value}
                        onChange={this.onChange}
                      />
                      // <InputNumber
                      //   type="number"
                      //   className=""
                      //   max={10}
                      //   placeholder="maaobaa[la naMbar"
                      // />
                    )}
                  </Form.Item>
                </Col>
                <Col span={16}>
                  {/* -----------------------------Address of Employees-------------------------------- */}
                  <Form.Item className="ant-col" label="sarnaamau">
                    {getFieldDecorator("address", {
                      rules: [
                        { required: true, message: "Enter The Address!" },
                      ],
                      // initialValue: type && data.address
                      initialValue: type === "edit" ? data.address : "",
                    })(<Input placeholder="sarnaamau" />)}
                  </Form.Item>
                </Col>
              </Row>

              {/* -------------------------------Upload Button--------------------------------------- */}
              {type === "edit" ? (
                ""
              ) : (
                <Row>
                  <Form.Item label="ApalaaoD Aa.[DI ka-D:" extra="">
                    {getFieldDecorator("file", {
                      rules: [{ required: true, message: "add id" }],
                    })(
                      <Upload
                        {...props2}
                        beforeUpload={(file) => this.documentsUpload(file)}
                        fileList={this.state.fileList}
                      >
                        <Button type="primary">
                          <Icon type="file-add" /> ApalaaoD
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </Row>
              )}
              <div className="m-btn-gru">
                {/* ----------------------------Cancel Button------------------------------- */}
                <Form.Item>
                  <Button size="default" onClick={this.handleReset}>
                    rd
                  </Button>
                </Form.Item>
                {/* ------------------------------Save Button--------------------------------- */}
                <Form.Item>
                  <Button size="default" type="primary" htmlType="submit">
                    saova
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

const AddEmployee = Form.create({ name: "normal_login" })(Index);
export default AddEmployee;
