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
  deleteIncome,
  storeSum,
} from "../../Actions/Exapmple";
import moment from "moment";
import IncomeMobel from "../Common/Forms/IncomeMobel";
import { convertNumberToType } from "../../js/Helper";
import ReportPrint from "../PrintTemplate/Report";
import ReactToPrint from "react-to-print";
import { IncomeColumn } from "../PrintTemplate/Report/Columns/Income";
import { ArraySum } from "../Common/CommonCalculation";
import IncomePrintSlip from "../PrintTemplate";
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
      editClick: false,
      data: [],
      allData: [],
      editData: { money: { type: "cash" } },
      pagination: {
        page: 1,
        limit: 13,
      },
      total: 0,
      filterTotal: 0,
      filterPress: false,
      printData: {
        data: {
          slip_no: 2120,
          name: "dsfsd",
          date: "23-5-2020",
          address: "dsfsdfafasdf",
          cheque_no: "234234",
          phone: "ewrwerwe",
          ref_name: "dsfdsf",
        },
        itemData: "",
        finalTotal: 444440,
      },
      printstatus: true,
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
          "income-table-td-height table-font-english english-font-input",
      },
      {
        title: "pahaoMca naM.",
        width: 130,
        dataIndex: "slip_no",
        key: "2",
        className: "income-table-td-height table-font-english",
      },
      {
        title: "naama",
        dataIndex: "name",
        key: "3",
        width: 380,
        className: "income-table-td-height",
      },
      {
        title: "sarnaamau",
        dataIndex: "address",
        key: "address",
        width: 300,
      },
      {
        title: "rkma",
        dataIndex: "money.amount",
        key: "4",
        width: 180,
        className: "table-font-english",
      },
      {
        title: "maaobaa[la naMbar ",
        dataIndex: "phone",
        key: "5",
        width: 180,
        className: "table-font-english",
      },
      {
        title: "Aavak naao pa`kar",
        dataIndex: "type",
        key: "6",
        width: 250,
        render: (text, record) => convertNumberToType(text, "income"),
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
          text.type === "cheque" ? <p>{text.cheque_no}</p> : <p>raokD</p>,
      },
      {
        title: "hstak naama",
        dataIndex: "ref_name",
        key: "8",
        width: 280,
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
              <Divider type="vertical" />
              <Divider type="vertical" />
              <span onClick={() => this.handelPrint(text, record)}>
                <ReactToPrint
                  trigger={() => (
                    <Icon
                      type="printer"
                      theme="filled"
                      // onClick={() => this.handelPrint(text, record)}
                      style={{ color: "#727070cf" }}
                    />
                  )}
                  content={() => this.printsingledata}
                  onAfterPrint={this.printIncomeSlip}
                />
              </span>
            </div>
          </>
        ),
      },
    ];
  }

  printIncomeSlip = () => {
    // this.setState({
    //   printstatus: false,
    // });
  };

  handelEdit = (text, record) => {
    this.setState({
      editData: record,
      income: true,

      editClick: true,
    });
  };

  componentDidMount = () => {
    const pagination = {
      page: 1,
      limit: 13,
    };

    // const id = this.props.match.params.pid;
    if (this.props.incomeList.length > 0) {
      this.setState({
        data: this.props.incomeList,
        filterTotal: this.props.sumTotal,
        loading: false,
        total: this.props.incomeTotal.totalDocs,
        pagination: {
          page: this.props.incomeTotal.page,
          limit: this.props.incomeTotal.limit,
        },
      });
    } else {
      this.props
        .getFilterIncome()
        .then((res) => {
          this.props.storeSum(ArraySum(res));
          this.setState({
            filterTotal: ArraySum(res),
          });
          if (!this.state.filterPress) {
            this.setState({
              allData: res,
            });
          }
        })
        .catch((e) => {
          this.setState({
            filterTotal: 0,
          });
        });
      this.props
        .getIncome(pagination)
        .then((res) => {
          // console.log("Income -> componentDidMount -> res", res);
          this.setState({
            data: res.docs,
            loading: false,
            total: res.totalDocs,
          });
        })
        .catch((e) => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  componentDidUpdate = (prevPorps) => {
    if (prevPorps.incomeList !== this.props.incomeList) {
      this.setState({
        data: this.props.incomeList,
      });
    }

    if (prevPorps.sumTotal !== this.props.sumTotal) {
      this.setState({
        filterTotal: this.props.sumTotal,
      });
    }

    if (prevPorps.incomeTotal !== this.props.incomeTotal) {
      this.setState({
        pagination: {
          page: this.props.incomeTotal.page,
          limit: this.props.incomeTotal.limit,
        },
      });
    }
  };

  loadingTrue = () => {
    if (localStorage.getItem("reversePin") === "205") {
      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        loading: true,
      });
    }
  };

  loadingFalse = () => {
    this.setState({
      loading: false,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handelPrint = (index, data) => {
    console.log("log in a printer", index, data);
    this.setState({
      printstatus: true,
      // printData: data,
    });
  };

  paginate = (page) => {
    this.loadingTrue();
    this.setState(
      {
        pagination: {
          page,
          limit: 13,
        },
      },
      () =>
        this.props.getIncome(this.state.pagination).then((res) => {
          this.loadingFalse();
          this.setState({
            data: res.docs,
            total: res.totalDocs,
          });
        })
    );
    // const id = this.props.match.params.pid;
  };

  handleDelete = (key, record) => {
    this.loadingTrue();
    this.props.deleteIncome(record._id).then((res) => {
      this.props
        .getIncome(this.state.pagination)
        .then((res) => {
          this.props
            .getFilterIncome()
            .then((res) => {
              this.props.storeSum(ArraySum(res));
              this.setState({
                filterTotal: ArraySum(res),
              });
            })
            .catch((e) => {
              this.setState({
                filterTotal: 0,
              });
            });
          this.setState({
            data: res.docs,
            total: res.totalDocs,
          });
          this.loadingFalse();
        })
        .catch((e) => message.error(e));
    });
    // const dataSource = [...this.state.data];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handelFilterGet = (data) => {
    this.loadingTrue();
    if (localStorage.getItem("reversePin") === "205") {
      this.loadingFalse();
    } else {
      this.props
        .getFilterIncome(data)
        .then((res) => {
          this.props.storeSum(ArraySum(res));
          this.setState({
            data: res,
            filterTotal: ArraySum(res),
            filterPress: true,
            // total: res.totalDocs
          });
          this.loadingFalse();
        })
        .catch((e) => message.error(e));
    }
  };

  handelClosePopUp = () => {
    // console.log(" -> handelClosePopUp -> data", data);
    this.setState({
      income: !this.state.income,
      editClick: !this.state.editClick,
    });
  };

  handelSubmit = (id, data) => {
    // console.log("Income -> handelSubmit -> data", data);
    this.loadingTrue();
    this.props.editIncome(id, data).then((res) => {
      // this.props.toggleModel();
      this.handelClosePopUp();
      this.props
        .getFilterIncome()
        .then((res) => {
          this.props.storeSum(ArraySum(res));
          this.setState({
            filterTotal: ArraySum(res),
          });
        })
        .catch((e) => {
          this.setState({
            filterTotal: 0,
          });
        });
      this.props.getIncome(this.state.pagination).then((res) => {
        this.setState({
          data: res.docs,
          total: res.totalDocs,
          filterPress: false,
        });

        this.loadingFalse();
      });
    });
  };

  handelAddPagination = (value) => {
    // console.log("Income -> handelAddPagination -> value", value);
    this.setState({
      data: value.docs,
      total: value.totalDocs,
    });
  };

  handelResetFilter = () => {
    this.loadingTrue();
    this.props
      .getFilterIncome()
      .then((res) => {
        this.props.storeSum(ArraySum(res));
        this.setState({
          filterTotal: ArraySum(res),
        });
      })
      .catch((e) => {
        this.setState({
          filterTotal: 0,
        });
      });
    this.props.getIncome(this.state.pagination).then((res) => {
      this.setState({
        data: res.docs,
        total: res.totalDocs,
        filterPress: false,
      });
      this.loadingFalse();
    });
  };

  render() {
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <PageWrapper title="Aavak rIpaaoT">
        <div className="row income-form-wrapper">
          <Button
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
              ref={(el) => (this.componentRef = el)}
              data={
                !this.state.filterPress
                  ? this.state.allData
                  : this.state.data || []
              }
              type="Expense"
              column={IncomeColumn}
              total={this.state.filterTotal}
            />
          </div>
          <Button
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
          <h1 style={{ padding: "5px" }}>TaoTla : {this.state.filterTotal}</h1>

          <ReactToPrint
            trigger={() => (
              <Button
                size="large"
                type="primary"
                // onClick={this.handelResetFilter}
                style={{
                  backgroundColor: "#505D6F",
                  marginRight: 10,
                  color: "#ffffff",
                  float: "right",
                  position: "absolute",
                  right: "28px",
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
          // handelAddPagination={this.handelAddPagination}
          editClick={this.state.editClick}
          cash={this.state.editData.money.type}
        />
        <div className="">
          {/* <div>
            {/* {this.state.loading ? <Loading type="spinningBubbles" /> : ""} 
            <Loading type="spinningBubbles" />
          </div> */}
          {/* {console.log("log nujikili -> ", this.state.data)} */}
          <Table
            className="table-income overflow-hidden table-income-expense"
            columns={columns}
            loading={this.state.loading}
            dataSource={this.state.data || []}
            pagination={
              this.state.filterPress
                ? false
                : {
                    onChange: this.paginate,
                    current: this.state.pagination.page,
                    total: this.state.total,
                    pageSize: this.state.pagination.limit,
                  }
            }
            bordered
            size="middle"
            scroll={{ x: "calc(700px + 40%)" }}
            // scroll={{ x: "calc(700px + 40%)", y: 300 }}
          />
          <div style={{ display: "none" }}>
            <IncomePrintSlip
              ref={(el) => (this.printsingledata = el)}
              data={this.state.printData}
            />
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.Test,
});

export default connect(mapStateToProps, {
  getIncome,
  editIncome,
  deleteIncome,
  getFilterIncome,
  storeSum,
})(Income);
