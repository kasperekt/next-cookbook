import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export default function Page({ title, children }: Props) {
  return (
    <main>
      <Head>
        <title>Cookbook | {title}</title>
      </Head>

      {children}
    </main>
  )
}
