import express from 'express';
import dotenv from 'dotenv';
import DBCon from './libs/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/Auth.js';
// import UserRoutes from './routes/User.js';  // Uncomment if needed
import DashboardRoutes from './routes/DashBoard.js';
// import CommentRoutes from './routes/Comments.js';  // Uncomment if needed
import PublicRoutes from './routes/public.js';
import Router from './routes/filter.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
DBCon();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('hello from server');
});
app.use(express.static('public'));
app.use(cookieParser());

// Corrected typo here: `corsOptions`
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/auth', AuthRoutes);
// app.use('/user', UserRoutes);  // Uncomment if needed
app.use('/dashboard', DashboardRoutes);
// app.use('/comment', CommentRoutes);  // Uncomment if needed
app.use('/public', PublicRoutes);

app.use('/user', Router);  // `Router` is being used here for the `/filter` route

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
