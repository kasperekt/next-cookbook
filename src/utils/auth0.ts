import { initAuth0 } from '@auth0/nextjs-auth0'

console.log('Env', process.env)

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  scope: 'openid profile',
  redirectUri: process.env.AUTH0_REDIRECT_URI!,
  postLogoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT_URI!,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: 'hello-world-mate-hello-world-mate-hello-world-mate-hello-world-mate',
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
  },
})