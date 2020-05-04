import { NextApiRequest } from 'next'
import auth0 from './auth0'
import { IncomingMessage } from 'http'

export default async function secure(req: NextApiRequest | IncomingMessage) {
  try {
    const session = await auth0.getSession(req)

    if (!session) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
