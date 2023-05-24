import Link from "next/link";
import Image from "next/image";
import {MdAccountCircle } from 'react-icons/md'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavDestop = ( ) => {
  const [providers, setProviders] = useState([]);
  const { data: session } = useSession();
  
 useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res && Object.values(res));
    })();
  }, []);

  return (
    <div>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              {session?.user.image ? <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              /> : <MdAccountCircle size={40} />}
            </Link>
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

export default NavDestop