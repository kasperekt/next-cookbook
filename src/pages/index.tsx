import React from 'react'
import Page from '../layout/Page'
import Heading from '../components/Heading'
import { GetStaticProps } from 'next'
import { gql } from 'apollo-boost'
import client from '../api/dato'
import css from './index.module.scss'

type Props = {
  allRecipes: GetRecipesQueryResult['allRecipes']
}

export default function Home({ allRecipes }: Props) {
  return (
    <Page title='Przepisy'>
      <Heading level='1'>Przepisy</Heading>
      <div className={css.recipes}>
        {allRecipes.map((recipe) => (
          <div
            className={css.recipe}
            key={recipe.slug}
            style={{ backgroundImage: `url(${recipe.coverPhoto.url})` }}
          >
            <div className={css.recipeName}>{recipe.name}</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

type GetRecipesQueryResult = {
  allRecipes: {
    name: string
    slug: string
    createdAt: string
    coverPhoto: {
      url: string
    }
  }[]
}

const getRecipesQuery = gql`
  query GetRecipesQuery {
    allRecipes {
      name
      slug
      createdAt
      coverPhoto {
        url
      }
    }
  }
`

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await client.query<GetRecipesQueryResult>({ query: getRecipesQuery })

  return {
    props: {
      allRecipes: data.allRecipes,
    },
  }
}
