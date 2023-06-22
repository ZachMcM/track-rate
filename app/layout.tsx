import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReviewFormProvider } from '@/components/ReviewFormProvider'

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
    <html lang="en">
      <body className='bg-gray-950 text-white'>
        <Provider>
          <ReviewFormProvider>
            <Navbar/>
            {children}
            <Footer/>
          </ReviewFormProvider>
        </Provider>
      </body>
    </html>
  )
}
