import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose'

dotenv.config();

import v1RouteHandler from './routes';

const DB_CONNECTION_STRING: string | undefined = process.env.DB_CONNECTION_STRING;
const PORT: number = Number(process.env.SERVER_PORT) ?? 8080;

if (!DB_CONNECTION_STRING) {
    console.error('DB_CONNECTION_STRING not specified.');
    process.exit(1);
}

const server: Express = express();
server.use(bodyParser.json());
server.use(cors());
server.use('/v1-beta', v1RouteHandler);

server.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
});

server.get('*', (req: Request, res: Response) => {
    res.sendStatus(404);
});

mongoose.set('strictQuery', false);
mongoose.connect(DB_CONNECTION_STRING, (error) => {
    if (error) {
        console.error('Failed to connect to the database.');
        console.error(error);
        return;
    }

    console.log('Connected to Database Successfully');

    server.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}`);
    });
});
