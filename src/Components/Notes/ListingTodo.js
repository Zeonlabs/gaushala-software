import React, { Component } from "react";
import "./Notes.scss";
import CardNotes from "./CardNotes.js";

class ListingTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="card-note">
        {this.props.data.map(value => (
          <CardNotes
            data={value}
            handelSubmit={this.props.showDrawer}
            handelDelete={this.props.handelDelete}
          />
        ))}
      </div>
    );
  }
}

export default ListingTodo;
