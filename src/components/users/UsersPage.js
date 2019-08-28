import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "../../redux/actions/usersActions";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import TextInput from "../common/TextInput";

const DEFAULT_STATE = {
  newUserModalOpened: false,
  newUser: { email: "", password: "", fullName: "" }
};

const customStyles = {
  content: {
    top: "36%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
    padding: 0
  }
};

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

  openNewUserModal = () => {
    this.setState({ ...this.state, newUserModalOpened: true });
  };

  closeModal = () => {
    this.setState({ ...this.state, ...DEFAULT_STATE });
  };

  createUser = async () => {
    try {
      this.props.actions.createUser(this.state.newUser);
      this.setState({ ...this.state, ...DEFAULT_STATE });
    } catch (e) {
      alert("error: " + e.message);
    }
  };

  render() {
    return (
      <div className="container">
        <Modal
          isOpen={this.state.newUserModalOpened}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create new User</h5>
              <button
                type="button"
                className="close"
                onClick={this.closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <TextInput
                name="FullName"
                label="Full Name"
                value={this.state.newUser.fullName}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    newUser: {
                      ...this.state.newUser,
                      fullName: e.target.value
                    }
                  });
                }}
              />
              <TextInput
                name="Email"
                label="Email"
                value={this.state.newUser.email}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    newUser: {
                      ...this.state.newUser,
                      email: e.target.value
                    }
                  });
                }}
              />
              <TextInput
                name="Password"
                label="Password"
                value={this.state.newUser.password}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    newUser: {
                      ...this.state.newUser,
                      password: e.target.value
                    }
                  });
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.createUser}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div>
          <button
            type="button"
            onClick={this.openNewUserModal}
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
