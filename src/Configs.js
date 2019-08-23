export const CallbackUrl = process.env.CALLBACK_URL;
export const TenantId = process.env.TENANT_ID;
export const LoginBaseUrl = process.env.LOGIN_BASE_URL;
export const LoginUrl = LoginBaseUrl + "/login?tenant=" + TenantId +"&redirect=" + CallbackUrl;