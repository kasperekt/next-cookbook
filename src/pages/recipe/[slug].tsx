import React from 'react'
import Page from '../../layout/Page'
import { GetStaticPaths } from 'next'
import type { Recipe } from '../../model'

type Props = {
  recipe: Recipe
}

export default function Recipe({}: Props) {
  return <Page title='Przepis'>Przepis?</Page>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'gnocchi' } }],
    fallback: false,
  }
}
