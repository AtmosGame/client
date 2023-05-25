import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const appId = req.query.id
  
  axios
    .get(`${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/notification/is-subscribed/${appId}`, {
        headers: {
          Authorization: req.headers.authorization,
        },
      })
    .then((response) => {
      res.status(response.status).json(response.data)
    })
    .catch((error) => {
      console.log(error)
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
  
  // axios
  //   .get(`${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/notification/all-appDeveloper`, {
  //       headers: {
  //         Authorization: req.headers.authorization,
  //       },
  //     })
  //   .then((response) => {
  //     const apps = response.data;
      
  //     for (let i = 0; i < apps.length; i++) {
        
  //       if (apps[i].id == req.query.id) {
  //         const subscribers = apps[i].subscribers
          
  //         let flag = false;
  //         for (let j = 0; j < subscribers.length; j++) {
  //           if (subscribers[j].userId == userId) {
  //             flag = true;
  //             break;
  //           }
  //         }
          
  //         res.status(response.status).json({ isSubscribed: flag })
  //         break;
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     if (
  //       error.response != undefined &&
  //       error.response.status != undefined &&
  //       error.response.data != undefined
  //     ) {
  //       res.status(error.response.status).send(error.response.data)
  //     } else {
  //       res.status(500).send(error)
  //     }
  //   })
}

export const config = {
  api: {
    externalResolver: true,
  },
}

export default handler
