import React from 'react'
import Page from '../layout/Page'
import { GetServerSideProps } from 'next'
import auth0 from '../utils/auth0'

type Props = {
  secret: string | null
}

export default function SecretPage({ secret }: Props) {
  return (
    <Page title='Sekretna strona!'>
      {secret ? (
        <>
          <h1>And the secret is...</h1>
          <p>{secret}</p>
        </>
      ) : (
        <p>You really should not be here</p>
      )}
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  const session = await auth0.getSession(req)

  if (!session?.user) {
    return {
      props: {
        secret: null,
      },
    }
  }

  return {
    props: {
      secret: 'HEJO',
    },
  }
}
