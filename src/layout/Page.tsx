import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import css from './Page.module.scss'

type Props = {
  title: string
  children: ReactNode
}

export default function Page({ title, children }: Props) {
  return (
    <div className={css.page}>
      <Head>
        <title>Cookbook | {title}</title>
      </Head>
      <header className={css.header}>
        <div className={css.logo}>Kuchnia!</div>
        <nav>
          <Link href='/'>
            <a>Przepisy</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
