import React from "react";
import * as tenantApi from "../api/tenantApi";
import { Redirect } from "react-router-dom";
import TextInput from "../components/common/TextInput";

class HomePage extends React.Component {
  async componentDidMount() {
    let exists = false;
    this.setState({
      loading: true
    });

    try {
      await tenantApi.getTenant();
      exists = true;
    } catch (e) {
      exists = false;
    }

    this.setState({
      exists,
      loading: false
    });
  }

  createTenant = async () => {
    try {
      await tenantApi.createNewTenant(this.state.name);
      this.props.history.replace("/users");
    } catch (e) {
      alert("error");
    }
  };

  onTenantChange = e => {
    this.setState({ ...this.state, name: e.target.value });
  };

  render() {
    if (this.state == null || this.state.loading) {
      return <></>;
    }

    if (!this.state.loading && this.state.exists == true) {
      return <Redirect to="/users" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-normal">New Tenant</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <TextInput
                name="TenantName"
                label="Tenant Name"
                value={this.state.name}
                onChange={this.onTenantChange}
              />
              <button
                type="button"
                onClick={this.createTenant}
                className="btn btn-primary"
              >
                Create Tenant
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
