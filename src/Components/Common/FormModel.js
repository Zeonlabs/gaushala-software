import React, { Component } from "react";
import { Modal } from "antd";
import IncomeForms from "./IncomeForm";

export default class FormModel extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  render() {
    const { showModal, handleOk, handleCancel } = this.props;
    return (
      <div>
        <Modal
          visible={showModal}
          onOk={handleOk}
          maskClosable={false}
          onCancel={handleCancel}
          footer={false}
          // footer={[
          //   <Button key="back" onClick={handleCancel}>
          //     Return
          //   </Button>,
          //   <Button
          //     key="submit"
          //     type="primary"
          //     loading={loading}
          //     onClick={handleOk}
          //   >
          //     Submit
          //   </Button>
          // ]}
        >
          <IncomeForms />
        </Modal>
      </div>
    );
  }
}
