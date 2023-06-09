"use client"

import Feed from "@/components/Feed"
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import Link from "next/link";




export default function Home() {
  const [providers, setProviders] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res && Object.values(res));
    })();
  }, []);

  return (
    <>
      <section className='w-full flex-center flex-col'>
          <h1 className='head_text text-center'>
            Spark Your Ideas With
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'> AI-Powered Prompts</span>
          </h1>
          <p className='desc text-center'>
          Empower the Modern World with an Open-Source AI Prompting Tool, Enabling Discovery, Creation, and Sharing of Creative Prompts.
          </p>
          <>
            {!session ?
                <Link href={'/auth'}
                  className='black_btn mt-10'
                >
                  Get started
                </Link>
                :
                <Link href={'/create-prompt'}
                className='black_btn mt-10 sm:hidden'
                >
                  Create prompt
                </Link>
              }
          </>
      </section>
      
      <Feed />
     
      
    </>
  )
}


