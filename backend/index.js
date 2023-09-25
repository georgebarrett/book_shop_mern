import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send('Croeso');
// });

// app.use('/books', booksRoute)

const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    })