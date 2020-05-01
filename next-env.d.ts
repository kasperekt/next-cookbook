/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
  interface ProcessEnv {
    GQL_API_TOKEN: string
    AUTH0_DOMAIN: string
    AUTH0_CLIENT_ID: string
    AUTHO_CLIENT_SECRET: string
  }
}
