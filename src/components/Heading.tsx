import React, { HTMLAttributes } from 'react'
import css from './Heading.module.scss'
import cn from 'classnames'

type Props = HTMLAttributes<HTMLHeadingElement> & {
  level: '1' | '2' | '3' | '4'
}

export default function Heading({ level, children, ...restProps }: Props) {
  return React.createElement(
    `h${level}`,
    {
      ...restProps,
      className: cn(css.heading, css[`size${level}` as keyof typeof css], restProps.className),
    },
    children
  )
}
