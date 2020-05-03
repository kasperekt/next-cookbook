import React from 'react'
import Page from '../../layout/Page'
import { GetStaticProps } from 'next'
import type { Dato } from '../../api/model'
import client from '../../api/dato'
import { gql } from 'apollo-boost'
import Heading from '../../components/Heading'
import css from './index.module.scss'
import Link from 'next/link'

type Props = {
  ingredients: Dato.Ingredient[]
}

export default function IngredientsList({ ingredients }: Props) {
  return (
    <Page title='Składniki' noPadding>
      <Heading level='1' className={css.heading}>
        Składniki
      </Heading>

      <ul className={css.list}>
        {ingredients.map((ingredient) => (
          <li className={css.ingredient} key={ingredient.id}>
            <Link href='/ingredients/[slug]' as={`/ingredients/${ingredient.slug}`}>
              <a>{ingredient.name}</a>
            </Link>
            <div>
              {ingredient.unit.name} ({ingredient.unit.short})
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}

type GetIngredientsListResponse = {
  allIngredients: Dato.Ingredient[]
}

const getIngredientsListQuery = gql`
  query GetIngredientsListQuery {
    allIngredients {
      id
      info(markdown: false)
      name
      slug
      unit {
        id
        name
        short
      }
    }
  }
`

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await client.query<GetIngredientsListResponse>({
    query: getIngredientsListQuery,
  })

  return {
    props: {
      ingredients: response.data.allIngredients,
    },
  }
}
