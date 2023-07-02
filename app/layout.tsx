import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/Navbar'
import ReviewModals from '@/components/ReviewModals'

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
      <body className='bg-zinc-100 text-zinc-950'>
        <Provider>
          <Navbar/>
          {children}
          <ReviewModals/>
        </Provider>
      </body>
    </html>
  )
}
