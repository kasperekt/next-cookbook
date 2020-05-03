import React, { ReactNode } from 'react'
import cn from 'classnames'
import Head from 'next/head'
import css from './Page.module.scss'

type Props = {
  title: string
  children: ReactNode
  noPadding?: boolean
}

export default function Page({ title, children, noPadding = false }: Props) {
  return (
    <main className={cn(css.page, { [css.padded]: !noPadding })}>
      <Head>
        <title>Cookbook | {title}</title>
      </Head>

      {children}
    </main>
  )
}
