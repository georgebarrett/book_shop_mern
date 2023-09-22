import mongoose from "mongoose";
import { Book } from "../models/bookModel";

const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer(); // Corrected the instantiation
    const uri = await mongoServer.getUri(); // Added await as it's asynchronous
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}, 10000); // Increased the timeout to 10 seconds

afterEach(async () => {
    await mongoose.connection.dropDatabase();
}, 10000);

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop(); // Changed from disconnect() to stop()
}, 10000);

describe('Book Model,', () => {

    it('should create a new book', async () => {
        const newBook = new Book({
            title: 'sample title',
            author: 'sample author',
            publishYear: 2023
        });

        const savedBook = await newBook.save();
        expect(savedBook.title).toBe('sample title');
        expect(savedBook.author).toBe('sample author');
        expect(savedBook.publishYear).toBe(2023);
    });
});

// import mongoose from "mongoose";
// import { Book } from "../models/bookModel";

// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;

// beforeAll(async () => {
//     mongoServer = new MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
// });

// afterEach(async () => {
//     await mongoose.connection.dropDatabase();
// });
  
// afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.disconnect();
// });

// describe('Book Model,', () => {

//     it('should create a new book', async () => {
//         const newBook = new Book({
//             title: 'sample title',
//             author: 'sample author',
//             publishYear: 2023
//         });

//         const savedBook = await newBook.save();
//         expect(savedBook.title).toBe('sample title');
//         expect(savedBook.author).toBe('sample author');
//         expect(savedBook.publishYear).toBe(2023);
//     });
// });