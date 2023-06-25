import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReviewModalProvider } from '@/components/ReviewModalProvider'
import ReviewModal from '@/components/ReviewModal'

export const metadata = {
  title: 'TrackRate',
  description: 'Rate the latest music and share your music opinions with others!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='bg-gray-950 text-white'>
        <Provider>
          <ReviewModalProvider>
            <Navbar/>
            <main className='p-8 md:py-16 md:px-24 lg:px-48'>
              {children}
            </main>
            <Footer/>
            <ReviewModal/>
          </ReviewModalProvider>
        </Provider>
      </body>
    </html>
  )
}
