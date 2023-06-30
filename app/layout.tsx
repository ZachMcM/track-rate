import './globals.css'
import Provider from '../components/Provider'
import Navbar from '@/components/Navbar'
import { ReviewFormProvider } from '@/components/ReviewFormProvider'
import ReviewForm from '@/components/ReviewForm'
import TrackReviewForm from '@/components/TrackReviewForm'
import AlbumReviewForm from '@/components/AlbumReviewForm'

export const metadata = {
  title: 'trackrate',
  description: 'Rate the latest music and share your music opinions with others!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='bg-zinc-950 text-white'>
        <Provider>
          <ReviewFormProvider>
            <Navbar/>
            <main className='p-5 md:py-16 md:px-12'>
              {children}
            </main>
            <ReviewForm/>
            <TrackReviewForm/>
            <AlbumReviewForm/>
          </ReviewFormProvider>
        </Provider>
      </body>
    </html>
  )
}
