import React, { Component } from "react";
import { Collapse, Button, CardBlock, Card } from "reactstrap";

import * as actions from "../../actions";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <a
          key={this.props.activity_id}
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <h5>
            {this.props.date + "  " + this.props.elder_fullname}
          </h5>
        </a>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBlock>
              <p>
                {"Type: " + this.props.activity_name}
                <br />
                {"Duration: " + this.props.duration + " hour(s)"}
                <br />
                {"Status: " + this.props.status}
                <br />
                {this.props.notes && "Note: " + this.props.notes}
              </p>
            </CardBlock>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default HistoryDetail;
