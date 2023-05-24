"use client"

import Link from "next/link";
import Image from "next/image";
import NavDestop from "./NavDestop"
import NavMobile from "./NavMobile"

const Nav = () => {

  return (
    <nav className="flex justify-between h-20 border-b-2 items-center section-padding">
      <Link href={'/'} className="flex gap-2">
          <Image src={"/promptia-icon.png"} width={30} height={30} alt="logo"/>
          <h3 className="text-2xl text-purple-800 hidden sm:block">promptia</h3>
      </Link>

      <div className="hidden sm:flex">
        <NavDestop />
      </div>

      <div className="sm:hidden">
        <NavMobile />
      </div>
    </nav>
  )
}

export default Nav