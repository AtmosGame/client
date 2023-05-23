import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body.tokenName)
    console.log(req.headers.authorization)
    axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_PURCHASE_PAYMENT}/api/v1/add-token`, {
            headers: {
                Authorization: req.headers.authorization,
            },
            tokenName: req.body.tokenName,

        })
        .then((response) => {
            console.log("udah masuk atas")
            res.status(response.status).json(response.data)
        })
        .catch((error) => {
            console.log("siniii")
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
