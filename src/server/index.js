require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql-server');
const app = express();

const mongoose = require('mongoose');
const Mongo_URI = process.env.MONGO_URI;
// console.log(Reservation)

mongoose.connect(Mongo_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to database'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true //Set to true to view GraphiQl in browser at /graphql
}));

app.listen(4000, () => {
  console.log('Listening on 4000')
});
