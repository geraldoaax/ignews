/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/react'
import { fauna } from "../../services/fauna";

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const session = await getSession({ req })

    // console.log(session, 'session')


    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerID = user.data.stripe_customer_id;

    if (!customerID) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata: 
      })

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            }
          }
        )
      )

      customerID = stripeCustomer.id

    }



    const stripeCheckoutSessions = await stripe.checkout.sessions.create({
      customer: customerID,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: process.env.STRIPE_PRICE,
          quantity: 1
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      success_url: process.env.STRIPE_SUCESS_URL
    })

    // console.log({ sessionId: stripeCheckoutSessions })

    return res.status(200).json({ sessionId: stripeCheckoutSessions.id })

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed')

  }
}
