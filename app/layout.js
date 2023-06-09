import Provider from '@/components/Provider'
import Nav from "@/components/Nav"
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptia',
  description: `Generate and share ChatGpt prompts. 

  Promptia is your go-to companion for unlocking a world of inspiration. Our AI-powered prompt generator is meticulously crafted to provide you with a diverse range of thought-provoking prompts that will fuel your creativity and push the boundaries of your imagination.

  Whether you're an aspiring writer, a seasoned author, or simply someone seeking to explore their artistic side, Promptia has something for everyone. Our intelligent algorithm analyzes vast databases of content, literature, and ideas, distilling them into tailored prompts that are uniquely suited to your preferences and interests.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="preload" href="style.css" as="style" /> */}
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
