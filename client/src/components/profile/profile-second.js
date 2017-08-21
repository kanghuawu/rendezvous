import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { fetchMyEldersList, deleteMyEldersList } from "../../actions";

class ProfileSecond extends Component {
  constructor(props) {
    super(props);
    this.renderMyElderList = this.renderMyElderList.bind(this);
  }
  componentWillMount() {
    this.props.fetchMyEldersList();
  }

  renderMyElderList() {
    return _.map(this.props.myelder, elder => {
      return (
        <tr key={elder.match_id}>
          <td>
            {elder.elder_fullname}
          </td>
          <td>
            {elder.elder_phone}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => this.props.deleteMyEldersList(elder.match_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.myelder == null) {
      return <div className="loader" />;
    }

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title history-detail">My Elder List</h3>
            <table className="table table-hover history-detail">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.renderMyElderList()}
              </tbody>
            </table>
            <div className="list-group">
              Could not find your elder?
              <Link to="/addelder">Add an Elder</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myelder: state.myelder
  };
};

export default connect(mapStateToProps, {
  fetchMyEldersList,
  deleteMyEldersList
})(ProfileSecond);
