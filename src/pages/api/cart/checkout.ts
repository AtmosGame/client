import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { appId } = req.query
  axios
    .delete(
      `{process.env.NEXT_PUBLIC_APP_API_PURCHASE_PAYMENT}/api/v1/cart/checkout`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    )
    .then((response) => {
      res.status(response.status).json(response.data)
    })
    .catch((error) => {
      if (
        error.response != undefined &&
        error.response.status != undefined &&
        error.response.data != undefined
      ) {
        res.status(error.response.status).send(error.response.data)
      } else {
        res.status(500).send(error)
      }
    })
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default handler
