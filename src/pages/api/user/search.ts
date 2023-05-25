import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
   
    
  axios
    .post(
      `${process.env.NEXT_PUBLIC_APP_API_AUTH_AND_ADMIN_URL}/v1/user/search-user`,
      {
        username: req.body.username,
      }, 
      
    )
    .then((response) => {
      console.log(response);
        
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
