import React, { Component } from "react";
import { connect } from "react-redux";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import moment from "moment";
import "./Cheque.scss";
import { Button, Icon, message } from "antd";
import {
  getCheque,
  editCheque,
  deleteCheque,
  addCheque,
  filterCheque
} from "../../Actions/Cheque";
import Index from "./AddCheque/Index";
import ListingTable from "./ListingTable";
import FilterDatas from "./FilterData";
import { useFlexLayout } from "react-table";
import ReactToPrint from "react-to-print";
import ReportPrint from "../PrintTemplate/Report";
import { ChequeColumn } from "../PrintTemplate/Report/Columns/ChequeColumn";

export class Cheques extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openPopup: false,
      showFilter: false,
      data: "",
      pagination: {
        page: 1,
        limit: 20
      },
      editData: "",
      income: false
    };
  }

  handelPopup = () => {
    this.setState({
      openPopup: !this.state.openPopup,
      editData: ""
    });
  };

  handelFilterShow = () => {
    this.setState({
      showFilter: !this.state.showFilter
    });
  };

  componentDidMount = () => {
    const pagination = {
      page: 1,
      limit: 20
    };
    if (this.props.chequeList.length > 0) {
      this.setState({
        data: this.props.chequeList
      });
    } else {
      this.props.getCheque(pagination).then(res => {
        console.log("Employees -> componentDidMount -> res", res);
        this.setState({
          data: res.docs
        });
      });
    }
  };

  handelShowPopup = () => {
    this.setState({
      openPopup: !this.state.openPopup,
      income: !this.state.income
    });
  };

  handelEdit = record => {
    this.setState({
      openPopup: !this.state.openPopup,
      editData: record,
      income: true
    });
  };

  handelDataAdd = data => {
    console.log("Employees -> handelDataAdd -> data", data);
    this.props.addCheque(data).then(res => {
      this.props.getCheque(this.state.pagination).then(res => {
        this.setState({
          data: res.docs
        });
        this.handelShowPopup();
      });
    });
  };

  handelAddEdit = (id, data) => {
    console.log("TrustMembers -> handelAddEdit -> data", id, data);
    this.props.editCheque(id, data).then(res => {
      this.props.getCheque(this.state.pagination).then(res => {
        this.setState({
          data: res.docs
          // income: false
        });
        this.handelShowPopup();
      });
    });
  };

  handelDelete = record => {
    console.log("Income -> handleDelete -> key, record", record);
    this.props.deleteCheque(record._id).then(res => {
      this.props
        .getCheque(this.state.pagination)
        .then(res => {
          console.log("res in a income model =->", res);
          this.setState({
            data: res.docs
          });
        })
        .catch(e => message.error(e));
    });
  };

  handelFilter = data => {
    console.log("Income -> handelFilterGet -> data", data);
    this.props
      .filterCheque(data)
      .then(res => {
        console.log("res in a income model =->", res);
        this.setState({
          data: res
        });
      })
      .catch(e => message.error(e));
  };

  handelResetFilter = () => {
    const data = {};
    this.handelFilter(data);
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
        this.props.getCheque(this.state.pagination).then(res => {
          console.log("Employees -> componentDidMount -> res", res);
          this.setState({
            data: res.docs
          });
        })
    );
  };

  render() {
    const { income, editData } = this.state;
    return (
      <PageWrapper title="caok pa`InT">
        <Index
          openPopup={this.state.openPopup}
          handelEmployeePopup={this.handelShowPopup}
          handelEdit={this.handelAddEdit}
          submit={this.handelDataAdd}
          data={income ? editData : ""}
          type={income ? "edit" : "add"}
        />
        <div className="row income-form-wrapper display-flex">
          <Button
            shape="squre"
            size="large"
            type="primary"
            onClick={this.handelFilterShow}
            style={{ marginBottom: 30, marginRight: 20, fontSize: "22px" }}
          >
            <Icon type="filter" theme="filled" style={{ fontSize: 22 }} />
            fIlTr
          </Button>
          <Button
            shape="squre"
            size="large"
            type="primary"
            onClick={this.handelResetFilter}
            style={{ marginBottom: 30 }}
          >
            <Icon type="close" style={{ fontSize: 17 }} />
            rIsaoT
          </Button>

          <Button
            className="button-text-size"
            type="primary"
            icon="file-add"
            style={{
              backgroundColor: "#505D6F",
              color: "#ffffff",
              marginLeft: 20,
              float: "right"
            }}
            size="large"
            onClick={this.handelPopup}
          >
            nyau caok
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                className="button-text-size"
                type="primary"
                icon="printer"
                style={{
                  backgroundColor: "#505D6F",
                  color: "#ffffff",
                  marginLeft: 20,
                  float: "right"
                }}
                size="large"
                // onClick={this.handelPopup}
              >
                ipa`nT rIpaaoT
              </Button>
            )}
            content={() => this.componentRef}
          />
          <div style={{ display: "none" }}>
            <ReportPrint
              //---------------------------------------Change title of report from here----------------------------------------------------
              name="Aavak rIpaaoT"
              ref={el => (this.componentRef = el)}
              data={this.state.data || []}
              type="Expense"
              column={ChequeColumn}
            />
          </div>

          <FilterDatas
            visible={this.state.showFilter}
            onClose={this.handelFilterShow}
            submit={this.handelFilter}
          />
        </div>
        <div className="table">
          <ListingTable
            data={this.state.data || []}
            // editUSer={this.handelEdit}
            editPopupOpen={this.handelEdit}
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
  ...state.Test
});

export default connect(mapStateToProps, {
  getCheque,
  editCheque,
  deleteCheque,
  addCheque,
  filterCheque
})(Cheques);
