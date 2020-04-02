import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, Drawer, Select, DatePicker } from "antd";
import { getEmployeeDocs } from "../../Actions/Employee";
import "../Cheques/SideDrawer.scss";

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
    return (
        <Drawer
          visible={visible}
          width={540}
          placement="right"
          closable={false}
          onClose={onClose}
        >
          <div className="income-model-wrapper">
            <Row>
              <h2 className="form-titel ">caok fIlTr</h2>
            </Row>

            <div>
              <Form className="form-income" onSubmit={this.handleSubmit}>
                <Row
                  type="flex"
                  justify="space-between"
                  className="member-form-wrapper"
                >
                  {/* ------------------------------Date--------------------------------- */}
                  <Col span={24}></Col>

                  {/* -----------------------------cheque Num-------------------------------- */}
                  <Col className="gutter-row" span={24}></Col>
                </Row>

                <div className="m-btn-gru">
                  {/* ----------------------------Report Button------------------------------- */}
                  <Form.Item>
                    <Button
                      size="default"
                      type="primary"
                      htmlType="submit"
                      icon="snippets"
                    >
                      JnaroT rIpaaoT
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <p>{data.name}</p>
          <p>{data.phone}</p>
          <p>{data.address}</p>
          <p>{data.type}</p>
          {/* <img src={"data:image/jpeg;base64," + btoa(this.state.userDocs)} /> */}
        </Drawer>

    );
  }
}

export default connect(null, { getEmployeeDocs })(ProfileView);
