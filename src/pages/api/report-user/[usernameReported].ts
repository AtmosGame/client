import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, usernameReported } = req.query
    axios
    .post(
      `${process.env.NEXT_PUBLIC_APP_API_AUTH_AND_ADMIN_URL}/v1/report/report-user/${username}/${usernameReported}`,
      {
        headers:{
            Authorization: req.headers.authorization
        }
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

