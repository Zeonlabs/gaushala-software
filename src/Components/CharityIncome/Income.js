import React, { Component } from "react";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import { Table, Button, Icon, Popconfirm, Divider, message } from "antd";
import "./Income.scss";
import "../Common/Forms/IncomeModels.styles.scss";
import FilterDrawer from "./FilterDrawer";
import { connect } from "react-redux";
import {
  getIncome,
  getFilterIncome,
  editIncome,
  deleteIncome
} from "../../Actions/Exapmple";
import moment from "moment";
import IncomeMobel from "../Common/Forms/IncomeMobel";
import { convertNumberToType } from "../../js/Helper";
import ReportPrint from "../PrintTemplate/Report";
import ReactToPrint from "react-to-print";
import { IncomeColumn } from "../PrintTemplate/Report/Columns/Income";
// import Loading from "../Loading/Loading";

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   });
// }

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      income: false,
      loading: true,
      data: [],
      editData: { money: { type: "cash" } },
      pagination: {
        page: 1,
        limit: 20
      }
    };
    this.columns = [
      {
        title: "taarIKa",
        width: "130px",
        dataIndex: "date",
        key: "1",
        // fixed: "left",
        render: (text, record) => {
          return (
            <div className="icon-group-table english-font-input">
              {moment(text).format("YYYY-MM-DD")}
            </div>
          );
        },
        className:
          "income-table-td-height table-font-english english-font-input"
      },
      {
        title: "pahaoMca naM.",
        width: 130,
        dataIndex: "slip_no",
        key: "2",
        className: "income-table-td-height table-font-english"
      },
      {
        title: "naama",
        dataIndex: "name",
        key: "3",
        width: 380,
        className: "income-table-td-height"
      },
      {
        title: "sarnaamau",
        dataIndex: "address",
        key: "address",
        width: 300
      },
      {
        title: "rkma",
        dataIndex: "money.amount",
        key: "4",
        width: 180,
        className: "table-font-english"
      },
      {
        title: "maaobaa[la naMbar ",
        dataIndex: "phone",
        key: "5",
        width: 180,
        className: "table-font-english"
      },
      {
        title: "Aavak naao pa`kar",
        dataIndex: "type",
        key: "6",
        width: 250,
        render: (text, record) => convertNumberToType(text, "income")
        // text.type === "cheque" ? (
        //   <span>{text.cheque_no}</span>
        // ) : (
        //   <span>raokD</span>
        // )
      },
      {
        title: "dana svaIkar",
        dataIndex: "money",
        key: "7",
        width: 130,
        render: (text, record) =>
          text.type === "cheque" ? <p>{text.cheque_no}</p> : <p>raokD</p>
      },
      {
        title: "hstak naama",
        dataIndex: "ref_name",
        key: "8",
        width: 280
      },
      // {
      //   title: "s>dex moklo",
      //   dataIndex: "Sms-status",
      //   key: "9",
      //   width: 100
      // },
      {
        title: "AoDIT e DIlaIT",
        fixed: "right",
        width: 200,
        dataIndex: "operation",
        render: (text, record) => (
          <>
            <div className="icon-group-table">
              <Icon
                type="edit"
                theme="filled"
                onClick={() => this.handelEdit(text, record)}
                style={{ color: "#3AD944" }}
              />

              <Divider type="vertical" />
              <Divider type="vertical" />
              <Popconfirm
                placement="top"
                title="Are you sure ?"
                onConfirm={() => this.handleDelete(text, record)}
                okText="Yes"
                cancelText="No"
              >
                <Icon
                  type="delete"
                  theme="filled"
                  // onClick={() => this.handleDelete(text, record)}
                  style={{ color: "rgba(255, 0, 0)" }}
                />
              </Popconfirm>
            </div>
          </>
        )
      }
    ];
  }

  handelEdit = (text, record) => {
    this.setState({
      editData: record,
      income: true
    });
  };

  componentDidMount = () => {
    const pagination = {
      page: 1,
      limit: 20
    };
    // console.log(
    //   "Income -> componentDidMount -> this.props.incomeList",
    //   this.props.incomeList
    // );
    // const id = this.props.match.params.pid;
    if (this.props.incomeList.length > 0) {
      this.setState({
        data: this.props.incomeList,
        loading: false
      });
    } else {
      this.props
        .getIncome(pagination)
        .then(res => {
          this.setState({
            data: res.docs,
            loading: false
          });
        })
        .catch(e => {
          this.setState({
            loading: false
          });
        });
    }
  };

  componentDidUpdate = prevPorps => {
    if (prevPorps.incomeList !== this.props.incomeList) {
      this.setState({
        data: this.props.incomeList
      });
    }
  };

  loadingTrue = () => {
    if (localStorage.getItem("reversePin") === "205") {
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        loading: true
      });
    }
  };

  loadingFalse = () => {
    this.setState({
      loading: false
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  paginate = page => {
    this.loadingTrue();
    this.setState(
      {
        pagination: {
          page,
          limit: 20
        }
      },
      () =>
        this.props.getIncome(this.state.pagination).then(res => {
          this.loadingFalse();
          this.setState({
            data: res.docs
          });
        })
    );
    // const id = this.props.match.params.pid;
  };

  handleDelete = (key, record) => {
    this.loadingTrue();
    this.props.deleteIncome(record._id).then(res => {
      this.props
        .getIncome(this.state.pagination)
        .then(res => {
          this.setState({
            data: res.docs
          });
          this.loadingFalse();
        })
        .catch(e => message.error(e));
    });
    // const dataSource = [...this.state.data];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handelFilterGet = data => {
    this.loadingTrue();
    if (localStorage.getItem("reversePin") === "205") {
      // this.loadingFalse();
    } else {
      this.props
        .getFilterIncome(data)
        .then(res => {
          this.setState({
            data: res
          });
          this.loadingFalse();
        })
        .catch(e => message.error(e));
    }
  };

  handelClosePopUp = () => {
    this.setState({
      income: !this.state.income
    });
  };

  handelSubmit = (id, data) => {
    this.loadingTrue();
    this.props.editIncome(id, data).then(res => {
      // this.props.toggleModel();
      this.handelClosePopUp();
      this.props.getIncome(this.state.pagination).then(res => {
        this.setState({
          data: res.docs
        });
        this.loadingFalse();
      });
    });
  };

  handelResetFilter = () => {
    const data = [];
    this.handelFilterGet(data);
  };

  render() {
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <PageWrapper title="Aavak rIpaaoT">
        <div className="row income-form-wrapper">
          <Button
            shape="squre"
            size="large"
            type="primary"
            onClick={this.showDrawer}
            style={{ marginBottom: 30, marginRight: 10, fontSize: "22px" }}
          >
            <Icon type="filter" theme="filled" style={{ fontSize: 22 }} />
            fIlTr
          </Button>

          <div style={{ display: "none" }}>
            <ReportPrint
              //---------------------------------------Change title of report from here----------------------------------------------------
              name="Aavak rIpaaoT"
              ref={el => (this.componentRef = el)}
              data={this.state.data || []}
              type="Expense"
              column={IncomeColumn}
            />
          </div>
          <Button
            shape="squre"
            size="large"
            type="primary"
            onClick={this.handelResetFilter}
            style={{ marginBottom: 30, marginRight: 10 }}
            // className="filter-button"
          >
            <Icon
              type="close"
              // onClick={this.handelResetFilter}
              style={{ fontSize: 17 }}
            />
            rIsaoT
          </Button>

          <ReactToPrint
            trigger={() => (
              <Button
                shape="squre"
                size="large"
                type="primary"
                // onClick={this.handelResetFilter}
                style={{
                  backgroundColor: "#505D6F",
                  marginRight: 10,
                  color: "#ffffff",
                  float: "right"
                }}
              >
                <Icon
                  type="printer"
                  theme="filled"
                  // onClick={this.handelResetFilter}
                />
                ipa`nT
              </Button>
            )}
            content={() => this.componentRef}
          />
        </div>
        <FilterDrawer
          onClose={this.onClose}
          visible={this.state.visible}
          submit={this.handelFilterGet}
          statusCode={localStorage.getItem("reversePin")}
        />
        <IncomeMobel
          visible={this.state.income}
          toggleModel={this.handelClosePopUp}
          type="income"
          modalType="edit"
          submit={this.handelSubmit}
          data={this.state.editData}
          cash={this.state.editData.money.type}
        />
        <div className="">
          {/* <div>
            {/* {this.state.loading ? <Loading type="spinningBubbles" /> : ""} 
            <Loading type="spinningBubbles" />
          </div> */}
          <Table
            className="table-income table-income-expense"
            columns={columns}
            loading={this.state.loading}
            dataSource={this.state.data || []}
            pagination={{
              onChange: this.paginate,
              current: this.state.pagination.page,
              total: 20,
              pageSize: this.state.pagination.limit
            }}
            bordered
            size="middle"
            scroll={{ x: "calc(700px + 40%)" }}
            // scroll={{ x: "calc(700px + 40%)", y: 300 }}
          />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Test
});

export default connect(mapStateToProps, {
  getIncome,
  editIncome,
  deleteIncome,
  getFilterIncome
})(Income);
