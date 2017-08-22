import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import {
  searchEldersListByUrl,
  selectElder,
  deselectElder,
  resetSelection,
  addEldersList
} from "../../actions";

class AddElder extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }
  onChange(id) {
    if (_.includes(this.props.select, id)) {
      this.props.deselectElder(id);
    } else {
      this.props.selectElder(id);
    }
  }

  renderList() {
    // console.log(elder);
    if (this.props.search == null) {
      return <div className="loader" />;
    }
    return _.map(this.props.search.results, elder => {
      const { elder_id } = elder;
      return (
        <li className="list-group-item" key={elder_id}>
          <label className="custom-control custom-checkbox">
            <input
              id={elder_id}
              type="checkbox"
              checked={_.includes(this.props.select, elder_id)}
              onChange={() => this.onChange(elder_id)}
              className="custom-control-input"
            />
            <span className="custom-control-indicator" />
            <h5 className="custom-control-description">
              {elder.first_name + "  " + elder.last_name + "  " + elder.phone}
            </h5>
          </label>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-9">
        <div className="card search-result">
          <div className="card-body">
            <h3 className="card-title">Result</h3>

            <button
              className="btn profile-btn"
              disabled={!this.props.select.length}
              onClick={() => this.props.addEldersList(this.props.select)}
            >
              Add To My List
            </button>
            <div className="float-right">
            <Link to="/checkin" >
              Return to Check In
            </Link><br/>
            <Link to="/profile"  >
              Return to Profile
            </Link>
            </div>
            <ul className="list-group-search">
              {this.renderList()}
            </ul>
            <div className="history-btn">
              <button
                className="btn history-prev-btn"
                disabled={!this.props.search.previous}
                onClick={() => {this.props.searchEldersListByUrl(this.props.search.previous)}}
              >
                Previous
              </button>
              <button
                className="btn history-nxt-btn"
                disabled={!this.props.search.next}
                onClick={() => {this.props.searchEldersListByUrl(this.props.search.next)}}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = state => {
  return {
    search: state.search,
    select: state.select
  };
};

export default connect(mapStatesToProps, {
  searchEldersListByUrl,
  addEldersList,
  selectElder,
  deselectElder,
  resetSelection
})(
  reduxForm({
    form: "addmylist"
  })(AddElder)
);
