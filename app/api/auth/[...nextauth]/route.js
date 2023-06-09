import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import User from '@/models/user';
import { connectToDB } from '@/utils/dataBase';

const handler = NextAuth({

  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req){
        connectToDB().catch(error => { error: "Connection Failed...!"})

        // check user existance
        const user = await User.findOne( { email : credentials.email})
        if(!user){
            throw new Error("No user Found with Email Please Sign Up...!")
        }

        // compare()
        const checkPassword = await compare(credentials.password, user.password);
        
        // incorrect password
        if(!checkPassword || user.email !== credentials.email){
            throw new Error("Password doesn't match");
        }
        return user;
    }
    }),
  ],

  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.username = sessionUser.username.toString();
      session.user.image = sessionUser?.image?.toString();

      return session;
    },

    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        // const u = user as unknown as any;
        return {
          ...token,
          id: user.id,
          randomKey: user.randomKey,
        };
      }
      return token;
    },
    
    async signIn({ account, profile, user, credentials }) {
      try {
        if(!profile?.email) return true

        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
       if(!userExists){
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
       }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
