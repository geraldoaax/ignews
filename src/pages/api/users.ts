/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {

  const users = [
    { id: 1, name: 'Geraldo' },
    { id: 2, name: 'Marco' },
    { id: 3, name: 'Leonardo' },
  ]
  return response.json(users)
}