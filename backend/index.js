import express from 'express'
import dotenv from 'dotenv'
import DBCon from './libs/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoutes from './routes/Auth.js'
// import UserRoutes from './routes/user.js'
import DashboardRoutes from './routes/DashBoard.js'
// import CommentRoutes from './routes/Comments.js'
// import PublicRoutes from './routes/Public.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()
DBCon()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello from server')
})
app.use(express.static('public'))
app.use(cookieParser())
const corsOptoins = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptoins))

app.use('/auth', AuthRoutes)
// app.use('/user', UserRoutes)
app.use('/dashboard', DashboardRoutes)
// app.use('/comment', CommentRoutes)
// app.use('/public', PublicRoutes)

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`)
})
