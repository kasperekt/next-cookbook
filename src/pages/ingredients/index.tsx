import React, { useEffect } from 'react'
import Page from '../../layout/Page'
import { GetServerSideProps } from 'next'
import type { Dato } from '../../api/model'
import client from '../../api/dato'
import { gql } from 'apollo-boost'
import Heading from '../../components/Heading'
import css from './index.module.scss'
import Link from 'next/link'
import secure from '../../utils/secure'
import Router from 'next/router'
import { useRedirectIf } from '../../hooks'

type Props = {
  ingredients?: Dato.Ingredient[]
}

export default function IngredientsList({ ingredients }: Props) {
  useRedirectIf(!ingredients)

  if (!ingredients) {
    return null
  }

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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  if (!(await secure(req))) {
    return {
      props: {},
    }
  }

  const response = await client.query<GetIngredientsListResponse>({
    query: getIngredientsListQuery,
  })

  return {
    props: {
      ingredients: response.data.allIngredients,
    },
  }
}
