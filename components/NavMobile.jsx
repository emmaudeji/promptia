import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";



const NavMobile = ( ) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const { data: session } = useSession();



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
              <ProfileImage username={session?.user.username}/>
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
        ) : 
         
                <Link href={'/auth'}
                  className='black_btn'
                >
                  Sign in
                </Link>

        }
      </div>
  )
}

export default NavMobile