import React from "react";
import * as tenantApi from "../../api/tenantApi";
import { Redirect } from "react-router-dom";
import TextInput from "../../components/common/TextInput";
import CheckboxInput from "../../components/common/CheckboxInput";

class HomePage extends React.Component {
  async componentDidMount() {
    this.setState({
      loading: true
    });

    let tenant = null;
    try {
      tenant = await tenantApi.getTenant();
    } catch (e) {
      alert("error: " + e.message);
    }

    this.setState({
      tenant,
      loading: false
    });
  }

  updateTenant = async () => {
    try {
      tenantApi.updateTenant(this.state.tenant);
      alert("Saved");
    } catch (e) {
      alert("error: " + e.message);
    }
  };

  render() {
    if (this.state == null || this.state.loading) {
      return <></>;
    }

    if (!this.state.loading && this.state.tenant == null) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-normal">
              Tenant {this.state.tenant.name}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form>
              <TextInput
                name="Name"
                label="Tenant Name"
                value={this.state.tenant.name}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    tenant: {
                      ...this.state.tenant,
                      name: e.target.value
                    }
                  });
                }}
              />
              <TextInput
                name="JwtSigningKey"
                label="JWT Signing Key"
                value={this.state.tenant.jwtSigningKey}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    tenant: {
                      ...this.state.tenant,
                      jwtSigningKey: e.target.value
                    }
                  });
                }}
              />
              <TextInput
                name="JWTDuration"
                label="JWT Duration"
                value={this.state.tenant.jwtDuration}
                onChange={e => {
                  this.setState({
                    ...this.state,
                    tenant: {
                      ...this.state.tenant,
                      jwtDuration: e.target.value
                    }
                  });
                }}
              />
              <CheckboxInput
                name="AllowPublicUsers"
                label="Allow Public Users"
                value={this.state.tenant.allowPublicUsers}
                onChange={e => {
                  this.setState({                    
                    ...this.state,
                    tenant: {
                      ...this.state.tenant,
                      allowPublicUsers: e.target.checked
                    }
                  });
                }}
              />
              <button
                type="button"
                onClick={this.updateTenant}
                className="btn btn-primary"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
