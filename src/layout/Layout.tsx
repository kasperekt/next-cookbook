import React, { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import css from './Layout.module.scss'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch('/api/auth0/me')

      if (response.ok) {
        setLoggedIn(true)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <div className={css.logo}>Cookbook</div>
        <nav>
          <Link href='/'>
            <a className={css.navLink}>Przepisy</a>
          </Link>

          <Link href='/secret'>
            <a className={css.navLink}>Sekretna strona</a>
          </Link>

          {loggedIn ? (
            <Link href='/api/logout'>
              <a className={css.navLink}>Wyloguj</a>
            </Link>
          ) : (
            <Link href='/api/login'>
              <a className={css.navLink}>Zaloguj</a>
            </Link>
          )}
        </nav>
      </header>

      {children}
    </div>
  )
}
