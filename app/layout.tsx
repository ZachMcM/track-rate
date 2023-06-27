import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReviewFormProvider } from '@/components/ReviewFormProvider'
import ReviewForm from '@/components/ReviewForm'

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
          <ReviewFormProvider>
            <Navbar/>
            <main className='p-8 md:py-16 md:px-16 lg:px-48'>
              {children}
            </main>
            <Footer/>
            <ReviewForm/>
          </ReviewFormProvider>
        </Provider>
      </body>
    </html>
  )
}
