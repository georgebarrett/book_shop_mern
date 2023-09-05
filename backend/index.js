import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Croeso');
});

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