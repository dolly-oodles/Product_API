import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { mongooseConnection } from './DB/Mongoose.config.js';
import productRouter from './MVC/Routes/Product.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/',productRouter);
app.get('/', (req,res) => {
    res.send('Welcome to Products APIs');
});
app.use((req, res) =>{
    res.status(404).send("API not found!..Please check our documentation for more information at localhost:3300/api-docs")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    mongooseConnection();
});