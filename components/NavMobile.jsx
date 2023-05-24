import Link from "next/link";
import Image from "next/image";
import {MdAccountCircle } from 'react-icons/md'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";



const NavMobile = ( ) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [providers, setProviders] = useState([])
  const { data: session } = useSession();


   useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res && Object.values(res));
    })();
  }, []);

  return (
    <div className='relative'>
        {session?.user ? (
          <div className='flex'>

            <div onClick={() => setToggleDropdown(p => !p)}>
              { session?.user.image ?
                <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              /> : 
              <MdAccountCircle size={30}/>
              }
            </div>
            
            {toggleDropdown && (
              <div className='absolute p-4 grid gap-4 w-44 top-14 rounded-lg right-0 shadow-2xl bg-white'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers?.map((provider) => (
                <button
                  type='button'
                  key={provider?.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
  )
}

export default NavMobile