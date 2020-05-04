import Router from 'next/router'
import { useEffect } from 'react'

export function useRedirectIf(condition: boolean, redirectTo: string = '/') {
  useEffect(() => {
    if (condition) {
      Router.replace(redirectTo)
    }
  }, [condition])
}
