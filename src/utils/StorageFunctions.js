import * as Config from "../Configs";

// eslint-disable-next-line no-undef
export const SSO = new SSOAuth({
  tenantId: Config.TenantId,
  loginCallback: Config.CallbackUrl,
  logoutCallback: Config.HomeUrl
});

export function getUser() {
  return SSO.getJWT();
}
