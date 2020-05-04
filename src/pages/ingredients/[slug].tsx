import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { gql } from 'apollo-boost'
import client from '../../api/dato'
import { Dato } from '../../api/model'
import Markdown from 'react-markdown'
import Page from '../../layout/Page'
import Heading from '../../components/Heading'
import css from './[slug].module.scss'
import secure from '../../utils/secure'
import { useRedirectIf } from '../../hooks'

type Props = {
  ingredient?: Dato.Ingredient
  redirectTo?: string
}

export default function IngredientDetails({ ingredient, redirectTo = '/' }: Props) {
  useRedirectIf(!ingredient, redirectTo)

  if (!ingredient) {
    return null
  }

  return (
    <Page title={ingredient?.name}>
      <Heading level='1'>{ingredient?.name}</Heading>

      {ingredient.info ? (
        <Markdown source={ingredient.info} />
      ) : (
        <p className={css.noInfo}>Brak informacji</p>
      )}
    </Page>
  )
}

type UrlQuery = {
  slug: string
}

type GetIngredientQueryResult = {
  ingredient: Dato.Ingredient
}

const getIngredientQuery = gql`
  query MyQuery($slug: String) {
    ingredient(filter: { slug: { eq: $slug } }) {
      id
      name
      info
      slug
      unit {
        id
        name
        short
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps<Props, UrlQuery> = async ({ req, params }) => {
  if (!(await secure(req))) {
    return {
      props: {
        redirectTo: '/',
      },
    }
  }

  const response = await client.query<GetIngredientQueryResult, { slug: string }>({
    query: getIngredientQuery,
    variables: { slug: params!.slug },
  })

  return {
    props: {
      ingredient: response.data.ingredient,
    },
  }
}
