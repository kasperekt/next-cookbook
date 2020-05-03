import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from 'apollo-boost'
import client from '../../api/dato'
import { Dato } from '../../api/model'
import Markdown from 'react-markdown'
import Page from '../../layout/Page'
import Heading from '../../components/Heading'
import css from './[slug].module.scss'

type Props = {
  ingredient: Dato.Ingredient
}

export default function IngredientDetails({ ingredient }: Props) {
  return (
    <Page title={ingredient.name}>
      <Heading level='1'>{ingredient.name}</Heading>
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

type GetPathsQueryResult = {
  allIngredients: {
    slug: string
  }[]
}

const getPathsQuery = gql`
  query GetPathsQuery {
    allIngredients {
      slug
    }
  }
`

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const response = await client.query<GetPathsQueryResult>({
    query: getPathsQuery,
  })

  return {
    paths: response.data.allIngredients.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
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

export const getStaticProps: GetStaticProps<Props, UrlQuery> = async (context) => {
  const response = await client.query<GetIngredientQueryResult, { slug: string }>({
    query: getIngredientQuery,
    variables: { slug: context.params!.slug },
  })

  return {
    props: {
      ingredient: response.data.ingredient,
    },
  }
}
