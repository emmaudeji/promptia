import { connectToDB } from "@/utils/dataBase"
import User from "@/models/user"
import { hash } from "bcrypt";

export const POST = async (request) => {
  try {
    const { email, username, password, cpassword} = await request.json()
    console.log({ email, username, password, cpassword} )
    if (!email || !password || !cpassword || !username) return new Response ( JSON.stringify({error: 'Incomplete data!'}), {status: 401});

    if (!(password === cpassword)) return  new Response (JSON.stringify({error: 'Password does not match!'}), {status: 401})
  
    await connectToDB();

    const userExist = await User.findOne({email})
    if (userExist) return new Response (JSON.stringify({error: 'Email already exists.'}),  {status: 401} )

    const user = await User.create({email, username, password: await hash(password, 12)})
    
    return new Response (JSON.stringify({status: true, user: {email: user.email, username: user.username}}),  {status: 200})

  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    )
  }
}

