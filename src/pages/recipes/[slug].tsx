import React from 'react'
import Page from '../../layout/Page'
import Heading from '../../components/Heading'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from 'apollo-boost'
import client from '../../api/dato'
import css from './[slug].module.scss'
import Markdown from 'react-markdown'

type Props = {
  recipe: GetRecipeQueryResponse['recipe']
}

export default function RecipeDetails({ recipe }: Props) {
  return (
    <Page title='Przepis'>
      <Heading level='1'>{recipe.name}</Heading>
      <div className={css.ingredientsList}>
        <Heading level='2'>Składniki</Heading>
        {recipe.ingredients.map(({ ingredient, quantity }, index) => {
          return (
            <p key={index} className={css.ingredient}>
              {ingredient.name} ({quantity} {ingredient.unit.short})
            </p>
          )
        })}
      </div>

      <div>
        <Heading level='2'>Przepis</Heading>
        <Markdown source={recipe.steps} className={css.steps} />
      </div>
    </Page>
  )
}

type UrlParams = {
  slug: string
}

const getSlugsQuery = gql`
  query GetSlugsQuery {
    allRecipes {
      slug
    }
  }
`

export const getStaticPaths: GetStaticPaths<UrlParams> = async () => {
  const { data } = await client.query<{ allRecipes: { slug: string }[] }>({
    query: getSlugsQuery,
  })

  return {
    paths: data.allRecipes.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

type GetRecipeQueryResponse = {
  recipe: {
    name: string
    slug: string
    referenceUrl: string
    steps: string
    ingredients: {
      quantity: number
      ingredient: {
        name: string
        slug: string
        unit: {
          name: string
          short: string
        }
      }
    }[]
  }
}

const getRecipeQuery = gql`
  query GetRecipeQuery($slug: String) {
    recipe(filter: { slug: { eq: $slug } }) {
      name
      slug
      referenceUrl
      steps(markdown: false)
      ingredients {
        quantity
        ingredient {
          name
          slug
          unit {
            name
            short
          }
        }
      }
    }
  }
`

export const getStaticProps: GetStaticProps<Props, UrlParams> = async ({ params }) => {
  const { data } = await client.query<GetRecipeQueryResponse>({
    query: getRecipeQuery,
    variables: { slug: params?.slug },
  })

  return {
    props: {
      recipe: data.recipe,
    },
  }
}
