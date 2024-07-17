import Link from 'next/link'
import NavUser from './Navuser'

export default function Navbar() {
  return (
    <nav className='w-full h-16 flex items-center justify-center bg-neutral-950 border-b border-neutral-800 font-montserrat'>
      <div className='w-full max-w-7xl flex items-center justify-between p-4'>
        <Link href='/' className='font-bold text-lg'>Image Upscaler</Link>
        <NavUser/>
      </div>
    </nav>
  )
}
