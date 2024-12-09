import express from 'express'
import { isAdmin } from '../middleware/checkAdmin.js'
// import { Dashboard, Delete, GetUsers } from '../controllers/Dashboard.js'
import { Delete, GetUsers } from '../controllers/DashBoard.js'

const DashboardRoutes = express.Router()

// DashboardRoutes.get('/', isAdmin, Dashboard)
// DashboardRoutes.get('/users', isAdmin, GetUsers)
DashboardRoutes.get('/users', GetUsers)
// DashboardRoutes.delete("/delete/:id", isAdmin, Delete)
DashboardRoutes.delete("/delete/:id", Delete)

export default DashboardRoutes