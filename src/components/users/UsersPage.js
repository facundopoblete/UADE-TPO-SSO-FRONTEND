import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "../../redux/actions/usersActions";
import { NavLink } from "react-router-dom";

const DEFAULT_STATE = { newNumero: "", newEstado: "", newFecha: new Date() };

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  resetState() {
    this.setState(DEFAULT_STATE);
  }

  componentDidMount() {
    this.props.actions.getUsers();
  }

  deleteUser = user => {
    this.props.actions.deleteUser(user);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div>
          <button
            type="button"
            onClick={this.createPedido}
            className="btn btn-primary"
          >
            Create new user
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="tableResponsive">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Email</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.loading && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="lds-ripple">
                          <div />
                          <div />
                        </div>
                      </td>
                    </tr>
                  )}
                  {this.props.users.map(user => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>
                          <NavLink
                            className="btn btn-sm btn-outline-primary"
                            to={"/user/" + user.id}
                          >
                            Edit
                          </NavLink>
                        </td>
                        <td>
                          <input
                            type="button"
                            className="btn btn-sm btn-outline-danger ml-1"
                            value="Delete"
                            onClick={() => this.deleteUser(user)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    loading: state.requests > 0
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
)(UsersPage);
