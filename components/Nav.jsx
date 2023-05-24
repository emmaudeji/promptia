"use client"


import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import NavDestop from "./NavDestop"
import NavMobile from "./NavMobile"

const Nav = () => {

  const { data: session } = useSession();


  const [providers, setProviders] = useState([]);


  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res && Object.values(res));
  //     console.log('res', res && Object.values(res))

  //   })();
  // }, []);

  console.log('11111', providers && Object.values(providers))

  return (
    <nav className="flex justify-between h-20 border-b-2 items-center section-padding">
      <Link href={'/'} className="flex gap-2">
          <Image src={"/promptia-icon.png"} width={30} height={30} alt="logo"/>
          <h3 className="text-2xl text-purple-800 hidden sm:block">promptia</h3>
      </Link>

      <div className="hidden sm:flex">
        <NavDestop providers={providers}  signIn={signIn} signOut={signOut}  session={session} />
      </div>

      <div className="sm:hidden">
        <NavMobile providers={providers}  signIn={signIn} signOut={signOut}  session={session} />
      </div>
    </nav>
  )
}

export default Nav