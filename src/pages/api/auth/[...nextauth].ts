import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react"
import { fauna } from '../../../services/fauna'
import { query as q } from "faunadb"

export default NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: "read:user",
    }),
  ],
  callbacks: { 
    async signIn({ user, account, profile, credentials }) {
      const { email } = user

      await fauna.query(
        q.Create(
          q.Collection('users'),
          {data: { email }}
        )
      )

      return true
    },
  }
})