import React, { useState, useEffect, ReactNode } from 'react'
import cn from 'classnames'
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
        <div className={css.logo}>🔪</div>
        <nav className={css.navigation}>
          <Link href='/'>
            <a className={css.navLink}>Przepisy</a>
          </Link>

          {loggedIn ? (
            <>
              <Link href='/ingredients'>
                <a className={css.navLink}>Składniki</a>
              </Link>

              <Link href='/api/logout'>
                <a className={cn(css.navLink, css.rightSide)}>Wyloguj</a>
              </Link>
            </>
          ) : (
            <Link href='/api/login'>
              <a className={cn(css.navLink, css.rightSide)}>Zaloguj</a>
            </Link>
          )}
        </nav>
      </header>

      {children}
    </div>
  )
}
