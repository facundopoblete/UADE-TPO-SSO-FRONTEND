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
      alert("error");
    }

    this.setState({
      tenant,
      loading: false
    });
  }

  updateTenant = async () => {
    try {
      let a = 3;
    } catch (e) {
      alert("error");
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
                onChange={null}
              />
              <TextInput
                name="JwtSigningKey"
                label="JWT Signing Key"
                value={this.state.tenant.jwtSigningKey}
                onChange={null}
              />
              <TextInput
                name="JWTDuration"
                label="JWT Duration"
                value={this.state.tenant.jwtDuration}
                onChange={null}
              />
              <CheckboxInput
                name="AllowPublicUsers"
                label="Allow Public Users"
                value={this.state.tenant.allowPublicUsers}
                onChange={null}
              />
              <button
                type="button"
                onClick={this.createTenant}
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
