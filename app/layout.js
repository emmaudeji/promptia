import Provider from '@/components/Provider'
import Nav from "@/components/Nav"
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptia',
  description: 'Generate and share ChatGpt prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
          <Nav />
            <main className='min-h-[100vh] section-padding py-20'>
            {children}
            </main>
          <Footer/>
      </Provider>
      </body>
    </html>
  )
}
