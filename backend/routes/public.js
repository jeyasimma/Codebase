import express from 'express'
import { GetSingleuser } from '../controllers/Public.js'

const PublicRoutes = express.Router()

PublicRoutes.get('/Singleuser/:id', GetSingleuser)
export default PublicRoutes
