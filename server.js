import express from "express";
import paymentRoutes from './routes/paymentRoute.js';
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import studentRoutes from "./routes/studentRoute.js";
import instructorRoutes from './routes/instructorRoute.js';
import adminRoutes from './routes/adminRoute.js';
import instructorApplicationRoutes from './routes/instructorApplicationRoute.js'
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express()
const PORT = process.env.PORT 
connectDb();

app.use('/api/payment/webhook',
  express.raw({ type: 'application/json' }),
  (req, res, next) => {
    req.body = JSON.parse(req.body);
    next();
  }
);

// middleware 
app.use(express.json());
app.use(cors())



//ROUTES
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/instructor', instructorRoutes);
app.use('/admin', adminRoutes);
app.use('/payment', paymentRoutes);
app.use('/instructorapplication', instructorApplicationRoutes);
app.use(errorHandler);



app.get('/', (req,res) => {
    res.json({message: "WELCOME TO VERCITY"})
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})