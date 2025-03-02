import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'

import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import authRoute from './routes/auth.route.js'
import songRoute from './routes/song.route.js'
import albumRoute from './routes/album.route.js'
import statsRoute from './routes/stats.route.js'

import { connectDB } from './lib/db.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(clerkMiddleware())

app.use('/api/users', userRoute)
app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/songs', songRoute)
app.use('/api/albums', albumRoute)
app.use('/api/stats', statsRoute)


app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
    connectDB()
})