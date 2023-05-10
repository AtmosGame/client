import React from 'react'
import { IconProps } from './interface'

export const ChevronDown: React.FC<IconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  className,
  size,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke={stroke}
    className={`${className} ${size}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
)
