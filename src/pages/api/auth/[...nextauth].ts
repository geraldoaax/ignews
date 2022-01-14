import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import { query as q} from 'faunadb'

export default NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: "read:user",
    }),
  ],callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email } = user
      console.log(user)

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )   
      return true 
      
          } catch (err) {
            console.error(err)
            return false 
          }
    },
  }
})