"use client"

import { useState, useEffect } from "react";
import { signIn, } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter()

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showLogin, setShowLogin] = useState(true)
  const [input, setInput] = useState([])

  const handleChange = (e) => {
    setError('')
    const {name, value} = e.target
    setInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault()

    try {
      setLoading(true);

    if (action === 'signup') {
      await fetch('/api/signup', {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
      if (data.error) {
        setError(data.error);
        return;
      } else {
        router.push(callbackUrl) 
      }  
      } 
      )
           
    } else {
      // signin
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
        callbackUrl,
      });

      setLoading(false);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError(res.error);
      }
    }
   
    // setInput({
    //   email: "",
    //   password: "",
    //   cpassword: "",
    //   username: ""
    // })
    
    } catch (error) {
      console.log(error);
      setError(error)
    }

    setLoading(false);
  }

  const handleClick = (e) => {
    if (e === true) {
      setError('')
      setShowLogin(true)
    } else {
      setError('')
      setShowLogin(false)
    }
    
  }

  return (
    <>
      { !showLogin ?

        // signup
        (<div className=" w-full max-w-2xl flex flex-col gap-7 glassmorphism">

        <h3 className="text-xl font-semibold text-center w-full">Sign up</h3>
        {error && (
            <p className="text-center bg-red-300 py-4 rounded">{error}</p>
          )}

            <form className="grid" onSubmit={(e) => handleSubmit(e, 'signup')}>
                
                <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                  <label htmlFor="email">Email</label>
                  <input type="email" name='email' value={input.email} id="email" onChange={handleChange} 
                  className="text-lg h-10 bg-transparent "/>
                </div>

                <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                  <label htmlFor="username ">Username</label>
                  <input type="text" name='username' value={input.username} id="username" onChange={handleChange} 
                  className="text-lg h-10 bg-transparent "/>
                </div>

                <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' value={input.password} id="password" onChange={handleChange} 
                  className="text-lg h-10 bg-transparent "/>
                </div>

                <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                  <label htmlFor="cpassword">Re-Enter Password</label>
                  <input type="password" name='cpassword' value={input.cpassword} id="cpassword" onChange={handleChange} 
                  className="text-lg h-10 bg-transparent "/>
                </div>

                <div>
                  <button type="submit" className="black_btn">
                  {loading ? "loading..." : "Sign Up"}
                  </button>
                </div>

            </form>

            <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>

            <div className="grid gap-3 pt-3 text-center text-white">
                <div className="google bg-red-600 py-3 w-full rounded-md cursor-pointer "
                onClick={() => {
                    signIn('google', {callbackUrl: callbackUrl});
                  }}>
                    Continue with Google 
                </div>

                <div className="ghub w-full bg-black py-3 rounded-md cursor-pointer "
                onClick={() => {
                  signIn('github', {callbackUrl: callbackUrl});
                }}>
                    Continue with GitHub
                </div>
            </div>
            <p onClick={() => handleClick(true)} className="peer text-center cursor-pointer">Already Registered? <span >Signin here</span>  </p>
        </div>)
        : 
        
        // Sign in 
        (
          <div className=" w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            {error && (
                <p className="text-center bg-red-300 py-4 rounded">{error}</p>
              )}

              <h3 className="text-xl font-semibold text-center w-full">Sign in</h3>

                <form className="grid " onSubmit={(e) => handleSubmit(e, 'signin')}>
                    
                    <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                      <label htmlFor="email">Email</label>
                      <input type="email" name='email' value={input.email} id="email" onChange={handleChange} 
                      className="text-lg h-10 bg-transparent "/>
                    </div>

                    <div className="border-b-2 border-zinc-400 grid w-full mb-4">
                      <label htmlFor="password">Password</label>
                      <input type="password" name='password' value={input.password} id="password" onChange={handleChange} 
                      className="text-lg h-10 bg-transparent "/>
                    </div>

                    <div>
                      <button type="submit" className="black_btn">
                      {loading ? "loading..." : "Sign In"}
                      </button>
                    </div>

                </form>

                <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <div className="grid gap-3 pt-3 text-center text-white">
                    <div className="google bg-red-600 py-3 w-full rounded-md cursor-pointer "
                    onClick={() => {
                        signIn('google', {callbackUrl: callbackUrl});
                      }}>
                        Continue with Google 
                    </div>

                    <div className="ghub w-full bg-black py-3 rounded-md cursor-pointer "
                    onClick={() => {
                      signIn('github', {callbackUrl: callbackUrl});
                    }}>
                        Continue with GitHub
                    </div>
                </div>

                <p onClick={() => handleClick(false)} className="cursor-pointer peer text-center">Not Registered? Signup here </p>

            </div>
        )
      }
    </>
  )
}

export default Form



