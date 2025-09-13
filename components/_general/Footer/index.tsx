import type { Wrapper } from '@/types/general'
import Link from 'next/link'

const Footer: React.FC<Wrapper> = ({
  children
}) => {
  return (
    <footer className='fixed space-y-6 bottom-0 w-full py-12'>
      {children}
      <div className='text-center'>
        ©2025 — <Link href="https://alexbeciana.com">Alex Beciana</Link>
      </div>
    </footer>
  )
}

export default Footer