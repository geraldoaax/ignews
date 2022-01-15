import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from '../../../services/fauna'
import { query as q } from 'faunadb'

export default NextAuth({

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: "read:user",
    }),
  ], callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email } = user
      // console.log(user)

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ), //poderia ter um update de dados do usuario no banco.. TODO
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
        return true

      } catch (err) {
        alert(err.message)

        return false
      }
    },
  }
})