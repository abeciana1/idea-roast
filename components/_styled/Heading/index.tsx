import { type HeadingProps } from '@/types/general'

export const Heading1: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className="z-50 text-6xl font-semibold leading-16">
      {text}
    </h1>
  )
}

export const Heading2: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className="z-50 text-5xl font-semibold leading-12">
      {text}
    </h2>
  )
}

export const Heading3: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h3 className="z-50 text-4xl font-semibold">
      {text}
    </h3>
  )
}

export const Heading4: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h4 className="z-50 text-3xl font-semibold">
      {text}
    </h4>
  )
}

export const Heading5: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h5 className="z-50 text-2xl font-semibold">
      {text}
    </h5>
  )
}

export const Heading6: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h6 className="z-50 text-xl font-semibold">
      {text}
    </h6>
  )
}
