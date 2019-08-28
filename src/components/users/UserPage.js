import React, { Component } from "react";
import * as usersApi from "../../api/usersApi";
import TextInput from "../common/TextInput";
import ReactJson from "react-json-view";

const DEFAULT_STATE = {};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  async componentDidMount() {
    let user = await usersApi.getUser(this.props.match.params.id);
    this.setState({
      user
    });
  }

  handleAddUser = () => {};

  resetState = () => {
    this.setState(DEFAULT_STATE);
  };

  updateUser = async () => {
    try {
      await usersApi.updateUser(this.state.user);
      alert("Saved");
    } catch (e) {
      alert("error: " + e.message);
    }
  };

  render() {
    if (this.state.user == null) return <></>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-normal">User {this.state.user.email}</h1>
          </div>
          <div>
            <button
              type="button"
              onClick={this.updateUser}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <TextInput name="Id" label="Id" value={this.state.user.id} />
              <TextInput
                name="FullName"
                label="Full Name"
                value={this.state.user.fullName}
                onChange={e =>
                  this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      fullName: e.target.value
                    }
                  })
                }
              />
              <TextInput
                name="Email"
                label="Email"
                value={this.state.user.email}
              />
              <div className="form-group">
                <label htmlFor="app_metadata">App Metadata</label>
                <div className="field">
                  <ReactJson
                    theme="monokai"
                    onEdit={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          metadata: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                    onAdd={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          metadata: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                    onDelete={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          metadata: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                    name="app_metadata"
                    id="app_metadata"
                    src={
                      this.state.user.metadata == null
                        ? {}
                        : JSON.parse(this.state.user.metadata)
                    }
                    height="200px"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="claim_metadata">Claim Metadata</label>
                <div className="field">
                  <ReactJson
                    name="claim_metadata"
                    id="claim_metadata"
                    src={
                      this.state.user.extraClaims == null
                        ? {}
                        : JSON.parse(this.state.user.extraClaims)
                    }
                    height="200px"
                    theme="monokai"
                    onEdit={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          extraClaims: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                    onAdd={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          extraClaims: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                    onDelete={e => {
                      this.setState({
                        ...this.state,
                        user: {
                          ...this.state.user,
                          extraClaims: JSON.stringify(e.updated_src)
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </form>

            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">When</th>
                  <th scope="col">Event</th>
                </tr>
              </thead>
              <tbody>
                {this.state.user.events.map(event => {
                  return (
                    <tr key={event.when}>
                      <td>{event.when}</td>
                      <td>{event.event}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
