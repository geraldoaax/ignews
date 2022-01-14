/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const session = await getSession({ req })

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata: 
    })


    const stripeCheckoutSessions = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
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

    return res.status(200).json({ sesionId: stripeCheckoutSessions })

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed')

  }
}
