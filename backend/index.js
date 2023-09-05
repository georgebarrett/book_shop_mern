import express from "express";

const app = express();

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Croeso');
});

app.listen(5555, () => {
    console.log("5555")
});

