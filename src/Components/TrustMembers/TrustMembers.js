import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button, message } from "antd";
import PageWrapper from "../Common/PageWrapper/PageWrapper";
import "./TrustMenbers.scss";
import Index from "./AddMember/Index";
import { FilterData } from "./FilterData";
import ListingTable from "./ListingTable";
import {
  getMembers,
  editMembers,
  addMembers,
  deleteMembers,
  filterMembers
} from "../../Actions/TrustMembers";
import ReactToPrint from "react-to-print";
import ReportPrint from "../PrintTemplate/Report";
import { TrustyColumns } from "../PrintTemplate/Report/Columns/TrustyColumn";

// function onChange(dates, dateStrings) {
//   console.log("From: ", dates[0], ", to: ", dates[1]);
//   console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
// }
export class TrustMembers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddPopup: false,
      // addPopup: false,
      data: "",
      pagination: {
        page: 1,
        limit: 20
      },
      editData: "",
      income: false,
      loading: true
    };
  }

  componentDidMount = () => {
    const pagination = {
      page: 1,
      limit: 20
    };
    if (this.props.trustMembers.length > 0) {
      this.setState({
        data: this.props.trustMembers,
        loading: false
      });
    } else {
      this.props
        .getMembers(pagination)
        .then(res => {
          console.log("Employees -> componentDidMount -> res", res);
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

  handelShowPopup = () => {
    this.setState({
      showAddPopup: !this.state.showAddPopup,
      income: false
    });
  };

  handelEdit = record => {
    this.setState({
      showAddPopup: !this.state.showAddPopup,
      editData: record,
      income: true
    });
  };

  loadingTrue = () => {
    this.setState({
      loading: true
    });
  };

  loadingFalse = () => {
    this.setState({
      loading: false
    });
  };

  handelDataAdd = data => {
    this.loadingTrue();
    console.log("Employees -> handelDataAdd -> data", data);
    if (localStorage.getItem("reversePin") === "205") {
      this.loadingFalse();
      this.handelShowPopup();
    } else {
      this.props.addMembers(data).then(res => {
        this.props
          .getMembers(this.state.pagination)
          .then(res => {
            this.setState({
              data: res.docs
            });
            this.loadingFalse();
            this.handelShowPopup();
          })
          .catch(e => this.loadingFalse());
      });
    }
  };

  handelAddEdit = (id, data) => {
    this.loadingTrue();
    console.log("TrustMembers -> handelAddEdit -> data", data);
    this.props.editMembers(id, data).then(res => {
      this.props
        .getMembers(this.state.pagination)
        .then(res => {
          this.setState({
            data: res.docs
          });
          this.loadingFalse();
          this.handelShowPopup();
        })
        .catch(e => this.loadingFalse());
    });
  };

  handelDelete = record => {
    this.loadingTrue();
    console.log("Income -> handleDelete -> key, record", record);
    this.props
      .deleteMembers(record._id)
      .then(res => {
        this.props
          .getMembers(this.state.pagination)
          .then(res => {
            console.log("res in a income model =->", res);
            this.setState({
              data: res.docs
            });
            this.loadingFalse();
          })
          .catch(e => this.loadingFalse());
      })
      .catch(e => this.loadingFalse());
  };

  handelFilter = value => {
    this.loadingTrue();
    console.log("Employees -> handelFilter -> value", value);
    const data = {
      position: value === "All" ? "" : value
    };
    this.props
      .filterMembers(data)
      .then(res => {
        console.log("Employees -> res", res);
        this.setState({
          data: res
        });
        this.loadingFalse();
      })
      .catch(e => this.loadingFalse());
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
        this.props
          .getMembers(this.state.pagination)
          .then(res => {
            console.log("Employees -> componentDidMount -> res", res);
            this.setState({
              data: res.docs
            });
            this.loadingFalse();
          })
          .catch(e => this.loadingFalse())
    );
  };

  render() {
    const { editData, income } = this.state;
    return (
      <PageWrapper title="saByaEaI naI yaadI">
        <Index
          openPopup={this.state.showAddPopup}
          handelEmployeePopup={this.handelShowPopup}
          handelEdit={this.handelAddEdit}
          submit={this.handelDataAdd}
          data={income ? editData : ""}
          type={income ? "edit" : "add"}
        />
        <div className="filter-icon">
          <Icon type="filter" theme="filled" />
          <h3>rIpaaoT fIlTr</h3>
        </div>

        <div className="filter-wrapper">
          <div className="filter-select-width">
            <FilterData onFilterChange={this.handelFilter} />
          </div>
          <div className="filter-button-member">
            <ReactToPrint
              trigger={() => (
                <Button
                  size="default"
                  htmlType="submit"
                  icon="printer"
                  style={{
                    backgroundColor: "#505D6F",
                    color: "#ffffff"
                  }}
                >
                  ipa`nT
                </Button>
              )}
              content={() => this.componentRef}
            />
            <div style={{ display: "none" }}>
              <ReportPrint
                //---------------------------------------Change title of report from here----------------------------------------------------
                name="saByaEaI naI yaadI"
                ref={el => (this.componentRef = el)}
                data={this.state.data || []}
                type="Expense"
                column={TrustyColumns}
              />
            </div>

            <Button
              className="button-right button-text-size"
              type="primary"
              icon="user-add"
              style={{ marginLeft: "20px" }}
              onClick={this.handelShowPopup}
              size="large"
            >
              saBya ]maorao
            </Button>
          </div>
        </div>
        <div className="listing-table-wrapper">
          <div className="table">
            <ListingTable
              data={this.state.data || []}
              // editUSer={this.handelEdit}
              editPopupOpen={this.handelEdit}
              delete={this.handelDelete}
              pagination={this.paginate}
              current={this.state.pagination.page}
              pageSize={this.state.pagination.limit}
              loading={this.state.loading}
            />
          </div>
        </div>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state.Test
});

export default connect(mapStateToProps, {
  getMembers,
  editMembers,
  addMembers,
  deleteMembers,
  filterMembers
})(TrustMembers);
