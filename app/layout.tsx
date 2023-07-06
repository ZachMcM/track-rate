import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/nav-items/Navbar'
import ReviewModals from '@/components/review/ReviewModals'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'trackrate',
  description: 'Rate the latest tracks and albums and share your music opinions with others!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth' suppressHydrationWarning>
      <body className='bg-zinc-100 text-zinc-950 dark:bg-zinc-950 dark:text-white'>
        <Provider>
          <Navbar/>
          <main className='min-h-screen'>
            {children}
          </main>
          <Footer/>
          <ReviewModals/>
        </Provider>
      </body>
    </html>
  )
}
