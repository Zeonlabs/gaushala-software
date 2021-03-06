import React, { Component } from "react";
import {
  Form,
  DatePicker,
  Icon,
  Button,
  Row,
  Col,
  message,
  Table,
  Divider,
  Popconfirm
} from "antd";
import moment from "moment";
import {
  getIncomeAnimal,
  deleteIncomeAnimal,
  editIncomeAnimal,
  getFilterIncomeAnimal
} from "../../../Actions/Animal/IncomeAnimal";
import CreditAnimals from "../PopupForm/CreditAnimal";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import ReportPrint from "../../PrintTemplate/Report";
import { CreaditAnimalColumn } from "../../PrintTemplate/Report/Columns/CreaditAnimalColumn";

const { RangePicker } = DatePicker;

class CreditAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      sequence: 1,
      pagination: {
        page: 1,
        limit: 20
      },
      editData: "",
      income: false
    };
    this.columns = [
      {
        title: "k/ma",
        dataIndex: "_id",
        key: "1",
        width: 150,
        className: "",
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            <div>{this.state.data.findIndex(x => x._id === text) + 1}</div>
          ) : null
      },
      {
        title: "taarIKa",
        dataIndex: "date",
        key: "4",
        width: 200,
        className: "income-table-td-height table-font-english",
        render: (text, record) => (
          <div className="  english-font-input">
            {moment(text).format("DD-MM-YYYY")}
          </div>
        )
      },
      {
        title: "paSau",
        children: [
          {
            title: "gaaya",
            dataIndex: "animal[0].count",
            key: "gay",
            className: "table-font-english",
            render: text => <p>{text}</p>
          },
          {
            title: "baLad",
            dataIndex: "animal[1].count",
            key: "balad",
            className: "table-font-english"
          },
          {
            title: "vaaCrDa",
            dataIndex: "animal[2].count",
            key: "vacharda",
            className: "table-font-english"
          },
          {
            title: "vaaCrDI",
            dataIndex: "animal[3].count",
            key: "vachardi",
            className: "table-font-english"
          },
          {
            title: "Anya",
            dataIndex: "animal[4].count",
            key: "anny",
            className: "table-font-english"
          },
          {
            title: "kula",
            dataIndex: "total",
            key: "total",
            width: 120,
            className: "table-font-english"
          }
        ]
      },
      {
        title: "paSau mauknaar nau naama",
        dataIndex: "name",
        key: "name",
        width: 300,
        className: "",
        render: text => <p>{text}</p>
      },
      {
        title: "sarnaamau",
        dataIndex: "address",
        key: "address",
        width: 250,
        className: ""
      },
      {
        title: "maaobaa[la naMbar",
        dataIndex: "phone",
        key: "mono",
        width: 200,
        className: ""
      },
      {
        title: "AoDIT e DIlaIT",
        key: "action",
        width: 150,
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

  onChange = (dates, dateStrings) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    let value = {};
    if (dates.length > 1) {
      value = {
        dateFrom: moment(dates[0]).format("YYYY-MM-DD"),
        dateTo: moment(dates[1]).format("YYYY-MM-DD")
      };
    } else {
      value = {};
    }
    this.props.getFilterIncomeAnimal(value).then(res => {
      console.log("CreditAnimal -> onChange -> res", res);
      this.setState({
        data: res
      });
    });
  };

  handelEdit = (text, record) => {
    // console.log("this is a log in a handelEdit ->", text, record);
    this.setState({
      editData: record,
      income: true
    });
  };

  handleDelete = (key, record) => {
    console.log("Income -> handleDelete -> key, record", key, record);
    this.props.deleteIncomeAnimal(record._id).then(res => {
      this.props
        .getIncomeAnimal(this.state.pagination)
        .then(res => {
          console.log("res in a income model =->", res);
          this.setState({
            data: res.docs
          });
        })
        .catch(e => message.error(e));
    });
    // const dataSource = [...this.state.data];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handelSubmit = (id, data) => {
    console.log("CreditAnimal -> handelSubmit -> id, data", id, data);
    this.props.editIncomeAnimal(id, data).then(res => {
      this.handelClosePopUp();
      this.props.getIncomeAnimal(this.state.pagination).then(res => {
        console.log("res in a income model =->", res);
        this.setState({
          data: res.docs
        });
      });
    });
  };

  paginate = page => {
    this.setState(
      {
        pagination: {
          page,
          limit: 20
        }
      },
      () =>
        this.props.getIncomeAnimal(this.state.pagination).then(res => {
          console.log("this is a log in a  creadit animal api ->", res);
          this.setState({
            data: res.docs
          });
        })
    );
  };

  handelClosePopUp = () => {
    this.setState({
      income: !this.state.income
    });
  };

  componentDidMount = () => {
    console.log(
      "CreditAnimal -> componentDidMount -> this.props.incomeAnimalList",
      this.props.incomeAnimalList
    );
    if (this.props.incomeAnimalList.length > 0) {
      this.setState({
        data: this.props.incomeAnimalList
      });
    } else {
      this.props.getIncomeAnimal(this.state.pagination).then(res => {
        console.log("this is a log in a  creadit animal api ->", res);
        this.setState({
          data: res.docs
        });
      });
    }
  };

  handelback = () => {
    console.log("back", this.props);
    this.props.back();
  };

  render() {
    // console.log("TCL: CreditAnimal -> constructor -> props", this.props);

    return (
      <div>
        <Row className="main-header-row" gutter={[16, 16]}>
          <Col className="main-div-button-slim" span={1}>
            <Button
              icon="left"
              onClick={this.handelback}
              type="primary"
              size="default"
            ></Button>
          </Col>
          <Col span={23} style={{ textAlign: "center" }}>
            <h1>Aavaola paSauAao nau rPsTr</h1>
          </Col>
        </Row>

        <div className="filter-icon">
          <Icon type="filter" theme="filled" />
          <h3>fIlTr</h3>
        </div>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="taarIKa pasaMd krao:">
                <RangePicker
                  className="english-font-input"
                  ranges={{
                    Today: [moment(), moment()],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month")
                    ]
                  }}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div className="m-btn-gru">
                {/* ------------------------------Generat Button--------------------------------- */}
                {/* <Form.Item>
                  <Button
                    size="default"
                    type="primary"
                    htmlType="submit"
                    icon="snippets"
                  >
                    jnre3 rIpo3
                  </Button>
                </Form.Item> */}
                {/* ------------------------------Print button--------------------------- */}
                <ReactToPrint
                  trigger={() => (
                    <Form.Item>
                      <Button
                        size="default"
                        // htmlType="submit"
                        icon="printer"
                        style={{ backgroundColor: "#505D6F", color: "#ffffff" }}
                      >
                        {" "}
                        ipa`nT
                      </Button>
                    </Form.Item>
                  )}
                  content={() => this.componentRef}
                />
                <div style={{ display: "none" }}>
                  <ReportPrint
                    //---------------------------------------Change title of report from here----------------------------------------------------
                    name="Aavaola paSauAao nau rPsTr"
                    ref={el => (this.componentRef = el)}
                    data={this.state.data || []}
                    type="Expense"
                    column={CreaditAnimalColumn}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <CreditAnimals
          visible={this.state.income}
          toggleModel={this.handelClosePopUp}
          submit={this.handelSubmit}
          type="edit"
          data={this.state.editData}
        />
        <div className="table">
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            bordered
            pagination={{
              onChange: this.paginate,
              current: this.state.pagination.page,
              total: 20,
              pageSize: this.state.pagination.limit
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Animals
});

export default connect(mapStateToProps, {
  getIncomeAnimal,
  deleteIncomeAnimal,
  editIncomeAnimal,
  getFilterIncomeAnimal
})(CreditAnimal);
