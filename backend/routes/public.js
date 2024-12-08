import express from 'express'
import { GetSingleuser } from '../controllers/public.js'

const PublicRoutes = express.Router()

PublicRoutes.get('/Singleuser/:id', GetSingleuser)
export default PublicRoutes
