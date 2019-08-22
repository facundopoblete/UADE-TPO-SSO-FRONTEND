import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "../../redux/actions/usersActions";
import SelectInput from "../common/SelectInput";

const DEFAULT_STATE = {
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    this.props.actions.getUser(this.props.match.params.id);
  }

  handleAddUser = () => {
  };

  resetState = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-normal">
              User {this.props.match.params.id}
            </h1>
          </div>
        </div>
        <form>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
