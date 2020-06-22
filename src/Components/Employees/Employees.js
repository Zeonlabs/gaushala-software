import React, { Component } from "react";
import { connect } from "react-redux";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import "./Employees.scss";
// import moment from "moment";
import { Icon, Button, Row, Col, message } from "antd";
import {
  getEmployee,
  getEmployeeDocs,
  getEmployeeFilter,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../../Actions/Employee";
import AddEmployee from "./AddEmployee/Index";
import { FilterData } from "./FilterData";
import ListingTable from "./ListingTable";
import axios from "axios";
import { baseUrl } from "../../js/Helper";
export class Employees extends Component {
  gutters = {};

  vgutters = {};

  colCounts = {};

  constructor(props) {
    super(props);

    this.state = {
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
      addPopup: false,
      data: "",
      pagination: {
        page: 1,
        limit: 10,
      },
      editData: "",
      income: false,
      loading: true,
      total: 0,
      filterPress: false,
    };

    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      this.colCounts[i] = value;
    });
  }

  componentDidMount = () => {
    const pagination = {
      page: 1,
      limit: 10,
    };
    if (this.props.employeeListing.length > 0) {
      this.setState({
        data: this.props.employeeListing,
        loading: false,
        total: this.props.employeeTotal.totalDocs,
        pagination: {
          page: this.props.employeeTotal.page,
          limit: this.props.employeeTotal.limit,
        },
      });
    } else {
      this.props
        .getEmployee(pagination)
        .then((res) => {
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

  onGutterChange = (gutterKey) => {
    this.setState({ gutterKey });
  };

  onVGutterChange = (vgutterKey) => {
    this.setState({ vgutterKey });
  };

  onColCountChange = (colCountKey) => {
    this.setState({ colCountKey });
  };

  handelEmployeePopup = () => {
    this.setState({
      addPopup: !this.state.addPopup,
      income: false,
      editData: "",
    });
  };

  handelDataAdd = (data) => {
    this.loadingTrue();
    if (localStorage.getItem("reversePin") === "205") {
      this.loadingFalse();
      this.handelEmployeePopup();
    } else {
      axios
        .post(`${baseUrl}/employee/add`, data)
        .then((res) => {
          this.props.getEmployee(this.state.pagination).then((res) => {
            this.setState({
              data: res.docs,
              total: res.totalDocs,
              pagination: {
                page: res.page,
                limit: res.limit,
              },
            });
            this.loadingFalse();
          });
          this.handelEmployeePopup();
        })
        .catch((e) => {
          message.error(e.message);
          this.loadingFalse();
          this.handelEmployeePopup();
        });
    }
  };

  handelDelete = (record) => {
    this.loadingTrue();
    this.props
      .deleteEmployee(record._id)
      .then((res) => {
        this.props
          .getEmployee(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              total: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
      })
      .catch((e) => this.loadingFalse());
  };

  handelEdit = (record) => {
    this.setState({
      addPopup: !this.state.addPopup,
      editData: record,
      income: true,
    });
  };

  paginate = (page) => {
    this.loadingTrue();
    this.setState(
      {
        pagination: {
          page,
          limit: 10,
        },
      },
      () =>
        this.props
          .getEmployee(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              total: res.totalDocs,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse())
    );
  };

  handelFilter = (value) => {
    this.loadingTrue();
    const data = {
      type: value === "No" ? "" : value,
    };
    value === "No"
      ? this.props
          .getEmployee(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              total: res.totalDocs,
              filterPress: false,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse())
      : this.props
          .getEmployeeFilter(data)
          .then((res) => {
            this.setState({
              data: res,
              filterPress: true,
            });
            this.loadingFalse();
          })
          .catch((e) => this.loadingFalse());
  };

  handelEditSubmit = (id, data) => {
    this.loadingTrue();
    this.props
      .editEmployee(id, data)
      .then((res) => {
        this.props
          .getEmployee(this.state.pagination)
          .then((res) => {
            this.setState({
              data: res.docs,
              total: res.totalDocs,
            });
            this.loadingFalse();
            this.handelEmployeePopup();
          })
          .catch((e) => {
            this.loadingFalse();
            this.handelEmployeePopup();
          });
      })
      .catch((e) => {
        this.handelEmployeePopup();
        this.loadingFalse();
      });
  };

  render() {
    const { editData, income } = this.state;

    return (
      <PageWrapper title="k-macaarI naI yaadI">
        <AddEmployee
          handelEmployeePopup={this.handelEmployeePopup}
          submit={this.handelDataAdd}
          handelEditData={this.handelEditSubmit}
          openPopup={this.state.addPopup}
          data={income ? editData : ""}
          type={income ? "edit" : "add"}
        />

        <div className="filter-icon">
          <Icon type="filter" theme="filled" />
          <h3>rIpaaoT fIlTr</h3>
        </div>
        {/* ------------------------------------ Header Epmloyees------------------------------- */}
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <div>
              <FilterData
                onFilterChange={this.handelFilter}
                data={this.state.data || []}
              />
            </div>
          </Col>

          {/* ----------------------------------Add Employees Button---------------------------- */}
          <Col className="button-add-members" span={4}>
            <Button
              className="button-right button-text-size"
              type="primary"
              icon="user-add"
              style={{ marginRight: 20 }}
              size="large"
              onClick={this.handelEmployeePopup}
            >
              ]maorao
            </Button>
          </Col>
        </Row>
        <div className="table">
          <ListingTable
            data={this.state.data || []}
            editUSer={this.handelEdit}
            delete={this.handelDelete}
            pagination={this.paginate}
            current={this.state.pagination.page}
            pageSize={this.state.pagination.limit}
            loading={this.state.loading}
            total={this.state.total}
            filterPress={this.state.filterPress}
          />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.Animals,
});

export default connect(mapStateToProps, {
  getEmployee,
  getEmployeeDocs,
  getEmployeeFilter,
  addEmployee,
  editEmployee,
  deleteEmployee,
})(Employees);
