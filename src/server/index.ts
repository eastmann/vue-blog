import express from 'express'
import cors from 'cors'

import { thisMonth, thisWeek, today } from '@/types/posts'

const app = express()

app.use(cors())

app.get('/posts', (req, res) => {
  res.json([today, thisWeek, thisMonth])
})

app.listen(8000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8000')
})
