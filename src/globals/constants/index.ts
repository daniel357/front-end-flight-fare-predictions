export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;

export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION,
  USER_POOL_ID: process.env.NEXT_PUBLIC_USER_POOL_ID,
  USER_POOL_APP_ID: process.env.NEXT_PUBLIC_USER_POOL_APP_ID,
  IDENTITY_POOL_ID: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
  DOMAIN: `${process.env.NEXT_PUBLIC_AUTH_CONFIG_DOMAIN_PREFIX}.auth.eu-central-1.amazoncognito.com`,
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  RESTRICTED: '/restricted',
  RESTRICTED_WITH_VARIABLE: '/restricted/{{id}}',
}
