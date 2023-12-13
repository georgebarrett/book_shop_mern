import mongoose from "mongoose";
import Book from "../models/bookModel";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    console.log('mongoServer', mongoServer)
    const uri = mongoServer.getUri(); 
    await mongoose.connect(uri);
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

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