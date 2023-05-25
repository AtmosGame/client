// pages/api/app/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const token = req.cookies.token // Assuming you have set up cookie parsing in your Next.js project
  const headers = { Authorization: `Bearer ${token}` }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_API_STORE_URL}/app-detail/${id}`,
      { headers }
    )
    const appDetails = response.data
    res.status(200).json(appDetails)
  } catch (error) {
    console.error('Error fetching app details:', error)
    res.status(500).json({ error: 'Error fetching app details' })
  }
}
