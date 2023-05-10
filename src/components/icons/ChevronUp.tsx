import React from 'react'
import { IconProps } from './interface'

export const ChevronUp: React.FC<IconProps> = ({
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
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
)
