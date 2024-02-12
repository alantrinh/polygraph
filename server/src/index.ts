import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { graphqlHTTP } from "express-graphql"
import { schema } from './schema/schema';
import GdpPerCapita from './schema/GdpPerCapita';
import fs from 'fs';
import csv from 'csv-parser';

const app = express();
app.use(cors());

// graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// mongodb endpoint
app.get('/', async (req: Request, res: Response) => {
    try {
        const gdp = await GdpPerCapita.find({ }, { __v: 0 });
        res.json(gdp);
    } catch (e: any) {
        console.log(e.message);
    }
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});

mongoose.connect('mongodb://localhost:27017/gdpdb');
const db = mongoose.connection;
db.collection('gdppercapitas').deleteMany({});

// populate db with csv file
fs.createReadStream('./src/data/gdp_per_capita.csv')
    .pipe(csv())
    .on('data', async row => {
        try {
            await GdpPerCapita.create({
                country: row['Country'],
                year: row['Year'],
                amount: row['GDP per capita']
            });
        } catch (e: any) {
            console.log(e.message)
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
