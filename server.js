import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongooseConnection } from './DB/Mongoose.config.js';
import productRouter from './MVC/Routes/Product.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    allowedHeaders: 'Content-Type,Authorization',
  }));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',productRouter);
app.get('/', (req,res) => {
    res.send('Welcome to Products APIs');
});
app.use((req, res) =>{
    res.status(404).send("API not found!")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    mongooseConnection();
});