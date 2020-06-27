import React, { Component } from "react";
import {
  DatePicker,
  Icon,
  Button,
  Row,
  Col,
  Table,
  Divider,
  Input,
  Popconfirm,
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import {
  getGivenAnimal,
  getFilterGivenAnimal,
  editGivenAnimal,
  deleteGivenAnimal,
} from "../../../Actions/Animal/GivenAnimal";
import { totalOfArray } from "../../../js/Helper";
import DebitAnimals from "../PopupForm/DebitAnimal";
import ReactToPrint from "react-to-print";
import ReportPrint from "../../PrintTemplate/Report";
import { GivenAnimalColumn } from "../../PrintTemplate/Report/Columns/GivenAnimalColumn";

const { RangePicker } = DatePicker;

class DebitAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      sequence: 1,
      pagination: {
        page: 1,
        limit: 20,
      },
      editData: "",
      income: false,
      total: 0,
      tagText: "",
      date: {},
      loading: true,
      totalPage: 0,
      filterPress: false,
    };
    this.columns = [
      {
        title: "k/ma",
        dataIndex: "_id",
        key: "1",
        width: 180,
        className: "",
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            <div>{this.state.data.findIndex((x) => x._id === text) + 1}</div>
          ) : null,
      },
      {
        title: "taarIKa",
        dataIndex: "date",
        key: "8",
        width: 200,
        className: "table-font-english",
        render: (text, record) => (
          <div className="  english-font-input">
            {moment(text).format("DD-MM-YYYY")}
          </div>
        ),
      },
      {
        title: "paSauAao",
        children: [
          {
            title: "gaaya",
            dataIndex: "animal[0].count",
            key: "gay",
            className: "table-font-english",
            render: (text) => <p>{text}</p>,
          },
          {
            title: "baLad",
            dataIndex: "animal[1].count",
            key: "balad",
            className: "table-font-english",
          },
          {
            title: "vaaCrDa",
            dataIndex: "animal[2].count",
            key: "vacharda",
            className: "table-font-english",
          },
          {
            title: "vaaCrDI",
            dataIndex: "animal[3].count",
            key: "vachardi",
            className: "table-font-english",
          },
          {
            title: "Anya",
            dataIndex: "animal[4].count",
            key: "anny",
            className: "table-font-english",
          },
          {
            title: "kula paSauAao",
            dataIndex: "animal",
            key: "total",
            className: "table-font-english",
            render: (text, record) => {
              const total = text.map((val) => parseInt(val.count, 10));
              const finalTotal = totalOfArray(total);
              return <div>{finalTotal}</div>;
            },
          },
        ],
      },
      {
        title: "Toga naMbar",
        dataIndex: "tag",
        key: "tag",
        width: 180,
        className: "table-font-english",
        // render: text => <p>{text}</p>
      },
      {
        title: "paSau laonaar nau naama",
        dataIndex: "name",
        key: "name",
        className: "",
        width: 300,
        render: (text) => <p>{text}</p>,
      },
      {
        title: "sarnaamau",
        dataIndex: "address",
        key: "address",
        width: 250,
        className: "",
      },
      {
        title: "maaobaa[la naM.",
        dataIndex: "phone",
        key: "mono",
        width: 200,
        className: "table-font-english",
      },
      {
        title: "AoDIT e DIlaIT",
        key: "action",
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
        ),
      },
    ];
  }

  componentDidMount = () => {
    // if (this.props.getAnimalList.length > 0) {
    //   this.setState({
    //     data: this.props.getAnimalList
    //   });
    // } else {
    this.props
      .getGivenAnimal(this.state.pagination)
      .then((res) => {
        this.setState({
          data: res.docs,
          loading: false,
          totalPage: res.totalDocs,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
      });
    // }
  };

  loadingTrue = () => {
    this.setState({
      loading: true,
    });
  };

  loadingFalse = () => {
    this.setState({
      loading: false,
    });
  };

  handelText = (e) => {
    this.setState({
      tagText: e.target.value,
    });
  };

  onChange = (dates, dateStrings) => {
    let value = {};
    if (dates.length > 1) {
      value = {
        dateFrom: moment(dates[0]).format("YYYY-MM-DD"),
        dateTo: moment(dates[1]).format("YYYY-MM-DD"),
      };
    } else {
      value = {};
    }
    this.setState({
      date: value,
    });
  };
  handelback = () => {
    this.props.back();
  };

  handelEdit = (text, record) => {
    const total = record.animal.map((val) => parseInt(val.count, 10));
    this.setState({
      editData: record,
      income: true,
      total: totalOfArray(total),
    });
  };

  handelClosePopUp = () => {
    this.setState({
      income: !this.state.income,
    });
  };

  handelSubmit = (id, data) => {
    this.loadingTrue();
    this.props
      .editGivenAnimal(id, data)
      .then((res) => {
        this.handelClosePopUp();
        this.props
          .getGivenAnimal(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              totalPage: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
      })
      .catch((e) => this.loadingFalse());
  };

  filterData = () => {
    this.loadingTrue();
    const data = {
      ...this.state.date,
      tag: this.state.tagText,
    };

    if (localStorage.getItem("reversePin") === "205") {
      this.loadingFalse();
    } else {
      console.log(
        "DebitAnimal -> filterData -> data",
        this.state.date,
        this.state.tagText
      );
      if (
        Object.keys(this.state.date).length === 0 &&
        this.state.tagText === ""
      ) {
        this.props
          .getGivenAnimal(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              filterPress: false,
              totalPage: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
      } else {
        this.props
          .getFilterGivenAnimal(data)
          .then((res) => {
            this.setState({
              data: res,
              filterPress: true,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
      }
    }
  };

  handleDelete = (key, record) => {
    this.loadingTrue();
    this.props
      .deleteGivenAnimal(record._id)
      .then((res) => {
        this.props
          .getGivenAnimal(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              totalPage: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
      })
      .catch((e) => this.loadingFalse());
  };

  paginate = (page) => {
    this.loadingTrue();
    this.setState(
      {
        pagination: {
          page,
          limit: 20,
        },
      },
      () =>
        this.props
          .getGivenAnimal(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              totalPage: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse())
    );
  };

  render() {
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
            <h1>Aapaola paSauAao nau rPsTr</h1>
          </Col>
        </Row>

        <div className="filter-icon">
          <Icon type="filter" theme="filled" />
          <h3>fIlTr</h3>
        </div>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <RangePicker
              className="english-font-input"
              ranges={{
                Today: [moment(), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
              }}
              onChange={this.onChange}
            />
          </Col>
          <Col span={8}>
            <Input
              className="english-font-input"
              placeholder="000000"
              onChange={this.handelText}
            />
          </Col>
          <Col span={8}>
            <div className="m-btn-gru">
              {/* ------------------------------Generat Button--------------------------------- */}
              <Button
                size="default"
                type="primary"
                onClick={this.filterData}
                icon="snippets"
              >
                JnaroT rIpaaoT
              </Button>
              {/* ------------------------------Print button--------------------------- */}
              <ReactToPrint
                trigger={() => (
                  <Button
                    size="default"
                    icon="printer"
                    style={{ backgroundColor: "#505D6F", color: "#ffffff" }}
                  >
                    {" "}
                    ipa`nT
                  </Button>
                )}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <ReportPrint
                  //---------------------------------------Change title of report from here----------------------------------------------------
                  name="Aapaola paSauAao nau rPsTr"
                  ref={(el) => (this.componentRef = el)}
                  data={this.state.data || []}
                  // type="Expense"
                  column={GivenAnimalColumn}
                />
              </div>
            </div>
          </Col>
        </Row>
        <DebitAnimals
          visible={this.state.income}
          toggleModel={this.handelClosePopUp}
          submit={this.handelSubmit}
          type="edit"
          data={this.state.editData}
          total={this.state.total}
        />
        <div className="table">
          <Table
            className="animal-table"
            loading={this.state.loading}
            columns={this.columns}
            pagination={
              this.state.filterPress
                ? false
                : {
                    onChange: this.paginate,
                    current: this.state.pagination.page,
                    total: this.state.totalPage,
                    pageSize: this.state.pagination.limit,
                  }
            }
            dataSource={this.state.data}
            bordered
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.Animals,
});

export default connect(mapStateToProps, {
  getGivenAnimal,
  getFilterGivenAnimal,
  editGivenAnimal,
  deleteGivenAnimal,
})(DebitAnimal);
