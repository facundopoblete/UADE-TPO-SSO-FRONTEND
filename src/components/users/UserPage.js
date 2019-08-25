import React, { Component } from "react";
import * as usersApi from "../../api/usersApi";
import TextInput from "../common/TextInput";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

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

  render() {
    if (this.state.user == null) return <></>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-normal">User {this.state.user.email}</h1>
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
              />
              <TextInput
                name="Email"
                label="Email"
                value={this.state.user.email}
              />
              <div className="form-group">
                <label htmlFor="app_metadata">App Metadata</label>
                <div className="field">
                  <JSONInput
                    name="app_metadata"
                    id="app_metadata"
                    placeholder={
                      this.state.user.metadata == null
                        ? {}
                        : JSON.parse(this.state.user.metadata)
                    }
                    locale={locale}
                    height="200px"
                    onChange={event => {}}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="claim_metadata">Claim Metadata</label>
                <div className="field">
                  <JSONInput
                    name="claim_metadata"
                    id="claim_metadata"
                    placeholder={
                      this.state.user.extraClaims == null
                        ? {}
                        : JSON.parse(this.state.user.extraClaims)
                    }
                    locale={locale}
                    height="200px"
                    onChange={event => {}}
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
