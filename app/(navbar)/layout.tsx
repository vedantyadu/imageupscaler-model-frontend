import Navbar from '@/components/navbar/Navbar'


export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar/>
      <div className='flex flex-col z-10 w-full flex-1 max-w-7xl items-center font-montserrat text-sm p-4'>
        {children}
      </div>
    </main>
  )
}
