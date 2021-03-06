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
  deleteEmployee
} from "../../Actions/Employee";
import AddEmployee from "./AddEmployee/Index";
import { FilterData } from "./FilterData";
import ListingTable from "./ListingTable";
import axios from "axios";
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
        limit: 20
      },
      editData: "",
      income: false
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
      limit: 20
    };
    if (this.props.employeeListing.length > 0) {
      this.setState({
        data: this.props.employeeListing
      });
    } else {
      this.props.getEmployee(pagination).then(res => {
        console.log("Employees -> componentDidMount -> res", res);
        this.setState({
          data: res.docs
        });
      });
    }
  };

  onGutterChange = gutterKey => {
    this.setState({ gutterKey });
  };

  onVGutterChange = vgutterKey => {
    this.setState({ vgutterKey });
  };

  onColCountChange = colCountKey => {
    this.setState({ colCountKey });
  };

  handelEmployeePopup = () => {
    this.setState({
      addPopup: !this.state.addPopup,
      income: false,
      editData: ""
    });
  };

  handelDataAdd = data => {
    console.log("Employees -> handelDataAdd -> data", data);
    axios.post("http://localhost:8081/employee/add", data).then(res => {
      console.log("Employees -> res", res);
      this.props.getEmployee(this.state.pagination).then(res => {
        console.log("res in a income model =->", res);
        this.setState({
          data: res.docs
        });
      });
      this.handelEmployeePopup();
    });
  };

  handelDelete = record => {
    console.log("Income -> handleDelete -> key, record", record);
    this.props.deleteEmployee(record._id).then(res => {
      this.props
        .getEmployee(this.state.pagination)
        .then(res => {
          console.log("res in a income model =->", res);
          this.setState({
            data: res.docs
          });
        })
        .catch(e => message.error(e));
    });
  };

  handelEdit = record => {
    this.setState({
      addPopup: !this.state.addPopup,
      editData: record,
      income: true
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
        this.props.getEmployee(this.state.pagination).then(res => {
          console.log("Employees -> componentDidMount -> res", res);
          this.setState({
            data: res.docs
          });
        })
    );
  };

  handelFilter = value => {
    console.log("Employees -> handelFilter -> value", value);
    const data = {
      type: value === "No" ? "" : value
    };
    this.props.getEmployeeFilter(data).then(res => {
      console.log("Employees -> res", res);
      this.setState({
        data: res
      });
    });
  };

  handelEditSubmit = (id, data) => {
    console.log("Employees -> handelEditSubmit -> data", data);
    this.props.editEmployee(id, data).then(res => {
      this.props.getEmployee(this.state.pagination).then(res => {
        this.setState({
          data: res.docs
        });
        this.handelEmployeePopup();
      });
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
          />
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Animals
});

export default connect(mapStateToProps, {
  getEmployee,
  getEmployeeDocs,
  getEmployeeFilter,
  addEmployee,
  editEmployee,
  deleteEmployee
})(Employees);
