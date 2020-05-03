import ApolloClient from 'apollo-boost'
import nodeFetch from 'node-fetch'

const client = new ApolloClient({
  uri: 'https://graphql.datocms.com/',
  fetch: nodeFetch as any,
  headers: {
    Authorization: process.env.GQL_API_TOKEN,
  },
})

export default client
