import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../../utils/auth0'

export default async function auth0Callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/secret' })
  } catch (error) {
    console.error('Callback error', error)
    res.status(error.status ?? 400).end(error.message)
  }
}
